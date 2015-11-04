var virtualize = require('vdom-virtualize');
var patch = require('virtual-dom/patch');
var diff = require('virtual-dom/diff');
var Serializer = require('vdom-serialize');

var virtualizedState = null;
var initialState = null;

var uiInstance;
var variableInstance;

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
            var serialized = Serializer.deserializePatches(data.vdom);

            variableInstance.deserialize(data.variable);

            var toInitial = diff(document.body, initialState);
            patch(document.body, toInitial);

            patch(document.body, serialized);

            var elementsNeedingListeners = document.querySelectorAll('[data-handler]');

            for ( var i  = 0; i < elementsNeedingListeners.length; i++ ){
                variableInstance.bindHandler(elementsNeedingListeners[i].getAttribute('data-handler'), elementsNeedingListeners[i]);
            }

            if (uiOptions.createUI == true && uiInstance){
                uiInstance.CreateUIElements();
            }
        })
    }

    initialState = virtualize(document.body);
};

VDom.prototype.setUi = function(ui){
    uiInstance = ui;
};

VDom.prototype.setVariable = function(variable){
    variableInstance = variable;
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
    var toSync = Serializer.serializePatches(patches);
    var variables = variableInstance.serialize();

    var syncable = {
        vdom: toSync,
        variable: variables
    };

    if (this.options.transferMethod == 'socket.io'){
        this.client.emit("sync", syncable);
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
    var toSync = Serializer.serializePatches(patches);
    var variables = variableInstance.serialize();
    var syncable = {
        vdom: toSync,
        variable: variables
    };

    var clientObj = {
        client: client_id,
        sync: syncable
    };
    if (this.options.transferMethod == 'socket.io'){
        this.client.emit("syncToClient", clientObj);
    }

};


module.exports = VDom;