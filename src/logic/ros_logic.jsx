import ROSLIB from "roslib";
import { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { Ros2Context } from '../context/RosContext';
import * as THREE from 'three';


// Publica un mensaje en un topic de /position
export function public_position_message({ positions, velocities = [], topic }) {

    const mensaje = new ROSLIB.Message({
        names: [],
        positions: positions,
        ref_velocities: velocities
    });

    topic.publish(mensaje);
}

// Publica un mensaje en un topic de /velocity (Solo usado en el control móvil de la cabeza)
export function public_velocity_message({ velocities, topic }) {
    const mensaje = new ROSLIB.Message({
        names: [],
        velocities: velocities,
        ref_accelerations: []
    });

    console.log("Enviando velocidad")
    topic.publish(mensaje);
}

// Funcion para publicar en topic de funcion de cinematica inversa (tanto movj como movl)
export function public_mov({ pose_orient, topic }) {

    const mensaje = new ROSLIB.Message({
        layout: {
            dim: [],
            data_offset: 0
        },
        data: pose_orient
    });

    console.log(topic)
    topic.publish(mensaje);
}

// Funcion para publicar en topic de teleoperacion
export function public_teleop_pose({ pose_orient, topic }) {

    const mensaje = new ROSLIB.Message({
        position: {
            x: pose_orient[0],
            y: pose_orient[1],
            z: pose_orient[2]
        },
        orientation: {
            x: pose_orient[4],
            y: pose_orient[5],
            z: pose_orient[6],
            w: pose_orient[3]
        }
    });

    topic.publish(mensaje);
}



// Llamada para cambiar el modo de una articulación/es
export function call_service_setModes({ names = [], modes, service }) {
    const peticion = new ROSLIB.ServiceRequest({
        names: names,
        modes: modes
    });

    service.callService(peticion, (result) => {
        console.log('Devuelve:', result);
    });
}

// Llamada para obtener los posibles modos de una extremidad
export function call_service_get_available_modes({ service }) {
    return new Promise((resolve, reject) => {
        const peticion = new ROSLIB.ServiceRequest({
            only_implemented: true
        });

        service.callService(peticion, (result) => {
            if (result) {
                resolve(result.modes);
            } else {
                reject(new Error('No se pudo obtener la respuesta del servicio'));
            }
        });
    });
}

// Llamada para obtener el modo de las articulaciones
export function call_service_get_joints_name({ service }) {
    return new Promise((resolve, reject) => {
        const peticion = new ROSLIB.ServiceRequest({});

        service.callService(peticion, (result) => {
            if (result) {
                resolve(result.names);
            } else {
                reject(new Error('No se pudo obtener la respuesta del servicio'));
            }
        });
    });
}

// Llamada para obtener el modo de las articulaciones
export function call_service_getModes({ service }) {
    return new Promise((resolve, reject) => {
        const peticion = new ROSLIB.ServiceRequest({
            names: []
        });

        service.callService(peticion, (result) => {
            if (result) {
                resolve(result.modes);
            } else {
                reject(new Error('No se pudo obtener la respuesta del servicio'));
            }
        });
    });
}



export function call_service_set_preset_streaming({ ros, preset_streaming }) {
    const setParametersClient = new ROSLIB.Service({
        ros: ros,
        name: '/rightArm/set_parameters',
        serviceType: 'rcl_interfaces/srv/SetParameters'
    });

    // Crear la peticion
    const request = new ROSLIB.ServiceRequest({
        parameters: [
            {
                name: 'preset_streaming_cmd',
                value: {
                    type: 4,            // string
                    string_value: preset_streaming
                }
            }
        ]
    });

    setParametersClient.callService(request, function (result) {
        console.log(preset_streaming);
        console.log('Resultado:', result);
    });
}



export function useRosMotorComunication({ ros, robot_extremity, setRealAngles, setDesiredAngles = null }) {
    const firstMessage = useRef(true);
    const topic_position = useRef(null);
    const { teoType } = useContext(Ros2Context);
    let lastExecutionTime = 0;

    let topic_state = null;


    useEffect(() => {

        // Suscribirse al topic con el tipo de mensaje yarp_control_msgs/msg/JoinState
        topic_state = new ROSLIB.Topic({
            ros: ros,
            name: `/${teoType}/${robot_extremity}/state`,        // Nombre del topico
            messageType: "sensor_msgs/msg/JointState",
        });

        // Suscribirse y manejar los mensajes recibidos
        topic_state.subscribe((msg) => {
            const currentTime = Date.now();

            if (currentTime - lastExecutionTime >= 50) {
                // Ejecutar la lógica principal solo si ha pasado suficiente tiempo
                setRealAngles(msg.position.map(val => parseFloat(val.toFixed(3))));

                if (firstMessage.current) {
                    firstMessage.current = false;
                    if (setDesiredAngles !== null)
                        setDesiredAngles(msg.position.map(val => parseFloat(val.toFixed(3))));
                }

                lastExecutionTime = currentTime;
            }
        });


        topic_position.current = new ROSLIB.Topic({
            ros: ros,
            name: `/${teoType}/${robot_extremity}/position`,
            messageType: "yarp_control_msgs/msg/Position",
        });

        return () => {
            topic_state.unsubscribe();
        }
    }, [teoType]);

    return topic_position.current;
}

// Suscripción a Topic velocity de ROS
export function useRosMotorVelocity({ ros, robot_extremity }) {
    const topic_velocity = useRef(null);
    const { teoType } = useContext(Ros2Context);

    useEffect(() => {
        topic_velocity.current = new ROSLIB.Topic({
            ros: ros,
            name: `/${teoType}/${robot_extremity}/velocity`,
            messageType: "yarp_control_msgs/msg/Velocity",
        });
    }, [teoType]);


    return topic_velocity.current;
}

// Crea instancia Service para poder llamar más tarde al servicio que cambia los modos
export function useRosGetSetModeService({ ros, robot_extremity }) {
    const { teoType } = useContext(Ros2Context);
    const servSetmodes = useRef(null)

    useEffect(() => {
        servSetmodes.current = new ROSLIB.Service({
            ros: ros,
            name: `/${teoType}/${robot_extremity}/set_modes`,
            serviceType: 'yarp_control_msgs/srv/SetControlModes'
        });
    }, []);

    return servSetmodes.current;
}

export function get_service({ ros, teoType, robot_extremity, service, serv_name, message_type }) {

    service.current = new ROSLIB.Service({
        ros: ros,
        name: `/${teoType}/${robot_extremity}/${serv_name}`,
        serviceType: message_type
    });
}



// Suscribirse a topics de cinematica inversa
export function useRosInverseKinematics({ ros, robot_extremity, setEndArmPos, setEndArmOri, setEndReal = null }) {
    const firstMessage = useRef(true);
    const topic_movjoint = useRef(null);
    const topic_movlinear = useRef(null);

    let topic_endposition = null;
    let lastExecutionTime = 0;

    useEffect(() => {
        // Suscribirse al topic con el tipo de mensaje yarp_control_msgs/msg/JoinState
        topic_endposition = new ROSLIB.Topic({
            ros: ros,
            name: `/${robot_extremity}/state/pose`,
            messageType: "geometry_msgs/msg/PoseStamped",
        });

        // Suscribirse y manejar los mensajes recibidos
        topic_endposition.subscribe((msg) => {
            const currentTime = Date.now();

            if (currentTime - lastExecutionTime >= 50) {
                const x = parseFloat(msg.pose.position.x.toFixed(2));
                const y = parseFloat(msg.pose.position.y.toFixed(2));
                const z = parseFloat(msg.pose.position.z.toFixed(2));
                setEndArmPos([x, y, z]);

                if (setEndReal) {
                    setEndReal([msg.pose.position.x.toFixed(4), msg.pose.position.y.toFixed(4), msg.pose.position.z.toFixed(4)])
                }

                const quaternion = new THREE.Quaternion(msg.pose.orientation.x, msg.pose.orientation.z, -msg.pose.orientation.y, msg.pose.orientation.w);

                const euler = new THREE.Euler().setFromQuaternion(quaternion, 'XYZ'); // orden XYZ

                const x_or = parseFloat((euler.x * (180 / Math.PI)).toFixed(2));
                const y_or = parseFloat((euler.y * (180 / Math.PI)).toFixed(2));
                const z_or = parseFloat((euler.z * (180 / Math.PI)).toFixed(2));
                setEndArmOri([x_or, -z_or, y_or]);

                lastExecutionTime = currentTime;
            }
        });

        topic_movjoint.current = new ROSLIB.Topic({
            ros: ros,
            name: `/${robot_extremity}/command/movjoint`,
            messageType: "std_msgs/msg/Float64MultiArray",
        });

        topic_movlinear.current = new ROSLIB.Topic({
            ros: ros,
            name: `/${robot_extremity}/command/movlinear`,
            messageType: "std_msgs/msg/Float64MultiArray",
        });

        return () => {
            topic_endposition.unsubscribe();
        }
    }, []);

    return [topic_movjoint.current, topic_movlinear.current];
}


export function useImuSuscription({ ros, setImuvel, setImuacel, setImuangles }) {

    const { teoType } = useContext(Ros2Context);
    let lastExecutionTime = 0;

    let topic_imu = null;


    useEffect(() => {

        // Suscribirse al topic con el tipo de mensaje sensor_msgs/msg/Imu
        topic_imu = new ROSLIB.Topic({
            ros: ros,
            name: `/${teoType}/imu`,   // Nombre del topico
            messageType: "sensor_msgs/msg/Imu",
        });

        // Manejar los mensajes recibidos
        topic_imu.subscribe((msg) => {
            const currentTime = Date.now();

            if (currentTime - lastExecutionTime >= 500) {

                const velx = msg.angular_velocity.x;
                const vely = msg.angular_velocity.y;
                const velz = msg.angular_velocity.z;
                setImuvel([velx, vely, velz])

                const acelx = msg.linear_acceleration.x;
                const acely = msg.linear_acceleration.y;
                const acelz = msg.linear_acceleration.z;
                setImuacel([acelx, acely, acelz])

                const quaternion = new THREE.Quaternion(msg.orientation.x, msg.orientation.z, -msg.orientation.y, msg.orientation.w);

                const euler = new THREE.Euler().setFromQuaternion(quaternion, 'XYZ'); // orden XYZ

                const x_or = parseFloat((euler.x * (180 / Math.PI)).toFixed(2));
                const y_or = parseFloat((euler.y * (180 / Math.PI)).toFixed(2));
                const z_or = parseFloat((euler.z * (180 / Math.PI)).toFixed(2));
                setImuangles([x_or, -z_or, y_or]);

                lastExecutionTime = currentTime;
            }
        });

        return () => {
            topic_imu.unsubscribe();
        }
    }, [teoType]);
}


export function useRosStreamingpose({ ros }) {
    const { teoType } = useContext(Ros2Context);
    const topic_streaming = useRef(null)

    useEffect(() => {
        topic_streaming.current = new ROSLIB.Topic({
            ros: ros,
            name: `/rightArm/command/pose`,
            serviceType: 'geometry_msgs/msg/Pose'
        });
    }, []);

    return topic_streaming.current;
}


export function useForceTorqueSuscription({ ros, topic_selected, refresh, setForceTorquevalues, playing }) {

    let lastExecutionTime = 0;

    let topic_ft = null;


    useEffect(() => {

        const period = 1000 / Number(refresh);

        // Suscribirse al topic con el tipo de mensaje sensor_msgs/msg/Imu
        topic_ft = new ROSLIB.Topic({
            ros: ros,
            name: `${topic_selected}`,   // Nombre del topico
            messageType: "geometry_msgs/msg/WrenchStamped",
        });

        // Manejar los mensajes recibidos
        topic_ft.subscribe((msg) => {
            const currentTime = Date.now();

            if (currentTime - lastExecutionTime >= period) {

                const fx = msg.wrench.force.x;
                const fy = msg.wrench.force.y;
                const fz = msg.wrench.force.z;

                const tx = msg.wrench.torque.x;
                const ty = msg.wrench.torque.y;
                const tz = msg.wrench.torque.z;

                if (playing) {
                    setForceTorquevalues([fx, fy, fz, tx, ty, tz])
                }

                lastExecutionTime = currentTime;
            }
        });

        return () => {
            topic_ft.unsubscribe();
        }
    }, [topic_selected, refresh, playing]);
}
