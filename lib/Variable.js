var Variable = function(){

};

var handlers = {};

Variable.prototype.registerHandler = function(name, func){
    handlers[name] = func;
};

module.exports = Variable;