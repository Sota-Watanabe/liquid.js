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

    if (vdom.transferMethod == 'socket.io'){
        vdom.client.on('list', function(data){
            console.log(data);
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


module.exports = Liquid;
