/*
This object lets us loop through only a character's active mods and optimizes performance when major changes are made, such as a change to race or anything that applies a lot of modifiers to a character.
*/
CM.activeModifiersSVC = function(aCharModifiersSVC, aCharSVC) {
	if (CM.debug) CM.log("[NEW] CM.activeModifiersSVC = function()");
	this.modifiers = aCharModifiersSVC;
	this.parChar = aCharSVC;
	
	this.modIdSets = {};
	this.initializeModIdSets();
}

	CM.activeModifiersSVC.prototype.destroy = CM.destroy;
	
	CM.activeModifiersSVC.prototype.clearModsById = function(id) {
		if (CM.debug) CM.log("[CALL] CM.activeModifiersSVC.prototype.clearModsById = function(" + id + ")");
		
		if (this.modIdSets[id] && this.modIdSets[id].clearModsById) {
			this.modIdSets[id].clearModsById(id);
		}
	}

	CM.activeModifiersSVC.prototype.applyMod = function(mod, modSetSvc) {
		if (CM.debug) CM.log("[CALL] CM.activeModifiersSVC.prototype.applyMod = function(mod, modSvc)");
		if (mod.id) {
			if (!this.modIdSets[mod.id]) {
				this.modIdSets[mod.id] = new CM.activeModIdSetSVC(mod.id, this.parChar);
			}
			if (this.modIdSets[mod.id] && this.modIdSets[mod.id].applyMod) {
				this.modIdSets[mod.id].applyMod(mod, modSetSvc);
			}
		}
		else {
			CM.log("mod.id not defined");
		}
	}
	
	CM.activeModifiersSVC.prototype.initializeModIdSets = function() {
		if (CM.debug) CM.log("[CALL] CM.activeModifiersSVC.prototype.initializeModIdSets = function()");
		this.gatherModsByGrouping(this.modifiers.attributes);
		this.gatherModsByGrouping(this.modifiers.skills.list);
	}
	
	CM.activeModifiersSVC.prototype.gatherModsByGrouping = function(charModSetGroup) {
		if (CM.debug) CM.log("[CALL] CM.activeModifiersSVC.prototype.gatherModsByGrouping = function(charModSetGroup)");
		for (var key in charModSetGroup) {
			if (charModSetGroup[key].d ) {
				this.gatherModsByModSet(charModSetGroup[key]);
			}
		}
	}
	
	CM.activeModifiersSVC.prototype.gatherModsByModSet = function(charModSet) {
		if (CM.debug) CM.log("[CALL] CM.activeModifiersSVC.prototype.gatherModsByModSet = function(charModSet) " + charModSet.d.target );
		for (var key in charModSet.d.mods) {
			if (!this.modIdSets[key]) {
				this.modIdSets[key] = new CM.activeModIdSetSVC(key, this.parChar);
				CM.log(key);
			}
			this.modIdSets[key].modSetSvcs[charModSet.target] = charModSet;
		}
	}