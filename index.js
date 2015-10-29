var VDom = require('./lib/VDom.js');
var UI = require('./lib/UI.js');

var vdom;
var opts;
var ui;

var Liquid = function(options){
    this.options = opts =  options || {};
    this.options.ui = this.options.ui || {};

    this.options.vdom = this.options.vdom || {};
    this.vdom = vdom = new VDom(this.options.vdom, this.options.ui);

    this.ui = ui = new UI(this.options.ui, vdom);

    ui.CreateUIElements();




    if (vdom.options.transferMethod == 'socket.io'){
        vdom.client.on('list', function(data){
            ui.addClientsToUI(data)
        });
    }

};




module.exports = Liquid;
