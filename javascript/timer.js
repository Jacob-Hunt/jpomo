// Timer class for Pomodoro Clock

var Timer = function(){

  // Root variable for accessing parent scope
  var thisTimer = this;

  // HTML5 canvas for timer
  this.canvas = {
    // Canvas context
    ctx: document.getElementById("timer").getContext("2d"),

    // Getter function for canvas.width
    get width(){
      return this.ctx.canvas.width;
    },

    // Getter function for canvas.height
    get height(){
      return this.ctx.canvas.height;
    }
  };


  // Circular progress bar
  this.timer = {
    
    // * * * MAIN INTERFACE WRAPPER * * * //
    api: {
      // Function for testing loader
      test: function(){
	thisTimer.timer.api.incrimentTo(100);
      },

      // Incriment thisTimer.timer.to a value
      incrimentTo: function(num){
	thisTimer.timer.incrimentTo(num);
      },

      // Render to canvas
      render: function(){
	thisTimer.timer.render();
      },

      // Setter functions for config object
      set: {
	barWidth: function(num){
	  thisTimer.timer.config.barWidth = num;
	},
	barColor: function(colorStr){
	  thisTimer.timer.config.barColor = colorStr;
	},
	barBgColor: function(colorStr){
	  thisTimer.timer.config.barBgColor = colorStr;
	},
	textColor: function(colorStr){
	  thisTimer.timer.config.textColor = colorStr;
	},
	textWeight: function(str){
	 thisTimer.timer. config.textWeight = str;
	},
	textSize: function(num){
	  thisTimer.timer.config.textSize = num;
	},
	textFamily: function(str){
	  thisTimer.timer.config.textFamily = str;
	},
	textContent: function(){
	  console.log("Text content must be set manually in Timer.config object");
	},
      },
    },

    // * * * CONFIG OBJECT * * * //
    config: {

      // Width of load bar in canvas pixels
      barWidth: 10,

      // Color of load bar
      barColor: "#fff",

      // Color of unthisTimer.timer.portion of load bar
      barBgColor: "#080",

      // Color of text in center of load bar
      textColor: "#fff",

      // Font to use for text in center of load bar
      textWeight: "bold",
      textSize: 40,
      textFamily: "arial",
      get textFont(){
	return (thisTimer.timer.config.textWeight + " " 
	      + thisTimer.timer.config.textSize.toString() + "px "
	      + thisTimer.timer.config.textFamily);
      },

      // Edit return value to set text for middle of loader
      getText: function(){
	return ("00:" + thisTimer.timer.percentLoaded.toString());
      },
    },


    // * * * CONSTANT PROPERTIES * * * //

    // Start load bar at 12:00 position
    START: 4.72,
    // Number of milliseconds between incriment refreshes
    INCRIMENT_RATE: 50,


    // * * * VARIABLE PROPERTIES  * * * //
    percentLoaded: 0,
    diff: undefined,
    intervalTimer: undefined,


    // * * * METHODS * * * //
    render: function(){

      // Get amount of bar to show
      thisTimer.timer.diff = ((thisTimer.timer.percentLoaded / 100) * Math.PI*2*10).toFixed(2);

      // Clear canvas
      canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set style variables
      canvas.ctx.lineWidth = thisTimer.timer.config.barWidth;
      canvas.ctx.font = thisTimer.timer.config.textFont;

      // Add center text
      canvas.ctx.fillStyle = thisTimer.timer.config.textColor;
      canvas.ctx.textAlign = "center";
      canvas.ctx.fillText(thisTimer.timer.config.getText(),
		   canvas.width / 2,
		   (canvas.height / 2) + (thisTimer.timer.config.textSize / 2),
		   canvas.width);

      // Draw background for progress bar
      canvas.ctx.strokeStyle = thisTimer.timer.config.barBgColor;
      canvas.ctx.beginPath();
      canvas.ctx.arc(canvas.width / 2, 
		     canvas.height / 2, 
		     (canvas.height / 2) - (canvas.ctx.lineWidth / 2) - 5,
		     0,
		     Math.PI * 2,
		     false);
      canvas.ctx.stroke();

      // Draw circular progress bar
      canvas.ctx.strokeStyle = thisTimer.timer.config.barColor;
      canvas.ctx.beginPath();
      canvas.ctx.arc(canvas.width / 2, 
		     canvas.height / 2, 
		     (canvas.height / 2) - (canvas.ctx.lineWidth / 2) - 5,
		     thisTimer.timer.START,
		     thisTimer.timer.diff/10 + thisTimer.timer.START,
		     false);
      canvas.ctx.stroke();
    },


    // Incriment counter by one
    incriment: function(limit){
      // If thisTimer.timer.incriments to limit
      if(thisTimer.timer.percentLoaded >= limit){
	return 1;
      } else {
	// Incriment
	thisTimer.timer.percentLoaded++;
	// Return success code
	return 0;
      }
    },

    // Incriment counter to a value
    incrimentTo: function(num){
      thisTimer.intervalTimer = setInterval(function(){
	if(thisTimer.timer.incriment(num) > 0){
	  clearTimeout(thisTimer.intervalTimer);
	}
	thisTimer.timer.render();
      }, thisTimer.INCRIMENT_RATE);
    },

  }

  // Initial render
  thisTimer.timer.render();
  return thisTimer;
};
