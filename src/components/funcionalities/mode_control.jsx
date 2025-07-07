import { CustomDropdown } from '../elements/dropdown.jsx';
import { useState, useContext, useEffect, useRef } from 'react';
import { Ros2Context } from '../../context/RosContext.jsx';
import { get_service, call_service_get_available_modes, call_service_get_joints_name, call_service_getModes, call_service_setModes } from '../../logic/ros_logic.jsx';


export function ModeControl() {


    const [selectedExtremitry, setSelectedExtremitry] = useState("head")

    const [extremity_mode, setExtremity_mode] = useState("MODO")

    const [posiblesModes, setPosiblesModes] = useState([])

    const [extremity_joints, setExtremity_joints] = useState([])

    const [joints_modes, setJointsModes] = useState([])

    const [active, setActive] = useState(false)


    const { ros, teoType } = useContext(Ros2Context)

    const serv_set_modes = useRef(null)
    const serv_available_modes = useRef(null)
    const serv_get_joints = useRef(null)
    const serv_get_modes = useRef(null)


    const fetchAvailableModes = async () => {
        try {
            // Espera a que la promesa se resuelva
            const aux_list = await call_service_get_available_modes({ service: serv_available_modes.current });
            console.log(aux_list);
            setPosiblesModes(aux_list);
            setActive(true)
        } catch (error) {
            console.error('Error al obtener los modos:', error);
        }
    };

    const fetchGetJoints = async () => {
        try {
            // Espera a que la promesa se resuelva
            const aux_list = await call_service_get_joints_name({ service: serv_get_joints.current });
            console.log(aux_list);
            setExtremity_joints(aux_list);
        } catch (error) {
            console.error('Error al obtener los modos:', error);
        }
    };

    const fetchGetModes = async () => {
        try {
            // Espera a que la promesa se resuelva
            const aux_list = await call_service_getModes({ service: serv_get_modes.current });
            console.log(aux_list);
            setJointsModes(aux_list);
        } catch (error) {
            console.error('Error al obtener los modos:', error);
        }
    };


    useEffect(() => {
        get_service({ ros: ros, teoType: teoType, robot_extremity: selectedExtremitry, service: serv_set_modes, serv_name: 'set_modes', message_type: 'yarp_control_msgs/srv/SetControlModes' })
        get_service({ ros: ros, teoType: teoType, robot_extremity: selectedExtremitry, service: serv_available_modes, serv_name: 'get_available_modes', message_type: 'yarp_control_msgs/srv/GetAvailableControlModes' })
        get_service({ ros: ros, teoType: teoType, robot_extremity: selectedExtremitry, service: serv_get_joints, serv_name: 'get_joints_names', message_type: 'yarp_control_msgs/srv/GetJointsNames' })
        get_service({ ros: ros, teoType: teoType, robot_extremity: selectedExtremitry, service: serv_get_modes, serv_name: 'get_modes', message_type: 'yarp_control_msgs/srv/GetControlModes' })

        fetchAvailableModes();
        fetchGetJoints();
        fetchGetModes();

    }, [selectedExtremitry]);


    function changeMode(key, index) {
        call_service_setModes({ names: [extremity_joints[index]], modes: [key], service: serv_set_modes.current });
        fetchGetModes();
    }

    function changeAllMode(key) {
        const modesArray = Array(extremity_joints.length).fill(key);
        call_service_setModes({ names: [], modes: modesArray, service: serv_set_modes.current });
        fetchGetModes();
        setExtremity_mode(key)
    }







    return (
        <div>
            <div id='extremidad' style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '25px'
            }} >
                <CustomDropdown actual_state={selectedExtremitry} setState={setSelectedExtremitry} states={["head", "leftArm", "rightArm", "trunk", "leftLeg", "rightLeg"]} name_states={null} padding='0px'
                    style={{
                        padding: '10px 20px',
                        fontSize: '18px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                        width: '175px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }} />
            </div>



            <div id='modotodo' style={{ display: 'flex', alignItems: 'center' }}>
                <p> Asigna el modo a toda la extremidad</p>
                <CustomDropdown actual_state={extremity_mode} setState={changeAllMode} states={posiblesModes} name_states={null}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                        width: '200px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }} />
            </div>




            <div id='arts'
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridTemplateRows: 'repeat(3, auto)',
                    gridAutoFlow: 'column',
                    gap: '10px',
                }}
            >
                {extremity_joints.map((joint, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ width: '200px' }}> {joint}</p>
                        <CustomDropdown actual_state={joints_modes[index]} setState={changeMode} states={posiblesModes} name_states={null} index={index}
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                cursor: 'pointer',
                                width: '200px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }} />
                    </div>
                ))}
            </div>


        </div >
    )
}