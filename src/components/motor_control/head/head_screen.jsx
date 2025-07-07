import { Head } from './head_3d.jsx';
import { Slider_angle } from '../../elements/slider_angle.jsx';
import { useState, useEffect, useContext } from 'react';
import { Ros2Context } from "../../../context/RosContext.jsx"
import { public_position_message, useRosMotorComunication, useRosMotorVelocity, useRosGetSetModeService } from "../../../logic/ros_logic.jsx"
import { useSocketComunication } from '../../../logic/socket_logic.jsx';
import { Movil_comp } from './qr_movil.jsx';


export function Head_screen() {

    const [realAnglesHead, setRealAnglesHead] = useState([0, 0])
    const [desiredAnglesHead, setDesiredAnglesHead] = useState([0, 0])
    const [disabled_sliders, setDisabledSliders] = useState([false, false])

    const [changing_value, setChangingValue] = useState(false)

    const [movil_connected, setMovilConnected] = useState(false)
    const [gyro_movil, setGyroMovil] = useState([0, 0])

    const { ros } = useContext(Ros2Context)

    // Topic de Posición y Velocidad
    const [positionHead, setPositionHead] = useState(null)
    const [velocityHead, setVelocityHead] = useState(null)
    const [service_setModes, setServiceSetModes] = useState(null)

    const [activo_pos, setActivoPos] = useState(true)

    const [moving_axial, setMovingAxial] = useState(0)
    const [moving_frontal, setMovingFrontal] = useState(0)




    const result = useRosMotorComunication({
        ros: ros,
        robot_extremity: "head",
        setRealAngles: setRealAnglesHead,
        setDesiredAngles: setDesiredAnglesHead
    });

    const result_2 = useRosMotorVelocity({
        ros: ros,
        robot_extremity: "head"
    });

    const result_3 = useRosGetSetModeService({
        ros: ros,
        robot_extremity: "head"
    });



    useEffect(() => {
        if (result && result_2 && result_3) {   //TODO cambiar nombre variables
            setPositionHead(result);
            setVelocityHead(result_2);
            setServiceSetModes(result_3);
        }
        console.log("esto funca funca")
    }, [result, result_2, result_3]);


    useSocketComunication({
        setMovilConnected: setMovilConnected,
        setGyroMovil: setGyroMovil,
        topic_publ: positionHead,
        setDisabledSliders: setDisabledSliders,
        activo_pos: activo_pos,
        setActivoPos: setActivoPos,
        topic_vel: velocityHead,
        service_setModes: service_setModes,
        setMovingAxial: setMovingAxial,
        setMovingFrontal: setMovingFrontal
    })

    return (
        <main>
            <div id='head_3d' className='cont_3dmodel'>
                <Head realAnglesHead={realAnglesHead} desiredAnglesHead={desiredAnglesHead} changing_value={changing_value} movil_connected={movil_connected} />
            </div>
            <div id='head_sliders' className='div_sliders'>
                <Slider_angle name='Axial Neck' number_joint={0} angles={desiredAnglesHead} setAngles={setDesiredAnglesHead} min_angle={-60} max_angle={60} setChangingValue={setChangingValue} isDisabled={disabled_sliders[0]} height={'100px'} />
                <Slider_angle name='Frontal Neck' number_joint={1} angles={desiredAnglesHead} setAngles={setDesiredAnglesHead} min_angle={-10} max_angle={10} setChangingValue={setChangingValue} isDisabled={disabled_sliders[1]} height={'100px'} />

                <div id='head_play' className='cont_play_button'>
                    <button className="play_button" onClick={() => public_position_message({ positions: desiredAnglesHead, topic: positionHead })}>
                        Move
                    </button>
                </div>

                <Movil_comp movil_connected={movil_connected} gyro_movil={gyro_movil} activo_pos={activo_pos} setActivoPos={setActivoPos} moving_axial={moving_axial} moving_frontal={moving_frontal} />
            </div>
        </main>
    )
}