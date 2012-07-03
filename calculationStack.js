D3calc.calculationStack = function(channel, param, trigger) {
	D3calc.log("[NEW] D3calc.calculationStack = function(" + channel + ", " + param + ", " + trigger + ")");
	this.rootChannel = channel;
	this.rootParam = param;
	this.rootTrigger = trigger;
	
	this.stackCalls = 1;
	
	this.calls = {};
	
	this.token = channel + "?" + param + "#" + this.stackCalls;
}

	D3calc.calculationStack.prototype.addNewCall = function(channel, param) {
		D3calc.log("[CALL] D3calc.calculationStack.prototype.addNewCall = function(" + channel + ", " + param + ") total calls for this stack: " + this.token + " " + this.stackCalls);
		var tok = this.createToken(channel, param);
		this.calls[channel + "?" + param] = this.stackCalls;
		this.stackCalls++;
		return tok;
	}
	
	D3calc.calculationStack.prototype.createToken = function(channel, param) {
		return channel + "?" + param + "#" + this.stackCalls;
	}
	
	D3calc.calculationStack.prototype.checkAgainstStackCalls = function(channel, param) {
		return (this.calls[channel + "?" + param]) ? true : false;
	}