import { Trunk } from './trunk_3d.jsx';
import { Slider_angle } from '../../elements/slider_angle.jsx';
import { useState, useContext } from 'react';
import { Ros2Context } from "../../../context/RosContext.jsx"
import { public_position_message, useRosMotorComunication } from "../../../logic/ros_logic.jsx"


export function Trunk_screen() {
    const [realAnglesTrunk, setRealAnglesTrunk] = useState([0, 0])
    const [desiredAnglesTrunk, setDesiredAnglesTrunk] = useState([0, 0])

    const [changing_value, setChangingValue] = useState(false)

    const { ros } = useContext(Ros2Context)


    const positionTrunk = useRosMotorComunication({
        ros: ros,
        robot_extremity: "trunk",
        setRealAngles: setRealAnglesTrunk,
        setDesiredAngles: setDesiredAnglesTrunk
    });

    return (
        <main>
            <div className='cont_3dmodel'>
                <Trunk realAnglesTrunk={realAnglesTrunk} desiredAnglesTrunk={desiredAnglesTrunk} changing_value={changing_value} />
            </div>

            <div className='div_sliders'>
                <Slider_angle name='Axial Trunk' number_joint={0} angles={desiredAnglesTrunk} setAngles={setDesiredAnglesTrunk} min_angle={-59.3} max_angle={46.3} setChangingValue={setChangingValue} />
                <Slider_angle name='Frontal Trunk' number_joint={1} angles={desiredAnglesTrunk} setAngles={setDesiredAnglesTrunk} min_angle={-10.1} max_angle={90.4} setChangingValue={setChangingValue} />


                <div className='cont_play_button'>
                    <button className="play_button" onClick={() => public_position_message({ positions: desiredAnglesTrunk, topic: positionTrunk })}>
                        Play
                    </button>
                </div>

            </div>
        </main>
    )
}