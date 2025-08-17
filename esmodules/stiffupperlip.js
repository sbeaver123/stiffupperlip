
import * as models from "./sulDataModel.js";
import { sulCharacterSheet } from "./sulCharacterSheet.js";
import { sulItemSheet } from "./item/sulItemSheet.js";
import { sulWeaponSheet } from "./item/sulWeaponSheet.js";

Hooks.once("init", () => {

    console.log("Initialising Stiff Upper Lip");

    CONFIG.Actor.dataModels.character = models.sulCharacter;
    CONFIG.Actor.dataModels.npc = models.sulMajorNpc;

    CONFIG.Item.dataModels.item = models.sulItem;
    CONFIG.Item.dataModels.weapon = models.sulWeapon;

    //foundry.documents.collections.Actors.unregisterSheet("core", "sheets.ActorSheetV2");
    foundry.documents.collections.Actors.registerSheet("stiffupperlip", sulCharacterSheet, {types: ["character"], makeDefault: true});

    //foundry.documents.collections.Items.unregisterSheet("core", "sheets.ItemSheetV2");
    foundry.documents.collections.Items.registerSheet("stiffupperlip", sulItemSheet, {types: ["item"], makeDefault: true});
    foundry.documents.collections.Items.registerSheet("stiffupperlip", sulWeaponSheet, {types: ["weapon"], makeDefault: true});
});


Handlebars.registerHelper("lt", function(value1, value2){
    return value1 < value2;
});

Handlebars.registerHelper("times", function(n, block) {
    var accum = "";
    for (var i=0; i<n; i++) {
        block.data.index = i;
        accum += block.fn(this);
    }
    return accum;
});
