import { QRCodeSVG } from "qrcode.react";
import './qr_movil.css'


function Text_bellow_1({ activo_pos, gyro_movil, moving_axial }) {

    if (activo_pos) {
        return (
            <p> Axial Neck = {(gyro_movil[0]).toFixed(2)}</p>
        )
    } else {
        return (
            <div className="cont_line_info">
                {moving_axial == -1 ? (
                    <img className="flecha_vel" style={{ transform: 'rotate(180deg)' }} src="src/assets/triangle_yellow.png" alt="Flecha" />
                ) : (
                    <img className="flecha_vel" style={{ transform: 'rotate(180deg)' }} src="src/assets/triangle_white.png" alt="Flecha" />
                )}

                <p> Axial Neck </p>

                {moving_axial == 1 ? (
                    <img className="flecha_vel" src="src/assets/triangle_yellow.png" alt="Flecha" />
                ) : (
                    <img className="flecha_vel" src="src/assets/triangle_white.png" alt="Flecha" />
                )}
            </div>
        )
    }
}


function Text_bellow_2({ activo_pos, gyro_movil, moving_frontal }) {

    if (activo_pos) {
        return (
            <p> Frontal Neck = {(gyro_movil[1]).toFixed(2)}</p>
        )
    } else {
        return (
            <div className="cont_column_info">
                {moving_frontal == -1 ? (
                    <img className="flecha_vel" style={{ transform: 'rotate(-90deg)' }} src="src/assets/triangle_yellow.png" alt="Flecha" />
                ) : (
                    <img className="flecha_vel" style={{ transform: 'rotate(-90deg)' }} src="src/assets/triangle_white.png" alt="Flecha" />
                )}

                <p> Frontal Neck </p>

                {moving_frontal == 1 ? (
                    <img className="flecha_vel" style={{ transform: 'rotate(90deg)' }} src="src/assets/triangle_yellow.png" alt="Flecha" />
                ) : (
                    <img className="flecha_vel" style={{ transform: 'rotate(90deg)' }} src="src/assets/triangle_white.png" alt="Flecha" />
                )}
            </div>
        )
    }
}





export function Movil_comp({ movil_connected, gyro_movil, activo_pos, setActivoPos, moving_axial, moving_frontal }) {

    function handle_click(boton) {
        if (boton == 1) {
            setActivoPos(true)
            console.log("Modo posicion activado")
        } else {
            setActivoPos(false)
            console.log("Modo velocidad activado")
        }
    }

    if (!movil_connected) {
        return (
            <div id='head_qr' style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <QRCodeSVG
                    value="localhost:3002/mobile"
                    size={250}
                    marginSize={3}
                    level='Q'
                />
            </div>

        )
    } else {
        return (
            <div>

                <div>
                    <button className={activo_pos ? "selected" : ""} onClick={() => handle_click(1)}> Position </button>
                    <button className={activo_pos ? "" : "selected"} onClick={() => handle_click(2)}> Movimiento </button>
                </div>

                <div className="cont_tut_imgs">

                    <div className="cont_angles">
                        <img className="movil_tut_img_1" src="src/assets/alpha.png" alt="Diagrama movil angulo alpha" />
                        <Text_bellow_1 activo_pos={activo_pos} gyro_movil={gyro_movil} moving_axial={moving_axial} />
                    </div>

                    <div className="cont_angles">
                        <img className="movil_tut_img_2" src="src/assets/gamma.png" alt="Diagrama movil angulo gamma" />
                        <Text_bellow_2 activo_pos={activo_pos} gyro_movil={gyro_movil} moving_frontal={moving_frontal} />
                    </div>
                </div>
            </div>
        )
    }
}