// class Elephant {
//   constructor(pWeight) {
//     this.weight = pWeight;
//     this.createElement();
//   }
//   //___________________________________________________

//   createElement() {
//     this.element = document.createElement("div");
//     let atext = document.createElement("p");
//     atext.innerHTML = "The Elephant Weight is:" + this.weight + "kg";
//     let aImage = document.createElement("img");
//     aImage.src = "./images/img01.jpg";
//     this.element.appendChild(aImage);
//     this.element.appendChild(atext);
//     return this.element;
//   }
// }
//_____________________________________________________________________

// let aList = document.getElementById("Animals_div");

// let aAnimal1 = new Elephant(780);
// let aAnimal2 = new Elephant(650);
// let aAnimal3 = new Elephant(300);
// let aAnimal4 = new Elephant(500);

// aList.appendChild(aAnimal1.element);
// aList.appendChild(aAnimal2.element);
// aList.appendChild(aAnimal3.element);
// aList.appendChild(aAnimal4.element);

let aData = [
  { type: "elephant", weight: 660 },
  { type: "rabbit", speed: 44 },
  { type: "penguin", swimmingSpeed: 750 },
  { type: "elephant", weight: 600 },
  { type: "penguin", swimmingSpeed: 60 },
];

//creating Animal class that define the type of the animal, create and return an HTML element with the animal image.
class Animal {
  constructor(type) {
    this.type = type;
    this.createElement();
  }

  delete() {
    this.element.remove();
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.className = this.type;
    let image = document.createElement("img");
    image.src = `./images/${this.type}.jpg`;
    image.alt = this.type;
    this.element.appendChild(image);
    return this.element;
  }
}

//creating more specific animals classes, with specific parameter and a specific paragraph each, that extends the Animal abilities.
class Elephant extends Animal {
  constructor(type, weight, element) {
    super(type, element);
    this.weight = weight;
    let text = document.createElement("p");
    text.innerHTML = `The ${this.type} Weight is: ${this.weight} kg`;
    this.element.appendChild(text);
  }
}

class Rabbit extends Animal {
  constructor(type, speed, element) {
    super(type, element);
    this.speed = speed;
    let text = document.createElement("p");
    text.innerHTML = `The ${this.type} Speed is: ${this.speed} kmh`;
    this.element.appendChild(text);
  }
}

class Penguin extends Animal {
  constructor(type, swimmingSpeed, element) {
    super(type, element);
    this.swimmingSpeed = swimmingSpeed;
    let text = document.createElement("p");
    text.innerHTML = `The ${this.type} Swimming Speed is: ${this.swimmingSpeed} kmh`;
    this.element.appendChild(text);
  }
}

//creating Zoo class the resive array of animals
class Zoo {
  constructor(animals) {
    this.animals = animals;
    this.zoo = document.getElementById("Animals_div");
    this.deletedAnimals = [];
    this.animalsToDelete = [];
    this.openTheZoo();
  }

  openTheZoo() {
    let animalInstance;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete all";
    deleteBtn.addEventListener("click", () =>{ this.deleteAllExeptPenguins(this) });

    let returnBtn = document.createElement("button");
    returnBtn.innerHTML = "return all";
    returnBtn.addEventListener("click", () =>{ this.returnAnimals(this) });


    this.zoo.appendChild(deleteBtn)
    this.zoo.appendChild(returnBtn)

    this.animals.forEach((animal) => {
      switch (animal.type.toLowerCase()) {
        case "elephant":
          animalInstance = new Elephant(animal.type.toLowerCase(), animal.weight);
          this.enterAnimal(animalInstance);
          break;
        case "rabbit":
          animalInstance = new Rabbit(animal.type.toLowerCase(), animal.speed);
          this.enterAnimal(animalInstance);
          break;
        case "penguin":
          animalInstance = new Penguin(animal.type.toLowerCase(), animal.swimmingSpeed);
          this.enterAnimal(animalInstance);
          break;
      }
    });
  }

  enterAnimal(animal){
    if(animal.type !== "penguin") this.animalsToDelete.push(animal);
    animal.element.addEventListener("click", () => {this.saveCurrentAnimal(animal)});
    this.zoo.appendChild(animal.element);
  }

  saveCurrentAnimal(animal) {
    this.deletedAnimals.push(animal);
    animal.delete();
  }

  deleteAllExeptPenguins(zoo){

    zoo.animalsToDelete.forEach(animal => {
      this.deletedAnimals.push(animal);
      animal.delete();
    })
  }

  returnAnimals(zoo){
    console.log(zoo.deletedAnimals)
    zoo.deletedAnimals.forEach(animal => { zoo.enterAnimal(animal)});
    zoo.deletedAnimals = [];
  }
}
let zoo = new Zoo(aData);
