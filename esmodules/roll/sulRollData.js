
export default class RollData {

    skillName = "";
    skillValue = 0;
    taggedAspects = 0;
    modifier = 0;

    constructor(sName, sValue, tAspects, mod) {
        this.skillName = sName;
        this.skillValue = sValue;
        this.taggedAspects = tAspects;
        this.modifier = mod;
    }

}