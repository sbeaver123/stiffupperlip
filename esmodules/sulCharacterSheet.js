
import sulRollDialog from "./sulRollDialog.js";
import StuntDialog from "./StuntDialog.js";
import { sulStunt } from "./sulDataModel.js";
import sulConstants from "./sulConstants.js";

export class sulCharacterSheet extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {

    #dragDrop;

    constructor(options = {}) {
        super(options);
        this.#dragDrop = this.#createDragDropHandlers();
    }

    static DEFAULT_OPTIONS = {
        "tag": "form",
        "form": {
            "submitOnChange": true,
            "closeOnSubmit": false
        },
        "position": {
            "width": 850,
            "height": "auto"
        },
        "window": {
            "resizable": true
        },
        "classes": ['sul__sheet'],
        "dragDrop": [{ dragSelector: '[data-drag]', dropSelector: null }]
    }

    static PARTS = {
        base: {
            template: "systems/stiffupperlip/templates/actor/sulCharSheet.hbs",
            templates: [
                "systems/stiffupperlip/templates/actor/header.hbs",
                "systems/stiffupperlip/templates/actor/aspects.hbs",
                "systems/stiffupperlip/templates/actor/tracks.hbs",
                "systems/stiffupperlip/templates/actor/skills.hbs",
                "systems/stiffupperlip/templates/actor/stunts.hbs"
            ],
            scrollable: [".window-content", ".sul__wrapper"]
        }
    }
 
    get dragDrop() {
        return this.#dragDrop;
    }

    getTabs() {
        let tabGroup = "sulSheet";
        if (!this.tabGroups[tabGroup]) this.tabGroups[tabGroup] = 'stats';

        let tabs = {
            "stats": {
                "id": "stats",
                "group": "sulSheet"
            },
            "bio": {
                "id": "bio",
                "group": "sulSheet"
            }
        };

        for(let tab in tabs) {
            if (this.tabGroups[tabGroup] === tabs[tab].id){
                tabs[tab].cssClass = "active";
                tabs[tab].active = true;
            }
        };
        return tabs;
    }
    
    async _prepareContext(options) {

        let sheetData = {
            "actor": this.actor,
            "system": this.actor.system,
            "fields": this.document.schema.fields,
            "classes": sulConstants.getSocialClasses(),
            "isEditable": true
        }

        this._calculateTracks();

        sheetData.tabGroups = this.tabGroups;
        sheetData.tabs = this.getTabs();

        console.log(sheetData);

        return sheetData;
    }

    async _onRender(context, options) {

        this.#dragDrop.forEach((d) => d.bind(this.element));

        const classSelect = this.element.querySelector("select[name='system.socclass']");
        classSelect?.addEventListener("change", event => this.changeSocialClass(event));

        const addStunt = this.element.querySelector(".sul__stunt-add");
        addStunt?.addEventListener("click", event => this.addStunt());
        const delStunt = this.element.querySelectorAll(".sul__stunt-delete");
        delStunt.forEach(ds => ds?.addEventListener("click", event => this.deleteStunt(event)));
        const editStunt = this.element.querySelectorAll(".sul__stunt-edit");
        editStunt.forEach(es => es?.addEventListener("click", event => this.editStunt(event)));

        const skillrolls = this.element.querySelectorAll(".sul__skill-roll");
        skillrolls.forEach(sr => sr?.addEventListener("click", event => this.skillRoll(event)));
    }

    addStunt() {

        let newstunt = new sulStunt({
            "name": game.i18n.localize("SUL.newstunt"),
            "description": "",
            "affectsSkill": [],
            "affectsTrack": "",
            "modifier": 0

        });
        const options = {"new": true};

        const dialog = new StuntDialog(this.actor, newstunt, options);
        dialog.render(true);
    }

    async changeSocialClass(event) {
    
        /* Base resources are tied to social class,
           so when class changes, so does base res. */
        const sclass = event.target.value;
        let bres = 2;
        if (sclass === "middle") {
            bres = 3;
        } else if (sclass === "upper") {
            bres = 4;
        }

        await this.actor.update({"system.socclass": sclass});
        await this.actor.update({"system.baseres": bres});
    }

    async deleteStunt(event) {

        const stuntKey = event.target.id;
        await this.actor.update({[`system.stunts.-=${stuntKey}`]: null});
    }

    editStunt(event) {

        const stunts = this.actor.system.stunts;
        const stuntKey = event.target.id;
        const stunt = stunts[stuntKey];

        const options = {
            "key": stuntKey
        }
        const dialog = new StuntDialog(this.actor, stunt, options);
        dialog.render(true);
    }

    skillRoll(event) {
        const skill = event.target.id;
        const value = this.actor.system.skills[skill].value;
        this._showDiceRollDialog(skill, value);
    }

    _calculateTracks() {

        let tracks = {
            "health": this.actor.system.tracks.health,
            "composure": this.actor.system.tracks.composure,
            "rectitude": this.actor.system.tracks.rectitude,
            "resources": this.actor.system.tracks.resources
        }

        const physique = this.actor.system.skills.physique.value;
        if (physique === 5) {
            tracks.health.boxes += 3;
        } else if (physique < 5 && physique >= 3) {
            tracks.health.boxes += 2;
        } else if (physique > 0) {
            tracks.health.boxes += 1;
        }

        const fortitude = this.actor.system.skills.fortitude.value;
        if (fortitude === 5) {
            tracks.composure.boxes += 3;
        } else if (fortitude < 5 && fortitude >= 3) {
            tracks.composure.boxes += 2;
        } else if (fortitude > 0) {
            tracks.composure.boxes += 1;
        }

        for(let key in this.actor.system.stunts) {
            const stunt = this.actor.system.stunts[key];
            if (stunt.affectsTrack !== "") {
                tracks[stunt.affectsTrack].boxes += stunt.modifier;
            }
        }
    }

    async _showDiceRollDialog(label="", value=0) {

        const dialogData = {
            "label": label,
            "value": value
        }
        console.log(dialogData);
        const dialog = new sulRollDialog(this.actor, dialogData);
        dialog.render(true);
    }

    #createDragDropHandlers() {

        return this.options.dragDrop.map((d) => {
            d.permissions = {
                dragstart: this._canDragStart.bind(this),
                drop: this._canDragDrop.bind(this),
            };
      
            d.callbacks = {
                dragstart: this._onDragStart.bind(this),
                dragover: this._onDragOver.bind(this),
                drop: this._onDrop.bind(this),
            };
        
            return new foundry.applications.ux.DragDrop(d);
        });
    }

    async _addEquipment(item) {

        let equipment = this.actor.system.equipment;
        equipment[item._id] = item;
        await this.actor.update({["system.equipment"]: equipment});
    }

    /** Drag Drop Methods */
    _canDragStart(selector) {
            return true;
    }

    _canDragDrop(selector) {
        return true;
    }

    _onDragStart(event) {
        const target = event.currentTarget;

        // Extract the data you need
        let dragData = null;

        if (!dragData) {
            return;
        }

        // Set data transfer
        event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
    }

    async _onDrop(event) {
        const data = foundry.applications.ux.TextEditor.implementation.getDragEventData(event);
        console.log(event);
        console.log(data);

        const document = await fromUuid(data.uuid);
        console.log(document);

        switch (document.type) {
            case "item":
            case "weapon":
                await this._addEquipment(document);
                break;
            case "stunt":
                this._addStunt(document);
                break;
            default:
                // Not a recognised type, so just ignore it.
                return;    
        }
    }
}

