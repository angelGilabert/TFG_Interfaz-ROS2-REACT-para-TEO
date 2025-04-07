import { Right_arm } from './rightArm_3d.jsx';
import { Slider_angle } from '../../slider_angle.jsx';
import { useState, useContext } from 'react';
import { Ros2Context } from "../../../context/RosContext.jsx"
import { public_position_message, useRosMotorComunication } from "../../../logic/ros_logic.jsx"


export function RightArm_screen() {
    const [realAnglesRightArm, setRealAnglesRightArm] = useState([0, 0, 0, 0, 0, 0])
    const [desiredAnglesRightArm, setDesiredAnglesRightArm] = useState([0, 0, 0, 0, 0, 0])

    const [changing_value, setChangingValue] = useState(false)

    const { ros } = useContext(Ros2Context)


    const positionRightArm = useRosMotorComunication({
        ros: ros,
        robot_extremity: "rightArm",
        setRealAngles: setRealAnglesRightArm,
        setDesiredAngles: setDesiredAnglesRightArm
    });

    return (
        <main>
            <div className='cont_3dmodel'>
                <Right_arm realAnglesRightArm={realAnglesRightArm} desiredAnglesRightArm={desiredAnglesRightArm} changing_value={changing_value} />
            </div>

            <div className='div_sliders'>
                <Slider_angle name='Frontal Right Shoulder' number_joint={0} angles={desiredAnglesRightArm} setAngles={setDesiredAnglesRightArm} min_angle={-98.1} max_angle={106} setChangingValue={setChangingValue} />
                <Slider_angle name='Saggital Right Shoulder' number_joint={1} angles={desiredAnglesRightArm} setAngles={setDesiredAnglesRightArm} min_angle={-75.5} max_angle={22.4} setChangingValue={setChangingValue} />
                <Slider_angle name='Axial Right Shoulder' number_joint={2} angles={desiredAnglesRightArm} setAngles={setDesiredAnglesRightArm} min_angle={-80.1} max_angle={57} setChangingValue={setChangingValue} />
                <Slider_angle name='Frontal Right Elbow' number_joint={3} angles={desiredAnglesRightArm} setAngles={setDesiredAnglesRightArm} min_angle={-99.6} max_angle={98.4} setChangingValue={setChangingValue} />
                <Slider_angle name='Axial Right Wrist' number_joint={4} angles={desiredAnglesRightArm} setAngles={setDesiredAnglesRightArm} min_angle={-80.4} max_angle={99.6} setChangingValue={setChangingValue} />
                <Slider_angle name='Frontal Right Wrist' number_joint={5} angles={desiredAnglesRightArm} setAngles={setDesiredAnglesRightArm} min_angle={-115.1} max_angle={44.7} setChangingValue={setChangingValue} />

                <button onClick={() => public_position_message({ positions: desiredAnglesRightArm, topic: positionRightArm })}>
                    Play
                </button>

            </div>
        </main>
    )
}