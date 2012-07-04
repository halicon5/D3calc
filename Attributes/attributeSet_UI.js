D3calc.attributeSetUI = function(aUI, aManager, div, ul) {
	this.Manager = aManager;
	this.UI	= aUI;
	this.dispBox = div;
	this.attribList = ul;
	
	this.elements = {};
	this.subUIs = {};

	this.drawHeader();
	this.defineAttributeSetFields();

	for (var ui in this.subUIs) {
		this[ui + "UI"] = this.subUIs[ui];
	}

}

	D3calc.attributeSetUI.prototype.updateDisplay = function () {
		for (var ui in this.subUIs) {
			this.subUIs[ui].updateDisplay();
		}
	}

	D3calc.attributeSetUI.prototype.defineAttributeSetFields = function() {
		if (D3calc.debug) D3calc.log ("D3calc.attributeUI.prototype.defineAttributeSetFields = fucntion()");
		for (var i = 0; i < D3Defs.attributeOrder.length; i++) {

			this.subUIs[D3Defs.attributeOrder[i]] = new D3calc.attributeUI(this.UI, this.Manager, D3Defs.attributeOrder[i], this.attribList);
		}
	}
	
	D3calc.attributeSetUI.prototype.drawHeader = function() {
		var li = document.createElement("li");
		li.setAttribute("id", D3calc.CSSname + "_LIattributesHeader");
		li.setAttribute("class", D3calc.CSSname + "header " + D3calc.CSSname + "attributeSetRow");
				
		var div = document.createElement("div");
		div.setAttribute("class", D3calc.CSSname + "COLattribName");
		div.innerHTML = "Attributes";

		this.attribList.appendChild(li);
		li.appendChild(div);
		
		div = document.createElement("div");
		div.setAttribute("class", D3calc.CSSname + "COLattribRank");
		div.innerHTML = "Rank";
		li.appendChild(div);

		div = document.createElement("div");
		div.innerHTML = "Tot Rank";
		li.appendChild(div);

		div = document.createElement("div");
		div.innerHTML = "AV";
		li.appendChild(div);

		div = document.createElement("div");
		div.innerHTML = "adj.";
		li.appendChild(div);
	}