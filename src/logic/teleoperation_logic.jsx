import { public_teleop_pose } from "./ros_logic";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from 'react';


// Funcion llamada desde useRosMotor para configurar comportamiento del socket
export function useSocketTeleoperation({ setMovilConnected, setRelPositions, topic_streaming_pose, endArmPos, endArmOri }) {

    const socket = useRef(null);
    const activo_pos_ref = useRef(null);

    const [mov_alpha, setMovAlpha] = useState(0);
    const [mov_gamma, setMovGamma] = useState(0);

    useEffect(() => {
        if (topic_streaming_pose) {
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
            })

            socket.current.on("MOVIL_OFF", () => {
                setMovilConnected(false)
            })

            socket.current.on("VALOR_GYRO_PORT", ({ alpha, gamma }) => {
                setRelPositions([alpha, gamma, 0])

                if (alpha > 30) {
                    setMovAlpha(1)
                } else if (alpha < -30) {
                    setMovAlpha(-1)
                } else {
                    setMovAlpha(0)
                }

                if (gamma > 30) {
                    setMovGamma(1)
                } else if (gamma < -30) {
                    setMovGamma(-1)
                } else {
                    setMovGamma(0)
                }
            })
        }

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [topic_streaming_pose]);



    useEffect(() => {
        const intervalId = setInterval(() => {
            if (mov_gamma == - 1) {
                console.log("hola")
                // w: 0.7068244404624655 x: -0.00000694381185660116 y: 0.7073890088968202 z: -0.000020215843999354907
                public_teleop_pose({ pose_orient: [endArmPos[0] + 0.005, endArmPos[1], endArmPos[2], 0.7068, 0, 0.707, 0], topic: topic_streaming_pose })

            } else if (mov_gamma == 1) {
                public_teleop_pose({ pose_orient: [endArmPos[0] - 0.005, endArmPos[1], endArmPos[2], 0.7068, 0, 0.707, 0], topic: topic_streaming_pose })

            }

            if (mov_alpha == - 1) {
                console.log("hola")
                // w: 0.7068244404624655 x: -0.00000694381185660116 y: 0.7073890088968202 z: -0.000020215843999354907
                public_teleop_pose({ pose_orient: [endArmPos[0], endArmPos[1] + 0.005, endArmPos[2], 0.7068, 0, 0.707, 0], topic: topic_streaming_pose })

            } else if (mov_alpha == 1) {
                public_teleop_pose({ pose_orient: [endArmPos[0], endArmPos[1] - 0.005, endArmPos[2], 0.7068, 0, 0.707, 0], topic: topic_streaming_pose })
            }

        }, 30);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => {
            clearInterval(intervalId);
        };
    }, [endArmPos, mov_alpha, mov_gamma, topic_streaming_pose]);
}