const Backbone = require('backbone');

const model = Backbone.Model.extend({
    idAttribute: 'id',

    defaults: function () {
        return {
            id:                      undefined,
            created_on:              null,
            modified_on:             null,
            domain_names:            [],
            host_scheme:             'http',
            host_host:               '',
            access_list_id:          0,
            certificate_id:          0,
            ssl_forced:              false,
            hsts_enabled:            false,
            hsts_subdomains:         false,
            caching_enabled:         false,
            allow_websocket_upgrade: false,
            block_exploits:          false,
            http2_support:           false,
            advanced_config:         '',
            enabled:                 true,
            meta:                    {},
            // The following are expansions:
            owner:                   null,
            access_list:             null,
            certificate:             null
        };
    }
});

module.exports = {
    Model:      model,
    Collection: Backbone.Collection.extend({
        model: model
    })
};
