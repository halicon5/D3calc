/* 
this object basically gives a functional map that is used by D3calc.charManagerSVC.refreshData(objRef)"

each type of call will have an array of reference objects that are called in sequence.
the assumption is that there is ALWAYS an active D3calc.Manager.activeChar object which is a reference to a CharSVC object.
*/
D3calc.calculationFlow = {};
	var cflow = 0;
	D3calc.calculationFlow["attribute"] = new Array();
	D3calc.calculationFlow["attribute"][cflow++] = "calcStats.update";
	D3calc.calculationFlow["attribute"][cflow++] = "skills.updateByAttribute";
	D3calc.calculationFlow["attribute"][cflow++] = "skills.updateWriteInSkills";
	D3calc.calculationFlow["attribute"][cflow++] = "defense.update";

	var cflow = 0;
	D3calc.calculationFlow["charSkill"] = new Array();
	D3calc.calculationFlow["charSkill"][cflow++] = "combatStats.update";

	var cflow = 0;
	D3calc.calculationFlow["equip armor"] = new Array();
	D3calc.calculationFlow["equip armor"][cflow++] = "defense.update";

	var cflow = 0;
	D3calc.calculationFlow["defense"] = new Array();
	D3calc.calculationFlow["defense"][cflow++] = "defense.hitZones.update";