import { Teleop3d } from './teleoperation3d.jsx';
import { useState, useContext } from 'react';
import { Ros2Context } from '../../context/RosContext.jsx';
import { public_mov, public_position_message, useRosInverseKinematics, useRosMotorState } from "../../logic/ros_logic.jsx"


export function Teleop_screen() {
    const [realAnglesRightArm, setRealAnglesRightArm] = useState([0, 0, 0, 0, 0, 0])

    const [endArmPos, setEndArmPos] = useState([0, 0, 0])
    const [endArmOri, setEndArmOri] = useState([0, 0, 0])

    const { ros } = useContext(Ros2Context)


    useRosMotorState({
        ros: ros,
        robot_extremity: "rightArm",
        setRealAngles: setRealAnglesRightArm
    });

    /*

    const [movjoint, movlinear] = useRosInverseKinematics({
        ros: ros,
        robot_extremity: "rightArm",
        endArmPos: endArmPos,
        setEndArmPos: setEndArmPos,
        setEndArmOri: setEndArmOri
    })


    */

    return (
        <main>
            <div className='cont_3dmodel' style={{
                width: '75%'

            }}>
                <Teleop3d realAnglesRightArm={realAnglesRightArm} />


            </div>
        </main>
    )
}