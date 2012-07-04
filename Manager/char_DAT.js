D3calc.charDAT = function(name) {
	this.name = name;
	
	this.prof = new D3calc.charProfDAT();
	this.level = 1;

	this.calcStats1 = new D3calc.calculatedStatsDAT();
	this.calcStats2 = new D3calc.calculatedStatsDAT();
	this.calcStats3 = new D3calc.calculatedStatsDAT();

	this.gearSet1 = new D3calc.gearSetDAT("Set 1", this.calcStats1);
	this.gearSet2 = new D3calc.gearSetDAT("Set 2", this.calcStats2);
	this.gearSet3 = new D3calc.gearSetDAT("Set 3", this.calcStats3);


	this.modifiers = new D3calc.charModifiersDAT();
/*	
	this.skills = new D3calc.skillCollectionDAT("skills");
	this.writeInSkillHash = {};  // hash table used to quickly look through write in skills.
	
	this.disciplines = new D3calc.disciplineCollectionDAT("disciplines");
	this.magicSkills = new D3calc.skillCollectionDAT("magicSkills");
	this.spells = new D3calc.spellCollectionDAT("spells");
	
	this.inventory = new D3calc.inventorySetDAT("inventory");
	
	this.armor = new D3calc.armorDAT("armor");
	
	this.defense = new D3calc.defenseStatsDAT("defense");
	this.combatStats = new D3calc.combatStatsDAT("combatStats");
	
	this.masteries = new D3calc.masteryCollectionDAT("masteries");
	
	this.traitsHCs = new D3calc.traitHCSetDAT("traitsHCs");
	
	*/
}