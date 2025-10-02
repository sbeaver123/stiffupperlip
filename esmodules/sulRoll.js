
export default class sulRoll {

    constructor(actor, data) {
        this.actor = actor;
        this.data = data;
        this.ladder = {
            "8":`${game.i18n.localize("SUL.ladder.tophole")}`,
            "7":`${game.i18n.localize("SUL.ladder.wizard")}`,
            "6":`${game.i18n.localize("SUL.ladder.thrilling")}`,
            "5":`${game.i18n.localize("SUL.ladder.spiffing")}`,
            "4":`${game.i18n.localize("SUL.ladder.oojah")}`,
            "3":`${game.i18n.localize("SUL.ladder.jollygood")}`,
            "2":`${game.i18n.localize("SUL.ladder.fair")}`,
            "1":`${game.i18n.localize("SUL.ladder.average")}`,
            "0":`${game.i18n.localize("SUL.ladder.hohum")}`,
            "-1":`${game.i18n.localize("SUL.ladder.belowpar")}`,
            "-2":`${game.i18n.localize("SUL.ladder.ohdear")}`
        }
    }

    async makeRoll() {

        let r = new Roll(`4dF + ${this.data.value}`);
        let roll = await r.roll();

        let rung = this._getRung(roll.total);

        let msg = ChatMessage.getSpeaker({"actor": this.actor});
        msg.alias = this.actor.name;

        const msgData = {
            "label": this.data.label,
            "total": roll.total,
            "rung": rung
        }

        const flavour = await foundry.applications.handlebars.renderTemplate("systems/stiffupperlip/templates/rollMessage.hbs", msgData);
        roll.toMessage({
            "flavor": flavour,
            "speaker": msg
        });
    }

    _getRung(total) {

        let index = 0;
        if (total > 8) {
            index = 8;
        } else if (total < -2) {
            index = -2;
        } else {
            index = total;
        }

        return this.ladder[index.toString()];
    }
}