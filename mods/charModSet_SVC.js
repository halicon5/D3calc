CM.charModSetSVC = function(aModSetDAT, itemSCV, aCharSVC, modTypeDef) {
	if (CM.debug) CM.log("[NEW] CM.charModSetSVC = function() " + aModSetDAT.target);
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

	
	this.CMCLASSNAME = "CM.charModSetSVC";	
	this.CMOBJNAME = "modifiers." + this.d.target;

}

	CM.charModSetSVC.prototype.destroy = CM.destroy;

	CM.charModSetSVC.prototype.clearModsById = function(id) {
		if (CM.debug) CM.log("[CALL] CM.charModSetSVC.prototype.clearModsById = function(" + id + "): " + this.CMOBJNAME);
		delete this.d.mods[id];
		this.update();
	}
	
	CM.charModSetSVC.prototype.applyMod = function(mod) {
		if (CM.debug) CM.log("[CALL] CM.charModSetSVC.prototype.applyMod = function(mod): " + this.CMOBJNAME);
		if (mod.id) {
			this.d.mods[mod.id] = new CM.charModDAT(mod, this.modTypeDef);
			this.parChar.modifiers.activeMods.applyMod(mod, this);
		}
		this.update();
	}
	
	CM.charModSetSVC.prototype.update = function() {
		if (CM.debug) CM.log("[CALL] CM.charModSetSVC.prototype.update = function(): " + this.CMOBJNAME);
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
	
	CM.charModSetSVC.prototype.reset = function() {
		if (CM.debug) CM.log("[CALL] CM.charModSetSVC.prototype.reset = function(): " + this.CMOBJNAME);
		for (var i = 0; i < this.modTypeDef.length; i++) {
			for (var k in this.modTypeDef[i]) {
				this.d[k] = 0;
			}
		}
	}
	
	CM.charModSetSVC.prototype.setItemModifiers = function() {
		if (CM.debug) CM.log("[CALL] CM.charModSetSVC.prototype.setItemModifiers = function(): " + this.CMOBJNAME);
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
			if(CM.debug) CM.log("[ERROR] CM.charModSetSVC.prototype.setItemModifiers = function(): " + this.CMOBJNAME + " this.itemSvc is not defined");
		}
	}