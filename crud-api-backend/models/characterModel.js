// Clase simple para representar un personaje
class Character {
    constructor(id, name, talent, gender, height, weight, birthday, image) {
      this.id = id;
      this.name = name;
      this.talent = talent;
      this.gender = gender;
      this.height = height;
      this.weight = weight;
      this.birthday = birthday;
      this.image = image;
    }
  
    // Método para validar datos básicos
    static validate(characterData) {
      const requiredFields = ['name', 'talent', 'gender'];
      const missingFields = requiredFields.filter(field => !characterData[field]);
      
      if (missingFields.length > 0) {
        return {
          valid: false,
          message: `Missing required fields: ${missingFields.join(', ')}`
        };
      }
      
      return { valid: true };
    }
  }
  
  module.exports = Character;