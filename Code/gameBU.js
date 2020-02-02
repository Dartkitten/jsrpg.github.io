// Created By:
// ________                 __   ____  __.__  __    __                 
// \______ \ _____ ________/  |_|    |/ _|__|/  |__/  |_  ____   ____  
//  |    |  \\__  \\_  __ \   __\      < |  \   __\   __\/ __ \ /    \ 
//  |    `   \/ __ \|  | \/|  | |    |  \|  ||  |  |  | \  ___/|   |  \
// /_______  (____  /__|   |__| |____|__ \__||__|  |__|  \___  >___|  /
//         \/     \/                    \/                   \/     \/ 
// JSRPG Engine Version 0.25
//
//
//
enemy = {name:"Unknown",hpmax:0,hp:0,dam_min:0,dam_max:0,desc:"Unknown"};
avatar = "ava";
charname = "Unknown";
maxhp = 70;
hp = 70;
curdam_min = 1;
curdam_max = 4;
curwep = fists;
inventory = [];
usingitem = 0;
hitfor = 0;
hitto = 0;
//Item Values
var fists = {
name:"Fists",
weapon:true,
usable:false,
desc:"A punchything, you shouldn't be able to see this",
gfx:"fist",
dam_min:1,
dam_max:4,
};
var test1 = {
name:"Short Sword",
weapon:true,
usable:true,
desc:"A sword to poke things",
gfx:"sword",
dam_min:3,
dam_max:7,
block:"addline('You play around with the sword and cut yourself!'); dmg(Math.random() * (test1.dam_max - test1.dam_min) + test1.dam_min);",
};
var test2 = {
name:"Cool Sword",
weapon:true,
usable:false,
desc:"A cooler sword!",
gfx:"coolsword",
dam_min:12,
dam_max:28,
};
var test3 = {
name:"Healing Potion",
usable:true,
desc:"A healing potion",
gfx:"potion",
block:"dmg(-15);",
consumable:true,
};
//Unit Values
var goblin = {
name:"Goblin",
hpmax:14,
hp:14,
dam_min:12,
dam_max:36,
desc:"A mean, green, hate machine!",
	};
