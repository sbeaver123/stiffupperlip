import sulConstants from "../sulConstants.js";

export class sulStuntSheet extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.sheets.ItemSheetV2) {

    constructor(options = {}) {
        super(options);
    }

    static DEFAULT_OPTIONS = {
        "position": {
            "width":"585",
            "height": "760",
        },
        "tag": "form",
        "form": {
            "submitOnChange": false,
            "closeOnSubmit": true
        },
        "window": {
            "resizable": true
        },
        "classes": ["sul__sheet"]
    }

    static PARTS = {
        "form": {
            "template": "systems/stiffupperlip/templates/item/sulStuntSheet.hbs",
            "scrollable": [".window-content", ".sul__item-sheet"]
        }
    }

    async _prepareContext(options) {

        const skillList = sulConstants.getSkills();

        let skills = {};
        for(let key in skillList) {
            let skill = {
                "label": skillList[key]
            }
            if (this.item.system.affectsSkills) {
                if(this.item.system.affectsSkills.includes(key)) {
                    skill["checked"] = true;
                }
            }
            skills[key] = skill;
        };

        const tracks = sulConstants.getTracks();

        const sheetData = {
            ...this.item,
            "skills": skills,
            "tracks": tracks
        }

        return sheetData;
    }

    async _onRender(context, options) {
        const skillBoxes = this.element.querySelectorAll(".sul__skill-check");
        skillBoxes.forEach(es => es?.addEventListener("click", event => this._checkSkill(event)));
    }

    _checkSkill(event) {
        const skill = event.target.name;

        let affectsSkills = [];
        if (this.item.system.affectsSkills) {
            affectsSkills = this.item.system.affectsSkills;
        }

        if (affectsSkills.includes(skill)) {
            const idx = affectsSkills.indexOf(skill);
            affectsSkills.splice(idx, 1);
        } else {
            affectsSkills.push(skill);
        }

        this.item.update({["system.affectsSkills"]: affectsSkills});
    }
}