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

const riveScript = document.createElement("script");
riveScript.src = "https://unpkg.com/@rive-app/canvas@2.10.3";
riveScript.onload = initializeRive; // Call initializeRive() when the script is loaded
document.head.appendChild(riveScript);


import('https://unpkg.com/@rive-app/canvas@2.10.3/rive.js')
    .then(() => {
        // Call initializeRive() when the module is loaded
        initializeRive();
    })
    .catch((error) => {
        console.error('Failed to load Rive SDK:', error);
    });

