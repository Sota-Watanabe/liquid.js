var virtualize = require('vdom-virtualize');
var patch = require('virtual-dom/patch');
var diff = require('virtual-dom/diff');
var Serializer = require('vdom-serialize');

var virtualizedState = null;


var Liquid = function(options){

};


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
    socket.emit("sync", toSync);
};

module.exports = Liquid;
