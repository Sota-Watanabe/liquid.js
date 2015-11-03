var Variable = function(){

};

var handlers = {};

Variable.prototype.registerHandler = function(name, func){
    handlers[name] = func;
};

Variable.prototype.bindHander = function(name, element){
    element.addEventListener(name, handlers[name]);
};

module.exports = Variable;