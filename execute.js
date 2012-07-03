var debugBox = document.getElementById("debug_feedback");
function updateDebugBox() {
	debugBox.innerHTML = D3calc.traceLog;
}

var ManagerData = new D3calc.charManagerDAT(D3calc.version);
var Manager = new D3calc.charManagerSVC(ManagerData, "D3calcDisplay");


//*/
if (Manager.activeChar) {
	var myDebug = JSON.stringify(Manager.activeChar.d);
	myDebug = myDebug.replace(/,/g, ",\n");
	debugBox.innerHTML = D3calc.traceLog + "\n\n" + myDebug;
}
