class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? "open" : "closed";
    console.log(
      `Brand: ${this.#brand}, Model: ${this.#model}, Speed: ${this.speed}, Trunk: ${trunkStatus}`,
    );
  }
  go() {
    if (!this.isTrunkOpen) {
      this.speed += 5;
    }
    if (this.speed > 200) {
      this.speed = 200;
    }
  }
  break() {
    this.speed -= 5;
    if (this.speed < 0) {
      this.speed = 0;
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }
  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;
  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;
    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log("race cars don't have trunks");
  }
  closeTrunk() {
    console.log("race cars don't have trunks");
  }
}

const car1 = new Car({
  brand: "Toyota",
  model: "Corolla",
});

const car2 = new Car({
  brand: "Tesla",
  model: "Model 3",
});

const raceCar1 = new RaceCar({
  brand: "Ferrari",
  model: "F1",
  acceleration: 50,
});

raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.displayInfo();
