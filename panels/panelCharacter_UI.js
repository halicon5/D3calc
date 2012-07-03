D3calc.panelCharacterUI = function(aUI, aManager, panel) {
	this.UI = aUI;
	this.Manager = aManager;
	this.panel = panel;
	this.elements = {};
	this.subUIs = {};

	
	this.drawProfSelectionBox();
	this.drawLevelSelectBox();

	this.subUIs.charProf = new D3calc.charProfUI(aUI, aManager, this.elements.charProfBox);

	this.tabLink = document.getElementById(D3calc.CSSname + "editCharTabLink");
	if (this.tabLink) {
		this.tabLink.CMUI = this;
	}
}


	D3calc.panelCharacterUI.prototype.updateDisplay = function() {
	
	}
	
	D3calc.panelCharacterUI.prototype.drawLevelSelectBox = function() {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.panelCharacterUI.prototype.drawLevelSelectionBox = function ()");
		
		var div = document.createElement("div");
		div.setAttribute("id", D3calc.CSSname + "_DIVeditCharLevel");
		div.setAttribute("class", D3calc.CSSname + "editorGroup");
				
		this.panel.appendChild(div);

		this.elements.charProfBox = div;	
	}
	
	D3calc.panelCharacterUI.prototype.drawProfSelectionBox = function() {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.panelCharacterUI.prototype.drawProfSelectionBox = function ()");
		
		var div = document.createElement("div");
		div.setAttribute("id", D3calc.CSSname + "_DIVeditCharProf");
		div.setAttribute("class", D3calc.CSSname + "editorGroup");
				
		this.panel.appendChild(div);

		this.elements.charProfBox = div;
	}
	
	
	D3calc.panelCharacterUI.prototype.drawCharDetailsBox = function() {

	}