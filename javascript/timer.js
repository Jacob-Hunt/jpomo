// Timer class for Pomodoro Clock

var Timer = function(){

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

    // Variable for accessing parent scope
    var thisTimer = this;

    // * * * MAIN INTERFACE WRAPPER * * * //
    api: {
      // Function for testing loader
      test: function(){
	thisTimer.api.incrimentTo(100);
      },

      // Incriment thisTimer.to a value
      incrimentTo: function(num){
	thisTimer.incrimentTo(num);
      },

      // Render to canvas
      render: function(){
	thisTimer.render();
      },

      // Setter functions for config object
      set: {
	barWidth: function(num){
	  thisTimer.config.barWidth = num;
	},
	barColor: function(colorStr){
	  thisTimer.config.barColor = colorStr;
	},
	barBgColor: function(colorStr){
	  thisTimer.config.barBgColor = colorStr;
	},
	textColor: function(colorStr){
	  thisTimer.config.textColor = colorStr;
	},
	textWeight: function(str){
	 thisTimer. config.textWeight = str;
	},
	textSize: function(num){
	  thisTimer.config.textSize = num;
	},
	textFamily: function(str){
	  thisTimer.config.textFamily = str;
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

      // Color of unthisTimer.portion of load bar
      barBgColor: "#080",

      // Color of text in center of load bar
      textColor: "#fff",

      // Font to use for text in center of load bar
      textWeight: "bold",
      textSize: 40,
      textFamily: "arial",
      get textFont(){
	return (this.textWeight + " " 
	      + this.textSize.toString() + "px "
	      + this.textFamily);
      },

      // Edit return value to set text for middle of loader
      getText: function(){
	return ("00:" + thisTimer.percentLoaded.toString());
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
      thisTimer.diff = ((thisTimer.percentLoaded / 100) * Math.PI*2*10).toFixed(2);

      // Clear canvas
      canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set style variables
      canvas.ctx.lineWidth = this.config.barWidth;
      canvas.ctx.font = this.config.textFont;

      // Add center text
      canvas.ctx.fillStyle = this.config.textColor;
      canvas.ctx.textAlign = "center";
      canvas.ctx.fillText(this.config.getText(),
		   canvas.width / 2,
		   (canvas.height / 2) + (this.config.textSize / 2),
		   canvas.width);

      // Draw background for progress bar
      canvas.ctx.strokeStyle = this.config.barBgColor;
      canvas.ctx.beginPath();
      canvas.ctx.arc(canvas.width / 2, 
		     canvas.height / 2, 
		     (canvas.height / 2) - (canvas.ctx.lineWidth / 2) - 5,
		     0,
		     Math.PI * 2,
		     false);
      canvas.ctx.stroke();

      // Draw circular progress bar
      canvas.ctx.strokeStyle = this.config.barColor;
      canvas.ctx.beginPath();
      canvas.ctx.arc(canvas.width / 2, 
		     canvas.height / 2, 
		     (canvas.height / 2) - (canvas.ctx.lineWidth / 2) - 5,
		     thisTimer.START,
		     thisTimer.diff/10 + thisTimer.START,
		     false);
      canvas.ctx.stroke();
    },


    // Incriment counter by one
    incriment: function(limit){
      // If thisTimer.incriments to limit
      if(thisTimer.percentLoaded >= limit){
	return 1;
      } else {
	// Incriment
	thisTimer.percentLoaded++;
	// Return success code
	return 0;
      }
    },

    // Incriment counter to a value
    incrimentTo: function(num){
      this.intervalTimer = setInterval(function(){
	if(thisTimer.incriment(num) > 0){
	  clearTimeout(this.intervalTimer);
	}
	thisTimer.render();
      }, this.INCRIMENT_RATE);
    },

  }
};
