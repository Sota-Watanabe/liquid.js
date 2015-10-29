var VDom = require('./lib/VDom.js');

var vdom;
var opts;

var Liquid = function(options){
    this.options = opts =  options || {};

    this.options.createUI = this.options.createUI || true;
    if ( this.options.createUI == true ){
        CreateUIElements();
    }

    this.options.vdom = this.options.vdom || {};
    this.vdom = vdom = new VDom(this.options.vdom, opts);

    if (vdom.options.transferMethod == 'socket.io'){
        vdom.client.on('list', function(data){
            if ( opts.createUI == true ){
                addClientsToUI(data)
            }
        });
    }

};


var CreateUIElements = function(){

    var container = document.createElement('div');
    container.id = 'Liquid-ui';
    container.style.position = 'absolute';
    container.style.bottom = 0;
    container.style.left = 0;
    container.style.zIndex  = 10000;

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
};

var sync = function(){
    if ( opts.createUI == true ) {
        var stashUiElements = document.getElementById('Liquid-ui');
        document.body.removeChild(stashUiElements);
    }

    vdom.virtualize();
    vdom.transfer();

    if ( opts.createUI == true ) {
        document.body.appendChild(stashUiElements);
    }
};

var getList = function(){
    if (vdom.options.transferMethod == 'socket.io'){
        vdom.client.emit('getList');
    }
};

var addClientsToUI = function(list){
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
};

var syncToClient = function(){
    var select = document.querySelector('#client-list');
    if ( select.value != "" ){
        vdom.virtualize();
        vdom.transferToClient(select.value);
    }
};

module.exports = Liquid;
