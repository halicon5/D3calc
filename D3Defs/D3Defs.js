var ruleinc = 0; // an incrementer variable
var D3Defs = {};

D3Defs.maxProfLevel = 60;
D3Defs.maxItemLevel = 63;
D3Defs.maxMobLevel = 60;

D3Defs.attributes = {};
D3Defs.attributes.STR = {name: "STR", fullname: "Strength"};
D3Defs.attributes.DEX = {name: "DEX", fullname: "Dexterity"};
D3Defs.attributes.INT = {name: "INT", fullname: "Intelligence"};
D3Defs.attributes.VIT = {name: "VIT", fullname: "Vitality"};

D3Defs.attributeOrder = ["STR", "DEX", "INT", "VIT"];





D3Defs.modTypeDefs = {};
// these are sequencial arrays of key/value sets, key being the data field and the value being the set() function
D3Defs.modTypeDefs.attribute = [ {mod: "setAttribMod"}, {adj_mod: "setAttribMod"}, {AV_mod: "setAttribMod"} ]; 
D3Defs.modTypeDefs.skill = [ {mod: "setModifier"}, {adj_mod: "setAdjMod"}, {cost: "setCost"} ];
D3Defs.modTypeDefs.defense = [ {DR_mod: "setDRmod"}, {staging_mod: "setStagingMod"}, {absorb_mod: "setAbsorbMod"}, {damTrans_mod: "setDamTransMod"} ];
D3Defs.modTypeDefs.discipline = [ {mod: "setModifier"}, {cost: "setCost"} ];
D3Defs.modTypeDefs.spell = [ {mod: "setModifier"}, {cost: "setCost"} ];
D3Defs.modTypeDefs.armorAdjust = [ {adj_adj: "setAdjAdj"} ];

D3Defs.modTypeDefs.defense = [ {natSize_mod: "setDefMod"}, {natAgl_mod: "setDefMod"}, {natDeflect_mod: "setDefMod"}, {natStaging_mod: "setDefMod"},
									{natAbsorb_mod: "setDefMod"}, {natDamTrans_mod: "setDefMod"}, {shieldDef_mod: "setDefMod"},
									{base_mod: "setDefMod"}, {armorDef_mod: "setDefMod"}, {noAgl_mod: "setNoAglMod"}, {still_mod: "setStillMod"}, {touch_mod: "setTouchMod"} ]
D3Defs.modTypeDefs.hitZone = [ {calledShot_mod: "setValue"}, {staging_mod: "setValue"}, {absorb_mod: "setValue"}, {damTrans_mod: "setValue"} ];
D3Defs.modTypeDefs.masteries = [ {rank_mod: "setRankMod"} ];
D3Defs.modTypeDefs.combatStats = [ {init_mod: "setValue"} ];
D3Defs.modTypeDefs.combatAV = [ {damage_mod: "setValue"}, {offStaging_mod: "setValue"}, {baseAV_mod: "setValue"}, {actAdj_mod: "setValue"},
									{sceneAdj_mod: "setValue"}, {AV1_mod: "setValue"}, {AV2_mod: "setValue"}, {AV3_mod: "setValue"}
									, {AV4_mod: "setValue"}, {AV5_mod: "setValue"}, {AV6_mod: "setValue"}];