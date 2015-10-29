
var opts;
var vdom;

var UI = function(options, vdomObj){
    this.options = opts = options || {};
    vdom = vdomObj;
};

UI.prototype.CreateUIElements = function(){

    if ( this.options.createUI == true ) {

        var container = document.createElement('div');
        container.id = 'Liquid-ui';
        container.style.position = 'absolute';
        container.style.bottom = 0;
        container.style.left = 0;
        container.style.zIndex = 10000;

        var syncButton = document.createElement('button');
        syncButton.onclick = sync;
        syncButton.textContent = 'Sync to All';

        var clientList = document.createElement('select');
        clientList.id = 'client-list';
        clientList.onfocus = getList;

        var defaultOption = document.createElement('option');
        defaultOption.textContent = "Click to fetch clients";
        defaultOption.disabled = 'disabled';
        clientList.appendChild(defaultOption);

        var syncToClientButton = document.createElement('button');
        syncToClientButton.onclick = syncToClient;
        syncToClientButton.textContent = "Sync to Client";

        container.appendChild(syncButton);
        container.appendChild(clientList);
        container.appendChild(syncToClientButton);
        document.body.appendChild(container);
    }
};

UI.prototype.RemoveUIElements = function(){
    if ( this.options.createUI == true ) {
        document.body.removeChild(document.getElementById('Liquid-ui'));
    }
};


UI.prototype.addClientsToUI = function(list){
    if (this.options.createUI == true){
        var select = document.querySelector('#client-list');

        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }

        list.forEach(function(id){
            var option = document.createElement('option');
            option.value = id;
            option.textContent = id;
            select.appendChild(option);
        })
    }
};


var sync = function(){

    this.RemoveUIElements();

    vdom.virtualize();
    vdom.transfer();

    this.CreateUIElements();
};


var getList = function(){
    if (vdom.options.transferMethod == 'socket.io'){
        vdom.client.emit('getList');
    }
};



var syncToClient = function(){
    var select = document.querySelector('#client-list');
    if ( select.value != "" ){
        this.RemoveUIElements();
        vdom.virtualize();
        vdom.transferToClient(select.value);
        this.CreateUIElements();
    }
};






module.exports = UI;