import ROSLIB from "roslib";
import { useEffect, createContext, useState } from "react";


export const Ros2Context = createContext()


export function Ros2Provider({ children }) {

    const [ros, setRos] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [teoType, setTeoType] = useState("teoSim");

    useEffect(() => {
        // Crear una nueva instancia de ROS
        const ros = new ROSLIB.Ros({
            url: "ws://localhost:9090", // URL de tu rosbridge
        });

        // Manejar los eventos de conexión
        ros.on("connection", () => {
            console.log("Conectado a ROS");
            setIsConnected(true);
        });

        ros.on("error", (error) => {
            console.error("Error en la conexión ROS:", error);
            setIsConnected(false);
        });

        ros.on("close", () => {
            console.warn("Conexión a ROS cerrada.");
            setIsConnected(false);
        });

        // Guardar la instancia de ROS en el estado
        setRos(ros);

        // Cleanup al desmontar el componente
        return () => {
            ros.close();
        };
    }, []);

    return (
        <Ros2Context.Provider value={{
            ros, isConnected, teoType, setTeoType
        }}>
            {children}
        </Ros2Context.Provider>
    )
}