
const fields = foundry.data.fields;

export class sulCharacter extends foundry.abstract.DataModel {
    static defineSchema() {
        return {
            "name": new fields.StringField({nullable: false, required: true, initial: ""}),
            "socclass": new fields.StringField({nullable: false, required: true, initial: "upper"}),
            "baseres": new fields.NumberField({required: true, integer: true, initial: 4}),
            "fatepoints": new fields.NumberField({required: true, integer: true, initial: 7}),
            "aspects": new fields.ObjectField({nullable: false, required: true, initial: {}}),
            "tracks": new fields.SchemaField({
                "health": new fields.SchemaField({
                    "boxes": new fields.NumberField({required: true, integer: true, initial: 3}),
                    "filled": new fields.NumberField({required: true, integer: true, initial: 0}),
                    "rollable": new fields.BooleanField({required:true, initial:false, nullable:false})
                }),
                "composure": new fields.SchemaField({
                    "boxes": new fields.NumberField({required: true, integer: true, initial: 3}),
                    "filled": new fields.NumberField({required: true, integer: true, initial: 0}),
                    "rollable": new fields.BooleanField({required:true, initial:false, nullable:false})
                }),
                "rectitude": new fields.SchemaField({
                    "boxes": new fields.NumberField({required: true, integer: true, initial: 5}),
                    "filled": new fields.NumberField({required: true, integer: true, initial: 0}),
                    "rollable": new fields.BooleanField({required:true, initial:false, nullable:false})
                }),
                "resources": new fields.SchemaField({
                    "boxes": new fields.NumberField({required: true, integer: true, initial: 3}),
                    "filled": new fields.NumberField({required: true, integer: true, initial: 0}),
                    "rollable": new fields.BooleanField({required:true, initial:false, nullable:false})
                })
            }),
            "consequences": new fields.SchemaField({
                "mild": new fields.StringField({initial: ""}),
                "moderate": new fields.StringField({initial: ""}),
                "severe": new fields.StringField({initial: ""}),
            }),
            "skills": new fields.SchemaField({
                "academics": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.academics"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "alertness": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.alertness"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "arts": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.arts"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "athletics": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.athletics"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "charm": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.charm"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "commerce": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.commerce"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "contacts": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.contacts"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "crafts": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.crafts"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "crime": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.crime"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "deceive": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.deceive"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "drive": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.drive"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "empathy": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.empathy"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "equestrian": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.equestrian"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "etiquette": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.etiquette"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "fighting": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.fighting"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "fortitude": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.fortitude"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "investigate": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.investigate"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "languages": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.languages"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "occult": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.occult"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "pilot": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.pilot"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "physique": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.physique"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "presence": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.presence"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "sailing": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.sailing"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "science": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.science"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "shooting": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.shooting"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "stealth": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.stealth"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                }),
                "survival": new fields.SchemaField({
                    "label": new fields.StringField({initial: "SUL.skills.survival"}),
                    "value": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0})
                })
            }),
                
            "stunts": new fields.ObjectField({nullable: false, required: true, initial: {}}),
            "biography": new fields.HTMLField({}),
            "notes": new fields.HTMLField({}),
            "equipment": new fields.ObjectField({nullable: false, required: true, initial: {}})
        };
    }
}

export class sulMajorNpc extends foundry.abstract.DataModel {
    static defineSchema() {
        return {
            "name": new fields.StringField({"nullable": false, "required": true, "initial": ""}),
            "aspects": new fields.ObjectField({"nullable": false, "required": true, "initial": {}}),
            "stress": new fields.SchemaField({
                "boxes": new fields.NumberField({required: true, integer: true, initial: 3}),
                "filled": new fields.NumberField({required: true, integer: true, initial: 0}),
            }),
            "skills": new fields.ObjectField({}),
            "stunts": new fields.ObjectField({}),
            "equipment": new fields.ObjectField({}),
            "description": new fields.HTMLField({})
        };
    }
}

export class sulMinorNpc extends foundry.abstract.DataModel {
    static defineSchema() {
        return {
            "name": new fields.StringField({"nullable": false, "required": true, "initial": ""}),
            "rating": new fields.NumberField({required: true, integer: true, min: 0, max: 5, initial: 0}),
            "stress": new fields.SchemaField({
                "boxes": new fields.NumberField({required: true, integer: true, initial: 0}),
                "filled": new fields.NumberField({required: true, integer: true, initial: 0}),
            }),
            "equipment": new fields.ObjectField({nullable: false, required: true, initial: {}}),
            "description": new fields.HTMLField({})
        }
    }
}

export class sulItem extends foundry.abstract.DataModel {
    static defineSchema() {
        return {
            "name": new fields.StringField({"nullable": false, "required": true, "initial": ""}),
            "description": new fields.HTMLField({})
        }
    }
}

export class sulStunt extends foundry.abstract.DataModel {
    static defineSchema() {
        return {
            "name": new fields.StringField({"nullable": false, "required": true, "initial": ""}),
            "description": new fields.HTMLField({"nullable": false, "required": true, "initial": ""}),
            "affectsSkills": new fields.ArrayField(new fields.StringField({"nullable": false, "required": true, "initial": ""})),
            "affectsTrack": new fields.StringField({"nullable": false, "required": false, "initial": ""}),
            "modifier": new fields.NumberField({"required": true, "integer": true, "initial": 0})
        };
    }
}

export class sulWeapon extends foundry.abstract.DataModel {
    static defineSchema() {
        return {
            "name": new fields.StringField({"nullable": false, "required": true, "initial": ""}),        
            "accuracy": new fields.NumberField({"required": true, "integer": true, "initial": 0}),
            "damage": new fields.NumberField({"required": true, "integer": true, "initial": 0}),
            "skill": new fields.StringField({}),
            "description": new fields.HTMLField({})
        };
    }
}
