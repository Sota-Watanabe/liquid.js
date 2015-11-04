var Variable = function(){

};


function replacer(key, value){
    if ( typeof value === 'function')
    {
        return value.toString();
    }
    return value;
}

function reviver(key, value){
    try {
        var tmp = eval("(" + value + ")");
    }
    catch (e){
        return value;
    }
    if (typeof tmp === 'function'){
        return tmp;
    }

    return value;
}

var handlers = {};

Variable.prototype.registerHandler = function(name, funcObject){
    handlers[name] = funcObject;
};

//todo name does not match event
Variable.prototype.bindHandler = function(name, element){

    for ( var i in handlers[name]){
        element.addEventListener(i, handlers[name][i]);
    }


};

Variable.prototype.serialize = function(){
    return JSON.stringify(handlers, replacer);
};

Variable.prototype.deserialize = function(string){
    handlers = JSON.parse(string, reviver);
};


module.exports = Variable;