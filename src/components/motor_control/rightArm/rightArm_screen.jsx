import { Right_arm } from './rightArm_3d.jsx';
import { Slider_angle } from '../../elements/slider_angle.jsx';
import { useState, useContext } from 'react';
import { Ros2Context } from "../../../context/RosContext.jsx"
import { public_mov, public_position_message, useRosInverseKinematics, useRosMotorComunication } from "../../../logic/ros_logic.jsx"
import { SwitchButton } from '../../elements/switch_button.jsx';


export function RightArm_screen() {
    const [realAnglesRightArm, setRealAnglesRightArm] = useState([0, 0, 0, 0, 0, 0])
    const [desiredAnglesRightArm, setDesiredAnglesRightArm] = useState([0, 0, 0, 0, 0, 0])

    const [endArmPos, setEndArmPos] = useState([0, 0, 0])
    const [endArmOri, setEndArmOri] = useState([0, 0, 0])

    const [isDirecta, setIsDirecta] = useState(true)

    const [inverseKinVals, setInverseKinVals] = useState([0, 0.35, -0.23, 0, 0, 0])

    const [changing_value, setChangingValue] = useState(false)

    const [movj_function, setMovjFunction] = useState(true)

    const { ros } = useContext(Ros2Context)


    const positionRightArm = useRosMotorComunication({
        ros: ros,
        robot_extremity: "rightArm",
        setRealAngles: setRealAnglesRightArm,
        setDesiredAngles: setDesiredAnglesRightArm
    });

    const [movjoint, movlinear] = useRosInverseKinematics({
        ros: ros,
        robot_extremity: "rightArm",
        endArmPos: endArmPos,
        setEndArmPos: setEndArmPos,
        setEndArmOri: setEndArmOri
    })

    return (
        <main>
            <div id='rightarm_3d' className='cont_3dmodel'>
                <Right_arm realAnglesRightArm={realAnglesRightArm} desiredAnglesRightArm={desiredAnglesRightArm} changing_value={changing_value} inverseKinVals={inverseKinVals} isDirecta={isDirecta} />

                <div id='rightarm_pos' style={{
                    position: 'absolute', top: '75%', left: '2%', width: '150px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '5px', borderRadius: '5px', zIndex: 10
                }}>
                    TCP Position:
                    <p> X: {endArmPos[0]} m</p>
                    <p> Y: {endArmPos[1]} m</p>
                    <p> Z: {endArmPos[2]} m</p>
                </div>
                <div id='rightarm_orient' style={{
                    position: 'absolute', top: '75%', right: '2%', width: '190', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '5px', borderRadius: '5px', zIndex: 10
                }}>
                    TCP orientation (XYZ):
                    <p> X: {endArmOri[0]} °</p>
                    <p> Y: {endArmOri[1]} °</p>
                    <p> Z: {endArmOri[2]} °</p>
                </div>
            </div>

            <div id='rightarm_sliders' className='div_sliders'>
                <div id='rightarm_switch' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <SwitchButton state={isDirecta} setState={setIsDirecta} left_word={'Joint'} right_word={'Cartesian'} />
                </div>
                {isDirecta ? (
                    <>
                        <Slider_angle name='Frontal Right Shoulder' number_joint={0} angles={desiredAnglesRightArm} setAngles={setDesiredAnglesRightArm} min_angle={-98.1} max_angle={106} setChangingValue={setChangingValue} />
                        <Slider_angle name='Saggital Right Shoulder' number_joint={1} angles={desiredAnglesRightArm} setAngles={setDesiredAnglesRightArm} min_angle={-75.5} max_angle={22.4} setChangingValue={setChangingValue} />
                        <Slider_angle name='Axial Right Shoulder' number_joint={2} angles={desiredAnglesRightArm} setAngles={setDesiredAnglesRightArm} min_angle={-80.1} max_angle={57} setChangingValue={setChangingValue} />
                        <Slider_angle name='Frontal Right Elbow' number_joint={3} angles={desiredAnglesRightArm} setAngles={setDesiredAnglesRightArm} min_angle={-99.6} max_angle={98.4} setChangingValue={setChangingValue} />
                        <Slider_angle name='Axial Right Wrist' number_joint={4} angles={desiredAnglesRightArm} setAngles={setDesiredAnglesRightArm} min_angle={-80.4} max_angle={99.6} setChangingValue={setChangingValue} />
                        <Slider_angle name='Frontal Right Wrist' number_joint={5} angles={desiredAnglesRightArm} setAngles={setDesiredAnglesRightArm} min_angle={-115.1} max_angle={44.7} setChangingValue={setChangingValue} />
                    </>
                ) : (
                    <>
                        <Slider_angle name='Posición eje X' number_joint={0} angles={inverseKinVals} setAngles={setInverseKinVals} min_angle={-0.73} max_angle={0.73} isMeter={true} />
                        <Slider_angle name='Posición eje Y' number_joint={1} angles={inverseKinVals} setAngles={setInverseKinVals} min_angle={-1.07} max_angle={0.19} isMeter={true} />
                        <Slider_angle name='Posición eje Z' number_joint={2} angles={inverseKinVals} setAngles={setInverseKinVals} min_angle={-0.23} max_angle={1.03} isMeter={true} />
                        <Slider_angle name='Ángulo eje X' number_joint={3} angles={inverseKinVals} setAngles={setInverseKinVals} min_angle={-180} max_angle={180} />
                        <Slider_angle name='Ángulo eje Y' number_joint={4} angles={inverseKinVals} setAngles={setInverseKinVals} min_angle={-180} max_angle={180} />
                        <Slider_angle name='Ángulo eje Z' number_joint={5} angles={inverseKinVals} setAngles={setInverseKinVals} min_angle={-180} max_angle={180} />
                    </>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <div className='cont_play_button'>

                        {!isDirecta &&
                            <div id='movj_switch' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '140px', height: '30px' }}>
                                <SwitchButton state={movj_function} setState={setMovjFunction} left_word={'movj'} right_word={'movl'} fontSize='15px' />
                            </div>
                        }

                        <button id='rightarm_play' className="play_button" style={{ marginLeft: '15px' }}
                            onClick={() => {
                                if (isDirecta) {
                                    console.log(desiredAnglesRightArm)
                                    public_position_message({ positions: desiredAnglesRightArm, topic: positionRightArm })
                                } else {
                                    if (movj_function) {
                                        public_mov({ pose_orient: inverseKinVals, topic: movjoint })
                                    } else {
                                        public_mov({ pose_orient: inverseKinVals, topic: movlinear })
                                    }

                                }
                            }}>
                            Move
                        </button>

                    </div>
                </div>
            </div>
        </main>
    )
}