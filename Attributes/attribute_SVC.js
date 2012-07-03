D3calc.attributeSVC = function(AttributeDAT) {
	this.d = AttributeDAT;

	this.CMCLASSNAME = "D3calc.attributeSVC";
	this.CMOBJNAME = this.d.name;
	
}
	
	D3calc.attributeSVC.prototype.destroy = D3calc.destroy;

	D3calc.attributeSVC.prototype.update = function(param) {
		if (D3calc.debug) D3calc.log("CALL D3calc.attributeSVC.prototype.update = function() " + this.d.name);
		this.d.totRank = this.calc_totRank();
		this.d.adj = this.calc_adjust();
		this.d.AV = this.calc_AV();
		this.d.totAV = this.d.AV_mod + this.d.AV;
		this.d.totAdj = this.d.adj_mod + this.d.adj;		
		D3calc.Manager.refreshData("attribute", this.d.name);
	}


	D3calc.attributeSVC.prototype.reset = function() {
		if (D3calc.debug) D3calc.log("CALL D3calc.attributeSVC.prototype.reset = function() " + this.d.name);
		this.d.mod = 0;
		this.d.adj_mod = 0;
		this.d.AV_mod = 0;
	}


	D3calc.attributeSVC.prototype.setAttribMod = function(value, key, wupdate) {
		if (this.d[key] !== undefined) {
			if (isNaN(value)) {
				value = 0;
			}
			this.d[key] = parseInt(value, 10);
		}
		if (wupdate) {
			this.update(false);
		}
	}


	D3calc.attributeSVC.prototype.calc_adjust = function() {
		if (D3calc.debug) D3calc.log("CALL D3calc.attributeSVC.prototype.calc_adjust = function() " + this.d.name);

		var adj = 0;
		if (!isNaN(this.d.totRank)) {
			if ( this.d.totRank > 10) {
				return (this.d.totRank - 10) * 2;
			} else {
				for (var i = this.d.totRank - 10; i < 0; i++) {
					adj = adj + i;
				}
				return adj;
			}
		} else {
			return 0;
		}
	}



	D3calc.attributeSVC.prototype.calc_AV = function() {
		if (D3calc.debug) D3calc.log("CALL D3calc.attributeSVC.prototype.calc_AV = function() " + this.d.name);

		if (!isNaN(this.d.totRank)) {
			return this.d.totRank * 5;
		} else {
			return 0;
		}
	}



	D3calc.attributeSVC.prototype.calc_totRank = function() {
		if (D3calc.debug) D3calc.log("CALL D3calc.attributeSVC.prototype.calc_totRank = function() " + this.d.name);
		return this.d.rank + this.d.mod;
	}



	
	
	
	D3calc.attributeSVC.prototype.setRank = function(r) {
		if (D3calc.debug) D3calc.log("CALL D3calc.attributeSVC.prototype.set = function(" + r + ") " + this.d.name);
		if (isNaN(r)) {
			r = 10;
		}
		this.d.rank = parseInt(r, 10);
		this.update();	
	}
	


	D3calc.attributeSVC.prototype.setAdjMod = function(m) {
		if (isNaN(m)) {
			m = 0;
		}
		this.d.adj_mod = parseInt(m, 10);
		this.update();	
	}


	D3calc.attributeSVC.prototype.applyAdjMod = function(m) {
		if (isNaN(m)) {
			m = 0;
		}
		this.d.adj_mod += parseInt(m, 10);
		this.update();
	}
	

	D3calc.attributeSVC.prototype.setAVMod = function(m) {
		if (isNaN(m)) {
			m = 0;
		}
		this.d.AV_mod = parseInt(m, 10);
		this.update();	
	}


	D3calc.attributeSVC.prototype.applyAVMod = function(m) {
		if (isNaN(m)) {
			m = 0;
		}
		this.d.AV_mod += parseInt(m, 10);
		this.update();
	}

	
	D3calc.attributeSVC.prototype.setModifier = function(m) {
		if (D3calc.debug) D3calc.log("CALL D3calc.attributeSVC.prototype.setModifier = function(" + m + ") " + this.d.name);
		if (isNaN(m)) {
			m = 0;
		}
		this.d.mod = parseInt(m, 10);
		this.update();
	}
	
	
	
	D3calc.attributeSVC.prototype.applyModifier = function(m) {
		if (D3calc.debug) D3calc.log("CALL D3calc.attributeSVC.prototype.applyModifier = function(" + m + ") " + this.d.name);
		if (isNaN(m)) {
			m = 0;
		}
		this.d.mod += parseInt(m, 10);
		this.update();
	}