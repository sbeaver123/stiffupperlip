import sulConstants from "../sulConstants.js";

export default class sulStuntSheet extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {

    constructor(actor, stunt, options) {
        super();
        this.actor = actor;
        this.stunt = stunt;

        /* If editing an existing stunt, record the existing key. */
        if (options.key) {
            this.key = options.key;
        }
    }

    static DEFAULT_OPTIONS = {
        position: {
            "width":"auto",
            "height": "auto",
        },
        tag: "form",
        form: {
            handler: StuntDialog.#onSubmit,
            submitOnChange: false,
            closeOnSubmit: true
        },
        window: {
            title: this.title,
            icon: "fas fa=-book",
            resizable:false
        }
    }

    static PARTS = {
        form: {
            "template": "systems/stiffupperlip/templates/dialog/stuntdialog.hbs"
        }
    }

    get title() {
        return game.i18n.localize("SUL.stunt") + ": " + this.stunt.name;
    }

    async _prepareContext(options) {

        const skills = sulConstants.getSkills();
        const tracks = sulConstants.getTracks();

        const sheetData = {
            ...this.stunt,
            "skills": skills,
            "tracks": tracks
        }

        return sheetData;
    }

    static async #onSubmit (event, form, formDataExtended) {

        const formData = formDataExtended.object;
        let stunts = this.actor.system.stunts;
        let stunt = {}

        for(let prop in formData) {
            stunt[prop] = formData[prop];
        }

        const key = sulConstants.makeHash(stunt.name);

        /* If there's an existing key, we may need to delete the old version
           if we've changed the name of the stunt. */
        console.log(`Existing key ${this.key} New Key: ${key}`);
        if (this.key) {
            if (this.key !== key) {
                delete stunts[this.key];
            }
        }
        
        stunts[key] = stunt;
        console.log(stunts);

        await this.actor.update({["system.stunts"]: stunts});
    }
}