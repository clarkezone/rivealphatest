import "./styles.css";

const rive = require("@rive-app/canvas");

class WebSocketManager {
    constructor() {
        this.socket = new WebSocket("ws://" + location.host + "/channel");
        this.riveInstances = new Map();
        this.initSocket();
    }

    initSocket() {
        this.socket.addEventListener("open", (event) => {
            // Handle socket open event
        });

        this.socket.addEventListener("message", (event) => {
            this.handleMessage(event.data);
        });
    }

    handleMessage(data) {
        const words = data.split(":");
        const MESSAGE_TYPE = words[0];

        switch (MESSAGE_TYPE) {
            case "addInstance":
                const INSTANCE_NAME = words[1];
                const RIVE_SRC = words[2];
                const X_POSITION = parseFloat(words[3]);
                const Y_POSITION = parseFloat(words[4]);
                const WIDTH = parseFloat(words[5]);
                const HEIGHT = parseFloat(words[6]);
                this.addRiveInstance(INSTANCE_NAME, RIVE_SRC, X_POSITION, Y_POSITION, WIDTH, HEIGHT);
                break;
            case "removeInstance":
                const INSTANCE_NAME_TO_REMOVE = words[1];
                this.removeRiveInstance(INSTANCE_NAME_TO_REMOVE);
                break;
            default:
                const INSTANCE_NAME_COMMAND = words[1];
                const INSTANCE_COMMAND = this.riveInstances.get(INSTANCE_NAME_COMMAND);
                if (!INSTANCE_COMMAND) {
                    console.error(`Rive instance "${INSTANCE_NAME_COMMAND}" not found.`);
                    return;
                }
                const PARAM_1 = words[2];
                const PARAM_2 = words[3];
                const PARAM_3 = words[4];
                switch (MESSAGE_TYPE) {
                    case "play":
                        if (PARAM_1) {
                            INSTANCE_COMMAND.play(PARAM_1);
                        }
                        break;
                    case "pause":
                        if (PARAM_1) {
                            INSTANCE_COMMAND.pause(PARAM_1);
                        }
                        break;
                    case "stop":
                        if (PARAM_1) {
                            INSTANCE_COMMAND.stop(PARAM_1);
                        }
                        break;
                    case "setRun":
                        if (PARAM_1 && PARAM_2) {
                            INSTANCE_COMMAND.setTextRunValue(PARAM_1, PARAM_2);
                        }
                        break;
                    case "reset":
                        if (PARAM_1 && PARAM_2) {
                            INSTANCE_COMMAND.reset(PARAM_1, PARAM_2);
                        }
                        break;
                    case "exitValue":
                        if (PARAM_1 && PARAM_2) {
                            const inputs = INSTANCE_COMMAND.stateMachineInputs(PARAM_1);
                            const exitValue = inputs.find((i) => i.name == PARAM_2);
                            if (exitValue) {
                                exitValue.value = !exitValue.value;
                                console.log(`exitValue toggled to ${exitValue.value}`);
                            }
                        }
                        break;
                    default:
                        console.log("Unknown message type:", MESSAGE_TYPE);
                }
        }
    }

    addRiveInstance(name, src, x, y, width, height) {
        const instance = new RiveInstance(name, src, x, y, width, height);
        this.riveInstances.set(name, instance);
    }

    removeRiveInstance(name) {
        const instance = this.riveInstances.get(name);
        if (instance) {
            instance.destroy();
            this.riveInstances.delete(name);
        }
    }
}

class RiveInstance {
    constructor(name, src, x, y, width, height) {
        this.name = name;
        this.canvas = document.createElement("canvas");
        this.canvas.id = name;
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.position = "absolute";
        this.canvas.style.left = `${x}px`;
        this.canvas.style.top = `${y}px`;
        document.body.appendChild(this.canvas);
        this.riveInstance = new rive.Rive({
            src: src,
            canvas: this.canvas,
            autoplay: false,
            onLoad: () => {
                this.riveInstance.resizeDrawingSurfaceToCanvas();
            },
        });
    }

    destroy() {
        this.canvas.remove();
    }

    play(animationName) {
        this.riveInstance.play(animationName);
    }

    pause(animationName) {
        this.riveInstance.pause(animationName);
    }

    stop(animationName) {
        this.riveInstance.pause(animationName);
    }

    setTextRunValue(text, value) {
        this.riveInstance.setTextRunValue(text, value);
    }

    reset(artboard, animations) {
        this.riveInstance.reset({
            artboard: artboard,
            animations: animations,
            autoplay: true,
        });
    }

    stateMachineInputs(input) {
        return this.riveInstance.stateMachineInputs(input);
    }
}


class Animal{

 constructor(name){
    this.name = name;
    this.riveCanvas = document.getElementById(name);
    this.layout = new rive.Layout({
	  fit: rive.Fit.FitWidth, // Change to: rive.Fit.Contain, or Cover
	  alignment: rive.Alignment.Center,
	});
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
    window.addEventListener(
      "resize",
      () => {
        riveInstance.resizeDrawingSurfaceToCanvas();
      },
      false
    );
  }
}

var a = new Animal("rive-canvas");
a.rive();
