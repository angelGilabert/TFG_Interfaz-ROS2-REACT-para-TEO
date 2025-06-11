import { useState, useContext } from 'react';
import { Ros2Context } from '../../context/RosContext.jsx';
import { Realtimechart } from '../elements/graph.jsx';
import { useImuSuscription } from "../../logic/ros_logic.jsx"
import { Imu3d } from './Imu_3d.jsx';


export function Imu() {

    const [imu_vel, setImuvel] = useState([0, 0, 0])
    const [imu_acel, setImuacel] = useState([0, 0, 0])
    const [imu_angles, setImuangles] = useState([0, 0, 0])

    const { ros } = useContext(Ros2Context)

    useImuSuscription({
        ros: ros,
        setImuvel: setImuvel,
        setImuacel: setImuacel,
        setImuangles: setImuangles
    })

    return (
        <main style={{ display: 'block', backgroundColor: '#DDEEFF' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ marginLeft: '35px' }}>
                    <p style={{ marginBottom: '7px' }}> Velocidad angular X </p>
                    <Realtimechart var_eje_x={imu_vel[0]} max_range={0.2} min_range={-0.2}
                        colors={{
                            lineColor: '#f74c3e' //rojo
                        }} />
                </div>
                <div style={{ marginLeft: '35px' }}>
                    <p style={{ marginBottom: '7px' }}> Velocidad angular Y </p>
                    <Realtimechart var_eje_x={imu_vel[1]} max_range={0.2} min_range={-0.2}
                        colors={{
                            lineColor: '#28A745' //verde
                        }} />
                </div>
                <div style={{ marginLeft: '35px' }}>
                    <p style={{ marginBottom: '7px' }}> Velocidad angular Z </p>
                    <Realtimechart var_eje_x={imu_vel[1]} max_range={0.2} min_range={-0.2} />
                </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex' }}>
                <div style={{ marginLeft: '35px' }}>
                    <p style={{ marginBottom: '7px' }}> Aceleración lineal X </p>
                    <Realtimechart var_eje_x={imu_acel[0]} max_range={8} min_range={-0.2}
                        colors={{
                            lineColor: '#f74c3e' //rojo
                        }} />
                </div>
                <div style={{ marginLeft: '35px' }}>
                    <p style={{ marginBottom: '7px' }}> Aceleración lineal Y </p>
                    <Realtimechart var_eje_x={imu_acel[1]} max_range={8} min_range={-0.2}
                        colors={{
                            lineColor: '#28A745' //verde
                        }} />
                </div>
                <div style={{ marginLeft: '35px' }}>
                    <p style={{ marginBottom: '7px' }}> Aceleración lineal Z </p>
                    <Realtimechart var_eje_x={imu_acel[1]} max_range={8} min_range={-0.2} />
                </div>
            </div>

            <div style={{ height: '190px', display: 'flex', justifyContent: 'center' }}>

                <div style={{ height: '190px', display: 'flex' }}>
                    <Imu3d angles={imu_angles} />
                </div>



                <div>
                    <p> Orientacion </p>
                    <p> X: {imu_angles[0]} °</p>
                    <p> Y: {imu_angles[1]} °</p>
                    <p> Z: {imu_angles[2]} °</p>
                </div>

            </div>
        </main>
    )
}