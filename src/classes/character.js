const Skill = require('./skill');

class Character {
  constructor(name = '') {
    this.data = {
      name,
      gold: 0,
      gear: {
        axe: 1,
        pickaxe: 1,
      },
      skills: {
        woodcutting: new Skill(1),
        firemaking: new Skill(1),
        fishing: new Skill(1),
        cooking: new Skill(1),
        mining: new Skill(1),
        smithing: new Skill(1),
        prayer: new Skill(1),
        constitution: new Skill(1154),
        crafting: new Skill(1),
        fletching: new Skill(1),
        runecrafting: new Skill(1),
        dungeoneering: new Skill(1),
        attack: new Skill(1),
        strength: new Skill(1),
        defence: new Skill(1),
        ranged: new Skill(1),
        magic: new Skill(1),
      },
    };
  }

  fromJSON(json) {
    this.data = JSON.parse(json);
    const ogSkills = { ...this.data.skills };
    this.data.skills = {};

    Object.entries(ogSkills).forEach(([key, value]) => {
      this.data.skills[key] = new Skill(value);
    });
  }

  toJSON() {
    const data = { ...this.data };
    data.skills = {};

    Object.keys(this.data.skills).forEach((key) => {
      data.skills[key] = this.data.skills[key].xp;
    });

    return JSON.stringify(data);
  }
}

module.exports = Character;
