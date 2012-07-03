D3calc.charManagerSVC = function(aManDAT, aDispBoxId) {
	this.mandat = aManDAT;
	this.charGroup = undefined;
	this.activeChar = undefined;
	this.UI = new D3calc.charManagerUI (this, aDispBoxId);
	
	this.callStack = null;
	
	D3calc.Manager = this;  // unecessary but makes code interpretation cleaner insetad of using "this" soup
	
	this.CMCLASSNAME = "D3calc.charManagerSVC";	

	this.firstLoad();
};



	D3calc.charManagerSVC.prototype.refreshData = function (channel, param, trigger) {
		D3calc.log("[START] D3calc.charManagerSVC.prototype.refreshData = function ( " + channel + ", " + param + ", " + trigger + ")");

		if (!this.callStack) {
			this.callStack = new D3calc.calculationStack(channel, param, trigger);
		}

		if ( this.callStack.checkAgainstStackCalls(channel, param) ) {
			if (D3calc.debug) D3calc.log("[ERROR] D3calc.charManagerSVC.prototype.refreshData = function ( " + channel + ", " + param + "): Callstack collision. Dude... that sucks. Hope you have insurance.");
			return;
		}

		var tok = this.callStack.addNewCall(channel, param);		

		if (D3calc.calculationFlow[channel]) {
			for (var i=0; i<D3calc.calculationFlow[channel].length; i++) {
				var func = this.fetchDataUpdateMethod(D3calc.calculationFlow[channel][i]);
				var command = "";
				var pathArray = D3calc.calculationFlow[channel][i].split(".");
				command = pathArray[pathArray.length-1];
				if (func[command]) {
					func[command](param);	
					D3calc.log ("[EXECUTE] " + D3calc.calculationFlow[channel][i] );
				}
				else {
					if (D3calc.debug) D3calc.log("[ERROR] D3calc.charManagerSVC.prototype.refreshData = function ( " + channel + ", " + param + "): Channel does not exist on Active Character. Abort update.");				
				}
			}
		}
		else {
			if (D3calc.debug) D3calc.log("[ERROR] D3calc.charManagerSVC.prototype.refreshData = function ( " + channel + ", " + param + "): Channel does not exist in D3calc.calculationFlow. Abort update.");				
		}
		
		if (tok == this.callStack.token) {
			// ok, we know the original call has come home.  Kill the stack!
			this.flushCallStack();
			this.UI.activePanel.updateDisplay();
			if (D3calc.debug) D3calc.log("[FINISH] D3calc.charManagerSVC.prototype.refreshData = function ( " + channel + ", " + param + ")");
		}		
	}


	D3calc.charManagerSVC.prototype.flushCallStack = function() {
		D3calc.log("[CALL] D3calc.charManagerSVC.prototype.flushCallStack = function ()");

		this.callStack = null;
	}


	D3calc.charManagerSVC.prototype.fetchDataUpdateMethod = function(objectMap) {
		D3calc.log("[CALL] D3calc.charManagerSVC.prototype.fetchDataUpdateMethod = function ( " + objectMap + ")");
		var pathArray = objectMap.split(".");
		var func = false;
		
		if (pathArray.length > 0) {
			var i = pathArray.length;
			pathArray.reverse();
			var func = this.getUpdateFunction(this.activeChar, pathArray, i);
			return func;
		}
	}
	
	D3calc.charManagerSVC.prototype.getUpdateFunction = function(obj, pathArray, index) {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charManagerSVC.prototype.getUpdateFunction = function ( obj, [" + pathArray + "], " + index + ")");
		index--;
		if (index == 0) {
			return obj;
		}
		else if (obj[pathArray[index]]) {
			var func = obj[pathArray[index]];
			return this.getUpdateFunction(func, pathArray, index);
		}
		else {
			if (D3calc.debug) D3calc.log("[ERROR] D3calc.charManagerSVC.prototype.getUpdateFunction = function ( obj, [" + pathArray + "], " + index + "): Path does not exist on object.");
			return false;
		}
	}
	

	
	
	D3calc.charManagerSVC.prototype.createNewCharGroup = function(aGroupName) {
		if (D3calc.debug) D3calc.log("CALL D3calc.charManagerSVC.prototype.createNewCharGroup = function(" + aGroupName +")");	
//		alert('test');
//		if (!this.mandat.charGroup) {
			this.mandat.charGroup = new D3calc.charGroupDAT(trim(aGroupName));
			this.charGroup = this.mandat.charGroup;
//		} 
//		else {
//			D3calc.log ("ERROR (D3calc.charManagerSVC.prototype.createNewCharGroup): Group already exists.");
//		}
	}
	
	
	D3calc.charManagerSVC.prototype.addNewCharToActiveGroup = function(aCharName) {
		if (D3calc.debug) D3calc.log("CALL D3calc.charManagerSVC.prototype.addNewCharToActiveGroup = function(" + aCharName +")");	

		if (this.charGroup.characters && !this.charGroup.characters[aCharName]) {
			this.charGroup.characters[aCharName] = new D3calc.charDAT(aCharName);
			this.setActiveChar(aCharName);
		} 
		else {
			D3calc.log("ERROR (D3calc.charManagerSVC.prototype.addNewCharToGroup): activeGroup does not exist or aCharName already exists.");
		}
		
		this.setActiveChar(aCharName);
	}
	
	
	
	D3calc.charManagerSVC.prototype.setActiveChar = function(aCharName) {
		if (D3calc.debug) D3calc.log("CALL D3calc.charManagerSVC.prototype.setActiveChar = function(" + aCharName +")");	
		
		if (this.activeChar && this.activeChar.destroy) {
			this.activeChar.destroy();
		}
		
		this.activeChar = undefined;
		if (this.charGroup && this.charGroup.characters[aCharName]) {
			this.activeChar = new D3calc.charSVC(this.charGroup.characters[aCharName]);
			this.UI.subUIs.charGroupMenu.updateMenuDisplay("charOpts", this.UI.subUIs.charGroupMenu.elements.charsList, this.charGroup.characters, this.activeChar.d, "setActiveChar");
			this.UI.updateDisplay();
		} 
		else {
			D3calc.log( "ERROR (D3calc.charManagerSVC.prototype.setActiveChar): Character not found in group.");
		}
	}
	
	
	
	D3calc.charManagerSVC.prototype.saveManagerData = function() {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charMangerSVC.prototype.saveManagerData = function()");
		if(JSON && localStorage) {
			localStorage.setItem(D3calc.storageName,JSON.stringify(this.mandat));
		} 
		else {
			alert("[ERROR] (D3calc.charManagerSVC.prototype.saveManagerData): JSON or localStorage is not available.");
		}
	}
	
	D3calc.charManagerSVC.prototype.loadManagerData = function() {
		if (D3calc.debug) D3calc.log("[CALL] D3calc.charMangerSVC.prototype.loadManagerData = function()");
			
		if(JSON && localStorage) {
			if(localStorage.getItem(D3calc.storageName)) {
				this.mandat = JSON.parse(localStorage.getItem(D3calc.storageName));
				if (this.mandat.version && this.mandat.version != D3calc.version) {
					alert("You are loading data from a different version of the character manager!  That's kind of a \"not good\" thing and means some features are not present or simply will not work!  Really, the best thing you can do is rebuild your characters from scratch.");
				}
				this.refreshMenus();
			}
		} 
		else {
			alert("ERROR (D3calc.charManagerSVC.prototype.loadMangerData: JSON or localStorage is not available.");
		}
	}
	
	D3calc.charManagerSVC.prototype.firstLoad = function() {
		if(JSON && localStorage) {
			if(localStorage.getItem(D3calc.storageName)) {
				var d = null;
				d = JSON.parse(localStorage.getItem(D3calc.storageName));
				if (d) {
					if (confirm("Would you like to load existing stored data?") ) {
						this.loadManagerData();
					}
				}
			}
		}
		else {
			alert("ERROR (D3calc.charManagerSVC.prototype.firstLoad: JSON or localStorage is not available.");
		}
	
	}
	
	D3calc.charManagerSVC.prototype.refreshMenus = function () {
		if (this.mandat.charGroup) {
			for (var grp in this.mandat.charGroup) {
				for (var ch in this.mandat.charGroup.characters) {
					this.setActiveChar(this.mandat.charGroup.characters[ch].name);
					break;
				}
				break;
			}
		}
	}