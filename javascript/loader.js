// * * * MAIN FUNCTION * * * //
function main(){
  loader.api.test();
}


// * * * OBJECTS * * * //

// HTML5 canvas for loader
var canvas = {
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
var loader = {

  // * * * MAIN INTERFACE WRAPPER * * * //
  api: {
    // Function for testing loader
    test: function(){
      loader.api.incrimentTo(100);
    },

    // Incriment loader to a value
    incrimentTo: function(num){
      loader.incrimentTo(num);
    },

    // Render to canvas
    render: function(){
      loader.render();
    },

    // Setter functions for config object
    set: {
      barWidth: function(num){
        loader.config.barWidth = num;
      },
      barColor: function(colorStr){
        loader.config.barColor = colorStr;
      },
      barBgColor: function(colorStr){
        loader.config.barBgColor = colorStr;
      },
      textColor: function(colorStr){
        loader.config.textColor = colorStr;
      },
      textWeight: function(str){
       loader. config.textWeight = str;
      },
      textSize: function(num){
        loader.config.textSize = num;
      },
      textFamily: function(str){
        loader.config.textFamily = str;
      },
      textContent: function(){
        console.log("Text content must be set manually in loader.config object");
      },
    },
  },

  // * * * CONFIG OBJECT * * * //
  config: {

    // Width of load bar in canvas pixels
    barWidth: 10,

    // Color of load bar
    barColor: "#000",

    // Color of unloader portion of load bar
    barBgColor: "#aaa",

    // Color of text in center of load bar
    textColor: "#000",

    // Font to use for text in center of load bar
    textWeight: "bold",
    textSize: 20,
    textFamily: "arial",
    get textFont(){
      return (this.textWeight + " " 
            + this.textSize.toString() + "px "
            + this.textFamily);
    },

    // Edit return value to set text for middle of loader
    getText: function(){
      return (loader.percentLoaded.toString() + " Baby Penguins!");
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
  timer: undefined,


  // * * * METHODS * * * //
  render: function(){

    // Get amount of bar to show
    loader.diff = ((loader.percentLoaded / 100) * Math.PI*2*10).toFixed(2);

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
                   loader.START,
                   loader.diff/10 + loader.START,
                   false);
    canvas.ctx.stroke();
  },


  // Incriment counter by one
  incriment: function(limit){
    // If loader incriments to limit
    if(loader.percentLoaded >= limit){
      return 1;
    } else {
      // Incriment
      loader.percentLoaded++;
      // Return success code
      return 0;
    }
  },

  // Incriment counter to a value
  incrimentTo: function(num){
    this.timer = setInterval(function(){
      if(loader.incriment(num) > 0){
        clearTimeout(this.timer);
      }
      loader.render();
    }, this.INCRIMENT_RATE);
  },

}

// * * * BEGIN SCRIPT EXECUTION * * * //
main();
