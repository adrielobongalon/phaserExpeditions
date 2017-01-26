/*
       document : myGame.js, for firstphasergame
     created on : monday, october 31, 2016, 10:42 AM
         author : adrielo (audrey) bongalon
    description : js file for my game, for 11th grade video game programming expeditions course


                                      88
                                      88
                                      88
    ,adPPYYba,  88       88   ,adPPYb,88  8b,dPPYba,   ,adPPYba,  8b       d8
    ""     `Y8  88       88  a8"    `Y88  88P'   "Y8  a8P,,,,,88  `8b     d8'
    ,adPPPPP88  88       88  8b      :88  88          8PP"""""""   `8b   d8'
    88,    ,88  "8a,   ,a88  "8a,   ,d88  88          "8b,   ,aa    `8b,d8'
    `"8bbdP"Y8   `"YbbdP'Y8   `"8bbdP"Y8  88           `"Ybbd8"'      Y88'
                                                                     d8'
                                                                    d8'
*/

/* global Phaser */                                                             // tells the IDE that Phaser exists in another file




var canvasDimensions = {width: 800, height: 600};
var game = new Phaser.Game(canvasDimensions.width, canvasDimensions.height, Phaser.AUTO, "canvas");
var game_state = {};

var i = 0;




game_state.main = function() {};
game_state.main.prototype = {

/*
    8 888888888o    8 888888888o.    8 888888888888  8 8888           ,o888888o.            .8.          8 888888888o.
    8 8888    `88.  8 8888    `88.   8 8888          8 8888        . 8888     `88.         .888.         8 8888    `^888.
    8 8888     `88  8 8888     `88   8 8888          8 8888       ,8 8888       `8b       :88888.        8 8888        `88.
    8 8888     ,88  8 8888     ,88   8 8888          8 8888       88 8888        `8b     . `88888.       8 8888         `88
    8 8888.   ,88'  8 8888.   ,88'   8 8888888888    8 8888       88 8888         88    .8. `88888.      8 8888          88
    8 888888888P'   8 888888888P'    8 8888          8 8888       88 8888         88   .8`8. `88888.     8 8888          88
    8 8888          8 8888`8b        8 8888          8 8888       88 8888        ,8P  .8' `8. `88888.    8 8888         ,88
    8 8888          8 8888 `8b.      8 8888          8 8888       `8 8888       ,8P  .8'   `8. `88888.   8 8888        ,88'
    8 8888          8 8888   `8b.    8 8888          8 8888        ` 8888     ,88'  .888888888. `88888.  8 8888    ,o88P'
    8 8888          8 8888     `88.  8 888888888888  8 888888888888   `8888888P'   .8'       `8. `88888. 8 888888888P'
*/

	preload: function() {
	    game.load.image("black", "assets/blackBG.png");
        game.load.image("sky", "assets/sky.png");
        game.load.image("ground", "assets/platform.png");
        game.load.spritesheet("cash", "assets/cash-money.png", 92, 48);
        game.load.spritesheet("audrey", "assets/audreyPixelSprite.png", 136, 224);
        game.load.script("webfont", "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js");
	},








/*
        ,o888888o.     8 888888888o.    8 888888888888          .8.      8888888 8888888888  8 888888888888
       8888     `88.   8 8888    `88.   8 8888                 .888.           8 8888        8 8888
    ,8 8888       `8.  8 8888     `88   8 8888                :88888.          8 8888        8 8888
    88 8888            8 8888     ,88   8 8888               . `88888.         8 8888        8 8888
    88 8888            8 8888.   ,88'   8 8888888888        .8. `88888.        8 8888        8 8888888888
    88 8888            8 888888888P'    8 8888             .8`8. `88888.       8 8888        8 8888
    88 8888            8 8888`8b        8 8888            .8' `8. `88888.      8 8888        8 8888
    `8 8888       .8'  8 8888 `8b.      8 8888           .8'   `8. `88888.     8 8888        8 8888
       8888     ,88'   8 8888   `8b.    8 8888          .888888888. `88888.    8 8888        8 8888
        `8888888P'     8 8888     `88.  8 888888888888 .8'       `8. `88888.   8 8888        8 888888888888
*/

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);                        // creates the in-game physics from the phaser library

        // adds sprites
        game.add.sprite(0, 0, "sky");                                           // add sky background
        // game.add.sprite(25, 40, "cash");                                     // i don't need cash just floating there




        // add audrey sprite
        this.player = game.add.sprite(game.world.width - 50, game.world.height - 250, "audrey");
        this.player.scale.setTo(0.3, 0.3);                                      // resize audrey
        this.player.alpha = 0;

        this.player.animationDirX = 0;                                          // manages direction of audrey
        this.player.LR = "front";                                               // start off facing forwards
        this.player.animationCounter = 0;                                       // resets counter that makes her face forwards after waiting for some time

        // enable physics on the player
        game.physics.arcade.enable(this.player);                                // enable physics
        this.player.body.setSize(72, 224, 8, 0);                                // hitbox size management
        this.player.body.gravity.y = 0;                                         // start off in position (no gravity)
        this.player.body.bounce.y = 0.3;                                        // bounce
        this.player.canMoov = false;                                            // cannot move until spawned
        game.physics.arcade.setBounds(0, 0, game.world.width, game.world.height);
        this.player.body.collideWorldBounds = true;                             // makes sure you can't fall off the map

        // player animation
        this.player.animations.add("left", [0, 2, 1, 2], 5, true);              // order to of frames to run moving animation
        this.player.animations.add("right", [6, 4, 5, 4], 5, true);
        this.player.frame = 3;                                                  // start facing forwards

        // fades audrey in
        this.fadeAudreyAnimation = game.add.tween(this.player);
        this.fadeAudreyAnimation.to({alpha: 1}, 500, Phaser.Easing.Linear.None, false, 0, 0, false);
        this.fadeAudreyAnimation.onComplete.add(this.fadeMoney, this);




        // creates a group for the ground and platforms
        this.platforms = game.add.group();                                      // creates a group for all the platforms
        this.platforms.enableBody = true;                                       // applies game physics to that group
        this.platforms.alpha = 0;

        // creates the ground
        this.ground = this.platforms.create(0, game.world.height - 64, "ground");
        this.ground.scale.setTo(2, 2);                                          // scales to stretch across canvas
        this.ground.body.immovable = true;                                      // make ground immoveable

        // creates the platforms
        for (i = 0; i < 6; i++) {
            // top platform
            if (i == 0) {
                this.ledge1 = this.platforms.create(10, game.world.height / 8, "ground");
                this.ledge1.scale.setTo(0.5, 0.75);
                this.ledge1.body.immovable = true;
            }
            // next three
            else if (i >= 1 && i <= 3) {
                this.ledge2 = this.platforms.create(25 * Math.pow(i, 2) + 75 * i + 100, game.world.height * ((i + 1) / 8), "ground");
                this.ledge2.scale.setTo(0.3, 0.75);
                this.ledge2.body.immovable = true;
            }
            // bottom two
            else if (i >= 4) {
                this.ledge3 = this.platforms.create(-200 * i + 1200, game.world.height * ((i + 1) / 8), "ground");
                this.ledge3.scale.setTo(0.3, 0.75);
                this.ledge3.body.immovable = true;
            }
        }

        // fades the platforms group in
        this.fadePlatformsAnimation = game.add.tween(this.platforms);
        this.fadePlatformsAnimation.to({alpha: 1}, 500, Phaser.Easing.Linear.None, false, 0, 0, false);
        this.fadePlatformsAnimation.onComplete.add(this.fadeAudrey, this);




        this.money = game.add.group();                                          // create group for money
        this.money.enableBody = true;                                           // enable physics
        this.money.alpha = 0;

        // create the individual groups of cash
        for (i = 0; i < 11; i++) {
            this.cash = this.money.create(i * 65 + 25, 10, "cash");
            this.cash.scale.setTo(0.5, 0.5);
            this.cash.animations.add("rotate", [0, 1, 2, 3, 4, 5], 5, true);// order to of frames to run moving animation
            this.cash.frame = Math.floor(Math.random() * 6);                    // random frame (between 0 and 5)
            console.log(this.cash.frame);
            this.cash.body.gravity.y = 0;
            this.cash.body.bounce.y = 1;
        }

        // fades the money
        this.fadeMoneyAnimation = game.add.tween(this.money);
        this.fadeMoneyAnimation.to({alpha: 1}, 500, Phaser.Easing.Linear.None, false, 0, 0, false);
        this.fadeMoneyAnimation.onComplete.add(this.fadeScore, this);




        // keyboard controls
        this.arrowKeys = game.input.keyboard.createCursorKeys();




        // score display
        this.score = 0;
        this.scoreText = game.add.text(game.world.width - 100, 10, "score: " + this.score, {
            font: "20px Poppins",
            fill: "#00ffff"
        });
        this.scoreText.alpha = 0;

        // fades the score GUI in. note that this can be written on just 1 line (compared to other things i faded in)
        this.fadeScoreAnimation = game.add.tween(this.scoreText).to({alpha: 1}, 500, Phaser.Easing.Linear.None, false, 0, 0, false);




        // black box, for fading in
        this.black = game.add.sprite(0, 0, "black");
        this.black.alpha = 1;
        this.fadeInAnimation = game.add.tween(this.black);
        this.fadeInAnimation.to({alpha: 0}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.fadeInAnimation.onComplete.add(this.fadePlatforms, this);
        this.fadeOutAnimation = game.add.tween(this.black);
        this.fadeOutAnimation.onComplete.add(this.switchState, this);
        this.fadeOutAnimation.to({alpha: 1}, 1000, Phaser.Easing.Linear.None, false, 1750, 0, false);




        // to make sure the switchState function is called only once
        this.switching = false;
    },








