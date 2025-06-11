import { Left_leg } from './leftLeg_3d.jsx';
import { Slider_angle } from '../../elements/slider_angle.jsx';
import { useState, useContext } from 'react';
import { Ros2Context } from "../../../context/RosContext.jsx"
import { public_position_message, useRosMotorComunication } from "../../../logic/ros_logic.jsx"


export function LeftLeg_screen() {

    const [realAnglesLeftLeg, setRealAnglesLeftLeg] = useState([0, 0, 0, 0, 0, 0])
    const [desiredAnglesLeftLeg, setDesiredAnglesLeftLeg] = useState([0, 0, 0, 0, 0, 0])

    const [changing_value, setChangingValue] = useState(false)

    const { ros } = useContext(Ros2Context)


    const positionLeftLeg = useRosMotorComunication({
        ros: ros,
        robot_extremity: "leftLeg",
        setRealAngles: setRealAnglesLeftLeg,
        setDesiredAngles: setDesiredAnglesLeftLeg
    });


    return (
        <main>
            <div className='cont_3dmodel'>
                <Left_leg realAnglesLeftLeg={realAnglesLeftLeg} desiredAnglesLeftLeg={desiredAnglesLeftLeg} changing_value={changing_value} />
            </div>
            <div className='div_sliders'>
                <Slider_angle name='Axial Left Hip' number_joint={0} angles={desiredAnglesLeftLeg} setAngles={setDesiredAnglesLeftLeg} min_angle={-27.9} max_angle={32.8} setChangingValue={setChangingValue} />
                <Slider_angle name='Saggital Left Hip' number_joint={1} angles={desiredAnglesLeftLeg} setAngles={setDesiredAnglesLeftLeg} min_angle={-12.5} max_angle={14.2} setChangingValue={setChangingValue} />
                <Slider_angle name='Frontal Left Hip' number_joint={2} angles={desiredAnglesLeftLeg} setAngles={setDesiredAnglesLeftLeg} min_angle={-31.6} max_angle={42.3} setChangingValue={setChangingValue} />
                <Slider_angle name='Frontal Left Knee' number_joint={3} angles={desiredAnglesLeftLeg} setAngles={setDesiredAnglesLeftLeg} min_angle={-61.3} max_angle={82.4} setChangingValue={setChangingValue} />
                <Slider_angle name='Frontal Left Ankle' number_joint={4} angles={desiredAnglesLeftLeg} setAngles={setDesiredAnglesLeftLeg} min_angle={-23.1} max_angle={25.4} setChangingValue={setChangingValue} />
                <Slider_angle name='Sagittal Left Ankle' number_joint={5} angles={desiredAnglesLeftLeg} setAngles={setDesiredAnglesLeftLeg} min_angle={-42.5} max_angle={19.9} setChangingValue={setChangingValue} />

                <button onClick={() => public_position_message({ positions: desiredAnglesLeftLeg, topic: positionLeftLeg })}>
                    Play
                </button>
            </div>
        </main>
    )
}