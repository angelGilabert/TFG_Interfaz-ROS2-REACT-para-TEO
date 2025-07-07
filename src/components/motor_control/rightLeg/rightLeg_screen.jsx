import { Right_leg } from './rightLeg_3d.jsx';
import { Slider_angle } from '../../elements/slider_angle.jsx';
import { useState, useContext } from 'react';
import { Ros2Context } from "../../../context/RosContext.jsx"
import { public_position_message, useRosMotorComunication } from "../../../logic/ros_logic.jsx"


export function RightLeg_screen() {

    const [realAnglesRightLeg, setRealAnglesRightLeg] = useState([0, 0, 0, 0, 0, 0])
    const [desiredAnglesRightLeg, setDesiredAnglesRightLeg] = useState([0, 0, 0, 0, 0, 0])

    const [changing_value, setChangingValue] = useState(false)

    const { ros } = useContext(Ros2Context)


    const positionRightLeg = useRosMotorComunication({
        ros: ros,
        robot_extremity: "rightLeg",
        setRealAngles: setRealAnglesRightLeg,
        setDesiredAngles: setDesiredAnglesRightLeg
    });


    return (
        <main>
            <div id='rightleg_3d' className='cont_3dmodel'>
                <Right_leg realAnglesRightLeg={realAnglesRightLeg} desiredAnglesRightLeg={desiredAnglesRightLeg} changing_value={changing_value} />
            </div>
            <div id='rightleg_sliders' className='div_sliders'>
                <Slider_angle name='Axial Right Hip' number_joint={0} angles={desiredAnglesRightLeg} setAngles={setDesiredAnglesRightLeg} min_angle={-32.8} max_angle={27.9} setChangingValue={setChangingValue} />
                <Slider_angle name='Saggital Right Hip' number_joint={1} angles={desiredAnglesRightLeg} setAngles={setDesiredAnglesRightLeg} min_angle={-14.2} max_angle={12.5} setChangingValue={setChangingValue} />
                <Slider_angle name='Frontal Right Hip' number_joint={2} angles={desiredAnglesRightLeg} setAngles={setDesiredAnglesRightLeg} min_angle={-31.6} max_angle={42.3} setChangingValue={setChangingValue} />
                <Slider_angle name='Frontal Right Knee' number_joint={3} angles={desiredAnglesRightLeg} setAngles={setDesiredAnglesRightLeg} min_angle={-61.3} max_angle={82.4} setChangingValue={setChangingValue} />
                <Slider_angle name='Frontal Right Ankle' number_joint={4} angles={desiredAnglesRightLeg} setAngles={setDesiredAnglesRightLeg} min_angle={-23.1} max_angle={25.4} setChangingValue={setChangingValue} />
                <Slider_angle name='Sagittal Right Ankle' number_joint={5} angles={desiredAnglesRightLeg} setAngles={setDesiredAnglesRightLeg} min_angle={-19.9} max_angle={42.5} setChangingValue={setChangingValue} />


                <div id='rightleg_play' className='cont_play_button'>
                    <button className="play_button" onClick={() => public_position_message({ positions: desiredAnglesRightLeg, topic: positionRightLeg })}>
                        Move
                    </button>
                </div>
            </div>
        </main>
    )
}