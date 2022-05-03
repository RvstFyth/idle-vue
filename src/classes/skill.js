const skillsHelper = require('../helpers/skills');

class Skill {
  constructor(xp) {
    this.xp = parseInt(xp);
    this.calculateProperties();
  }

  addXP(xp) {
    this.xp += parseInt(xp);
    this.calculateProperties();
  }

  calculateProperties() {
    this.level = skillsHelper.levelForXp(this.xp);
    this.nextLevel = skillsHelper.xpForLevel(this.level + 1);
    this.previousLevel = skillsHelper.xpForLevel(this.level);
    this.remainder = this.nextLevel - this.xp;

    const diff = this.nextLevel - this.previousLevel;
    const progress = this.xp - this.previousLevel;
    this.remainderPercentage = Math.floor(progress / diff * 100);
  }
}

module.exports = Skill;
