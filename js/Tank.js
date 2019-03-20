let i = 0;
addonUses = [0, 0, 0];

class Tank extends HexMover {
  constructor(texture, scene, map, x, y, size, username, addons, dev_id) {
    super(texture, scene, map, x, y, size, username, addons, dev_id);
  }
  printHealth() {
    console.log(this.health);
  }

  setAddons(dataInput) {
    this.dataInput = dataInput;
    for (i = 0; i < 3; i++) {
      if (dataInput.Controller.addons[i] !== null) {
        console.log(dataInput.Controller.addons[i]);

        this.addons.push(dataInput.Controller.addons[i]);
      }
    }
    console.log(this.addons);
  }

  addTankHealth(toAddHealth) {
    this.health = this.health + toAddHealth;
  }
  addTankMovement(toAddMovement) {
    this.tankMovementRange = toAddMovement;
  }
  addTankArmor(toAddArmor) {
    this.armor = this.armor + toAddArmor;
  }

  addWeapon(name, damage, range) {
    this.weapons.weaponName.push(name);
    this.weapons.weaponDamage.push(damage);
    this.weapons.weaponRange.push(range);
  }

  useAddon(name, i) {
    this.name = name;

    switch (name) {
      case "rocketEngine":
        if ( this.addonUses[i] < 1) {
          this.addTankMovement(3);
        }
        break;
      case "amphibious":
        this.canEnterWater = true;
        break;
      case "harrier":
        if ( this.addonUses[i] < 1) {
          this.addTankMovement(6);
        }
        break;
      case "adamantium":
        if ( this.addonUses[i] < 1) {
          this.addTankArmor(6);
          this.addTankMovement(-1);
        }
        break;
      case "gravyShield":
        if ( this.addonUses[i] < 2) {
          this.addTankArmor(1); // moet per turn
        }
        break;
      case "nanobots":
        //console.log(i);
        //console.log(this.addonUses);
        if ( this.addonUses[i] < 3) {
          this.addTankHealth(2);
        }
        console.log("hp = " + this.health);

        break;
      case "structuralStrengthening":
        //console.log("ree");

        if ( this.addonUses[i] < 1) {
          this.addTankHealth(5);
        }
        console.log("hp = " + this.health);
        break;
      case "Flammenwerpfer":
        if ( this.addonUses[i] < 1) {
          this.addWeapon("Flammenwerpfer", 8, 3);
        }
        break;
      case "laser":
        //console.log("yeet");
        if ( this.addonUses[i] < 1) {
          this.addWeapon("laser", 20, 99);
        }
        break;
      case "mines":
        if ( this.addonUses[i] < 1) {
          this.addWeapon("mines", 10, 0);
        }
        break;
      case "plasmaGun":
        if ( this.addonUses[i] < 1) {
          this.addWeapon("plasmaGun", 6, 90);
        }
        break;
      case "empBomb":
        if ( this.addonUses[i] < 1) {
          this.addWeapon("empBomb", 0, 0);
        }
        break;
      case "ram":
        if ( this.addonUses[i] < 1) {
          this.addWeapon("ram", 3, 0);
        }
        break;
      default:
        console.log("Contains addon that doesn't have any function.");
        break;
    }
  }
}
