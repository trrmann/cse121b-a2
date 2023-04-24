// operators.js
let shipHealth = 3;
let shipAmmo = 3;
let targetHealth = 3;

function fireShip() {
  if (shipCanFire()) {
    shipAmmo--;
    if (isHit()) {
      targetHealth--;
      console.log("hit - targetHealth:", targetHealth);
    } else {
      console.log("miss");
    }
  } else {
    reloadShip();
    console.log("reloading, shipHealth:", shipHealth);
  }
}

function encounter() {
  console.log("You see a target");
  if (!isDestroyed(targetHealth) && !isDestroyed(shipHealth)) {
    fireShip();
    if (isDestroyed(targetHealth)) {
      console.log("Target eliminated");
    }
    if (isDestroyed(shipHealth)) {
      console.log("ship destroyed");
    }
  }
}

function isHit() {
    // should return true if a randomly generated number is greater than .5, false if it is less than .5
    return Math.random() > .5?true:false;
}
  
function shipCanFire() {
    // return true if the ships health is above 0 AND ammo is above 0 false otherwise
    return !isDestroyed(shipHealth) && (shipAmmo > 0);
}

function isDestroyed(health) {
    // return true if health is zero or less
    return health <= 0;
}

function reloadShip() {
    // reduce ship health by 1 and increase ammo by 3
    shipHealth --;
    shipAmmo ++;
}