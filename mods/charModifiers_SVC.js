D3calc.charModifiersSVC = function(aModifiersDAT, aCharSVC) {
	if (D3calc.debug) D3calc.log("[NEW] D3calc.charModifiersSVC = function()");
	this.d = aModifiersDAT;
	this.parChar = aCharSVC;

	this.attributes = {};
	this.attributes.STR = new D3calc.charModSetSVC(this.d.attributes.STR, this.parChar.attributes.STR, this.parChar, D3Defs.modTypeDefs.attribute);
	this.attributes.SIZ = new D3calc.charModSetSVC(this.d.attributes.SIZ, this.parChar.attributes.SIZ, this.parChar, D3Defs.modTypeDefs.attribute);
	this.attributes.AGL = new D3calc.charModSetSVC(this.d.attributes.AGL, this.parChar.attributes.AGL, this.parChar, D3Defs.modTypeDefs.attribute);
	this.attributes.REF = new D3calc.charModSetSVC(this.d.attributes.REF, this.parChar.attributes.REF, this.parChar, D3Defs.modTypeDefs.attribute);
	this.attributes.CON = new D3calc.charModSetSVC(this.d.attributes.CON, this.parChar.attributes.CON, this.parChar, D3Defs.modTypeDefs.attribute);
	this.attributes.FORT = new D3calc.charModSetSVC(this.d.attributes.FORT, this.parChar.attributes.FORT, this.parChar, D3Defs.modTypeDefs.attribute);
	this.attributes.REA = new D3calc.charModSetSVC(this.d.attributes.REA, this.parChar.attributes.REA, this.parChar, D3Defs.modTypeDefs.attribute);
	this.attributes.WILL = new D3calc.charModSetSVC(this.d.attributes.WILL, this.parChar.attributes.WILL, this.parChar, D3Defs.modTypeDefs.attribute);
	this.attributes.SPIR = new D3calc.charModSetSVC(this.d.attributes.SPIR, this.parChar.attributes.SPIR, this.parChar, D3Defs.modTypeDefs.attribute);
	this.attributes.PER = new D3calc.charModSetSVC(this.d.attributes.PER, this.parChar.attributes.PER, this.parChar, D3Defs.modTypeDefs.attribute);
	
	this.skills = {};
	this.skills.list = {};
	this.initializeDataObjectsByGroup(this.d.skills.list, this.parChar.d.skills.list, "skills.list", D3Defs.modTypeDefs.skill);
	this.initializeServicesByGroup(this.skills.list, this.parChar.d.modifiers.skills.list, this.parChar.skills.list, D3Defs.modTypeDefs.skill);
	
	this.disciplines = {};
	this.disciplines.list = {};
	this.initializeDataObjectsByGroup(this.d.disciplines.list, this.parChar.d.disciplines.list, "disciplines.list", D3Defs.modTypeDefs.discipline);
	this.initializeServicesByGroup(this.disciplines.list, this.parChar.d.modifiers.disciplines.list, this.parChar.disciplines.list, D3Defs.modTypeDefs.discipline);


	this.magicSkills = {};
	this.magicSkills.list = {};
	this.initializeDataObjectsByGroup(this.d.magicSkills.list, this.parChar.d.magicSkills.list, "magicSkills.list", D3Defs.modTypeDefs.skill);
	this.initializeServicesByGroup(this.magicSkills.list, this.parChar.d.modifiers.magicSkills.list, this.parChar.magicSkills.list, D3Defs.modTypeDefs.skill);
	
	this.spells = {};
	this.spells.list = {};
	this.initializeDataObjectsByGroup(this.d.spells.list, this.parChar.d.magicSkills.list, "spells.list", D3Defs.modTypeDefs.spell);
	this.initializeServicesByGroup(this.spells.list, this.parChar.d.modifiers.spells.list, this.parChar.spells.list, D3Defs.modTypeDefs.spell);

	this.armor = {};
	this.armor.adjustments = {};
	this.initializeDataObjectsByGroup(this.d.armor.adjustments, this.parChar.d.armor.adjustments, "armor.adjustments", D3Defs.modTypeDefs.armorAdjust);
	this.initializeServicesByGroup(this.armor.adjustments, this.parChar.d.modifiers.armor.adjustments, this.parChar.armor, D3Defs.modTypeDefs.armorAdjust);

	this.defense = new D3calc.charModSetSVC(this.d.defense, this.parChar.defense, this.parChar, D3Defs.modTypeDefs.defense);
	this.defense.hitZones = {};
	this.initializeDataObjectsByGroup(this.d.defense.hitZones, this.parChar.d.defense.hitZones, "defense.hitZones", D3Defs.modTypeDefs.hitZone);
	this.initializeServicesByGroup(this.defense.hitZones, this.parChar.d.modifiers.defense.hitZones, this.parChar.defense.hitZones, D3Defs.modTypeDefs.hitZone);

	this.combatStats = new D3calc.charModSetSVC(this.d.combatStats, this.parChar.combatStats, "combatStats", D3Defs.modTypeDefs.combatStats);
	this.combatStats.combatAVs = {};
	this.initializeDataObjectsByGroup(this.d.combatStats.combatAVs, this.parChar.d.modifiers.combatStats.combatAVs, "combatStats.combatAVs",  D3Defs.modTypeDefs.combatAV);
	this.initializeServicesByGroup(this.combatStats.combatAVs, this.parChar.d.modifiers.combatStats.combatAVs, this.parChar.combatStats.combatAVs, D3Defs.modTypeDefs.combatAV);

	this.masteries = {};
	this.masteries.list = {};
	this.initializeDataObjectsByGroup(this.d.masteries.list, this.parChar.d.masteries.list, "masteries.list", D3Defs.modTypeDefs.masteries);
	this.initializeServicesByGroup(this.masteries.list, this.parChar.d.modifiers.masteries.list, this.parChar.masteries.list, D3Defs.modTypeDefs.masteries);

	this.activeMods = new D3calc.activeModifiersSVC(this, this.parChar);
}

	D3calc.charModifiersSVC.prototype.destroy = D3calc.destroy;

	D3calc.charModifiersSVC.prototype.clearModsById = function(id) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModifiersSVC.prototype.clearModsById = function(" + id + ")");
		this.activeMods.clearModsById(id);
	}
	
	
	D3calc.charModifiersSVC.prototype.applyMod = function(mod) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModifiersSVC.prototype.applyMod = function(mod)");
		targArray = null;
		if (mod.target) {
			if (mod.target.constructor == String) {
				targArray = [mod.target];
			} 
			else if (mod.target.constructor == Array) {
				targArray = mod.target;
			}
			for (var i = 0; i < targArray.length; i++) {
				var svc = this.fetchModSetSVC(targArray[i]);
				if (svc && svc.applyMod) {
					if (D3calc.debug) D3calc.log("[CALL] D3calc.charModifiersSVC.prototype.applyMod = function(mod): found " + targArray[i] + " " + svc.CMCLASSNAME);				
					svc.applyMod(mod);
				} 
				else if (svc && !svc.applyMod && (mod.mass) ) {
					this.applyModsByGroup(mod, svc); // service should probably just a list, zone or other collection of data, not an actual service
				}
				else if (svc) {
					if (D3calc.debug) D3calc.log("[ERROR] D3calc.charModifiersSVC.prototype.applyMod = function(mod): " + targArray[i] + " " + svc.CMCLASSNAME);				
				} 
				else {
					if (D3calc.debug) D3calc.log("[ERROR] D3calc.charModifiersSVC.prototype.applyMod = function(mod): " + targArray[i] + " not found");
				}
			}
		}
	}
	
	D3calc.charModifiersSVC.prototype.applyModsByGroup = function(mod, list) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModifiersSVC.prototype.applyModsByGroup = function(mod, list)");
		var itemGroup = "";
		var itemSubGroup = "";
		var itemAtt1 = "";
		var itemAtt2 = "";
		var itemName = "";
		for (var svc in list) {
			if (list[svc].itemSvc && list[svc].itemSvc.d) {
				itemGroup = list[svc].itemSvc.d.group;
				itemSubGroup = list[svc].itemSvc.d.subGroup;
				itemAtt1 = list[svc].itemSvc.d.attrib1;
				itemAtt2 = list[svc].itemSvc.d.attrib2;
				itemName = list[svc].itemSvc.d.name;
				if (!mod.group && !mod.subGroup && !mod.attribs && mod.include) {	// if the mod only touches specific items in a set
					if ( mod.include && mod.include[itemName] && list[svc].applyMod) {
						list[svc].applyMod(mod);
					}
				}
				else if ( !mod.except || (mod.except && !mod.except[itemName]) ) {  // check for exceptions
					if ( mod.include && mod.include[itemName] ) {
						// add mods to specific included item Names
						if (list[svc].applyMod) {
							list[svc].applyMod(mod);
						}
					}
					else if ( 	(mod.group && mod.subGroup && mod.group[itemGroup] && mod.subGroup[itemSubGroup] ) 
						||	(mod.group && !mod.subGroup && mod.group[itemGroup])
						||	(!mod.group && mod.subGroup && mod.subGroup[itemSubGroup])
						||	(!mod.group && !mod.subGroup && !mod.include) ) {
							
						if (!mod.attribs || ( mod.attribs && ( mod.attribs[itemAtt1] || mod.attribs[itemAtt2] ) ) ) {
							if (list[svc].applyMod) {
								list[svc].applyMod(mod);
							}
						}
					}
				} // end exception check.
			}
		}
	}
	
	D3calc.charModifiersSVC.prototype.fetchModSetSVC = function(objectMap) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModifiersSVC.prototype.fetchModSetSVC = function ( " + objectMap + ")");
		var pathArray = objectMap.split(".");
		var func = false;
		
		if (pathArray.length > 0) {
			var i = pathArray.length;
			pathArray.reverse();
			var func = this.getModSetSVC(this, pathArray, i);
			return func;
		}
	}
	
	D3calc.charModifiersSVC.prototype.getModSetSVC = function(obj, pathArray, index) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModifiersSVC.prototype.getModSetSVC = function ( obj, [" + pathArray + "], " + index + ")");
		index--;

		if (index < 0) {
			return obj;
		}
		else if (obj[pathArray[index]]) {
			var func = obj[pathArray[index]];
			return this.getModSetSVC(func, pathArray, index);
		}
		else {
			if (D3calc.debug) D3calc.log("[ERROR] D3calc.charModifiersSVC.prototype.getModSetSVC = function ( obj, [" + pathArray + "], " + index + "): Path does not exist on object.");
			return false;
		}
	}


	D3calc.charModifiersSVC.prototype.createModSet = function(dataParentNode, svcParentNode, parentPath, objName, svc, modTypeDef) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModifiersSVC.prototype.createModSetSVC = function (datObj, svcObj)");
		if (dataParentNode && svcParentNode && parentPath) { 
			if (svc && objName) {
				dataParentNode[objName] = new D3calc.charModSetDAT(parentPath + "." + objName, modTypeDef);
				svcParentNode[objName] = new D3calc.charModSetSVC(dataParentNode[objName], svc, this.parChar, modTypeDef);
			}
		}
	}

	
	D3calc.charModifiersSVC.prototype.initializeDataObjectsByGroup = function(dest, src, parentPath, modTypeDef) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModifiersSVC.prototype.initializeDataObjectsByGroup = function (datObj, svcObj)");
		
		if (src && dest) {
			for (var key in src) {
				if (!dest[key]) {
					dest[key] = new D3calc.charModSetDAT(parentPath + "." + key, modTypeDef);
				}
			}
		}
	}
	
	D3calc.charModifiersSVC.prototype.initializeServicesByGroup = function(modGrp, datObj, svcObj, modTypeDef) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModifiersSVC.prototype.initializeServicesByGroup = function (datObj, svcObj)");

		if (datObj && svcObj) {
			for (var key in datObj) {
				modGrp[key] = (svcObj[key]) ? new D3calc.charModSetSVC(datObj[key], svcObj[key], this.parChar, modTypeDef) : undefined;
			}
		}
	}
	
	D3calc.charModifiersSVC.prototype.deleteModSet = function(datParentNode, svcParentNode, objName) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charModifiersSVC.prototype.deleteModSet = function (datParentNode, svcParentNode, " + objName + ")");
		if (datParentNode && svcParentNode) {
			delete datParentNode[objName];
			delete svcParentNode[objName];
		}
	}