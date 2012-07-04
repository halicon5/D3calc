CM.charModifiersSVC = function(aModifiersDAT, aCharSVC) {
	if (CM.debug) CM.log("[NEW] CM.charModifiersSVC = function()");
	this.d = aModifiersDAT;
	this.parChar = aCharSVC;

	this.attributes = {};
	this.attributes.STR = new CM.charModSetSVC(this.d.attributes.STR, this.parChar.attributes.STR, this.parChar, kantiaDefs.modTypeDefs.attribute);
	this.attributes.SIZ = new CM.charModSetSVC(this.d.attributes.SIZ, this.parChar.attributes.SIZ, this.parChar, kantiaDefs.modTypeDefs.attribute);
	this.attributes.AGL = new CM.charModSetSVC(this.d.attributes.AGL, this.parChar.attributes.AGL, this.parChar, kantiaDefs.modTypeDefs.attribute);
	this.attributes.REF = new CM.charModSetSVC(this.d.attributes.REF, this.parChar.attributes.REF, this.parChar, kantiaDefs.modTypeDefs.attribute);
	this.attributes.CON = new CM.charModSetSVC(this.d.attributes.CON, this.parChar.attributes.CON, this.parChar, kantiaDefs.modTypeDefs.attribute);
	this.attributes.FORT = new CM.charModSetSVC(this.d.attributes.FORT, this.parChar.attributes.FORT, this.parChar, kantiaDefs.modTypeDefs.attribute);
	this.attributes.REA = new CM.charModSetSVC(this.d.attributes.REA, this.parChar.attributes.REA, this.parChar, kantiaDefs.modTypeDefs.attribute);
	this.attributes.WILL = new CM.charModSetSVC(this.d.attributes.WILL, this.parChar.attributes.WILL, this.parChar, kantiaDefs.modTypeDefs.attribute);
	this.attributes.SPIR = new CM.charModSetSVC(this.d.attributes.SPIR, this.parChar.attributes.SPIR, this.parChar, kantiaDefs.modTypeDefs.attribute);
	this.attributes.PER = new CM.charModSetSVC(this.d.attributes.PER, this.parChar.attributes.PER, this.parChar, kantiaDefs.modTypeDefs.attribute);
	
	this.skills = {};
	this.skills.list = {};
	this.initializeDataObjectsByGroup(this.d.skills.list, this.parChar.d.skills.list, "skills.list", kantiaDefs.modTypeDefs.skill);
	this.initializeServicesByGroup(this.skills.list, this.parChar.d.modifiers.skills.list, this.parChar.skills.list, kantiaDefs.modTypeDefs.skill);
	
	this.disciplines = {};
	this.disciplines.list = {};
	this.initializeDataObjectsByGroup(this.d.disciplines.list, this.parChar.d.disciplines.list, "disciplines.list", kantiaDefs.modTypeDefs.discipline);
	this.initializeServicesByGroup(this.disciplines.list, this.parChar.d.modifiers.disciplines.list, this.parChar.disciplines.list, kantiaDefs.modTypeDefs.discipline);


	this.magicSkills = {};
	this.magicSkills.list = {};
	this.initializeDataObjectsByGroup(this.d.magicSkills.list, this.parChar.d.magicSkills.list, "magicSkills.list", kantiaDefs.modTypeDefs.skill);
	this.initializeServicesByGroup(this.magicSkills.list, this.parChar.d.modifiers.magicSkills.list, this.parChar.magicSkills.list, kantiaDefs.modTypeDefs.skill);
	
	this.spells = {};
	this.spells.list = {};
	this.initializeDataObjectsByGroup(this.d.spells.list, this.parChar.d.magicSkills.list, "spells.list", kantiaDefs.modTypeDefs.spell);
	this.initializeServicesByGroup(this.spells.list, this.parChar.d.modifiers.spells.list, this.parChar.spells.list, kantiaDefs.modTypeDefs.spell);

	this.armor = {};
	this.armor.adjustments = {};
	this.initializeDataObjectsByGroup(this.d.armor.adjustments, this.parChar.d.armor.adjustments, "armor.adjustments", kantiaDefs.modTypeDefs.armorAdjust);
	this.initializeServicesByGroup(this.armor.adjustments, this.parChar.d.modifiers.armor.adjustments, this.parChar.armor, kantiaDefs.modTypeDefs.armorAdjust);

	this.defense = new CM.charModSetSVC(this.d.defense, this.parChar.defense, this.parChar, kantiaDefs.modTypeDefs.defense);
	this.defense.hitZones = {};
	this.initializeDataObjectsByGroup(this.d.defense.hitZones, this.parChar.d.defense.hitZones, "defense.hitZones", kantiaDefs.modTypeDefs.hitZone);
	this.initializeServicesByGroup(this.defense.hitZones, this.parChar.d.modifiers.defense.hitZones, this.parChar.defense.hitZones, kantiaDefs.modTypeDefs.hitZone);

	this.combatStats = new CM.charModSetSVC(this.d.combatStats, this.parChar.combatStats, "combatStats", kantiaDefs.modTypeDefs.combatStats);
	this.combatStats.combatAVs = {};
	this.initializeDataObjectsByGroup(this.d.combatStats.combatAVs, this.parChar.d.modifiers.combatStats.combatAVs, "combatStats.combatAVs",  kantiaDefs.modTypeDefs.combatAV);
	this.initializeServicesByGroup(this.combatStats.combatAVs, this.parChar.d.modifiers.combatStats.combatAVs, this.parChar.combatStats.combatAVs, kantiaDefs.modTypeDefs.combatAV);

	this.masteries = {};
	this.masteries.list = {};
	this.initializeDataObjectsByGroup(this.d.masteries.list, this.parChar.d.masteries.list, "masteries.list", kantiaDefs.modTypeDefs.masteries);
	this.initializeServicesByGroup(this.masteries.list, this.parChar.d.modifiers.masteries.list, this.parChar.masteries.list, kantiaDefs.modTypeDefs.masteries);

	this.activeMods = new CM.activeModifiersSVC(this, this.parChar);
}

	CM.charModifiersSVC.prototype.destroy = CM.destroy;

	CM.charModifiersSVC.prototype.clearModsById = function(id) {
		if (CM.debug) CM.log("[CALL] CM.charModifiersSVC.prototype.clearModsById = function(" + id + ")");
		this.activeMods.clearModsById(id);
	}
	
	
	CM.charModifiersSVC.prototype.applyMod = function(mod) {
		if (CM.debug) CM.log("[CALL] CM.charModifiersSVC.prototype.applyMod = function(mod)");
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
					if (CM.debug) CM.log("[CALL] CM.charModifiersSVC.prototype.applyMod = function(mod): found " + targArray[i] + " " + svc.CMCLASSNAME);				
					svc.applyMod(mod);
				} 
				else if (svc && !svc.applyMod && (mod.mass) ) {
					this.applyModsByGroup(mod, svc); // service should probably just a list, zone or other collection of data, not an actual service
				}
				else if (svc) {
					if (CM.debug) CM.log("[ERROR] CM.charModifiersSVC.prototype.applyMod = function(mod): " + targArray[i] + " " + svc.CMCLASSNAME);				
				} 
				else {
					if (CM.debug) CM.log("[ERROR] CM.charModifiersSVC.prototype.applyMod = function(mod): " + targArray[i] + " not found");
				}
			}
		}
	}
	
	CM.charModifiersSVC.prototype.applyModsByGroup = function(mod, list) {
		if (CM.debug) CM.log("[CALL] CM.charModifiersSVC.prototype.applyModsByGroup = function(mod, list)");
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
	
	CM.charModifiersSVC.prototype.fetchModSetSVC = function(objectMap) {
		if (CM.debug) CM.log("[CALL] CM.charModifiersSVC.prototype.fetchModSetSVC = function ( " + objectMap + ")");
		var pathArray = objectMap.split(".");
		var func = false;
		
		if (pathArray.length > 0) {
			var i = pathArray.length;
			pathArray.reverse();
			var func = this.getModSetSVC(this, pathArray, i);
			return func;
		}
	}
	
	CM.charModifiersSVC.prototype.getModSetSVC = function(obj, pathArray, index) {
		if (CM.debug) CM.log("[CALL] CM.charModifiersSVC.prototype.getModSetSVC = function ( obj, [" + pathArray + "], " + index + ")");
		index--;

		if (index < 0) {
			return obj;
		}
		else if (obj[pathArray[index]]) {
			var func = obj[pathArray[index]];
			return this.getModSetSVC(func, pathArray, index);
		}
		else {
			if (CM.debug) CM.log("[ERROR] CM.charModifiersSVC.prototype.getModSetSVC = function ( obj, [" + pathArray + "], " + index + "): Path does not exist on object.");
			return false;
		}
	}


	CM.charModifiersSVC.prototype.createModSet = function(dataParentNode, svcParentNode, parentPath, objName, svc, modTypeDef) {
		if (CM.debug) CM.log("[CALL] CM.charModifiersSVC.prototype.createModSetSVC = function (datObj, svcObj)");
		if (dataParentNode && svcParentNode && parentPath) { 
			if (svc && objName) {
				dataParentNode[objName] = new CM.charModSetDAT(parentPath + "." + objName, modTypeDef);
				svcParentNode[objName] = new CM.charModSetSVC(dataParentNode[objName], svc, this.parChar, modTypeDef);
			}
		}
	}

	
	CM.charModifiersSVC.prototype.initializeDataObjectsByGroup = function(dest, src, parentPath, modTypeDef) {
		if (CM.debug) CM.log("[CALL] CM.charModifiersSVC.prototype.initializeDataObjectsByGroup = function (datObj, svcObj)");
		
		if (src && dest) {
			for (var key in src) {
				if (!dest[key]) {
					dest[key] = new CM.charModSetDAT(parentPath + "." + key, modTypeDef);
				}
			}
		}
	}
	
	CM.charModifiersSVC.prototype.initializeServicesByGroup = function(modGrp, datObj, svcObj, modTypeDef) {
		if (CM.debug) CM.log("[CALL] CM.charModifiersSVC.prototype.initializeServicesByGroup = function (datObj, svcObj)");

		if (datObj && svcObj) {
			for (var key in datObj) {
				modGrp[key] = (svcObj[key]) ? new CM.charModSetSVC(datObj[key], svcObj[key], this.parChar, modTypeDef) : undefined;
			}
		}
	}
	
	CM.charModifiersSVC.prototype.deleteModSet = function(datParentNode, svcParentNode, objName) {
		if (CM.debug) CM.log("[CALL] CM.charModifiersSVC.prototype.deleteModSet = function (datParentNode, svcParentNode, " + objName + ")");
		if (datParentNode && svcParentNode) {
			delete datParentNode[objName];
			delete svcParentNode[objName];
		}
	}