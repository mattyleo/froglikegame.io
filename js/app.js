// Starting Level
let level = 1;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Set enemy at random posiontion on the x and y axies
    this.x = -100;
    // this.x = Math.floor((Math.random() *504) + -90);
    this.ybug = [41.5, 124.5, 207.5];
    this.y = this.ybug[Math.floor(Math.random() * this.ybug.length)];
    this.speed = Math.floor((Math.random() *20) +20) * level; //set the speed of the enemies
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt) 
        if (this.x > 550) {
            this.x = -100; //this will set the Starting position on the x axie
            this.y = this.ybug[Math.floor(Math.random() * this.ybug.length)]; //set a random position on the y axie
            // set the speed of the enemies
            this.speed = Math.floor((Math.random() * 20) + 20) * level;
        }
        
        // Check if if the enemy hit the player
        if ((this.x > player.x -75 &&
            this.x < player.x + 75) &&
            (this.y > player.y - 75 
            && this.y < player.y +75)) {

            //return player to start position
            player.x = 202;
            player.y = 373.5;

            //enemy random position
            allEnemies.forEach(function(enemy){
                enemy.x = -100;
                enemy.y = enemy.ybug[Math.floor(Math.random() * enemy.ybug.length)];
            });

            
            //rest the current level to 1
            level = 1;
            // reset the level counter to -1
            // level-- ;
            
            // // Game Over settings
            // if (level === 0) {
            //     player.loose = true;
            // }
        }
                
        // Display the current Level
        document.querySelector(".level span").innerHTML = level;
    };


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Character {
    constructor() {
        this.x = 202;
        this.y = 373.5;
        this.sprite = "images/char-boy.png";
    }
    // set the Hero sprite to the x and y axes that were set before
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Let's set-up and update the input property for the hero-s x and y axes.
    handleInput(input) {
        switch(input) {
            case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
            case 'up':
            this.y = this.y - 83;
            if(this.y < 0) {
                this.x = 202;
                this.y = 373.5;
                level++;
            } 
            break;
            case 'right':
            if (this.x < 404) {
                this.x = this.x + 101;
            }         
            break;
            case 'down':
            if (this.y < 373.5) {
                this.y = this.y +83;
            }
            break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [new Enemy(), new Enemy(), new Enemy()];
const player = new Character();
Character.prototype.update = function(dt) {

};


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