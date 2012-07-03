D3calc.attributeDAT = function (aName, aRank) {
	this.name = aName;
	
	(aRank != parseInt(aRank) ) ? this.rank = 10: this.rank = aRank; 	// accept only integers, assume default of 10 in failure.
	this.mod = 0; // an integer added to the rank
	this.totRank = this.rank + this.mod;
	this.adj = 0;
	this.AV = (this.totRank + this.mod) * 5

	this.AV_mod = 0;
	this.adj_mod = 0;  
	this.totAdj = (this.adj + this.adj_mod);
	this.totAV = (this.AV_mod + this.AV);
}