CM.charModifiersDAT = function() {

	this.attributes = {};	
	this.attributes.STR = new CM.charModSetDAT("attributes.STR", kantiaDefs.modTypeDefs.attribute); 
	this.attributes.SIZ = new CM.charModSetDAT("attributes.SIZ", kantiaDefs.modTypeDefs.attribute); 
	this.attributes.AGL = new CM.charModSetDAT("attributes.AGL", kantiaDefs.modTypeDefs.attribute); 
	this.attributes.REF = new CM.charModSetDAT("attributes.REF", kantiaDefs.modTypeDefs.attribute);
	this.attributes.CON = new CM.charModSetDAT("attributes.CON", kantiaDefs.modTypeDefs.attribute);
	this.attributes.FORT = new CM.charModSetDAT("attributes.FORT", kantiaDefs.modTypeDefs.attribute);
	this.attributes.REA = new CM.charModSetDAT("attributes.REA", kantiaDefs.modTypeDefs.attribute);
	this.attributes.WILL = new CM.charModSetDAT("attributes.WILL", kantiaDefs.modTypeDefs.attribute);
	this.attributes.SPIR = new CM.charModSetDAT("attributes.SPIR", kantiaDefs.modTypeDefs.attribute);
	this.attributes.PER = new CM.charModSetDAT("attributes.PER", kantiaDefs.modTypeDefs.attribute);
	
	this.calcStats = {};
	
	this.skills = {};
	this.skills.list = {};
	
	this.disciplines = {};
	this.disciplines.list = {};
	
	this.magicSkills = {};
	this.magicSkills.list = {};
	
	this.spells = {};
	this.spells.list = {};
	
	this.armor = {};
	this.armor.adjustments = {};
	
	this.defense = new CM.charModSetDAT("defense", kantiaDefs.modTypeDefs.defense);
	this.defense.hitZones = {};
	
	this.combatStats = new CM.charModSetDAT("combatStats", kantiaDefs.modTypeDefs.combatStats);
	this.combatStats.combatAVs = {};
	
	this.masteries = {};
	this.masteries.list = {};
}

/*
	condition = [always|equipped|sometimes]

	target = a reference to a specific characteristic
*/