
import sulRoll from "./sulRoll.js";

export default class sulRollDialog extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {

    constructor(actor, data) {
        super(actor, data);
        this.actor = actor;
        this.data = data;
        /*this.label = data.label;
        this.baseModifier = data.value;*/
    }

    static DEFAULT_OPTIONS = {
        "tag": "form",
        "position": {
            "width": 700
        },
        "window": {
            "resizable": true
        },
        "form": {
            "closeOnSubmit": false,
            "submitOnChange": false
        }
    }

    static PARTS = {
        "dialog": {
            "template": "systems/stiffupperlip/templates/dialog/diceroll.hbs",
            "scrollable": "roll_dialog"
        }
    }

    async _onRender(context, options) {

        const makeRoll = this.element.querySelector(".makeroll");
        makeRoll?.addEventListener("click", event => this.rollDice(event));
    }

    async rollDice(event) {

        const sulR = new sulRoll(this.actor, this.data);
        const roll = await sulR.makeRoll();

        //console.log(roll);
    }

}