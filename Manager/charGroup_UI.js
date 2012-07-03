D3calc.charGroupUI = function(aUI, aManager) {
	this.UI = aUI;
	this.Manager = aManager;
	
	this.elements = {};
//	this.elements.groupsDiv = this.defineMenuDiv("charGroupOpts", "Groups");
//	this.elements.groupsList = this.defineMenuList("charGroupOpts", this.elements.groupsDiv);

//	this.defineTextInput("newCharGroup", "Create New Group", this.elements.groupsDiv, "D3calc.Manager.createNewCharGroup");
	this.Manager.createNewCharGroup("CharList");
	
	this.elements.charsDiv = this.defineMenuDiv("charOpts", "Characters");
	this.elements.charsList = this.defineMenuList("charOpts", this.elements.charsDiv);

	this.defineTextInput("newChar", "Create New Character", this.elements.charsDiv, "D3calc.Manager.addNewCharToActiveGroup");

	
}

	D3calc.charGroupUI.prototype.defineMenuDiv = function(name, label) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charGroupUI.prototype.defineMenuDiv = function(" + name + ", " + label + ")");
		var container = document.getElementById(D3calc.CSSname + "_TDsideMenus");
		var div; 
		var head;
		var ul;
		
		div = document.createElement("div");
		div.setAttribute("id", D3calc.CSSname + "_DIV" + name + "Menu");
		div.setAttribute("class", D3calc.CSSname + "leftMenu");

		head = document.createElement("h4");
		head.innerHTML = label;

		container.appendChild(div);
		div.appendChild(head);
	
		return div;
	}
	
	
	D3calc.charGroupUI.prototype.defineMenuList = function(name, parDiv) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charGroupUI.prototype.defineMenuList = function(" + name + ", parDiv)");
		var ul;
		
		ul = document.createElement("ul");
		ul.setAttribute("id", D3calc.CSSname + "_UL" + name + "Menu");
		ul.setAttribute("class", D3calc.CSSname + "leftMenu");

		parDiv.appendChild(ul);	
		return ul;
	}
	
	
	D3calc.charGroupUI.prototype.defineCharGroupMenu = function() {
		// create the form to create new groups
		D3calc.log("CALL: D3calc.charManagerINT.prototype.defineCharGroupMenu = function()");		
		var cgMenu = document.getElementById(D3calc.CSSname + "_DIVgroupMenu");
		
		if (cgMenu) {
			var div = document.createElement("div");
			div.setAttribute("id", D3calc.CSSname + "NewGroupRow");
		
			var inp = document.createElement("input");
			inp.setAttribute("id", D3calc.formname + "_NewCharGroupName");
			inp.setAttribute("name", D3calc.formname + "_NewCharGroupName");

			var btn = document.createElement("input");
			btn.setAttribute("type", "button");
			btn.setAttribute("value", "Create New Group");
			btn.setAttribute("onclick", "D3calc.Manager.createNewCharGroup(document.forms['" + D3calc.formname + "'].elements['" + D3calc.formname + "_NewCharGroupName'].value); document.getElementById('" + inp.id + "').value = '';");

			cgMenu.appendChild(div);
			div.appendChild(inp);
			div.appendChild(btn);
		} 
		else {
			D3calc.log("ERROR: D3calc.charManagerINT.prototype.defineCharGroupMenu = function() " + D3calc.CSSname + "_DIVgroupMenu does not exist");		
		}
	}


	D3calc.charGroupUI.prototype.defineTextInput = function(name, label, container, func) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charGroupUI.prototype.defineTextInput = function(" + name + ", " + label + ", container)");
		
		var div = document.createElement("div");
		div.setAttribute("id", D3calc.CSSname + "_DIV" + name + "Row");
		
		var inp = document.createElement("input");
		inp.setAttribute("id", D3calc.formname + "_TXT" + name);
		inp.setAttribute("name", D3calc.formname + "_TXT" + name);
		inp.setAttribute("size", 30);

		var btn = document.createElement("input");
		btn.setAttribute("type", "button");
		btn.setAttribute("value", label);
		btn.setAttribute("onclick", func + "(document.forms['" + D3calc.formname + "'].elements['" + inp.name + "'].value); document.getElementById('" + inp.id + "').value = '';");
		
		container.appendChild(div);
		div.appendChild(inp);	
		div.appendChild(btn);
		return inp;
	}




	D3calc.charGroupUI.prototype.updateMenuDisplay = function(grp, aList, aListOpts, activeItem, func) {
		if (D3calc.debug) D3calc.log("CALL: D3calc.charGroupUI.prototype.updateMenuDisplay = function()");
		var radioId = "";
		var radioName = "";
		var liId = "";
		
		var li = undefined;
		var radio = undefined;
		D3calc.resetListItemClasses(aList.id, "activeSelection");
		for (var opt in aListOpts) {
			if (aListOpts[opt].name) {
				radioId = D3calc.formname + "_RADIO" + grp + "_" + D3calc.safe_name(aListOpts[opt].name);
				radioName = D3calc.formname + "_RADIO" + grp;
				liId = D3calc.CSSname + "_LI" + grp + "_" + D3calc.safe_name(aListOpts[opt].name);
				
				li = document.getElementById(liId);
				radio = document.getElementById(radioId);
				
				if ( radio ) {
					if ( li ) {
						if (aListOpts[opt].name == activeItem.name) {
							li.className += " activeSelection";
							radio.checked = true;
						}
					}
				}
				else {
					this.createMenuOption(grp, aListOpts[opt], aList, func);
					li = document.getElementById(liId);
					radio = document.getElementById(radioId);
					if (aListOpts[opt].name == activeItem.name) {
						li.className += " activeSelection";
						radio.checked = true;
					}
				}
			}
		}
	}
	
	
	D3calc.charGroupUI.prototype.createMenuOption = function(grp, opt, aList, func) {
		if (D3calc.debug) D3calc.log("CALL: D3calc.charGroupUI.prototype.createMenuOption = function(" + grp + ", " + opt.name + ", " + aList.id + ", " + func +")");
		var radioId = D3calc.formname + "_RADIO" + grp + "_" + D3calc.safe_name(opt.name);
		var radioName = D3calc.formname + "_RADIO" + grp;

		var liId = D3calc.CSSname + "_LI" + grp + "_" + D3calc.safe_name(opt.name);

		var radio = document.createElement("input");
		radio.setAttribute("type", "radio");
		radio.setAttribute("id", radioId);
		radio.setAttribute("name", radioName);
		radio.setAttribute("value", opt.name);
		radio.setAttribute("onChange", "D3calc.Manager." + func + "(\"" + opt.name + "\");");
		var li = document.createElement("li");
		li.setAttribute("id", liId);
		li.setAttribute("class", "LI" + grp);
		li.appendChild(radio);

		var label = document.createElement("label");
		label.setAttribute("for", radioId);
		label.innerHTML = opt.name;

		li.appendChild(label);
		
		aList.appendChild(li);
	}
	
	D3calc.charGroupUI.prototype.clearCharList = function(ul) {
		if (ul) {
			while (ul.hasChildNodes()) {
				while(ul.lastChild.hasChildNodes()) {
					ul.lastChild.removeChild(ul.lastChild.lastChild);
				}
				ul.removeChild(ul.lastChild);
			}
		}
	}
