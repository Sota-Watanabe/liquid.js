var virtualize = require('vdom-virtualize');
var patch = require('virtual-dom/patch');
var diff = require('virtual-dom/diff');
var Serializer = require('vdom-serialize');

var virtualizedState = null;

var Liquid = function(options){
    this.options = options || {};
    if (!this.options.transferMethod){
        this.options.transferMethod = 'socket.io';
        var io = require('socket.io-client');
        this.client = io('http://localhost');
    }

};

Liquid.prototype.vdom = {};

Liquid.prototype.vdom.virtualize = function(){
    virtualizedState = virtualize(document.body);
};

Liquid.prototype.vdom.restore = function(){
    if ( virtualizedState != null ) {
        var patches = diff(initialState, virtualizedState);
        patch(document.body, patches)
    }
};

Liquid.prototype.vdom.transfer = function(){
    var patches = diff(initialState, virtualizedState);
    var toSync = Serializer.serialize(patches);
    if (this.options.transferMethod = 'socket.io'){}
        this.client.emit("sync", toSync);
};


Liquid.prototype.vdom.restore = function(){
    if ( virtualizedState != null ) {
        var patches = diff(initialState, virtualizedState);
        patch(document.body, patches)
    }
}
module.exports = Liquid;
