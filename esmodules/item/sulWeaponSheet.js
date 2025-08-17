import sulConstants from "../sulConstants.js";

export class sulWeaponSheet extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.sheets.ItemSheetV2) {

    constructor(options = {}) {
        super(options);
    }

    static DEFAULT_OPTIONS = {
        "tag": "form",
        "form": {
            "submitOnChange": false,
            "closeOnSubmit": true
        },
        "position": {
            "width": 620,
            "height": "auto"
        },
        "window": {
            "resizable": true
        },
        "classes": ['sul__sheet']
    }

    static PARTS = {
        base: {
            template: "systems/stiffupperlip/templates/item/sulWeaponSheet.hbs",
            scrollable: [".window-content", ".sul__header"]
        }
    }

    async _prepareContext(options) {

        let sheetData = {
            ...this.item,
            "combatskills": sulConstants.getCombatSkills()
        };

        return sheetData;
    }
}