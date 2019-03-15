class Tank extends HexMover {
  constructor(texture, scene, map, x, y, size, username, addons, dev_id) {
    super(texture, scene, map, x, y, size, username, addons, dev_id);
  }
  printHealth() {
    console.log(this.health);
  }

  setAddons() {
    for (i = 0; i < this.addons.length; i++) {
      if (dataInput.Controller.addons[i] !== null) {
        this.addons[i] = dataInput.Controller.addons[i];
      }
    }
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

  useAddon(name, use, i) {
    this.name = name;
    this.use = use;

    switch (name) {
      case "rocketEngine":
        if (use && addonUses[i] < 1) {
          addTankMovement(3);
        }
        break;
      case "amphibious":
        tank.canEnterWater = true;
        break;
      case "harrier":
        if (use && addonUses[i] < 1) {
          addTankMovement(6);
        }
        break;
      case "adamantium":
        if (use && addonUses[i] < 1) {
          addTankArmor(6);
          addTankMovement(-1);
        }
        break;
      case "gravyShield":
        if (use && addonUses[i] < 2) {
          addTankArmor(1); // moet per turn
        }
        break;
      case "nanobots":
        if (use && addonUses[i] < 3) {
          addTankHealth(2);
        }
        console.log("hp = " + tank.health);

        break;
      case "structuralStrengthening":
        if (use && addonUses[i] < 1) {
          addTankHealth(5);
        }
        console.log("hp = " + tank.health);

        break;
      case "Flammenwerpfer":
        if (use && addonUses[i] < 1) {
          addWeapon("Flammenwerpfer", 8, 3);
        }
        break;
      case "laser":
        if (use && addonUses[i] < 1) {
          addWeapon("laser", 3, 99);
        }
        break;
      case "mines":
        if (use && addonUses[i] < 1) {
          addWeapon("mines", 10, 0);
        }
        break;
      case "plasmaGun":
        if (use && addonUses[i] < 1) {
          addWeapon("plasmaGun", 6, 90);
        }
        break;
      case "empBomb":
        if (use && addonUses[i] < 1) {
          addWeapon("empBomb", 0, 0);
        }
        break;
      case "ram":
        if (use && addonUses[i] < 1) {
          addWeapon("ram", 3, 0);
        }
        break;
      default:
        console.log("Contains addon that doesn't have any function.");
        break;
    }
  }
}
