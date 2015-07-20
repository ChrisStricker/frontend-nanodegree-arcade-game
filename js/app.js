// Current game level
var gameLevel = 3;

// Enemies our player must avoid
var Enemy = function(startX, startY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = startX;
    this.y = startY;
    this.selectSpeed();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x = this.x + this.speed * dt;
	if (this.x > 500) {
		this.x = -100;
		this.selectSpeed();
	}
}

Enemy.prototype.selectSpeed = function() {
	var speedSets = [[20,30,40,50],
	                 [50,60,70,80],
	                 [70,80,90,100],
	                 [90,100,110,120]];
	
	var speedIndex = Math.floor((Math.random() * 4));
	this.speed = speedSets[gameLevel][speedIndex];
	
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //TODO: Add sprite image path
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}

Player.prototype.update = function(dt) {
    
}

Player.prototype.handleInput = function(keyCode) {
	console.log(keyCode);
	var horizontalUnits = 100;
	var verticalUnits = 80;
	
	switch(keyCode) {
		case 'left':
			if (this.x > 0) {this.x = this.x - horizontalUnits; }
			break;
		case 'up':
			if (this.y > 0) {this.y = this.y - verticalUnits; }
			console.log(this.y);
			break;
		case 'right':
			if (this.x < 400) {this.x = this.x + horizontalUnits; }
			break;
		case 'down':
			if (this.y < 400) {this.y = this.y + verticalUnits; }
			console.log(this.y);
			break;
	}
	this.update();
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var player = new Player();
//player.render();
var allEnemies = [];
allEnemies.push(new Enemy(0,65));
allEnemies.push(new Enemy(0,145));
allEnemies.push(new Enemy(0,230));
allEnemies.push(new Enemy(0,310));
	
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
