import { Teleop3d } from './teleoperation3d.jsx';
import { useState, useContext, useEffect } from 'react';
import { Ros2Context } from '../../context/RosContext.jsx';
import { useRosMotorComunication, useRosInverseKinematics, useRosStreamingpose, public_position_message, call_service_set_preset_streaming } from "../../logic/ros_logic.jsx"
import { useSocketTeleoperation } from '../../logic/teleoperation_logic.jsx';
import { QRCodeSVG } from "qrcode.react";


export function Teleop_screen() {
    const [realAnglesRightArm, setRealAnglesRightArm] = useState([0, 0, 0, 0, 0, 0])

    const [movil_connected, setMovilConnected] = useState(false)

    const [rel_positions, setRelPositions] = useState([0, 0, 0])

    const [endArmPos, setEndArmPos] = useState([0, 0, 0])
    const [endArmOri, setEndArmOri] = useState([0, 0, 0])
    const [endReal, setEndReal] = useState([0, 0, 0])       // Sin redondear

    const { ros } = useContext(Ros2Context)

    const topic_position = useRosMotorComunication({
        ros: ros,
        robot_extremity: "rightArm",
        setRealAngles: setRealAnglesRightArm
    });


    useRosInverseKinematics({
        ros: ros,
        robot_extremity: "rightArm",
        endArmPos: endArmPos,
        setEndArmPos: setEndArmPos,
        setEndArmOri: setEndArmOri,
        setEndReal: setEndReal
    })

    const topic_streaming_pose = useRosStreamingpose({
        ros: ros
    })


    useEffect(() => {
        if (topic_position) {
            public_position_message({ positions: [0, 0, 0, -1.57, 0, 0], topic: topic_position });

            setTimeout(() => {
                call_service_set_preset_streaming({ ros: ros, preset_streaming: "pose" });
            }, 100);
        }

        return () => {
            // Solo limpia cuando el componente se desmonte
            call_service_set_preset_streaming({ ros: ros, preset_streaming: "none" });
        };
    }, [topic_position]);




    useSocketTeleoperation({
        setMovilConnected: setMovilConnected,
        setRelPositions: setRelPositions,
        topic_streaming_pose: topic_streaming_pose,
        endArmPos: endArmPos,
        endArmOri: endArmOri
    })




    return (
        <main>

            <div id='rightarm_pos' style={{
                position: 'absolute', top: '50%', left: '2%', width: '200px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '5px', borderRadius: '5px', zIndex: 10
            }}>
                TCP Position:
                <p> X: {endArmPos[0]} m</p>
                <p> Y: {endArmPos[1]} m</p>
                <p> Z: {endArmPos[2]} m</p>

                <p></p>

                TCP orientation (XYZ):
                <p> X: {endArmOri[0]} °</p>
                <p> Y: {endArmOri[1]} °</p>
                <p> Z: {endArmOri[2]} °</p>
            </div>

            <div id='modelo' className='cont_3dmodel' style={{
                width: '65%'

            }}>
                <Teleop3d realAnglesRightArm={realAnglesRightArm} />
            </div>

            <div id='qr' style={{
                width: '35%',
                backgroundColor: '#DDEEFF'
            }}>

                {!movil_connected
                    ?
                    <QRCodeSVG
                        value="localhost:3002/teleoperation"
                        size={250}
                        marginSize={3}
                        level='Q'
                    />

                    :
                    <div>
                        <p> Orientacion </p>
                        <p> X: {rel_positions[0]}</p>
                        <p> Y: {rel_positions[1]}</p>
                        <p> Z: {rel_positions[2]}</p>
                    </div>}


            </div>

        </main >
    )
}
