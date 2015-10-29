var virtualize = require('vdom-virtualize');
var patch = require('virtual-dom/patch');
var diff = require('virtual-dom/diff');
var Serializer = require('vdom-serialize');

var virtualizedState = null;
var initialState = null;


var VDom = function(options, uiOptions){
    this.options = options || {};
    if (!this.options.transferMethod) {
        this.options.transferMethod = 'socket.io';
        this.options.path = this.options.path || '';
    }

    if ( this.options.transferMethod == 'socket.io'){

        var io = require('socket.io-client');
        this.client = io(this.options.path);

        this.client.on("sync", function(data){
            var serialized = Serializer.deserialize(data);
            var toInitial = diff(document.body, initialState);
            patch(document.body, toInitial);

            if (uiOptions.createUI == true){
                var stashUiElements = document.getElementById('Liquid-ui');
                document.body.removeChild(stashUiElements);

            }

            patch(document.body, serialized);

            if (uiOptions.createUI == true){

                document.body.appendChild(stashUiElements);

            }
        })
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
    if (this.options.transferMethod == 'socket.io'){
        this.client.emit("sync", toSync);
    }

};


VDom.prototype.restore = function(){
    if ( virtualizedState != null ) {
        var patches = diff(initialState, virtualizedState);
        patch(document.body, patches)
    }
};

VDom.prototype.transferToClient = function(client_id){
    var patches = diff(initialState, virtualizedState);
    var toSync = Serializer.serialize(patches);
    var clientObj = {
        client: client_id,
        sync: toSync
    };
    if (this.options.transferMethod == 'socket.io'){
        this.client.emit("syncToClient", clientObj);
    }

};


module.exports = VDom;