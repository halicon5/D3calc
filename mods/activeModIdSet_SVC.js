/* this object will hold references to all ModSets containing items with a certain id. Allows us to manipulate 
	Mods by id much faster than traversing the entire tree of mods.
*/

CM.activeModIdSetSVC = function(aId, aCharSVC) {
	this.parChar = aCharSVC;
	
	this.id = aId;
	this.modSetSvcs = {};
}

	CM.activeModIdSetSVC.prototype.destroy = CM.destroy;
	
	CM.activeModIdSetSVC.prototype.clearModsById = function(id) {
		if (CM.debug) CM.log("[CALL] CM.activeModIdSetSVC.prototype.clearModsById = function(" + id + ")");
		for (key in this.modSetSvcs) {
			if (this.modSetSvcs[key].clearModsById(id)) {
				this.modSetSvcs[key].clearModsById(id);
			}
			delete this.modSetSvcs[key];
		}
	}
	
	
	CM.activeModIdSetSVC.prototype.applyMod = function (mod, modSetSvc) {
		if (CM.debug) CM.log("[CALL] CM.activeModIdSetSVC.prototype.applyMod = function(" + mod.id + " " + mod.target + ", modSetSvc)");
		if (modSetSvc.target) {
			this.modSetSvcs[modSetSvc.target] = modSetSvc;
		}
	}