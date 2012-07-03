var D3calc = {
	"version": "20100730a",
	"formname": "D3calcInterface",
	"CSSname": "D3C",
	"displayBox": "D3CalcDisplay",
	"Manager": "Manager", // used to target the Manager object in dynamically generated onClick, onChange, and other objects.
	"debug":  true,
	"traceLog": "",
	"logCalls": 0,
	"panelTabsDef": new Array( 		{id: "editChar", label: "Character"},
									{id: "editSkills", label: "Skills"},
									{id: "editItems", label: "Items"}
									),
	"storageName": "kantiaCharManager"
}; 


	D3calc.log = function(msg) {
		this.logCalls++;
		this.traceLog = D3calc.logCalls.toString() + ": " + msg + "\n" + this.traceLog;
	}
	
	D3calc.clearLog = function() {
		this.traceLog = "";
	}
	
	D3calc.eval = function(cmd) {
		this.log(cmd);
		try {
			eval(cmd);
		} 
		catch (exception) {
			this.log(exception);
		}
	}
	

	D3calc.safe_name = function(str) {
		if (typeof str === "string") {
			return str.replace(/[\/, -\.\'\":]/g, "");
		} else {
			return str;
		}
	}
	
	D3calc.calc_AV = function(a) {
		if (isNaN(a)) {
			a = 0;
		}
		return 5 * parseInt(a,10);
	}

	// some shared library functions common throughout the entire application
	D3calc.getSign = function(value) {
		return (value > 0) ? "+" : "-";
	}
	
	/******************************************************
	User interface type functions	
	*/
	D3calc.switchTabs = function(tabSetId, panelSetId, tabId, panelId) {
		var ts = document.getElementById(tabSetId);
		var ps = document.getElementById(panelSetId);
		var t = document.getElementById(tabId);
		var p = document.getElementById(panelId);

		D3calc.log ("CALL: D3calc.switchTabs (" + tabSetId + ", " + panelSetId + ", " + tabId + ", " + panelId + ")");
		if (ts && ps && t && p) {
			for (var i = 0; i < ps.childNodes.length; i++) {
				ps.childNodes[i].style.display = 'none';
			}			
			p.style.display = 'block';
			
			for (var i = 0; i < ts.childNodes.length; i++) {
				ts.childNodes[i].className = ts.childNodes[i].className.replace( /activeTab/g, '');
				ts.childNodes[i].className = trim(ts.childNodes[i].className);
			}
			t.className = t.className + ' activeTab';
		}
		else {
			D3calc.log("ERROR:  D3calc.switchTabs = fucntion(): Either " + tabSetId + " or " + panelSetId + " does not exist.");
		}
	}
	
	
	D3calc.resetListItemClasses = function(id, classToClear) {
		var list = document.getElementById(id);
		var r = new RegExp("/" + classToClear + "/", "g");

		if (list) {
			for (var i = 0; i < list.childNodes.length; i++) {
				list.childNodes[i].className = list.childNodes[i].className.replace( classToClear, '');
				list.childNodes[i].className = trim(list.childNodes[i].className);
			}
		}
		else {
			D3calc.log("ERROR: D3calc.resetListItemClasses = function(" + id + ", " + classToClear + "): " + id + " not found.");
		}
	}

	D3calc.removeDescendents = function(node) {
		if (node && node.hasChildNodes() ) {
			while ( node.hasChildNodes() ) {
				D3calc.removeDescendents(node.firstChild);
				node.removeChild(node.firstChild);
			}
		}
	}

	D3calc.createPopupOverlay = function () {
		if ( !document.getElementById(this.CSSname + "popupOverlay") && document.getElementById(this.displayBox) ) {
			var overlay = document.createElement("div");
			overlay.setAttribute("class", this.CSSname + "popupOverlay");
			overlay.setAttribute("id", this.CSSname + "popupOverlay");
			document.getElementById(this.displayBox).appendChild(overlay);
		}
	}

	D3calc.removePopupOverlay = function () {
		if ( document.getElementById(this.CSSname + "popupOverlay") && document.getElementById(this.displayBox) ) {
			overlay = document.getElementById(this.CSSname + "popupOverlay");
			document.getElementById(this.displayBox).removeChild(overlay);
		}	
	}

	/*
	Service cleanup functions
	*/
	D3calc.destroy = function() {
		if (D3calc.debug) D3calc.log("[DESTROY]" + this.CMCLASSNAME + " " + this.CMOBJNAME);
		this.destroyFlag = 1;
		for (var svc in this) {
			if (this[svc].destroy && typeof this[svc].destroy == "function" && !this[svc].destroyFlag) {
				this[svc].destroy();
				delete this[svc];
			}
		}	
	}



	/*
	Configuration functions
	*/
	D3calc.createListByGroup = function(objectSet, assignIndex, groupIndex, groupKey, subGroupIndex, subGroupKey) {
		var a = new Array();
		var i = 0;
		if (subGroupIndex && subGroupKey) {
			for (var obj in objectSet) {
				if (objectSet[obj][groupIndex] && objectSet[obj][assignIndex] && objectSet[obj][groupIndex] == groupKey 
					&& objectSet[obj][subGroupIndex] && objectSet[obj][subGroupIndex] == subGroupKey) {
					a[i++] = objectSet[obj][assignIndex];
				}
			}
		}
		else {
			for (var obj in objectSet) {
				if (objectSet[obj][groupIndex] && objectSet[obj][assignIndex] && objectSet[obj][groupIndex] == groupKey) {
					a[i++] = objectSet[obj][assignIndex];
				}
			}
		}	
		
		a.sort();
		return a;
	}
	
	D3calc.createBitHash = function(a) {
		var hash = {};
		if (a && a.constructor === Array) {
			for (var i = 0; i < a.length; i++) {
				hash[a[i]] = 1;
			}
		}
		return hash;
	}

	D3calc.createAttributeSkillList = function(indexList, source, target) {
		for (var i = 0; i < indexList.length; i++) {
			target[indexList[i]] = {};
			for (var sk in source) {
				for (var j = 1; j <= 4; j++) {
					if (source[sk]["att" + j]) {
						if (source[sk]["att" + j] == indexList[i]) {
							target[indexList[i]][sk] = true;
						}
					}
					else {
						break;
					}
				}
			}
		}	
	}

	D3calc.extend = function(child, parent) {
		var f = function() {};
		f.prototype = parent.prototype
		child.prototype = new f();
	}

	D3calc.shallowMerge = function(p, c) {
		if (typeof c === "object") {
			for (var i in p) {
				if (typeof p[i] !== "object") {
					c[i] = p[i];
				}
			}
		}
	}

	D3calc.deepCopy = function(p, c) {
		var c = c || {};
		for (var i in p) {
			if (p[i] === null) {
				c[i] = p[i];
			}
			else if (typeof p[i] === 'object') {
				c[i] = (p[i].constructor === Array) ? [] : {}; // array or object
				D3calc.deepCopy(p[i], c[i]);
			} else {
				c[i] = p[i];
			}
		}
		return c;
	}
	
	
function addSlashes(str) {
str=str.replace(/\\/g,'\\\\');
str=str.replace(/\'/g,'\\\'');
str=str.replace(/\"/g,'\\"');
str=str.replace(/\0/g,'\\0');
return str;
}
function stripSlashes(str) {
str=str.replace(/\\'/g,'\'');
str=str.replace(/\\"/g,'"');
str=str.replace(/\\0/g,'\0');
str=str.replace(/\\\\/g,'\\');
return str;
}	
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}

function appendChildren() {
	if (arguments[0] && arguments[0].appendChild) {
		var n = undefined;
		for (i = 1; i < arguments.length; i++) {
			if (arguments[i] === "\n") {
				n = document.createElement("br");
				arguments[0].appendChild(n);
				n = undefined;
			}
			else if (typeof arguments[i] == "string" || typeof arguments[i] == "number") {
				n = document.createTextNode(arguments[i]);
				arguments[0].appendChild(n);
				n = undefined;
			} else {
				arguments[0].appendChild(arguments[i]);
			}
		}
	}
}

function createSuperElement () {
	if (typeof arguments[0] === "string") {
		var el = document.createElement(arguments[0]);
		for (var i = 1; i < arguments.length; i++) {
			if (arguments[i].constructor == Array && arguments[i].length > 1) {
				if (arguments[i][0] == "innerHTML") {
					el.innerHTML = arguments[i][1];
				}
				else {
					el.setAttribute(arguments[i][0], arguments[i][1]);				
				}
			}
		}
		return el;
	}
}
