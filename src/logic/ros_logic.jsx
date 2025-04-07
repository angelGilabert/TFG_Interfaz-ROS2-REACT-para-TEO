import ROSLIB from "roslib";
import { useState, useEffect, useRef } from 'react';

export function public_position_message({ positions, velocities = [], topic }) {

    const mensaje = new ROSLIB.Message({
        names: [],
        positions: positions,
        ref_velocities: velocities
    });

    topic.publish(mensaje);
}

export function public_velocity_message({ velocities, topic }) {
    const mensaje = new ROSLIB.Message({
        names: [],
        velocities: velocities,
        ref_accelerations: []
    });

    console.log("Enviando velocidad")
    topic.publish(mensaje);
}

export function call_service_setModes({ modes, service }) {
    const peticion = new ROSLIB.ServiceRequest({
        names: [],
        modes: modes
    });

    service.callService(peticion, (result) => {
        console.log('Devuelve:', result);
    });
}

export function useRosMotorComunication({ ros, robot_extremity, setRealAngles, setDesiredAngles }) {
    const firstMessage = useRef(true);
    const topic_position = useRef(null);
    const [topicStateName, setTopicStateName] = useState(null);
    const [topicPositionName, setTopicPositionName] = useState(null);

    let topic_state = null;

    useEffect(() => {
        ros.getTopicsForType("sensor_msgs/msg/JointState", (got) => { setTopicStateName(got.filter(item => item.includes(robot_extremity))) });
        ros.getTopicsForType("yarp_control_msgs/msg/Position", (got) => { setTopicPositionName(got.filter(item => item.includes(robot_extremity))) });
    }, [])

    useEffect(() => {
        if (topicStateName && topicPositionName) {
            console.log(topicStateName)
            console.log(topicPositionName)

            // Suscribirse al topic con el tipo de mensaje yarp_control_msgs/msg/Position
            topic_state = new ROSLIB.Topic({
                ros: ros,
                name: topicStateName[0],
                messageType: "sensor_msgs/msg/JointState",
            });

            // Suscribirse y manejar los mensajes recibidos
            topic_state.subscribe((msg) => {
                setRealAngles(msg.position.map(val => parseFloat(val.toFixed(3))));
                if (firstMessage.current) {
                    setDesiredAngles(msg.position.map(val => parseFloat(val.toFixed(3))));
                    firstMessage.current = false;
                }
            }, { throttle_rate: 100 });


            topic_position.current = new ROSLIB.Topic({
                ros: ros,
                name: topicPositionName[0],
                messageType: "yarp_control_msgs/msg/Position",
            });
        }
        return () => {
            if (topicStateName && topicPositionName) {
                topic_state.unsubscribe();
            }
        }
    }, [topicStateName, topicPositionName]);


    return topic_position.current;
}

export function useRosMotorVelocity({ ros, robot_extremity }) {
    const topic_velocity = useRef(null);
    const [topic_velocity_name, setTopicVelocityName] = useState(null);

    useEffect(() => {
        ros.getTopicsForType("yarp_control_msgs/msg/Velocity", (got) => { setTopicVelocityName(got.filter(item => item.includes(robot_extremity))) });
    }, [])

    useEffect(() => {
        if (topic_velocity_name) {
            console.log(topic_velocity_name)

            topic_velocity.current = new ROSLIB.Topic({
                ros: ros,
                name: topic_velocity_name[0],
                messageType: "yarp_control_msgs/msg/Velocity",
            });
        }
    }, [topic_velocity_name]);


    return topic_velocity.current;
}


export function useRosGetSetModeService({ ros }) {

    const servSetmodes = useRef(null)

    useEffect(() => {

        servSetmodes.current = new ROSLIB.Service({
            ros: ros,
            name: '/teoSim/head/set_modes', //! Cambiar teoSim cuando sea con el TEO real
            serviceType: 'yarp_control_msgs/srv/SetControlModes'
        });
    }, []);

    return servSetmodes.current;
}




