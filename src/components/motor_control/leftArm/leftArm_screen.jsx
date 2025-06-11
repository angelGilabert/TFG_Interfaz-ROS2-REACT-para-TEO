import { Left_arm } from './leftArm_3d.jsx';
import { Slider_angle } from '../../elements/slider_angle.jsx';
import { useState, useContext, useEffect } from 'react';
import { Ros2Context } from "../../../context/RosContext.jsx"
import { public_mov, public_position_message, useRosInverseKinematics, useRosMotorComunication } from "../../../logic/ros_logic.jsx"
import { SwitchButton } from '../../elements/switch_button.jsx';



export function LeftArm_screen() {

    const [realAnglesLeftArm, setRealAnglesLeftArm] = useState([0, 0, 0, 0, 0, 0])
    const [desiredAnglesLeftArm, setDesiredAnglesLeftArm] = useState([0, 0, 0, 0, 0, 0])

    const [endArmPos, setEndArmPos] = useState([0, 0, 0])
    const [endArmOri, setEndArmOri] = useState([0, 0, 0])

    const [isDirecta, setIsDirecta] = useState(true)

    const [inverseKinVals, setInverseKinVals] = useState([0, 0.35, -0.23, 0, Math.PI, 0])

    const [changing_value, setChangingValue] = useState(false)

    const { ros } = useContext(Ros2Context)

    const positionLeftArm = useRosMotorComunication({
        ros: ros,
        robot_extremity: "leftArm",
        setRealAngles: setRealAnglesLeftArm,
        setDesiredAngles: setDesiredAnglesLeftArm,
    });

    const [movjoint, movlinear] = useRosInverseKinematics({
        ros: ros,
        robot_extremity: "leftArm",
        endArmPos: endArmPos,
        setEndArmPos: setEndArmPos,
        setEndArmOri: setEndArmOri
    })


    return (
        <main>
            <div id='leftarm_3d' className='cont_3dmodel'>
                <Left_arm realAnglesLeftArm={realAnglesLeftArm} desiredAnglesLeftArm={desiredAnglesLeftArm} changing_value={changing_value} inverseKinVals={inverseKinVals} isDirecta={isDirecta} />
                <div id='leftarm_pos' style={{
                    position: 'absolute', top: '75%', left: '2%', width: '150px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '5px', borderRadius: '5px', zIndex: 10
                }}>
                    TCP Position:
                    <p> X: {endArmPos[0]} m</p>
                    <p> Y: {endArmPos[1]} m</p>
                    <p> Z: {endArmPos[2]} m</p>
                </div>
                <div id='leftarm_orient' style={{
                    position: 'absolute', top: '75%', right: '2%', width: '190px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '5px', borderRadius: '5px', zIndex: 10
                }}>
                    TCP orientation (XYZ):
                    <p> X: {endArmOri[0]} °</p>
                    <p> Y: {endArmOri[1]} °</p>
                    <p> Z: {endArmOri[2]} °</p>
                </div>
            </div>

            <div id='leftarm_sliders' className='div_sliders'>
                <div id='leftarm_switch' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <SwitchButton state={isDirecta} setState={setIsDirecta} />
                </div>
                {isDirecta ? (
                    <>
                        <Slider_angle name='Frontal Left Shoulder' number_joint={0} angles={desiredAnglesLeftArm} setAngles={setDesiredAnglesLeftArm} min_angle={-96.8} max_angle={113.2} setChangingValue={setChangingValue} />
                        <Slider_angle name='Saggital Left Shoulder' number_joint={1} angles={desiredAnglesLeftArm} setAngles={setDesiredAnglesLeftArm} min_angle={-23.9} max_angle={76.5} setChangingValue={setChangingValue} />
                        <Slider_angle name='Axial Left Shoulder' number_joint={2} angles={desiredAnglesLeftArm} setAngles={setDesiredAnglesLeftArm} min_angle={-51.6} max_angle={84.1} setChangingValue={setChangingValue} />
                        <Slider_angle name='Frontal Left Elbow' number_joint={3} angles={desiredAnglesLeftArm} setAngles={setDesiredAnglesLeftArm} min_angle={-101.1} max_angle={96.8} setChangingValue={setChangingValue} />
                        <Slider_angle name='Axial Left Wrist' number_joint={4} angles={desiredAnglesLeftArm} setAngles={setDesiredAnglesLeftArm} min_angle={-101.3} max_angle={76.4} setChangingValue={setChangingValue} />
                        <Slider_angle name='Frontal Left Wrist' number_joint={5} angles={desiredAnglesLeftArm} setAngles={setDesiredAnglesLeftArm} min_angle={-113.3} max_angle={61.3} setChangingValue={setChangingValue} />
                    </>
                ) : (
                    <>
                        <Slider_angle name='Posición eje X' number_joint={0} angles={inverseKinVals} setAngles={setInverseKinVals} min_angle={-0.73} max_angle={0.73} isMeter={true} />
                        <Slider_angle name='Posición eje Y' number_joint={1} angles={inverseKinVals} setAngles={setInverseKinVals} min_angle={-0.19} max_angle={1.07} isMeter={true} />
                        <Slider_angle name='Posición eje Z' number_joint={2} angles={inverseKinVals} setAngles={setInverseKinVals} min_angle={-0.23} max_angle={1.03} isMeter={true} />
                        <Slider_angle name='Ángulo eje X' number_joint={3} angles={inverseKinVals} setAngles={setInverseKinVals} min_angle={-180} max_angle={180} />
                        <Slider_angle name='Ángulo eje Y' number_joint={4} angles={inverseKinVals} setAngles={setInverseKinVals} min_angle={-180} max_angle={180} />
                        <Slider_angle name='Ángulo eje Z' number_joint={5} angles={inverseKinVals} setAngles={setInverseKinVals} min_angle={-180} max_angle={180} />
                    </>
                )}

                <div className='cont_play_button'>
                    <button id='leftarm_play' className="play_button"
                        onClick={() => {
                            if (isDirecta) {
                                console.log(desiredAnglesLeftArm)
                                public_position_message({ positions: desiredAnglesLeftArm, topic: positionLeftArm })
                            } else {
                                console.log(inverseKinVals)
                                public_mov({ pose_orient: inverseKinVals, topic: movjoint })
                            }
                        }}>
                        Move
                    </button>
                </div>
            </div>
        </main>
    )
}
