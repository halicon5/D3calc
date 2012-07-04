CM.charModDAT = function(modDef, modTypeDef) {
	if (!modDef) {
		modDef = {};
	}
	this.id = 		(modDef.id) ? modDef.id : "";
	this.target = 	(modDef.target) ? modDef.target : "";
	this.group =	(modDef.group) ? modDef.group : "";
	this.subGroup = (modDef.group) ? modDef.subGroup : "";
	this.label = 	(modDef.label) ? modDef.label : "";
	this.include =	(modDef.include) ? modDef.inlcude : null;
	
	if (modTypeDef) {
		for ( var i = 0; i < modTypeDef.length; i++) {
			for (var k in modTypeDef[i]) {
				this[k] = (modDef[k] && parseFloat(modDef[k]) ) ? parseFloat(modDef[k]) : 0;
			}
		}
	}

	this.desc = 	(modDef.desc) ? modDef.desc : "";
	this.timing = 	(modDef.timing) ? modDef.timing : "";
}