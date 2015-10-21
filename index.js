var VDom = require('./lib/VDom.js');


var Liquid = function(options){
    this.options = options || {};
    this.options.vdom = this.options.vdom || {};
    this.vdom = new VDom(this.options.vdom);

};


module.exports = Liquid;
