import './header.css'
import { useContext } from 'react';
import { Ros2Context } from "../../context/RosContext.jsx"

import { useTour } from '@reactour/tour';
import { CustomDropdown } from '../elements/dropdown.jsx'


export function Header() {

    const { ros, isConnected } = useContext(Ros2Context)

    const { teoType, setTeoType } = useContext(Ros2Context)

    const { setIsOpen } = useTour();


    return (
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            <div style={{ height: '90%', width: '50%', display: 'flex', alignItems: 'center' }}>
                <div style={{ height: '54px', marginLeft: '10px' }}>
                    <img src="src/assets/uc3m.jpg" alt="Ejemplo de imagen" style={{ height: '100%' }} />
                </div>

                <div style={{ height: '90%', display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
                    <img src="src/assets/roboticslab-banner-350px.png" alt="Ejemplo de imagen" style={{ height: '70%' }} />
                </div>

            </div>

            <div style={{ height: '100%', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <div id="header-conexion" style={{ width: '125px', height: '75%', display: 'flex', alignItems: 'center', borderRadius: '10%', backgroundColor: '#e0e0e0', justifyContent: 'center', border: '3px solid #FFFFFF' }}>
                    <h1 style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '25px',
                        color: '#000000',
                        marginRight: '15px'
                    }}>
                        Ros:
                    </h1>

                    <img
                        src={isConnected ? 'src/assets/wifi_bueno.png' : 'src/assets/wifi_mal.png'}
                        alt="Estado de conexión"
                        style={{ width: '40px', height: '40px' }}
                    />
                </div>


                <div id="header-teosim">
                    <CustomDropdown actual_state={teoType} setState={setTeoType} states={["teoSim", "teo"]} name_states={["Simulated Teo", "Real Teo"]}
                        style={{
                            padding: '10px 20px',
                            fontFamily: 'Inter, system-ui, sans-serif',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            borderRadius: '6px',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            width: '175px',
                            height: '45px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    />
                </div>


                <div style={{ height: '90%', display: 'flex', alignItems: 'center' }}>
                    <button
                        className="btn-question"
                        onClick={() => setIsOpen(true)}
                    >
                        ?
                    </button>
                </div>

            </div >



        </header >
    )
}