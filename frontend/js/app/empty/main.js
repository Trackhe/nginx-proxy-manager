const Mn       = require('backbone.marionette');
const template = require('./main.ejs');

module.exports = Mn.View.extend({
    className: 'text-center m-7',
    template:  template,

    options: function () {
        return {
            btn_color: 'teal'
        }
    },

    ui: {
        action: 'a'
    },

    events: {
        'click @ui.action': function (e) {
            e.preventDefault();
            this.getOption('action')();
        }
    },

    templateContext: function () {
        console.log(this.getOption('btn_color'))
        console.log(this.getOption('btn_color_hex'))
        return {
            title:     this.getOption('title'),
            subtitle:  this.getOption('subtitle'),
            link:      this.getOption('link'),
            action:    typeof this.getOption('action') === 'function',
            btn_color: this.getOption('btn_color'),
            btn_color_hex: this.getOption('btn_color_hex')
        };
    }

});
