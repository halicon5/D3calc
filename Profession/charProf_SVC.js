D3calc.charProfSVC = function(aCharProfDAT, aCharSVC) {
	this.d = aCharProfDAT;
	this.parChar = aCharSVC;
}

	D3calc.charProfSVC.prototype.destroy = D3calc.destroy;

	D3calc.charProfSVC.prototype.setProf = function(profName) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charProfSVC.prototype.setProf = function(" + profName + ")");
		if (D3Defs.prof[profName]) {
			this.parChar.d.prof = new D3calc.charProfDAT(D3Defs.prof[profName]);
			this.d = this.parChar.d.prof;
//			this.applyMods();
		}
		else {
			if (D3calc.debug) D3calc.log("[ERROR] D3calc.charProfSVC.prototype.setProf = function(" + profName + "): Prof does not exist.");
		}
	}
	
	D3calc.charProfSVC.prototype.setLevel = function(aLevel) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charProfSVC.prototype.setLevel = function(" + aLevel + ")");
		this.parChar.d.prof.level = aLevel;
//			this.applyMods();	
	}

/*	
	D3calc.charProfSVC.prototype.applyMods = function() {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charProfSVC.prototype.applyMods = function()");
		this.parChar.modifiers.clearModsById("Prof");

		if (this.d.mods) {
			for (var m in this.d.mods) {
			 this.parChar.modifiers.applyMod(this.d.mods[m]);
			}
		}
	}
	*/