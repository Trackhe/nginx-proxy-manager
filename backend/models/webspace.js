// Objection Docs:
// http://vincit.github.io/objection.js/

const db          = require('../db');
const Model       = require('objection').Model;
const User        = require('./user');
const AccessList  = require('./access_list');
const Certificate = require('./certificate');
const now         = require('./now_helper');

Model.knex(db);

class WebSpace extends Model {
	$beforeInsert () {
		this.created_on  = now();
		this.modified_on = now();

		// Default for domain_names
		if (typeof this.domain_names === 'undefined') {
			this.domain_names = [];
		}

		// Default for meta
		if (typeof this.meta === 'undefined') {
			this.meta = {};
		}

		this.domain_names.sort();
	}

	$beforeUpdate () {
		this.modified_on = now();

		// Sort domain_names
		if (typeof this.domain_names !== 'undefined') {
			this.domain_names.sort();
		}
	}

	static get name () {
		return 'WebSpace';
	}

	static get tableName () {
		return 'webspace';
	}

	static get jsonAttributes () {
		return ['domain_names', 'meta', 'locations'];
	}

	static get relationMappings () {
		return {
			owner: {
				relation:   Model.HasOneRelation,
				modelClass: User,
				join:       {
					from: 'webspace.owner_user_id',
					to:   'user.id'
				},
				modify: function (qb) {
					qb.where('user.is_deleted', 0);
					qb.omit(['id', 'created_on', 'modified_on', 'is_deleted', 'email', 'roles']);
				}
			},
			access_list: {
				relation:   Model.HasOneRelation,
				modelClass: AccessList,
				join:       {
					from: 'webspace.access_list_id',
					to:   'access_list.id'
				},
				modify: function (qb) {
					qb.where('access_list.is_deleted', 0);
					qb.omit(['id', 'created_on', 'modified_on', 'is_deleted']);
				}
			},
			certificate: {
				relation:   Model.HasOneRelation,
				modelClass: Certificate,
				join:       {
					from: 'webspace.certificate_id',
					to:   'certificate.id'
				},
				modify: function (qb) {
					qb.where('certificate.is_deleted', 0);
					qb.omit(['id', 'created_on', 'modified_on', 'is_deleted']);
				}
			}
		};
	}
}

module.exports = WebSpace;