/*
    8 8888      88  8 888888888o    8 888888888o.            .8.    8888888 8888888888  8 888888888888
    8 8888      88  8 8888    `88.  8 8888    `^888.        .888.         8 8888        8 8888
    8 8888      88  8 8888     `88  8 8888        `88.     :88888.        8 8888        8 8888
    8 8888      88  8 8888     ,88  8 8888         `88    . `88888.       8 8888        8 8888
    8 8888      88  8 8888.   ,88'  8 8888          88   .8. `88888.      8 8888        8 8888888888
    8 8888      88  8 888888888P'   8 8888          88  .8`8. `88888.     8 8888        8 8888
    8 8888      88  8 8888          8 8888         ,88 .8' `8. `88888.    8 8888        8 8888
    ` 8888     ,8P  8 8888          8 8888        ,88'.8'   `8. `88888.   8 8888        8 8888
      8888   ,d8P   8 8888          8 8888    ,o88P' .888888888. `88888.  8 8888        8 8888
       `Y88888P'    8 8888          8 888888888P'   .8'       `8. `88888. 8 8888        8 888888888888
*/

    update: function() {
        // game.debug.body(this.player);                                        // to view hitbox

        // collision detection
        game.physics.arcade.collide(this.player, this.platforms);                               // player on platforms
        game.physics.arcade.collide(this.money, this.platforms);                                // money on platforms
        game.physics.arcade.overlap(this.player, this.money, this.collectmoney, null, this);    // player on money




        // reset player velocity & direction
        this.player.body.velocity.x = 0;
        this.player.animationDirX = 0;
        
        // keypress detecton
        if (this.player.canMoov && this.arrowKeys.left.isDown) {
            this.player.animationDirX--;
        }
        if (this.player.canMoov && this.arrowKeys.right.isDown) {
            this.player.animationDirX++;
        }
        if (this.player.animationDirX < 0) {
            this.player.body.velocity.x = -150;
            this.player.animations.play("left");
            this.player.LR = "left";
            this.player.animationCounter = 0;
        }
        if (this.player.animationDirX > 0) {
            this.player.body.velocity.x = 150;
            this.player.animations.play("right");
            this.player.LR = "right";
            this.player.animationCounter = 0;
        }
        if (this.player.animationDirX == 0) {
            this.player.animations.stop();

            if (this.player.animationCounter >= 50) {
                this.player.frame = 3;
            }
            else if (this.player.LR == "left") {
                this.player.frame = 2;
            }
            else if (this.player.LR == "right") {
                this.player.frame = 4;
            }
        }

        this.player.animationCounter++;




        // jumping
        if (this.player.canMoov && this.arrowKeys.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -500;
        }




        // enable movement once audrey touches the ground after fading in
        if (!this.player.canMoov && this.player.body.touching.down) {
            this.player.canMoov = true;
            console.log("audrey movement enabled");
        }




        // money rotating animation
        this.money.forEach(function(cash) {
            cash.animations.play("rotate");
        });




        // win detection
        // if (this.score >= this.money.length && !this.switching) {
        if (this.score >= 11 && !this.switching) {
            this.switching = true;
            console.log("all money collected");
            this.fadeOutAnimation.start();
        }
    },








    collectmoney: function(player, cash) {
        cash.kill();                                                            // removes the cash
        this.score++;                                                           // updates the score
        this.scoreText.text = "score: " + this.score;                           // updates the text to display the score
    },








    fadePlatforms: function() {
        this.fadePlatformsAnimation.start();
        console.log("platforms spawned");
    },
    fadeAudrey: function() {
        this.fadeAudreyAnimation.start();                                       // fade in
        this.player.body.gravity.y = 1200;                                      // enable gravity
        console.log("audrey spawned");
    },
    fadeMoney: function() {
        this.fadeMoneyAnimation.start();
        this.money.forEach(function(cash) {
            cash.body.gravity.y = Math.floor(Math.random() * (350 - 250 + 1)) + 250;    // random number between 250 and 350
        });
        console.log("money spawned");
    },
    fadeScore: function() {
        this.fadeScoreAnimation.start();
        console.log("score GUI spawned");
    },








    switchState: function() {
        console.log("switching to end state");
        game.state.start("ending");
    }
};

game.state.add("main", game_state.main);
// game.state.start("main");