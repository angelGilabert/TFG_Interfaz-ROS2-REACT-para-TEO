import { Left_arm } from './leftArm_3d.jsx';
import { Slider_angle } from '../../slider_angle.jsx';
import { useState, useContext } from 'react';
import { Ros2Context } from "../../../context/RosContext.jsx"
import { public_position_message, useRosMotorComunication } from "../../../logic/ros_logic.jsx"



export function LeftArm_screen() {

    const [realAnglesLeftArm, setRealAnglesLeftArm] = useState([0, 0, 0, 0, 0, 0])
    const [desiredAnglesLeftArm, setDesiredAnglesLeftArm] = useState([0, 0, 0, 0, 0, 0])

    const [changing_value, setChangingValue] = useState(false)

    const { ros } = useContext(Ros2Context)


    const positionLeftArm = useRosMotorComunication({
        ros: ros,
        robot_extremity: "leftArm",
        setRealAngles: setRealAnglesLeftArm,
        setDesiredAngles: setDesiredAnglesLeftArm
    });


    return (
        <main>
            <div className='cont_3dmodel'>
                <Left_arm realAnglesLeftArm={realAnglesLeftArm} desiredAnglesLeftArm={desiredAnglesLeftArm} changing_value={changing_value} />
            </div>
            <div className='div_sliders'>
                <Slider_angle name='Frontal Left Shoulder' number_joint={0} angles={desiredAnglesLeftArm} setAngles={setDesiredAnglesLeftArm} min_angle={-96.8} max_angle={113.2} setChangingValue={setChangingValue} />
                <Slider_angle name='Saggital Left Shoulder' number_joint={1} angles={desiredAnglesLeftArm} setAngles={setDesiredAnglesLeftArm} min_angle={-23.9} max_angle={76.5} setChangingValue={setChangingValue} />
                <Slider_angle name='Axial Left Shoulder' number_joint={2} angles={desiredAnglesLeftArm} setAngles={setDesiredAnglesLeftArm} min_angle={-51.6} max_angle={84.1} setChangingValue={setChangingValue} />
                <Slider_angle name='Frontal Left Elbow' number_joint={3} angles={desiredAnglesLeftArm} setAngles={setDesiredAnglesLeftArm} min_angle={-101.1} max_angle={96.8} setChangingValue={setChangingValue} />
                <Slider_angle name='Axial Left Wrist' number_joint={4} angles={desiredAnglesLeftArm} setAngles={setDesiredAnglesLeftArm} min_angle={-101.3} max_angle={76.4} setChangingValue={setChangingValue} />
                <Slider_angle name='Frontal Left Wrist' number_joint={5} angles={desiredAnglesLeftArm} setAngles={setDesiredAnglesLeftArm} min_angle={-113.3} max_angle={61.3} setChangingValue={setChangingValue} />

                <button onClick={() => public_position_message({ positions: desiredAnglesLeftArm, topic: positionLeftArm })}>
                    Play
                </button>
            </div>
        </main>
    )
}