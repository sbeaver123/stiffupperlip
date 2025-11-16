
import sulRoll from "./sulRoll.js";
import RollData from "./sulRollData.js";

export default class sulRollDialog extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {

    constructor(actor, data) {
        super(actor, data);

        this.actor = actor;
        this.data = data;
        this.tagfate = false;
        this.tagfree = false;
        this.modifier = 0;

        const labelkey = "SUL.skills." + this.data.label
        this.label = game.i18n.localize(labelkey);
    }

    static DEFAULT_OPTIONS = {
        "tag": "form",
        "position": {
            "height": 300,
            "width": 400
        },
        "window": {
            "resizable": true
        },
        "form": {
            "closeOnSubmit": true,
            "submitOnChange": false
        },
        "classes": ["sul__roll-sheet"]
    }

    static PARTS = {
        "dialog": {
            "template": "systems/stiffupperlip/templates/dialog/diceroll.hbs",
            "scrollable": "roll_dialog"
        }
    }

    async _prepareContext(options) {
        let sheetData = this.data;

        sheetData.label = this.label;

        return sheetData;
    }    

    async _onRender(context, options) {

        const tagfate = this.element.querySelector("input[name='tagaspectfate']");
        tagfate?.addEventListener("click", event => this.tagAspectFate());

        const tagfree = this.element.querySelector("input[name='tagaspectfree']");
        tagfree?.addEventListener("click", event => this.tagAspectFree());

        const modifier = this.element.querySelector("input[name='othermodifier']");
        modifier?.addEventListener("change", event => this.setModifier(event));
    
        const makeRoll = this.element.querySelector(".makeroll");
        makeRoll?.addEventListener("click", event => this.rollDice(event));
    }

    async rollDice(event) {

        let taggedAspects = 0;

        if (this.tagFate) {
            const fp = this.actor.system.fatepoints--;
            await this.actor.update({"system.fatepoints": fp});
            this.actor.sheet.render(true);
            taggedAspects++;
        }

        if (this.tagFree) {
            taggedAspects++;
        }

        const rollData = new RollData(this.label, this.data.value, taggedAspects, this.modifier);

        const sulR = new sulRoll(this.actor, rollData);
        const roll = await sulR.makeRoll();
    }

    setModifier(event) {
        this.modifier = event.target.value;
    }

    tagAspectFate() {

        if (this.tagFate) {
            this.tagFate = false;
        } else {
            this.tagFate = true;
        }
    }

    tagAspectFree() {

        if (this.tagFree) {
            this.tagFree = false;
        } else {
            this.tagFree = true;
        }
    }

}