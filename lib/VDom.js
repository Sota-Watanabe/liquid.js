var virtualize = require('vdom-virtualize');
var patch = require('virtual-dom/patch');
var diff = require('virtual-dom/diff');
var Serializer = require('vdom-serialize');

var virtualizedState = null;
var initialState = null;


var VDom = function(options){
    this.options = options || {};
    if (!this.options.transferMethod){
        this.options.transferMethod = 'socket.io';
        var io = require('socket.io-client');
        this.client = io('http://localhost');
    }

    initialState = virtualize(document.body);
};




VDom.prototype.virtualize = function(){
    virtualizedState = virtualize(document.body);
};

VDom.prototype.restore = function(){
    if ( virtualizedState != null ) {
        var patches = diff(initialState, virtualizedState);
        patch(document.body, patches)
    }
};

VDom.prototype.transfer = function(){
    var patches = diff(initialState, virtualizedState);
    var toSync = Serializer.serialize(patches);
    if (this.options.transferMethod == 'socket.io'){}
    this.client.emit("sync", toSync);
};


VDom.prototype.restore = function(){
    if ( virtualizedState != null ) {
        var patches = diff(initialState, virtualizedState);
        patch(document.body, patches)
    }
};


module.exports = VDom;