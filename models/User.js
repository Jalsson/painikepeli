class User {
    constructor(key, points) {
      this.key = key;
      this.points = points;
    }
  
    getUserStats() {
      return ({
          "Key":this.key,
          "Age":this.points
      });
    }
  }

module.exports = User;