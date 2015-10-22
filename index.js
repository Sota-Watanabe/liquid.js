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

    if (vdom.options.transferMethod == 'socket.io'){
        vdom.client.on('list', function(data){
            if ( vdom.options.createUI == true ){
                addClientsToUI(data)
            }
        });
    }

};


var CreateUIElements = function(){

    var container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.bottom = 0;
    container.style.left = 0;

    var syncButton = document.createElement('button');
    syncButton.onclick = sync;
    syncButton.textContent = 'Sync to All';

    var clientList = document.createElement('select');
    clientList.id = 'client-list';
    clientList.onclick = getList;


    container.appendChild(syncButton);
    container.appendChild(clientList);
    document.body.appendChild(container);
};

var sync = function(){
    vdom.virtualize();
    vdom.transfer();
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

module.exports = Liquid;
