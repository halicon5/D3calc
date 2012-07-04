D3calc.charModSetSVC = function(aModSetDAT, itemSCV, aCharSVC, modTypeDef) {
	if (D3calc.debug) D3calc.log("[NEW] D3calc.charModSetSVC = function() " + aModSetDAT.target);
	this.d = aModSetDAT;
	this.parChar = aCharSVC;
	this.modTypeDef = modTypeDef;

	this.itemSvc = itemSCV;
	this.target = this.d.target;

	if (modTypeDef) {
		for ( var i = 0; i < modTypeDef.length; i++) {
			for (var k in modTypeDef[i]) {
				this[k] = 0;
			}
		}
	}

	
	this.CMCLASSNAME = "D3calc.charModSetSVC";	
	this.CMOBJNAME = "modifiers." + this.d.target;

}

	D3calc.charModSetSVC.prototype.destroy = D3calc.destroy;

	D3calc.charModSetSVC.prototype.clearModsById = function(id) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModSetSVC.prototype.clearModsById = function(" + id + "): " + this.CMOBJNAME);
		delete this.d.mods[id];
		this.update();
	}
	
	D3calc.charModSetSVC.prototype.applyMod = function(mod) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModSetSVC.prototype.applyMod = function(mod): " + this.CMOBJNAME);
		if (mod.id) {
			this.d.mods[mod.id] = new D3calc.charModDAT(mod, this.modTypeDef);
			this.parChar.modifiers.activeMods.applyMod(mod, this);
		}
		this.update();
	}
	
	D3calc.charModSetSVC.prototype.update = function() {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModSetSVC.prototype.update = function(): " + this.CMOBJNAME);
		this.reset();
		for (var m in this.d.mods) {
			if (this.d.mods[m]) {
				for (var i = 0; i < this.modTypeDef.length; i++) {
					for (var k in this.modTypeDef[i]) {
						this.d[k] += this.d.mods[m][k];
					}
				}
			}
		}
		this.setItemModifiers();
	}
	
	D3calc.charModSetSVC.prototype.reset = function() {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModSetSVC.prototype.reset = function(): " + this.CMOBJNAME);
		for (var i = 0; i < this.modTypeDef.length; i++) {
			for (var k in this.modTypeDef[i]) {
				this.d[k] = 0;
			}
		}
	}
	
	D3calc.charModSetSVC.prototype.setItemModifiers = function() {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModSetSVC.prototype.setItemModifiers = function(): " + this.CMOBJNAME);
		if (this.itemSvc) {
			for ( var i = 0; i < this.modTypeDef.length; i++) {
				for (var k in this.modTypeDef[i]) {
					if (this.itemSvc[this.modTypeDef[i][k]]) {
						this.itemSvc[this.modTypeDef[i][k]](this.d[k], k);
					}
				}
			}
			if (this.itemSvc["update"]) this.itemSvc["update"]();
		}
		else {
			if(D3calc.debug) D3calc.log("[ERROR] D3calc.charModSetSVC.prototype.setItemModifiers = function(): " + this.CMOBJNAME + " this.itemSvc is not defined");
		}
	}