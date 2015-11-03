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

Variable.prototype.registerHandler = function(name, func){
    handlers[name] = func;
};

Variable.prototype.bindHander = function(name, element){
    element.addEventListener(name, handlers[name]);
};

Variable.prototype.serialize = function(){
    return JSON.stringify(handlers, replacer);
};

Variable.prototype.deserialize = function(string){
    handlers = JSON.parse(string, reviver);
};


module.exports = Variable;