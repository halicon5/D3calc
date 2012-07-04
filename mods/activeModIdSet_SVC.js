/* this object will hold references to all ModSets containing items with a certain id. Allows us to manipulate 
	Mods by id much faster than traversing the entire tree of mods.
*/

D3calc.activeModIdSetSVC = function(aId, aCharSVC) {
	this.parChar = aCharSVC;
	
	this.id = aId;
	this.modSetSvcs = {};
}

	D3calc.activeModIdSetSVC.prototype.destroy = D3calc.destroy;
	
	D3calc.activeModIdSetSVC.prototype.clearModsById = function(id) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.activeModIdSetSVC.prototype.clearModsById = function(" + id + ")");
		for (key in this.modSetSvcs) {
			if (this.modSetSvcs[key].clearModsById(id)) {
				this.modSetSvcs[key].clearModsById(id);
			}
			delete this.modSetSvcs[key];
		}
	}
	
	
	D3calc.activeModIdSetSVC.prototype.applyMod = function (mod, modSetSvc) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.activeModIdSetSVC.prototype.applyMod = function(" + mod.id + " " + mod.target + ", modSetSvc)");
		if (modSetSvc.target) {
			this.modSetSvcs[modSetSvc.target] = modSetSvc;
		}
	}