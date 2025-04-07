const socket = io();


const boton_1 = document.querySelector("#bot_izq");
const boton_2 = document.querySelector("#bot_der");

let pulsado_1 = false;
let pulsado_2 = false;

let dos_activos = false;

let actualOrientation = { alpha: null, beta: null, gamma: null };

let originOrientation = { alpha: null, beta: null, gamma: null };


// Al conectarse envia mensaje para que se vaya el QR.
socket.on("connect", () => {
    socket.emit("MOVIL_CONECTADO");
});


socket.on("MODO_POS_MOVIL", () => {
    boton_1.classList.remove("modo_vel")
    boton_2.classList.remove("modo_vel")
});

socket.on("MODO_VEL_MOVIL", () => {
    boton_1.classList.add("modo_vel")
    boton_2.classList.add("modo_vel")
});




if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (event) => {
        // Eje z (perpendicular al suelo)
        actualOrientation.alpha = event.alpha

        // Eje y (rotacion pantalla izquierda- derecha)
        actualOrientation.gamma = event.gamma

        if (dos_activos) {

            let angulo_mov_alpha = (originOrientation.alpha - actualOrientation.alpha);
            if (angulo_mov_alpha > 180) {
                angulo_mov_alpha -= 360;
            } else if (angulo_mov_alpha < -180) {
                angulo_mov_alpha += 360;
            }

            let angulo_mov_gamma = (originOrientation.gamma - actualOrientation.gamma);
            if (angulo_mov_gamma > 180) {
                angulo_mov_gamma -= 360;
            } else if (angulo_mov_gamma < -180) {
                angulo_mov_gamma += 360;
            }

            socket.emit("VALOR_GYRO",
                {
                    alpha: parseFloat(angulo_mov_alpha.toFixed(2)),
                    gamma: parseFloat(angulo_mov_gamma.toFixed(2))
                });
        }
    })
} else {
    console.error("El evento 'deviceorientation' no es soportado en este navegador o dispositivo.");
}


boton_1.addEventListener("touchstart", function (event) {
    event.preventDefault();
    window.navigator.vibrate(100);
    pulsado_1 = true;
    boton_1.classList.add("presionado")
    if (pulsado_2) {
        dos_activos = true;
        almacenar_inicio()
    }
})

boton_1.addEventListener("touchend", function (event) {
    event.preventDefault();
    pulsado_1 = false;
    boton_1.classList.remove("presionado")
    dos_activos = false;
})

boton_2.addEventListener("touchstart", function (event) {
    event.preventDefault();
    window.navigator.vibrate(100);
    pulsado_2 = true;
    boton_2.classList.add("presionado")
    if (pulsado_1) {
        dos_activos = true;
        almacenar_inicio()
    }
})

boton_2.addEventListener("touchend", function (event) {
    event.preventDefault();
    pulsado_2 = true;
    boton_2.classList.remove("presionado")
    dos_activos = false;
})

function almacenar_inicio() {
    originOrientation.alpha = actualOrientation.alpha
    originOrientation.beta = actualOrientation.beta
    originOrientation.gamma = actualOrientation.gamma

}





