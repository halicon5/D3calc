D3calc.charProfUI = function(aUI, aManager, div) {
	this.Manager = aManager;
	this.UI	= aUI;
	this.dispBox = div;

	this.subUIs = {};
	this.elements = {};
	
	this.defineSelectBox();
	this.defineOptionList();
	
	this.defineLevelSelectBox();
	this.defineLevelOptions();

	for (var ui in this.subUIs) {
		this[ui + "UI"] = this.subUIs[ui];
	}

}


	D3calc.charProfUI.prototype.updateDisplay = function() {
	
	}
	
	
	D3calc.charProfUI.prototype.defineSelectBox = function() {
		var lab = document.createElement("label");
		lab.setAttribute("for", D3calc.CSSname + "_SELprof");
		lab.innerHTML = 'Class: ';
		
		var sel = document.createElement("select");
		sel.CMUI = this;
		sel.setAttribute("id", D3calc.CSSname + "_SELprof");
		sel.setAttribute("name", D3calc.formname + "_SELprof");
		sel.setAttribute("onchange", "this.CMUI.setProf();");
	
		this.elements.profSelect = sel;
		
		this.dispBox.appendChild(lab);
		this.dispBox.appendChild(sel);
	}
	
	
	D3calc.charProfUI.prototype.defineOptionList = function() {
		var opt = undefined;
		for (var i = 0; i < D3Defs.profOrder.length; i++) {
			var val = D3Defs.profOrder[i].name;
			opt = document.createElement("option");
			opt.setAttribute("value", val);
			opt.setAttribute("label", val);
			opt.text = val;
			this.elements.profSelect.appendChild(opt);
		}
	}
	
	D3calc.charProfUI.prototype.defineLevelSelectBox = function() {
		var lab = document.createElement("label");
		lab.setAttribute("for", D3calc.CSSname + "_SELlevel");
		lab.innerHTML = 'Level: ';
		
		var sel = document.createElement("select");
//		sel.setAttribute("id", D3calc.CSSname + "_SELlevel");
		sel.CMUI = this;
		sel.setAttribute("name", D3calc.formname + "_SELprof");
		sel.setAttribute("onchange", "this.CMUI.setLevel();");
	
		this.elements.levelSelect = sel;
		
		this.dispBox.appendChild(lab);
		this.dispBox.appendChild(sel);	
	}

	D3calc.charProfUI.prototype.defineLevelOptions = function() {
		var opt = undefined;
		for (var i = 1; i <= D3Defs.maxProfLevel; i++) {
			opt = document.createElement("option");
			opt.setAttribute("value", i);
			opt.setAttribute("label", i);
			opt.text = i;
			this.elements.levelSelect.appendChild(opt);
		}	
	}
	
	D3calc.charProfUI.prototype.setProf = function() {
		this.Manager.activeChar.prof.setProf(this.elements.profSelect.value);
	}
	
	D3calc.charProfUI.prototype.setLevel = function() {
		this.Manager.activeChar.prof.setLevel(this.elements.levelSelect.value);
	}