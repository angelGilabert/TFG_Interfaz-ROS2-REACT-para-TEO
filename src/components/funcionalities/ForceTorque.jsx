import { useState, useEffect } from 'react';
import { Ros2Context } from '../../context/RosContext.jsx';
import { Realtimechart } from '../elements/graph.jsx';
import { useForceTorqueSuscription } from "../../logic/ros_logic.jsx"
import { CustomDropdown } from '../elements/dropdown.jsx';
import ROSLIB from 'roslib';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';


export function ForceTorque({ ros }) {

    const [wrenchStampedTopicNames, setWrenchStampedTopicNames] = useState([]);
    const [msgWrenchStampedTopicNames, setMsgWrenchStampedTopicNames] = useState([]);

    const [selectedWrenchStampedTopicName, setSelectedWrenchStampedTopicName] = useState();
    const [wrenchStampedTopicNamesJsx, setWrenchStampedTopicNamesJsx] = useState();

    const [refreshHz, setRefreshHz] = useState('20'); // [Hz]

    const [forcetorque_values, setForceTorquevalues] = useState([0, 0, 0, 0, 0, 0])

    const [playing, setPlaying] = useState(true)



    useEffect(() => {
        ros.getTopicsForType("geometry_msgs/WrenchStamped", (got) => { setWrenchStampedTopicNames(got.filter(item => item !== "/undefined")) });
        ros.getTopicsForType("geometry_msgs/msg/WrenchStamped", (got) => { setMsgWrenchStampedTopicNames(got) });
    }, [ros]);

    useEffect(() => {
        const topicNames = [];
        topicNames.push(...wrenchStampedTopicNames);
        topicNames.push(...msgWrenchStampedTopicNames);
        setSelectedWrenchStampedTopicName(topicNames[0]);
        setWrenchStampedTopicNamesJsx(topicNames);
    }, [wrenchStampedTopicNames, msgWrenchStampedTopicNames]);


    useForceTorqueSuscription({
        ros: ros,
        topic_selected: selectedWrenchStampedTopicName,
        refresh: refreshHz,
        setForceTorquevalues: setForceTorquevalues,
        playing: playing
    })




    return (
        <main style={{ display: 'block', backgroundColor: '#DDEEFF' }}>

            <div id='options' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CustomDropdown actual_state={selectedWrenchStampedTopicName} setState={setSelectedWrenchStampedTopicName} states={wrenchStampedTopicNamesJsx == null ? ["No topic FT"] : wrenchStampedTopicNamesJsx} padding={'0px'}
                    style={{
                        padding: '10px 20px',
                        fontFamily: 'Inter, system-ui, sans-serif', fontSize: '15px', fontWeight: 'bold',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                        width: '200px', height: '45px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden', textOverflow: 'ellipsis',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        margin: '25px'
                    }}
                />

                <CustomDropdown actual_state={refreshHz} setState={setRefreshHz} states={['2', '5', '10', '20', '30']} name_states={['2 Hz', '5 Hz', '10 Hz', '20 Hz', '30 Hz']} padding={'0px'}
                    style={{
                        padding: '10px 20px',
                        fontFamily: 'Inter, system-ui, sans-serif', fontSize: '15px', fontWeight: 'bold',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                        width: '100px', height: '45px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden', textOverflow: 'ellipsis',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        margin: '25px'
                    }}
                />

                <button onClick={() => { setPlaying(!playing) }} style={{ padding: '20px', borderRadius: '10', aspectRatio: '1/1', alignContent: 'center', display: 'flex', margin: '25px' }}>
                    {playing ?
                        <FontAwesomeIcon icon={faPause} /> :
                        <FontAwesomeIcon icon={faPlay} />}
                </button>
            </div>





            <div id='fuerzas' style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ marginLeft: '35px' }}>
                    <p style={{ marginBottom: '7px' }}> Fuerza eje X </p>
                    <Realtimechart var_eje_x={forcetorque_values[0]} max_range={10} min_range={-0.2}
                        colors={{
                            lineColor: '#f74c3e' //rojo
                        }} />
                </div>
                <div style={{ marginLeft: '35px' }}>
                    <p style={{ marginBottom: '7px' }}> Fuerza eje Y </p>
                    <Realtimechart var_eje_x={forcetorque_values[1]} max_range={10} min_range={-0.2}
                        colors={{
                            lineColor: '#28A745' //verde
                        }} />
                </div>
                <div style={{ marginLeft: '35px' }}>
                    <p style={{ marginBottom: '7px' }}> Fuerza eje Z </p>
                    <Realtimechart var_eje_x={forcetorque_values[2]} max_range={10} min_range={-0.2} />
                </div>
            </div>

            <div id='torques' style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ marginLeft: '35px' }}>
                    <p style={{ marginBottom: '7px' }}> Torque eje X </p>
                    <Realtimechart var_eje_x={forcetorque_values[3]} max_range={10} min_range={-0.2}
                        colors={{
                            lineColor: '#f74c3e' //rojo
                        }} />
                </div>
                <div style={{ marginLeft: '35px' }}>
                    <p style={{ marginBottom: '7px' }}>  Torque eje Y </p>
                    <Realtimechart var_eje_x={forcetorque_values[4]} max_range={10} min_range={-0.2}
                        colors={{
                            lineColor: '#28A745' //verde
                        }} />
                </div>
                <div style={{ marginLeft: '35px' }}>
                    <p style={{ marginBottom: '7px' }}> Torque eje Z </p>
                    <Realtimechart var_eje_x={forcetorque_values[5]} max_range={10} min_range={-0.2} />
                </div>
            </div>
        </main>
    )
}