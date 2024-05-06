// Function to initialize the Rive instance
function initializeRive() {
    const riveInstance = new rive.Rive({
        src: "alphatest.riv",
        canvas: document.getElementById("riveCanvas"),
        autoplay: false,
        onLoad: () => {
            riveInstance.resizeDrawingSurfaceToCanvas();
	    console.log('Rive instance loaded');
        },
    });
}

import('https://unpkg.com/@rive-app/canvas@2.10.3/rive.js')
    .then(() => {
        // Call initializeRive() when the module is loaded
        initializeRive();
    })
    .catch((error) => {
        console.error('Failed to load Rive SDK:', error);
    });

