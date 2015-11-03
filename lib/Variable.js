var Variable = function(){

};

var handlers = {};

Variable.prototype.registerHandler = function(name, func){
    handlers[name] = func;
};

Variable.prototype.bindHander = function(name, element){
    element.addEventListener(name, handlers[name]);
};

Variable.prototype.serialize = function(){
    return JSON.stringify(handlers);
};

Variable.prototype.deserialize = function(string){
    handlers = JSON.parse(string);
};


module.exports = Variable;