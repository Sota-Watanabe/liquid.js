var VDom = require('./lib/VDom.js');
var UI = require('./lib/UI.js');
var Variable = require('./lib/Variable.js');


var vdom;
var opts;
var ui;

var variable = new Variable();

var Liquid = function(options){
    this.options = opts =  options || {};
    this.options.ui = this.options.ui || {};

    this.options.vdom = this.options.vdom || {};
    this.vdom = vdom = new VDom(this.options.vdom, this.options.ui);

    this.ui = ui = new UI(this.options.ui, vdom);

    vdom.setUi(ui);

    ui.CreateUIElements();




    if (vdom.options.transferMethod == 'socket.io'){
        vdom.client.on('list', function(data){
            ui.addClientsToUI(data)
        });
    }

};


Liquid.prototype.registerHandler = variable.registerHandler;

module.exports = Liquid;
