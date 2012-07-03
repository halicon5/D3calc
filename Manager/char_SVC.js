D3calc.charSVC = function(aCharDAT) {
	this.d = aCharDAT;
	
	this.prof = new D3calc.charProfSVC(this.d.prof, this);
	
	//this.attributes = new D3calc.attributeSetSVC(this.d.attributes, this);

	this.calcStats1 = new D3calc.calculatedStatsSVC(this.d.calcStats1, this);
	this.calcStats2 = new D3calc.calculatedStatsSVC(this.d.calcStats2, this);
	this.calcStats3 = new D3calc.calculatedStatsSVC(this.d.calcStats3, this);
	
	this.gearSet1 = new D3calc.gearSetSVC(this.d.gearSet1, this);
	this.gearSet2 = new D3calc.gearSetSVC(this.d.gearSet2, this);
	this.gearSet3 = new D3calc.gearSetSVC(this.d.gearSet3, this);
/*
	
	this.skills = new D3calc.skillCollectionSVC(this.d.skills, this, {"common":1, "physical":1, "social":1, "common combat":1});
	
	this.disciplines = new D3calc.disciplineCollectionSVC(this.d.disciplines, this, {} )

	// magic skills is its own collection but otherwise acts exactly like a skill without exception
	this.magicSkills = new D3calc.skillCollectionSVC(this.d.magicSkills, this, {}, true );
		this.magicSkills.defs = kantiaDefs.magicSkillDefs;
		this.magicSkills.attSkills = kantiaDefs.attributeMagicSkills;
		this.magicSkills.groups = kantiaDefs.magicGroups;
		this.magicSkills.initialize();

	this.spells = new D3calc.spellCollectionSVC(this.d.spells, this, {});

	this.inventory = new D3calc.inventorySetSVC(this.d.inventory, this);
	
	this.armor = new D3calc.armorSVC(this.d.armor, this, this.d.inventory);
	
	this.defense = new D3calc.defenseStatsSVC( this.d.defense, this);
	
	this.combatStats = new D3calc.combatStatsSVC ( this.d.combatStats, this, this.d.inventory);

	this.masteries = new D3calc.masteryCollectionSVC (this.d.masteries, this);	
	
	this.traitsHCs = new D3calc.traitHCSetSVC (this.d.traitsHCs, this);
	// modifiers must be last, all other objects must initialize first
	this.modifiers = new D3calc.charModifiersSVC(this.d.modifiers, this);
	
*/
	this.CMCLASSNAME = "D3calc.charSVC";
	this.CMOBJNAME = this.d.name;
	
	this.initialize();
}

	D3calc.charSVC.prototype.initialize = function() {
	}

	D3calc.charSVC.prototype.setProf = function(profName) {
		this.prof.setProf(profName);
	}

	D3calc.charSVC.prototype.setLevel = function(aLevel) {
		this.prof.setLevel(aLevel);
	}
	
	D3calc.charSVC.prototype.destroy = D3calc.destroy;