//Quest Values
//Room Values
//Trigger Values
//End of init
function updatehud() {
if (hp <= 0)
	{
		document.getElementById("hppercentage").style.width = "0px";
		document.getElementById("hptext").innerHTML = hp+"/"+maxhp;
	}
	else {
	document.getElementById("hppercentage").style.width = Math.round((hp/maxhp)*148)+"px";
	document.getElementById("hptext").innerHTML = hp+"/"+maxhp;
	};
	document.getElementById("wepname").innerHTML = curwep.name;
	document.getElementById("wepimg").src = "Graphics/"+curwep.gfx+".png";
	document.getElementById("avaimg").src = "Graphics/"+avatar+".png";
	document.getElementById("avaname").innerHTML = charname;
};
function dmg(hitdmg) {
	hitdmg = Math.round(hitdmg);
	if (hitdmg<0) {
	addline("Healed for "+Math.abs(hitdmg)+" HP(s)!");
	}
	else {
	if (hp <= 0) {
		addline(charname+"'s body is hit for "+hitdmg+" HP(s)!");
	} else {
	if (hp-hitdmg <=0) {
	addline("Hit for "+hitdmg+" HP(s) and killed!");
	}
	else {
	addline("Hit for "+hitdmg+" HP(s)!" );
	};
	};
	};
	hp = hp - hitdmg;
	if (hp > maxhp) {
		hp = maxhp;
	};
	updatehud();
};
function invlist() {
	if (inventory.length == 0) {
		addline("Your inventory is empty.");
	}
	else {
		addline("You inventory has "+inventory.length+" item(s)")
	for (i = 0; i < inventory.length; i++) {
	if (inventory[i].amount>0) {
	if (inventory[i].amount > 1) {
		stufftoadd = "<img src='Graphics/"+inventory[i].gfx+".png' > You have "+inventory[i].amount+" "+inventory[i].name+"s!";
	}
	else {
	stufftoadd = "<img src='Graphics/"+inventory[i].gfx+".png' > You have a(n) "+inventory[i].name+"!";
	};
	stufftoadd += "<br>";
	if (inventory[i].usable) {
		stufftoadd += "<input type='button' onclick=useitem("+i+") value=Use ></input>";
	};
	if (inventory[i].weapon) {
		stufftoadd += "<input type='button' value=(Un)Equip onclick=changewep(inventory["+i+"]) ></input>";
	};
	stufftoadd += "<input type='button' onclick=describe(inventory["+i+"]) value=Desc ></input>"
    addline(stufftoadd);
	};
};
};
};
function addcusitem() {
	cusitemspace = inventory.length
	cusinvenname = prompt("debug: What Item do you want to add?", "ex: nifty sword");
	cusinvenuse = confirm("debug: Will this item be usable?");
	cusinvenwep = confirm("debug: Will this item be a weapon?");
	cusinvendesc = prompt("debug: Write the item a short description.","Used to stab things sometimes");
	cusinvengfx = prompt("debug: What is the item's icon type/path?", "ex: sword (no need to add .png)");
	if (cusinvenwep && cusinvenuse) {
		cusinvenmind = prompt("debug: What is the weapon's minimum damage?","0");
		cusinvenmaxd = prompt("debug: What is the weapon's maximum damage?","0");
		cusinvencons = confirm("debug: Will this item be a consumable?");
		cusinvencode = prompt("debug: Write formatted code for the 'use' function of this item.","ex: alert('ass')");
		inventory[cusitemspace] = {name:cusinvenname,amount:1,weapon:cusinvenwep,usable:cusinvenuse,gfx:cusinvengfx,desc:cusinvendesc,dam_min:cusinvenmind,dam_max:cusinvenmaxd,block:cusinvencode};
	}
	else {
	if (cusinvenwep) {
		cusinvenmind = prompt("debug: What is the weapon's minimum damage?","0");
		cusinvenmaxd = prompt("debug: What is the weapon's maximum damage?","0");
		inventory[cusitemspace] = {name:cusinvenname,amount:1,weapon:cusinvenwep,usable:cusinvenuse,gfx:cusinvengfx,desc:cusinvendesc,dam_min:cusinvenmind,dam_max:cusinvenmaxd};
	}
	else {
	if (cusinvenuse) {
		cusinvencons = confirm("debug: Will this item be a consumable?");
		cusinvencode = prompt("debug: Write formatted code for the 'use' function of this item.","ex: alert('ass')");
		inventory[cusitemspace] = {name:cusinvenname,amount:1,weapon:cusinvenwep,usable:cusinvenuse,gfx:cusinvengfx,desc:cusinvendesc,block:cusinvencode};
	}
	else {
	inventory[cusitemspace] = {name:cusinvenname,amount:1,usable:cusinvenuse,gfx:cusinvengfx,desc:cusinvendesc};
	};
	};
	};
};
function additem(item) {
	addq = false
	for (i = 0; i < inventory.length; i++) {
	if (inventory[i].name == item.name) {
		addq = true;
		break;
	};
	};
	if (addq) {
	inventory[i].amount ++;
	}
	else {
		itemspace = inventory.length
		invenname = item.name;
		invenwep = item.weapon;
		invenuse = item.usable;
		invendesc = item.desc
		invengfx = item.gfx
		if (item.weapon || item.usable) {
			invencode = item.block;
			invendmin = item.dam_min;
			invendmax = item.dam_max;
			invencons = item.consumable;
			inventory[itemspace] = {name:invenname,weapon:invenwep,usable:invenuse,amount:1,desc:invendesc,dam_min:invendmin,dam_max:invendmax,block:invencode,gfx:invengfx,consumable:invencons};
		}
		else {
		if (item.weapon) {
			invendmin = item.dam_min;
			invendmax = item.dam_max;
			inventory[itemspace] = {name:invenname,weapon:invenwep,usable:invenuse,amount:1,desc:invendesc,dam_min:invendmin,dam_max:invendmax,gfx:invengfx};
		}
		else {
		if (item.usable) {
			invencode = item.block;
			invencons = item.consumable;
			inventory[itemspace] = {name:invenname,weapon:invenwep,usable:invenuse,amount:1,desc:invendesc,block:invencode,gfx:invengfx,consumable:invencons};
		}
		else {
			inventory[itemspace] = {name:invenname,weapon:invenwep,usable:invenuse,amount:1,desc:invendesc,gfx:invengfx};
		};
		};
		};
	};
	};
