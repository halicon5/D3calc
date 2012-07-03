D3calc.attributeSetSVC = function(aAttributeSetDAT, aCharSVC) {
	this.d = aAttributeSetDAT;
	this.parChar = aCharSVC;
	
    this.STR = new D3calc.attributeSVC(this.d.STR);
    this.DEX = new D3calc.attributeSVC(this.d.DEX);
    this.INT = new D3calc.attributeSVC(this.d.INT);
    this.VIT = new D3calc.attributeSVC(this.d.VIT);

	this.CMCLASSNAME = "D3calc.attributeSetSVC";
}

	D3calc.attributeSetSVC.prototype.destroy = D3calc.destroy;
	
	D3calc.attributeSetSVC.prototype.update = function() {
		if (D3calc.debug) D3calc.log("CALL D3calc.attributeSetSVC.prototype.update = function()");

        this.STR.update();
        this.DEX.update();
        this.INT.update();
        this.VIT.update();
	}