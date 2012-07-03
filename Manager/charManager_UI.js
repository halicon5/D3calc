D3calc.charManagerUI = function(aCharManagerSVC, dispBox) {
	this.Manager = aCharManagerSVC;
	this.dispBox = document.getElementById(dispBox);

	this.elements = {}; // holds references to other UI objects.
	this.subUIs = {};
		
	this.form = this.initializeForm();
	this.initializeInterface();
	this.defineManagerFunctionMenu();

	this.subUIs.charGroupMenu = new D3calc.charGroupUI(this, this.Manager);
	
	this.elements.editorTabs = {};
	this.elements.editorPanels = {};
	this.defineTabsAndPanels("Editor", D3calc.panelTabsDef, D3calc.CSSname + "_TDcontent");

//	this.subUIs.attributesPanel = new D3calc.panelAttributesUI(this, this.Manager, this.elements.editorPanels["editAttribs"]);
	this.subUIs.characterPanel = new D3calc.panelCharacterUI(this, this.Manager, this.elements.editorPanels["editChar"]);
/*
this.subUIs.skillPanel = new D3calc.panelSkillsUI(this, this.Manager, this.elements.editorPanels["editSkills"]);
	this.subUIs.masteryPanel = new D3calc.panelMasteriesUI(this, this.Manager, this.elements.editorPanels["editMasteries"]);
	this.subUIs.magicPanel = new D3calc.panelMagicUI(this, this.Manager, this.elements.editorPanels["editMagic"]);
	this.subUIs.armorPanel = new D3calc.panelArmorUI(this, this.Manager, this.elements.editorPanels["editArmor"]);
	this.subUIs.weaponsPanel = new D3calc.panelWeaponsUI(this, this.Manager, this.elements.editorPanels["editWeapons"]);
	this.subUIs.traitHCsPanel = new D3calc.panelTraitHCsUI(this, this.Manager, this.elements.editorPanels["editTraitHCs"]);
	
	this.panelUIs = {};
	this.panelUIs.attributesPanel = this.subUIs.attributesPanel;
	this.panelUIs.characterPanel = this.subUIs.characterPanel;
	this.panelUIs.skillPanel = this.subUIs.skillPanel;
	this.panelUIs.masteryPanel = this.subUIs.masteryPanel;
	this.panelUIs.magicPanel = this.subUIs.magicPanel;
	this.panelUIs.armorPanel = this.subUIs.armorPanel;
	this.panelUIs.weaponsPanel = this.subUIs.weaponsPanel;
	this.panelUIs.traitHCsPanel = this.subUIs.traitHCsPanel;
	
	this.activePanel = this.subUIs.attributesPanel;
	this.activePopup = undefined;
*/	
	// not sure if this is useful
	for (var ui in this.subUIs) {
		this[ui + "UI"] = this.subUIs[ui];
	}
}

	D3calc.charManagerUI.prototype.updateDisplay = function() {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charManagerUI.prototype.updateDisplay = function()");
		if (this.Manager.activeChar) {
			for (var ui in this.panelUIs) {
				this.subUIs[ui].updateDisplay();
			}
		} 
		else {
			if (D3calc.debug) D3calc.log("[ERROR] D3calc.charManagerUI.prototype.updateDisplay = function() - No active character found.");
		}
	}

	/* the entire point of most of this is to programatically define the interface so this code can be dropped into almost any webpage */
	D3calc.charManagerUI.prototype.initializeForm = function () {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charManagerUI.prototype.initializeForm = function()");
		
		var f = document.getElementById(D3calc.formname);
		if ( !f ) {
			f = document.createElement("form");
			f.setAttribute("id", D3calc.formname);
			f.setAttribute("name", D3calc.formname);
			f.setAttribute("onsubmit", "return false;");
			f.setAttribute("method", "post");
			this.dispBox.appendChild(f);
		} 
		else {
			if (D3calc.debug) D3calc.log("[WARNING] D3calc.charManagerUI.prototype.initializeForm = function(): form " + D3calc.formname + " already exists.");	
		}
		
		return f;
	}


	D3calc.charManagerUI.prototype.initializeInterface = function() {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charManagerUI.prototype.initializeInterface = function()");
		if (!this.initialized) {
			this.defineFormShape();
			this.initialized = 1;
		}
		else {
			if (D3calc.debug) D3calc.log("[WARNING]: D3calc.charManagerUI.prototype.initializeInterface = function():  Interface alrady exists");
		}
	}



	D3calc.charManagerUI.prototype.defineFormShape = function() {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charManagerUI.prototype.defineFormShape = function()");
	
		// yeah, I'm using a table to hold non-tabular data. Big whoop, wanna' fight 'bout it?
		var table = document.createElement("table");
		var row = document.createElement("tr");
		var col1 = document.createElement("td");
		var col2 = document.createElement("td");

		this.elements.menuCol = col1;
		this.elements.contentCol = col2;

		table.setAttribute("id", D3calc.CSSname + "_TABLEskeleton");
		col1.setAttribute("valign", "top");
		col2.setAttribute("valign", "top");
		col1.setAttribute("id", D3calc.CSSname + "_TDsideMenus");
		col2.setAttribute("id", D3calc.CSSname + "_TDcontent");

		row.appendChild(col1);
		row.appendChild(col2);
		table.appendChild(row);
		this.form.appendChild(table);
	}

	D3calc.charManagerUI.prototype.defineManagerFunctionMenu = function() {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charManagerUI.prototype.defineManagerFunctionMenu = function()");

		var div;
		div = document.createElement("div");
		div.setAttribute("class", D3calc.CSSname + "leftMenu");

		var btnSave;
		btnSave = document.createElement("input");
		btnSave.setAttribute("type", "button");
		btnSave.setAttribute("value", "Save Manager Data");
		btnSave.setAttribute("onclick", "D3calc.Manager.saveManagerData()");

		var btnLoad;
		btnLoad = document.createElement("input");
		btnLoad.setAttribute("type", "button");
		btnLoad.setAttribute("value", "Load Manager Data");
		btnLoad.setAttribute("onclick", "D3calc.Manager.loadManagerData()");

		div.appendChild(btnSave);
		div.appendChild(btnLoad);
		this.elements.menuCol.appendChild(div);
	}



	D3calc.charManagerUI.prototype.defineTabsAndPanels = function(groupName, panelTabsArray, containerId) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charManagerUI.prototype.defineFormShape = function()");
		this.defineTabSet (groupName, panelTabsArray, containerId);
		this.definePanelSet (groupName, panelTabsArray, containerId);
	}



	D3calc.charManagerUI.prototype.defineTabSet = function(groupName, ptArray, containerId) {
		if(D3calc.debug) D3calc.log("[CALL]: D3calc.charManagerUI.prototype.defineTabs = function()");		
		var ul = document.createElement("ul");
		ul.setAttribute("id", D3calc.CSSname + groupName + "TabSet");
		ul.setAttribute("class", D3calc.CSSname + "TabSet");
		for (var i = 0; i < ptArray.length ; i++) {
			this.defineTab(ptArray[i].id, ptArray[i].label, ul, groupName);
		}
		ul.childNodes[0].className = ul.childNodes[0].className + ' activeTab'; 


		var container = document.getElementById(containerId);
		if (container) {
			container.appendChild(ul);
			if(D3calc.debug) D3calc.log("[FINISH]: D3calc.charManagerUI.prototype.defineTabSet = function()");		
		}
		else {
			if(D3calc.debug) D3calc.log("[ERROR]: D3calc.charManagerUI.prototype.defineTabSet = function(): " + containerId + " does not exist.");		
		}
	}


	D3calc.charManagerUI.prototype.defineTab = function(tabId, label, tabSet, groupName) {
		if(D3calc.debug) D3calc.log("[CALL]: D3calc.charManagerINT.prototype.defineTab = function(" + tabId + ")");		
		var li = document.createElement("li");
		li.setAttribute("id", D3calc.CSSname + tabId + "Tab");
		li.setAttribute("class", D3calc.CSSname + "NavTab");
		
		var a = document.createElement("a");
		a.setAttribute("id", D3calc.CSSname + tabId + "TabLink");
		a.setAttribute("onclick", "D3calc.switchTabs('" + tabSet.id + "', '" 
													+ D3calc.CSSname + groupName + "PanelSet', '" 
													+ li.id + "', '" + D3calc.CSSname + tabId +"Panel' ); this.CMUI.updateDisplay();");
		a.innerHTML = label;
		li.appendChild(a);

		if (tabSet) {
			tabSet.appendChild(li);
		}
		return li;
	}


	D3calc.charManagerUI.prototype.definePanelSet = function (groupName, ptArray, containerId) {
		if(D3calc.debug) D3calc.log("[CALL]: D3calc.charManagerUI.prototype.defineTabs = function()");		
		var div = document.createElement("div");
		div.setAttribute("id", D3calc.CSSname + groupName + "PanelSet");
		div.setAttribute("class", D3calc.CSSname + "PanelSet");
		
		for (var i = 0; i < ptArray.length ; i++) {
			this.elements.editorPanels[ ptArray[i].id ] = this.definePanel(ptArray[i].id + "Panel", ptArray[i].label, div);
			if (i == 0) div.firstChild.style.display = 'block';
		}

		var container = document.getElementById(containerId);
		if (container) {
			container.appendChild(div);
			if(D3calc.debug) D3calc.log("[FINISH]: D3calc.charManagerUI.prototype.definePanelSet = function()");		
		}
		else {
			if(D3calc.debug) D3calc.log("[ERROR]: D3calc.charManagerUI.prototype.definePanelSet = function(): " + containerId + " does not exist.");		
		}
	}


	D3calc.charManagerUI.prototype.definePanel= function(panelId, label, panelSet) {
		if(D3calc.debug) D3calc.log("CALL: D3calc.charManagerUI.prototype.definePanel = function(" + panelId + ")");		
		var div = document.createElement("div");
		div.setAttribute("id", D3calc.CSSname + panelId);
		div.setAttribute("class", D3calc.CSSname + "panel");
		div.style.display = 'none';
		
		var h4 = document.createElement("h4");
		h4.innerHTML =  label;		
		div.appendChild(h4);
		if (panelSet) {
			panelSet.appendChild(div);
		}
		return div;
	}