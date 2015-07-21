// Base speeds for enemies
var baseSpeeds = [30, 35, 40, 45, 50, 55, 60, 65];

// Y positions for good alignment on the grid
var yPositions = [400, 310, 230, 145, 65, 0];

// Current game level.  
var gameLevel = 1;

// Enemies our player must avoid
var Enemy = function(startX, startY) {
    // Variables applied to each of our instances go here,
    // we"ve provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we"ve provided to easily load images
    this.sprite = "images/enemy-bug.png";
    this.x = startX;
    this.y = startY;
    this.selectSpeed();
};

// Update the enemy"s position, required method for game and check for collision with player
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x = this.x + this.speed * dt;
	
	//reset the position of the enemy entity
	if (this.x > 500) {
		this.x = -100;
		this.selectSpeed();
	}
	
	this.checkForColision();
};

//Determine of an Enemy overlaps a Player object
Enemy.prototype.checkForColision = function() {
	//Check for collision
	if (this.y == player.y) {
		if ((this.x <= player.x && player.x <= this.x + 50) ||
				(this.x <= player.x + 50 && player.x + 50 <= this.x + 50)) {
				
			// collision - call the player"s knockback function
			player.knockback();
		}
	}	
};

//Set this speed for a given enemy
Enemy.prototype.selectSpeed = function() {
	var speedIndex = Math.floor((Math.random() * 8));
	this.speed = baseSpeeds[speedIndex] * (1 + (gameLevel * 0.2));
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.rowIndex = 0;
    this.farthestThisRound = 0;
    this.y = yPositions[0];
    this.score = 0;
};

//Update the game based on the player"s stats
Player.prototype.update = function(dt) {
	gameLevel = Math.floor(this.score / 500) + 1;
	document.getElementById("playerScore").textContent = this.score;
	document.getElementById("playerLevel").textContent = gameLevel;
};

//Based on the allowed functions, move the player around the screen.
Player.prototype.handleInput = function(keyCode) {
	console.log(keyCode);
	var horizontalUnits = 100;  //movement from side to side.
	
	switch(keyCode) {
		case "left":
			if (this.x > 0) {this.x = this.x - horizontalUnits; }
			break;
		case "up":
			if (this.rowIndex < 5) {
				this.rowIndex++;
				this.y = yPositions[this.rowIndex];
				
				//If the new position is at the water, give 
				//extra points and reset the player"s position
				if (this.rowIndex == 5) {
					this.rowIndex = 0;
					this.y = yPositions[this.rowIndex];
					this.score = this.score + 100;
					this.farthestThisRound = 0;
				} else {
					//Give 10 points to player if this is the
					//farthest he has reached this round.
					if (this.rowIndex > this.farthestThisRound) {
						this.score = this.score + 10;
						this.farthestThisRound++;
					}
				}
			}
			break;
		case "right":
			if (this.x < 400) {this.x = this.x + horizontalUnits; }
			break;
		case "down":
			if (this.rowIndex >= 1) {
				this.rowIndex--;
				this.y = yPositions[this.rowIndex]
			}
			break;
	}
	this.update();
};

//When the player gets hit by an enemy, it is knocked back a row and points are deducted.
Player.prototype.knockback = function() {
	this.score = this.score - 100;
	this.handleInput("down");
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];

allEnemies.push(new Enemy(0,yPositions[4]));
allEnemies.push(new Enemy(0,yPositions[3]));
allEnemies.push(new Enemy(0,yPositions[2]));
	
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don"t need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
