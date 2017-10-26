// Timer class for Pomodoro Clock

class Timer {
  constructor(divID){

    // Variable for accessing root scope of Timer class
    var root = this;


    // Constant Definitions
    this.constants = {  

      // Div to attach canvas to
      DIV_ID: divID,

      // Start load bar at 12:00 position
      START: 4.72,

      // Number of milliseconds between incriment refreshes
      INCRIMENT_RATE: 50,

      // Maximum percentage that progress bar can be filled to
      MAX_LIMIT: 100,

    };   


    // Private variables
    this.variables = {
      percentLoaded: 0,
      diff: undefined,
      intervalTimer: undefined,
    };


    // HTML5 canvas for timer display
    this.canvas = {

      ctx: document.getElementById(root.constants.DIV_ID).getContext("2d"),

      // Getter function for canvas.width
      get width(){
        return this.ctx.canvas.width;
      },

      // Getter function for canvas.height
      get height(){
        return this.ctx.canvas.height;
      },

    };


    // Configurable variables for customizing progress bar
    this.config = {

      // Width of progress bar in canvas-pixel-units
      barWidth: 10,

      // Color of progress bar
      barColor: "#fff",

      // Color of unloaded portion of progress bar
      barBgColor: "#080",

      // Font information for text in center of progress bar
      textColor: "#fff",
      textWeight: "bold",
      textSize: 40,
      textFamily: "arial",
    };

    root.config.getTextFont = function(){
      return (root.config.textWeight + " " 
      + root.config.textSize.toString() + "px "
      + root.config.textFamily);
    };

    // Sets text for middle of progress bar; modify this function to
    // customize center text
    root.config.getText = function(){
      var pcntFinished = root.variables.percentLoaded.toString();
      return ("00:" + pcntFinished);
    };


    // Private methods
    this.methods = {


      render: function(){

        // Get amount of bar to show
        root.variables.diff = ((root.variables.percentLoaded / 100) * Math.PI*2*10).toFixed(2);

        // Clear canvas
        root.canvas.ctx.clearRect(0, 0, root.canvas.width, root.canvas.height);

        // Set style variables
        root.canvas.ctx.lineWidth = root.config.barWidth;
        root.canvas.ctx.font = root.config.getTextFont();

        // Add center text
        root.canvas.ctx.fillStyle = root.config.textColor;
        root.canvas.ctx.textAlign = "center";
        root.canvas.ctx.fillText(root.config.getText(),
                                      root.canvas.width / 2,
                                      (root.canvas.height / 2) + (root.config.textSize / 2),
                                      root.canvas.width);

        // Draw background for progress bar
        root.canvas.ctx.strokeStyle = root.config.barBgColor;
        root.canvas.ctx.beginPath();
        root.canvas.ctx.arc(root.canvas.width / 2, 
                       root.canvas.height / 2, 
                       (root.canvas.height / 2) - (root.canvas.ctx.lineWidth / 2) - 5,
                       0,
                       Math.PI * 2,
                       false);
        root.canvas.ctx.stroke();

        // Draw circular progress bar
        root.canvas.ctx.strokeStyle = root.config.barColor;
        root.canvas.ctx.beginPath();
        root.canvas.ctx.arc(root.canvas.width / 2, 
                       root.canvas.height / 2, 
                       (root.canvas.height / 2) - (root.canvas.ctx.lineWidth / 2) - 5,
                       root.constants.START,
                       root.variables.diff/10 + root.constants.START,
                       false);
        root.canvas.ctx.stroke();
      },


      // Incriment counter by one
      incriment: function(limit){
        // If timer incriments to or past limit
        if(root.variables.percentLoaded >= limit
        || root.variables.percentLoaded >= root.constants.MAX_LIMIT){
          // Return failure code
          return 1;
        } else {
          // Incriment
          root.variables.percentLoaded++;
          // Return success code
          return 0;
        }
      },


      // Incriment counter to a value
      incrimentTo: function(num){
        root.variables.intervalTimer = setInterval(function(){
          if(root.methods.incriment(num) > 0){
            clearTimeout(root.variables.intervalTimer);
          }
          root.methods.render();
        }, root.constants.INCRIMENT_RATE);
      },

    };

    // Render to canvas on instance creation
    root.methods.render();

  }

  // Public functions

  test(){
    // Test the widget by incrimenting to 100%
    this.methods.incrimentTo(100);
  }

  incrimentTo(num){
    // Provide public access to incrimentTo method
    this.methods.incrimentTo(num);
  }

  render(){
    // Provide public access to render method
    this.methods.render();    
  }

  getDivID(){
    // Returns div to attach timer widget to
    return this.divID;
  }

  getCanvas(){
    // Returns javaScript object for html5 canvas used for timer
    return this.canvas;
  }

  set(setObj){
    // Set configurable properties of timer; to replace old setter
    // functions for config object

    // TODO

    return "Set() has not yet been implimented :(";
  }

}

/*

// OLD SETTERS:

var Timer = function(){

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

};
*/
