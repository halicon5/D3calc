D3calc.calculatedStatsDAT = function() {
	this.STR = D3calc.calculatedStatsGroupDAT("STR");
	this.DEX = D3calc.calculatedStatsGroupDAT("DEX");
	this.INT = D3calc.calculatedStatsGroupDAT("INT");
	this.VIT = D3calc.calculatedStatsGroupDAT("VIT");

	// offense
	this.primStatBonus = D3calc.calculatedStatsGroupDAT("primStatBonus");
	this.skillDamaageBonus = D3calc.calculatedStatsGroupDAT("skillDamageBonus");
	this.attSpeed = D3calc.calculatedStatsGroupDAT("attSpeed");
	this.critChance = D3calc.calculatedStatsGroupDAT("critChance");
	this.critDam	= D3calc.calculatedStatsGroupDAT("critDam");
	this.minDam		= D3calc.calculatedStatsGroupDAT("minDam");
	this.maxDam		= D3calc.calculatedStatsGroupDAT("maxDam");
	this.DPS		= D3calc.calculatedStatsGroupDAT("DPS");
	
	// defense
	this.armor	= D3calc.calculatedStatsGroupDAT("armor");
	this.blockAmount = D3calc.calculatedStatsGroupDAT("blockAmount");
	this.blockChance = D3calc.calculatedStatsGroupDAT("blockChance");
	this.dodgeChance = D3calc.calculatedStatsGroupDAT("dodgeChance");
	this.damRedux = D3calc.calculatedStatsGroupDAT("damRedux");
	
	this.resistAll = D3calc.calculatedStatsGroupDAT("resistAll");
	this.resistPhys = D3calc.calculatedStatsGroupDAT("resistPhys");
	this.resistCold = D3calc.calculatedStatsGroupDAT("resistCold");
	this.resistFire = D3calc.calculatedStatsGroupDAT("resistFire");
	this.resistElec = D3calc.calculatedStatsGroupDAT("resistElec");
	this.resistPoison = D3calc.calculatedStatsGroupDAT("resistPois");
	this.resistArcane = D3calc.calculatedStatsGroupDAT("resistArca");
	
	this.crowdControlRedux = D3calc.calculatedStatsGroupDAT("crowdControlRedux");
	this.missileDamRedux = D3calc.calculatedStatsGroupDAT("missileDamRedux");
	this.meleeDamRedux = D3calc.calculatedStatsGroupDAT("meleeDamRedux");
	this.thorns = D3calc.calculatedStatsGroupDAT("thorns");
	this.effectiveHP = D3calc.calculatedStatsGroupDAT("effectiveHP");
	this.unrelEffectiveHP = D3calc.calculatedStatsGroupDAT("unrelEffectiveHP");


	this.maxLife = D3calc.calculatedStatsGroupDAT("maxLife");
	this.lifeBonus = D3calc.calculatedStatsGroupDAT("lifeBonus");
	this.lifePerSec = D3calc.calculatedStatsGroupDAT("lifePerSec");
	this.lifeSteal = D3calc.calculatedStatsGroupDAT("lifeSteal");
	this.lifePerKill = D3calc.calculatedStatsGroupDAT("lifePerKill");
	this.lifePerHit = D3calc.calculatedStatsGroupDAT("lifePerHit");
	this.healthGlobe = D3calc.calculatedStatsGroupDAT("healthGlobe");
	this.pickupRadius = D3calc.calculatedStatsGroupDAT("pickupRadius");
	this.lifePerCombatSecond = D3calc.calculatedStatsGroupDAT("lifePerCombatSecond");
	
	this.moveSpeed = D3calc.calculatedStatsGroupDAT("maxSpeed");
	this.goldFind = D3calc.calculatedStatsGroupDAT("goldFind");
	this.magicFind = D3calc.calculatedStatsGroupDAT("magicFind");
	this.bonusXP = D3calc.calculatedStatsGroupDAT("bonusXP");
	this.bonusXPperKill = D3calc.calculatedStatsGroupDAT("bonusXPperKill");
	
}


D3calc.calculatedStatsGroupDAT = function(grp, aCalcType) {
	this.name = grp;
	this.calcType = (!aCalcType) ? 'Standard' : aCalcType;
	this.base = 0;
	this.mod = 0;
	this.mult = 1;
	this.tot = 0;
}