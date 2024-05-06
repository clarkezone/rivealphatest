            const riveInstance = new rive.Rive({
                // Load a local riv `clean_the_car.riv` or upload your own!
                src: "alphatest.riv",
                // Be sure to specify the correct state machine (or animation) name
                //stateMachines: "State Machine 1", // Name of the State Machine to play
                canvas: riveCanvas,
                autoplay: false,
                onLoad: () => {
                    // Prevent a blurry canvas by using the device pixel ratio
		
			   console.log("Loaded"); 
                    riveInstance.resizeDrawingSurfaceToCanvas();
                },
            });
