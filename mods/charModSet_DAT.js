CM.charModSetDAT = function(aTarget, modTypeDef) {
	this.target = aTarget;

	// this will track the total for all modifiers, adjustments, and multiples	

	if (modTypeDef) {
		for ( var i = 0; i < modTypeDef.length; i++) {
			for (var k in modTypeDef[i]) {
				this[k] = 0;
			}
		}
	}
	
	this.mods = {};
}