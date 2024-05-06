// main.js
import * as rive from '@rive-app/canvas';

// Function to initialize the Rive instance
function initializeRive() {
    const riveInstance = new rive.Rive({
        src: "alphatest.riv",
        canvas: document.getElementById("riveCanvas"),
        autoplay: false,
        onLoad: () => {
            riveInstance.resizeDrawingSurfaceToCanvas();
	    console.log("Rive instance loaded successfully");
        },
    });
}

// Call initializeRive() when the document is ready
document.addEventListener("DOMContentLoaded", () => {
    initializeRive();
});