function addline(lines) {
	document.getElementById("innerlogs").innerHTML += lines+"<br>";
	document.getElementById("loganchor").scrollIntoView();
};
function encounter(baddy) {
	addline("You have encountered "+baddy.name+"!");
	enemy = {name:baddy.name,hpmax:baddy.hpmax,hp:baddy.hp,dam_min:baddy.dam_min,dam_max:baddy.dam_max,desc:baddy.desc};
};
function attack() {
	if (hp<=0) {
	hitfor = Math.round(Math.random() * (enemy.dam_max - enemy.dam_min) + enemy.dam_min);
	addline("You are dead and cannot attack.");
	dmg(hitfor);
	}
		else {
	hitfor = Math.round(Math.random() * (enemy.dam_max - enemy.dam_min) + enemy.dam_min);
	hitto = Math.round(Math.random() * (curdam_max - curdam_min) + curdam_min);
	if (enemy.hp<=0) {
	enemy.hp = enemy.hp-hitto;
	addline(enemy.name+"'s body was hit for "+hitto+"HP(s)! ("+enemy.hp+"/"+enemy.hpmax+")");
	}
	else {
	enemy.hp = enemy.hp-hitto;
	if (enemy.hp<=0) {
	addline(enemy.name+" was killed! ("+enemy.hp+"/"+enemy.hpmax+")");
	}
	else {
	addline("You hit "+enemy.name+" for "+hitto+"HP(s)! ("+enemy.hp+"/"+enemy.hpmax+")");
	dmg(hitfor);
	};
	};
	};
	updatehud();
	};
function changewep(wepn) {
		if (hp<=0) {
	addline("You are dead and cannot equip "+inventory[usingitem].name+".")
	}
	else {
	if (curwep == wepn) {
	curwep = fists;
	curdam_min = fists.dam_min;
	curdam_max = fists.dam_max;
	updatehud();
	addline("Unequipped "+wepn.name+"!");
	}
	else {
	curwep = wepn;
	curdam_min = wepn.dam_min;
	curdam_max = wepn.dam_max;
	updatehud();
	addline("Equipped "+curwep.name+"!");
	};
	};
};
function describe(wepn) {
stufftoadd = wepn.desc;
if (wepn.weapon) {
stufftoadd += " (DMG: "+wepn.dam_min+"-"+wepn.dam_max+")";
};
addline(stufftoadd);
};
function useitem(item) {
	usingitem = item;
	if (hp<=0) {
	addline("You are dead and cannot use "+inventory[usingitem].name+".")
	}
	else {
	if (inventory[usingitem].amount >0) {
	if (inventory[usingitem].consumable) {
	inventory[usingitem].amount --;
	invlist();
	};
	addline("Used "+inventory[item].name+"!");
	projectitem(inventory[item]);
}
else {
	addline("You don't have a(n) "+inventory[usingitem].name+"!")
};
};
};
function clear() {
	document.getElementById("innerlogs").innerHTML = " TESTG";
};
function projectitem(item) {
eval(item.block);
};
alert("NUTHINRONG");