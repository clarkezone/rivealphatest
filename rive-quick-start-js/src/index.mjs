import "./styles.css";

const rive = require("@rive-app/canvas");

class Animal{

 constructor(name){
    this.name = name;
    this.riveCanvas = document.getElementById(name);
    this.layout = new rive.Layout({
	  fit: rive.Fit.FitWidth, // Change to: rive.Fit.Contain, or Cover
	  alignment: rive.Alignment.Center,
	});
    window.addEventListener(
      "resize",
      () => {
        riveInstance.resizeDrawingSurfaceToCanvas();
      },
      false
    );
}

 rive(){
	const riveInstance = new rive.Rive({
	  src: "clean_the_car.riv",
	  stateMachines: "Motion", // Name of the State Machine to play
	  canvas: this.riveCanvas,
	  layout: this.layout, // This is optional. Provides additional layout control.
	  autoplay: true,
	  onLoad: () => {
	    riveInstance.resizeDrawingSurfaceToCanvas();
	  }
	});
  }
}

var a = new Animal("rive-canvas");
a.rive();
