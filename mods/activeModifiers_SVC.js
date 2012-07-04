/*
This object lets us loop through only a character's active mods and optimizes performance when major changes are made, such as a change to race or anything that applies a lot of modifiers to a character.
*/
D3calc.activeModifiersSVC = function(aCharModifiersSVC, aCharSVC) {
	if (D3calc.debug) D3calc.log("[NEW] D3calc.activeModifiersSVC = function()");
	this.modifiers = aCharModifiersSVC;
	this.parChar = aCharSVC;
	
	this.modIdSets = {};
	this.initializeModIdSets();
}

	D3calc.activeModifiersSVC.prototype.destroy = D3calc.destroy;
	
	D3calc.activeModifiersSVC.prototype.clearModsById = function(id) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.activeModifiersSVC.prototype.clearModsById = function(" + id + ")");
		
		if (this.modIdSets[id] && this.modIdSets[id].clearModsById) {
			this.modIdSets[id].clearModsById(id);
		}
	}

	D3calc.activeModifiersSVC.prototype.applyMod = function(mod, modSetSvc) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.activeModifiersSVC.prototype.applyMod = function(mod, modSvc)");
		if (mod.id) {
			if (!this.modIdSets[mod.id]) {
				this.modIdSets[mod.id] = new D3calc.activeModIdSetSVC(mod.id, this.parChar);
			}
			if (this.modIdSets[mod.id] && this.modIdSets[mod.id].applyMod) {
				this.modIdSets[mod.id].applyMod(mod, modSetSvc);
			}
		}
		else {
			D3calc.log("mod.id not defined");
		}
	}
	
	D3calc.activeModifiersSVC.prototype.initializeModIdSets = function() {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.activeModifiersSVC.prototype.initializeModIdSets = function()");
		this.gatherModsByGrouping(this.modifiers.attributes);
		this.gatherModsByGrouping(this.modifiers.skills.list);
	}
	
	D3calc.activeModifiersSVC.prototype.gatherModsByGrouping = function(charModSetGroup) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.activeModifiersSVC.prototype.gatherModsByGrouping = function(charModSetGroup)");
		for (var key in charModSetGroup) {
			if (charModSetGroup[key].d ) {
				this.gatherModsByModSet(charModSetGroup[key]);
			}
		}
	}
	
	D3calc.activeModifiersSVC.prototype.gatherModsByModSet = function(charModSet) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.activeModifiersSVC.prototype.gatherModsByModSet = function(charModSet) " + charModSet.d.target );
		for (var key in charModSet.d.mods) {
			if (!this.modIdSets[key]) {
				this.modIdSets[key] = new D3calc.activeModIdSetSVC(key, this.parChar);
				D3calc.log(key);
			}
			this.modIdSets[key].modSetSvcs[charModSet.target] = charModSet;
		}
	}