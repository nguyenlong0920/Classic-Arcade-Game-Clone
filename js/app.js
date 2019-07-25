// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.init();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';   
}

Enemy.prototype.init = function() {
    var rows = [68, 151, 234];
    var speeds = [125, 150, 175, 200];

    this.x = -250;
    this.y = rows[Math.floor(Math.random() * 3)];
    this.speed = speeds[Math.floor(Math.random() * 4)];
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Reset enemy'position
    if (this.x + (dt * this.speed) > 495) this.init(); 
    else this.x += (dt * this.speed);

    //Player meet bugs
    if (this.y === player.y) {
        if (!(player.x > this.x + 83  || player.x < this.x - 101 
            ||player.y > this.y + 101 || player.y < this.y - 83)) player.init();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage( Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.init();
    this.sprite = 'images/char-boy.png';
}
Player.prototype.init = function() {
    this.x = 202;
    this.y = 400;
}

Player.prototype.update = function() {
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys === 'up') {
        if (this.y > -15) this.y -= 83;
        //Reset player's position
        if (this.y === -15) this.init(); 
    }
    if (allowedKeys === 'down' && this.y <= 317) this.y += 83;

    //Restrict player area
    if (allowedKeys === 'left' && this.x >= 101) this.x -= 101;
    if (allowedKeys === 'right' && this.x <= 303) this.x += 101;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for(var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});