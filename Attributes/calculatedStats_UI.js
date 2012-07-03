D3calc.calculatedStatsUI = function(aUI, aManager, div) {
	this.Manager = aManager;
	this.UI	= aUI;
	this.dispBox = div;
	this.statsList = undefined;
	this.healingRates = undefined;

	this.elements = {};
	this.subUIs = {};

	// a bunch of direct references to the divs 
	this.HP = {};
	this.HP.base = undefined;
	this.HP.mod = undefined;
	this.HP.tot = undefined;

	this.HP.BP = {};
	this.HP.BP.base = undefined;
	this.HP.BP.mod = undefined;
	this.HP.BP.tot = undefined;
	
	this.HP.WP = {};
	this.HP.WP.base = undefined;
	this.HP.WP.mod = undefined;
	this.HP.WP.tot = undefined;

	this.STAM = {};
	this.STAM.base = undefined;
	this.STAM.mod = undefined;
	this.STAM.tot = undefined;

	this.STAM.recover = {};
	this.STAM.recover.base = undefined;
	this.STAM.recover.mod = undefined;
	this.STAM.recover.mult = 1;
	this.STAM.recover.tot = undefined;

	this.lift = {};
	this.lift.base = undefined;
	this.lift.mod = undefined;
	this.lift.mult = undefined;
	this.lift.tot = undefined;
	
	this.haul = {};
	this.haul.base = undefined;
	this.haul.mod = undefined;
	this.haul.mult = undefined;
	this.haul.tot = undefined;

	this.stun_pain = {};
	this.stun_pain.base = undefined;
	this.stun_pain.mod = undefined;
	this.stun_pain.mult = undefined;
	this.stun_pain.tot = undefined;


	this.heal = {};
	this.heal.con_B_mod = undefined;
	this.heal.con_W_mod = undefined;
	this.heal.LB = undefined;
	this.heal.MB = undefined;
	this.heal.SB = undefined;
	this.heal.LW = undefined;
	this.heal.MW = undefined;
	this.heal.SW = undefined;

	
	this.drawZones();
	this.drawChartHeader();
	this.defineChartRows();


}

	D3calc.calculatedStatsUI.prototype.updateDisplay = function() {
		this.updateDisplayGroup(this.HP, "HP");
		this.updateDisplayGroup(this.HP.BP, "HP", "BP");
		this.updateDisplayGroup(this.HP.WP, "HP", "WP");
		this.updateDisplayGroup(this.STAM, "STAM");
		this.updateDisplayGroup(this.STAM.recover, "STAM", "recover");
		this.updateDisplayGroup(this.lift, "lift");
		this.updateDisplayGroup(this.haul, "haul");
		this.updateDisplayGroup(this.stun_pain, "stun_pain");
		
		this.updateDisplayHealing("bludg", "B");
		this.updateDisplayHealing("wound", "W");
	}
	
	D3calc.calculatedStatsUI.prototype.updateDisplayGroup = function(group, tier1, tier2) {
		var data = undefined;
		if (!tier2) {
			data = this.Manager.activeChar.d.calcStats[tier1];
		}
		else {
			data = this.Manager.activeChar.d.calcStats[tier1][tier2];
		}
		
		var prefix = "";
		for ( var elem in group) {
			prefix = "";
			if (data[elem] || data[elem] === 0) {
				switch (elem) {
					case "mod": 
						if (data[elem] > 0) prefix = "+";
						break;
					case "mult":
						prefix = "x";
						break;
					default:
						prefix = "";
				}
				group[elem].innerHTML = prefix + "" + data[elem];
			}
		}
	}
	
	D3calc.calculatedStatsUI.prototype.updateDisplayHealing = function(type, abbrev) {
		var prefix = (this.Manager.activeChar.d.calcStats.heal["con_" + type + "_mod"] > 0) ? "+" : "";
		this.heal["con_" + type + "_mod"].innerHTML = prefix + this.Manager.activeChar.d.calcStats.heal[type].mod;
		this.heal["L" + abbrev].innerHTML = this.Manager.activeChar.d.calcStats.heal["L" + abbrev].text;
		this.heal["M" + abbrev].innerHTML = this.Manager.activeChar.d.calcStats.heal["M" + abbrev].text;
		this.heal["S" + abbrev].innerHTML = this.Manager.activeChar.d.calcStats.heal["S" + abbrev].text;
	}


	D3calc.calculatedStatsUI.prototype.drawZones = function() {
		var ul = document.createElement("ul");
		ul.setAttribute("id", D3calc.CSSname + "_ULcalculatedStats");
		ul.setAttribute("class", D3calc.CSSname + "calculatedStats");
		this.statsList = ul;

		

		this.defineHealingRatesList();		
		this.dispBox.appendChild(this.statsList);
		
		this.dispBox.appendChild(document.createElement("br"));
		
		this.dispBox.appendChild(this.healingRates);
	}

	D3calc.calculatedStatsUI.prototype.drawChartHeader = function() {
		var li = document.createElement("li");
		li.setAttribute("id", D3calc.CSSname + "_LIcalculatedStatsHeader");
		li.setAttribute("class", D3calc.CSSname + "header " + D3calc.CSSname + "calculatedStatsRow");
				
		var div = document.createElement("div");
		div.setAttribute("class", D3calc.CSSname + "COLstatName");
		div.innerHTML = "Stat";

		this.statsList.appendChild(li);
		li.appendChild(div);
		
		div = document.createElement("div");
		div.innerHTML = "Base";
		li.appendChild(div);

		div = document.createElement("div");
		div.innerHTML = "Mult.";
		li.appendChild(div);

		div = document.createElement("div");
		div.innerHTML = "Modifier";
		li.appendChild(div);

		div = document.createElement("div");
		div.innerHTML = "Total";
		li.appendChild(div);
	}
	
	D3calc.calculatedStatsUI.prototype.defineChartRows = function() {
		this.defineChartRow(this.HP, "HP", "Hit Points");
		this.defineChartRow(this.HP.BP, "HP_BP", "Bludgon Points");
		this.defineChartRow(this.HP.WP, "HP_WP", "Wound Points");
		this.defineChartRow(this.STAM, "STAM", "Stamina");
		this.defineChartRow(this.STAM.recover, "STAM_recover", "Stamina Recovery");
		this.defineChartRow(this.lift, "lift", "Lift");
		this.defineChartRow(this.haul, "haul", "Haul");
		this.defineChartRow(this.stun_pain, "stun_pain", "Stun Pain");		
	}
	
	D3calc.calculatedStatsUI.prototype.defineChartRow = function(group, name, label) {
		if (D3calc.debug) D3calc.log("D3calc.calculatedStatsUI.prototype.defineChartRow = function(group, " + name + ", " + label + ")");
		var li = document.createElement("li");
		li.setAttribute("class", D3calc.CSSname + "calculatedStatsRow");
		
		var div = document.createElement("div");
		div.setAttribute("class", D3calc.CSSname + "COLstatName");
		div.innerHTML = label;
		li.appendChild(div);
		
		var base = document.createElement("div");
		group.base = base;
		li.appendChild(base);
		
		var mult = document.createElement("div");
		group.mult = mult;
		li.appendChild(mult);

		var mod = document.createElement("div");
		group.mod = mod;
		li.appendChild(mod);
		
		
		var tot = document.createElement("div");
		group.tot = tot;
		li.appendChild(tot);
		
		this.statsList.appendChild(li);
	}
	
	D3calc.calculatedStatsUI.prototype.defineHealingRatesList = function(group, name, label) {
		if (D3calc.debug) D3calc.log("D3calc.calculatedStatsUI.prototype.defineHealingRatesRow = function(group, " + name + ", " + label + ")");	
		var ul = document.createElement("ul");
		ul.setAttribute("id", D3calc.CSSname + "_ULcalculatedStatsHealing");
		ul.setAttribute("class", D3calc.CSSname + "calculatedStats");
		this.healingRates = ul;
		
		var head = document.createElement("li");
		head.setAttribute("class", D3calc.CSSname + "header " + D3calc.CSSname + "calculatedStatsRow");
		this.healingRates.appendChild(head);
		
		var div = document.createElement("div");
		div.setAttribute("class", D3calc.CSSname + "COLstatName");
		div.innerHTML = "Wound Type";
		head.appendChild(div);
		
		div = document.createElement("div");
		div.innerHTML = "Con Mod";
		head.appendChild(div);

		div = document.createElement("div");
		div.innerHTML = "Light";
		head.appendChild(div);

		div = document.createElement("div");
		div.innerHTML = "Medium";
		head.appendChild(div);

		div = document.createElement("div");
		div.innerHTML = "Severe";
		head.appendChild(div);

		var bludg = this.defineHealingRateRow(this.heal, "bludg", "B", "Bludgeon");
		var wound = this.defineHealingRateRow(this.heal, "wound", "W", "Wound");
		
		this.healingRates.appendChild(bludg);
		this.healingRates.appendChild(wound);
	}
	
	D3calc.calculatedStatsUI.prototype.defineHealingRateRow = function(group, type, abbrev, label) {
		var li = document.createElement("li");
		li.setAttribute("class", D3calc.CSSname + "calculatedStatsRow");
		
		var div = document.createElement("div");
		div.setAttribute("class", D3calc.CSSname + "COLstatName");
		div.innerHTML = label;
		li.appendChild(div);
		
		var mod = document.createElement("div");
		group["con_" + type + "_mod"] = mod;
		li.appendChild(mod);
		
		var light = document.createElement("div");
		group["L" + abbrev] = light;
		li.appendChild(light);

		var med = document.createElement("div");
		group["M" + abbrev] = med;
		li.appendChild(med);
		
		var severe = document.createElement("div");
		group["S" + abbrev] = severe;
		li.appendChild(severe);
		return li;
	}