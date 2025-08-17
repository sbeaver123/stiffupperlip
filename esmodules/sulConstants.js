

export default class sulConstants {

    static getCombatSkills() {
        return {
            "fighting": "SUL.skills.fighting",
            "shooting": "SUL.skills.shooting"
        }
    }

    static getSkills() {
        return {
            "academics": "SUL.skills.academics",
            "alertness": "SUL.skills.alertness",
            "arts": "SUL.skills.arts",
            "athletics": "SUL.skills.athletics",
            "charm": "SUL.skills.charm",
            "commerce": "SUL.skills.commerce",
            "contacts": "SUL.skills.contacts",
            "crafts": "SUL.skills.crafts",
            "crime": "SUL.skills.crime",
            "deceive": "SUL.skills.deceive",
            "drive": "SUL.skills.drive",
            "empathy": "SUL.skills.empathy",
            "equestrian": "SUL.skills.equestrian",
            "etiquette": "SUL.skills.etiquette",
            "fighting": "SUL.skills.fighting",
            "fortitude": "SUL.skills.fortitude",
            "investigate": "SUL.skills.investigate",
            "languages": "SUL.skills.languages",
            "occult": "SUL.skills.occult",
            "pilot": "SUL.skills.pilot",
            "physique": "SUL.skills.physique",
            "presence": "SUL.skills.presence",
            "sailing": "SUL.skills.sailing",
            "science": "SUL.skills.science",
            "shooting": "SUL.skills.shooting",
            "stealth": "SUL.skills.stealth",
            "survival": "SUL.skills.survival"
        }
    }

    static getSocialClasses() {
        return {
            "upper": "SUL.class.upper",
            "middle": "SUL.class.middle",
            "working": "SUL.class.working"
        }
    }

    static getTracks() {
        return {
            "health": "SUL.track.health",
            "composure": "SUL.track.composure",
            "rectitude": "SUL.track.rectitude",
            "resources": "SUL.track.resources"
        }
    }

    static makeHash(input) {
        return input.split('').map(v=>v.charCodeAt(0)).reduce((a,v)=>a+((a<<7)+(a<<3))^v).toString(16);
    }

    static async enrichEditorContent(value) {
        return await foundry.applications.ux.TextEditor.implementation.enrichHTML(value, {secrets:true, documents:true, async:true});
    }
}

