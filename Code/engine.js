/*  Created By:
 ________                 __   ____  __.__  __    __                 
 \______ \ _____ ________/  |_|    |/ _|__|/  |__/  |_  ____   ____  
  |    |  \\__  \\_  __ \   __\      < |  \   __\   __\/ __ \ /    \ 
  |    `   \/ __ \|  | \/|  | |    |  \|  ||  |  |  | \  ___/|   |  \
 /_______  (____  /__|   |__| |____|__ \__||__|  |__|  \___  >___|  /
         \/     \/                    \/                   \/     \/ 
 JSRPG Engine Version 0.25
*/
function gaincurrency(amt) {
	money+=Number(amt);
	addline("You have gained "+amt+" "+currencystack(amt)+pcurrencydef+"!");
};
function showcurrency() {
	if (money != 1) {
	addline("You have "+money+" "+currencystack(money)+pcurrencydef+"!");
	} else {
	addline("You have a single "+currencystack(money)+currencydef+"!");
	}
};
function exit(text,place) {
return ("<exit onClick=setroom("+place+") >"+text+"</exit>");
};
function addline(lines) {
	document.getElementById("innerlogs").innerHTML += "<log>"+lines+"</log>";
	document.getElementById("loganchor").scrollIntoView();
};
function dialogue(index) {
	dialogue = true;
	eval("diaindex = scenes."+index+";");
	addline(diaindex[curdia]);
	addline("<lbtn id='dnextbut' onClick='dialoguenext()'>Continue</lbtn>");
};
function currencystack(mun) {
if (mun) {
if (currencystackimg) {
	for (n = mun; !currencyimg.n; n--) {
	if (currencyimg[n]) {
	return ("<img class='goldsmall' src=Graphics/"+currencyimg[n]+" /img>");
	}
	}
}
else {
	return ("<img class='goldsmall' src=Graphics/"+currencyimg+" /img>")
}
} else {
return "";
};
};
function arrayselect(val) {
	return val[Math.floor(Math.random()*val.length)];
};
function dialoguenext() {
	document.getElementById("dnextbut").remove();
	curdia++;
	if (curdia!=diaindex.length-1) {	
	addline(diaindex[curdia]);
	addline("<lbtn id='dnextbut' onClick='dialoguenext()' >Continue</lbtn>");
	}
	else {
	addline(diaindex[curdia]);
	dialogue = false
	curdia = 0;
	};
};
function dotrigger(n) {
	if (n.active) {
		eval(n.block);
		if (!n.loop) {
		n.active = false;
		};
	}
	else {
		if (n.nblock) {
			eval(n.nblock);
		};
	};
};
function deldesc() {
	elements = document.getElementsByClassName("rmtxt");
	while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    };
}
function setroom(n) {
	if (!encountered && !dialogue) {
	deldesc();
	addline(curroom.exitmsgs[n]);
	eval("curroom = room."+curroom.exits[n]);
	addline("<rmtxt class='rmtxt' ><rmnm>"+curroom.name+":</rmnm><br>"+curroom.desc+"</rmtxt>");
	updatehud();
	}
	else {
		addline("You cannot do that while in an encounter!");
	}

};
function descroom() {
	addline("<rmtxt class='rmtxt' >You are in "+curroom.name+".<br>"+curroom.desc+"</rmtxt>");
	updatehud();
};
function showpanel(panel) {
document.getElementById(panel).style.visibility = "visible";
};
function hidepanel(panel) {
document.getElementById(panel).style.visibility = "hidden";
};
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
	document.getElementById("wepimg").src = "Graphics/"+curwep.gfx;
	document.getElementById("avaimg").src = "Graphics/"+avatar;
	document.getElementById("avaname").innerHTML = charname;
	document.getElementById("roomname").innerHTML = curroom.name;
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
	if (encountered && enemy.flavorvictory) {
		if (Array.isArray(enemy.flavorvictory)) {
			addline(arrayselect(enemy.flavorvictory));
		}
		else {
			addline(enemy.flavorvictory);
		};
	}
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
	elements = document.getElementsByTagName('invitem');
	while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
	if (inventory.length == 0) {
		addline("Your inventory is empty.");
	}
	else {
		addline("You inventory has "+inventory.length+" item(s)")
	for (i = 0; i < inventory.length; i++) {
	if (inventory[i].amount>0) {
		stufftoadd = "<invitem>"
	if (inventory[i].amount > 1) {
		stufftoadd += "<img class='invimg' src='Graphics/"+inventory[i].gfx+"' ><center><invname> You have "+inventory[i].amount+" "+inventory[i].name+"s!</invname>";
	}
	else {
	stufftoadd += "<img class='invimg' src='Graphics/"+inventory[i].gfx+"' ><center><invname>You have a(n) "+inventory[i].name+"!</invname>";
	};
	stufftoadd += "<br><invctrl>";
	if (inventory[i].usable) {
		stufftoadd += "<lbtn onclick=useitem("+i+") >Use</lbtn>";
	};
	if (inventory[i].weapon) {
		stufftoadd += "<lbtn onclick=changewep(inventory["+i+"]) >(Un)Equip</lbtn>";
	};
	stufftoadd += "<lbtn onclick=describe(inventory["+i+"]) >Desc</lbtn>"
	stufftoadd += "</invctrl></center></invitem>"
    addline(stufftoadd);
	};
};
};
	showcurrency();
};
function lootlist() {
	if (enemy.loot) {
		addline("<b>The following items have been looted:</b>");
		stufftoadd = "";
	for (n = 0; n < enemy.loot.length; n++) {
		stufftoadd += "<lootitem>";
		stufftoadd += "<img class='invimg' src='Graphics/"+enemy.loot[n].gfx+"' ><center><invname>"+enemy.loot[n].name+"</invname>";
		stufftoadd += "</center></lootitem>";
		additem(enemy.loot[n]);
	};
	addline(stufftoadd);
};
	if (enemy.loottable) {
		stufftoadd = "";
	for (n = 0; n < enemy.loottable.length; n++) {
		if (Math.random() <= enemy.loottable[n].chance) {
			stufftoadd += "<lootitem>";
			stufftoadd += "<img class='invimg' src='Graphics/"+enemy.loottable[n].item.gfx+"' ><center><invname>"+enemy.loottable[n].item.name+"</invname>";
			stufftoadd += "</center></lootitem>";
			additem(enemy.loottable[n].item);
		};
	};
	addline(stufftoadd);
	};
	if (enemy.lootmoney) {
	gainmoney = (Math.floor(Math.random() * enemy.lootmoney[1]) + enemy.lootmoney[0]);
		if (gainmoney > 0) {
			money += gainmoney;
			if (gainmoney > 1) {
				addline("And "+gainmoney+" "+currencystack(gainmoney)+pcurrencydef+"!");
			}
			else {
				addline("And "+gainmoney+" "+currencystack(gainmoney)+currencydef+"!");
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
	cusinvengfx = prompt("debug: What is the item's icon type/path?", "ex: sword.png");
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
		itemspace = inventory.length;
		item.amount = 1;
		inventory[itemspace] = item;
	};
	};
function encounter(baddy) {
	encountered = true;
	showpanel("combatmenu");
	addline("You have encountered "+baddy.name+"!");
	if (baddy.flavorgreet) {
		if (Array.isArray(baddy.flavorgreet)) {
				addline(arrayselect(baddy.flavorgreet));
		}
		else {
			addline(baddy.flavorgreet);
		};
	}
	enemy = baddy;
};
function encounterexit() {
	if (encountered) {
	encountered = false;
	hidepanel("encounterexit");
	hidepanel("combatmenu");
	addline("You have left the encounter.");
	if (enemy.endblock) {
	eval(enemy.endblock);
	};
	lootlist();
	deldesc();
	descroom();
	};
};
function encounterwin() {
	encountered = false;
	addline("You have defeated "+baddy.name+"!");
	descroom();
};
function flee() {
	if (hp<=0) {
	hitfor = Math.round(Math.random() * (enemy.dam_max - enemy.dam_min) + enemy.dam_min);
	addline("You are dead and cannot flee.");
	dmg(hitfor);
	}
		else {
	hitfor = Math.round(Math.random() * (enemy.dam_max - enemy.dam_min) + enemy.dam_min);
	dmg(hitfor);
	};
	updatehud();
	};
function attack() {
if (encountered) {
	if (hp<=0) {
	addline("You are dead and cannot attack.");
	enemyturn();
	}
		else {
	hitto = Math.round(Math.random() * (curdam_max - curdam_min) + curdam_min);
	if (enemy.hp<=0) {
	enemy.hp = enemy.hp-hitto;
	addline(enemy.name+"'s body was hit for "+hitto+"HP(s)! ("+enemy.hp+"/"+enemy.hpmax+")");
	}
	else {
	enemy.hp = enemy.hp-hitto;
	if (enemy.hp<=0) {
	addline(enemy.name+" was killed! ("+enemy.hp+"/"+enemy.hpmax+")");
	showpanel("encounterexit");
	
	}
	else {
	addline("You hit "+enemy.name+" for "+hitto+"HP(s)! ("+enemy.hp+"/"+enemy.hpmax+")");
	enemyturn();
	};
	};
	};
	updatehud();
	}
else {
	addline("You swing at nothing, as you are not in combat");
}
};
function passturn() {
hitfor = Math.round(Math.random() * (enemy.dam_max - enemy.dam_min) + enemy.dam_min);
dmg(hitfor);
};
function enemyturn() {
	hitfor = Math.round(Math.random() * (enemy.dam_max - enemy.dam_min) + enemy.dam_min);
	dmg(hitfor);
};
function changewep(wepn) {
		if (hp<=0) {
	addline("You are dead and cannot equip "+inventory[usingitem].name+".")
	}
	else {
	if (curwep == wepn) {
	curwep = item.fists;
	curdam_min = item.fists.dam_min;
	curdam_max = item.fists.dam_max;
	updatehud();
	addline("Unequipped "+wepn.name+"!");
	}
	else {
	if (wepn.amount>0) {
	curwep = wepn;
	curdam_min = wepn.dam_min;
	curdam_max = wepn.dam_max;
	updatehud();
	addline("Equipped "+curwep.name+"!");
	};	
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
//End of file