
//
// Draws the cold studios logo with a background of rotating snowflakes
//
function ColdSplash () {
    var snowflakes = [];
    var logo;
    var timers = [];

    // The following 4 functions are helper functions for setting up the position of the snowflake
    function get_x_velocity() {
        return -(1 / (utill.randomRange(5) + 1));
    };
    function get_y_velocity() {
        return 1/(utill.randomRange(2) + 1);
    };

    function get_rotation() {
        return 1/((utill.randomRange(10) - 5) + 1);
    };

    function get_start_position () {
        var xPos= utill.randomRange(screenSize.width);
        var yPos = - utill.randomRange(screenSize.height);
        return {x:xPos, y:yPos};
    }

    function initialize () {
		var canvas = document.getElementById('myCanvas');
		canvas.width = screenSize.width;
		canvas.height = screenSize.height;
		context = canvas.getContext('2d');

        var logoImg= new Image();
        logoImg.src = "images/splashscreen/logo.png";

        logo = {
            img: logoImg,
            position: {x:(screenSize.width/2)-(logoImg.width/2), y:(screenSize.height/2)-(logoImg.height/2)}
        }


        
        for (var i = 0; i < 100; i++) {
            var snowFlakeImage= new Image();
            snowFlakeImage.src = "images/splashscreen/icemedium" + utill.randomRange(4) + ".png";
            var snowFlakeObject = {
                img: snowFlakeImage,
                velocity: {x:get_x_velocity(),y:get_y_velocity()},
                position: get_start_position(),
                rotation: utill.randomRange(360) * 0.0174532925199432957,
                rotationDirection: utill.randomRange(2) - 1,
                rotationRate: 10
            };
            snowflakes.push(snowFlakeObject);
        };
        console.log(snowflakes[0]);

        timers.push(setInterval(update, ONE_FRAME_TIME));
        //timers.push(setTimeout(segue, 1000));
    }

    function update() {
        //clear the screen so we can draw the next step in the animation

        context.fillStyle = "rgb(45, 39, 111)";
        context.fillRect(0, 0, screenSize.width, screenSize.height);

        //draw all the snowflakes
        for (var i = 0; i < snowflakes.length; i++) {
            var snowflake = snowflakes[i];
            //update snowflakes position
            snowflake.position.x = snowflake.position.x + snowflake.velocity.x;
            snowflake.position.y = snowflake.position.y + snowflake.velocity.y;
            //update snowflake rotation
            snowflake.rotation += snowflake.rotationRate * 0.0174532925199432957;

            //console.log(snowflake.rotation);
            //rotate the snowflake
            // save old state
            context.save(); //push the context onto stack so we can restore after messing with the coordinate system
            // translate so origin is where the snowflake is

            context.translate(snowflake.position.x, snowflake.position.y);
            // draw the image with itself centered on the origin
            context.drawImage(snowflake.img, -snowflake.img.width/2, -snowflake.img.height/2);
            // rotate it by requried amount
            context.rotate(snowflake.rotation);
            console.log(snowflakes[0]);
            // restore old state
            context.restore();


            //check if the snowflake has gone off the left side of the screen
            if ((snowflake.position.x) < (0 -snowflake.img.width)) {
                snowflake.position.x = screenSize.width + snowflake.img.width;
            };

            // check if the snowflake has run off the bottom of the screen
            if (snowflake.position.y > screenSize.height + snowflake.img.height) {
                //reset the whole position of the snowflake
                snowflake.position = get_start_position();
            };

        };
        
        //draw our logo
        context.drawImage(logo.img, logo.position.x, logo.position.y);
    }
    // Moves onto the next scene
    function segue () {
        main();
    }
    initialize();
}
