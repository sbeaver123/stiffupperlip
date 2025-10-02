
import sulRoll from "./sulRoll.js";

export default class sulRollDialog extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {

    constructor(actor, data) {
        super(actor, data);

        this.actor = actor;
        this.data = data;
        this.tagfate = false;
        this.tagfree = false;
        this.modifier = 0;

        console.log(this.data);
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

    async _onRender(context, options) {

        const tagfate = this.element.querySelector("input[name='tagaspectfate']");
        tagfate?.addEventListener("click", event => this.tagAspectFate());

        const makeRoll = this.element.querySelector(".makeroll");
        makeRoll?.addEventListener("click", event => this.rollDice(event));
    }

    async rollDice(event) {

        if (this.tagFate) {
            console.log("Reducing Fate Points");
            const fp = this.actor.system.fatepoints--;
            await this.actor.update({"system.fatepoints": fp});
            this.actor.sheet.render(true);
        }
        const sulR = new sulRoll(this.actor, this.data);
        const roll = await sulR.makeRoll();
    }

    tagAspectFate() {

        if (this.tagFate) {
            this.tagFate = false;
        } else {
            this.tagFate = true;
        }
    
        this.data.taggedAspect = true;
    }
}