
export class sulItemSheet extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.sheets.ItemSheetV2) {

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
            "width": 550,
            "height": "auto"
        },
        "window": {
            "resizable": true
        },
        "classes": ['sul__sheet']
    }

    static PARTS = {
        base: {
            template: "systems/stiffupperlip/templates/item/sulItemSheet.hbs",
            scrollable: [".window-content", ".sul__wrapper"]
        }
    }

    async _prepareContext(options) {
        let sheetData = {
            ...this.item
        };

        return sheetData;
    }
}