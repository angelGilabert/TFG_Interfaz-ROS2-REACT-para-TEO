import { public_position_message, public_velocity_message, call_service_setModes } from "./ros_logic.jsx"
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from 'react';


// Funcion llamada desde useRosMotor para configurar comportamiento del socket
export function useSocketComunication({ setMovilConnected, setGyroMovil, topic_publ, setDisabledSliders, activo_pos, setActivoPos, topic_vel,
    service_setModes, setMovingAxial, setMovingFrontal }) {

    const socket = useRef(null);
    const activo_pos_ref = useRef(null);

    const [mov_axial_neck, setMovAxialNeck] = useState(0);
    const [mov_frontal_neck, setMovFrontalNeck] = useState(0);

    useEffect(() => {
        if (topic_publ) {
            // Conectar a WebSocket del servidor
            socket.current = io("http://localhost:3002");

            socket.current.on("connect", () => {
                console.log("✅ Conectado al servidor!");
            });

            socket.current.on("disconnect", () => {
                console.log("❌ Desconectado del servidor.");
            });

            socket.current.on("MOVIL_ON", () => {
                setMovilConnected(true)
                setDisabledSliders([true, true])
            })

            socket.current.on("MOVIL_OFF", () => {
                setMovilConnected(false)
                setDisabledSliders([false, false])
                setActivoPos(true)
            })

            socket.current.on("VALOR_GYRO_PORT", ({ alpha, gamma }) => {

                if (activo_pos_ref.current) {
                    // Limites Axial Neck
                    if (alpha > 60) {
                        alpha = 60
                    } else if (alpha < -60) {
                        alpha = -60
                    }

                    // Regla de 3 para que el movimiento de gamma no sea tan sensible
                    gamma = (gamma * 10) / 30

                    // Limites Frontal Neck
                    if (gamma > 10) {
                        gamma = 10
                    } else if (gamma < -10) {
                        gamma = -10
                    }

                    // Cambio de signo para hacer movimiento más intuitivo
                    gamma = gamma * (-1)

                    setGyroMovil([alpha, gamma])

                    let angle_alpha = alpha * (Math.PI / 180);
                    let angle_gamma = gamma * (Math.PI / 180);

                    public_position_message({ positions: [angle_alpha, angle_gamma], velocities: [0.5, 0.5], topic: topic_publ })


                } else {
                    let mov_axial_neck = null
                    let mov_frontal_neck = null

                    //TODO unificar las dos variables en una

                    if (alpha > 30) {
                        setMovAxialNeck(0.5)
                        setMovingAxial(1)
                    } else if (alpha < -30) {
                        setMovAxialNeck(-0.5)
                        setMovingAxial(-1)
                    } else {
                        setMovAxialNeck(0)
                        setMovingAxial(0)
                    }

                    if (gamma < -20) {
                        setMovFrontalNeck(0.5)
                        setMovingFrontal(1)
                    } else if (gamma > 20) {
                        setMovFrontalNeck(-0.5)
                        setMovingFrontal(-1)
                    } else {
                        setMovFrontalNeck(0)
                        setMovingFrontal(0)
                    }
                }
            }
            )
        }

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [topic_publ]);



    useEffect(() => {

        activo_pos_ref.current = activo_pos;

        if (socket.current) {
            if (activo_pos) {
                call_service_setModes({ modes: ['POSITION', 'POSITION'], service: service_setModes })
                socket.current.emit("MODO_POS")

            } else {
                call_service_setModes({ modes: ['VELOCITY', 'VELOCITY'], service: service_setModes })
                socket.current.emit("MODO_VEL")
                setMovingAxial(0)
                setMovingFrontal(0)
            }
        }
    }, [activo_pos]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!activo_pos) {
                if (!(mov_axial_neck == 0 && mov_frontal_neck == 0)) {
                    public_velocity_message({ velocities: [mov_axial_neck, mov_frontal_neck], topic: topic_vel })
                }
            }
        }, 50);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => {
            clearInterval(intervalId);
        };
    }, [mov_axial_neck, mov_frontal_neck, activo_pos, topic_vel]);
}