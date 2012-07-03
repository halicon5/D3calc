D3calc.gearSetDAT = function(aSetName, aApplyTo) {
	this.setName 	= aSetName;
	this.applyTo	= aApplyTo;
	
	this.helm 		= new D3calc.gearSlotDAT("helm");
	this.shoulder	= new D3calc.gearSlotDAT("shoulder");
	this.amulet		= new D3calc.gearSlotDAT("amulet");

	this.gloves		= new D3calc.gearSlotDAT("gloves");
	this.chest		= new D3calc.gearSlotDAT("chest");
	this.bracers	= new D3calc.gearSlotDAT("bracers");
	
	this.belt		= new D3calc.gearSlotDAT("belt");
	this.ringLeft	= new D3calc.gearSlotDAT("left ring");
	this.ringRight	= new D3calc.gearSlotDAT("right ring");
	
	this.pants		= new D3calc.gearSlotDAT("pants");
	this.boots		= new D3calc.gearSlotDAT("boots");
	
	this.primary	= new D3calc.gearSlotDAT("primary");
	this.secondary	= new D3calc.gearSlotDAT("secondary");
}