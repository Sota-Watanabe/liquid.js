var VDom = require('./lib/VDom.js');

var vdom;

var Liquid = function(options){
    this.options = options || {};
    this.options.vdom = this.options.vdom || {};
    this.vdom = vdom = new VDom(this.options.vdom);

    this.options.createUI = this.options.createUI || true;
    if ( this.options.createUI == true ){
        CreateUIElements();
    }

};


var CreateUIElements = function(){
    var syncButton = document.createElement('button');
    syncButton.classList.add('Liquid-ui');
    syncButton.onclick = sync;

    document.body.appendChild(syncButton)
};

var sync = function(){
    vdom.virtualize()
    vdom.transfer();
};

module.exports = Liquid;
