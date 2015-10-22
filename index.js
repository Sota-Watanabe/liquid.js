var VDom = require('./lib/VDom.js');


var Liquid = function(options){
    this.options = options || {};
    this.options.vdom = this.options.vdom || {};
    this.vdom = new VDom(this.options.vdom);

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
    this.vdom.virtualize()
    this.vdom.transfer();
};

module.exports = Liquid;
