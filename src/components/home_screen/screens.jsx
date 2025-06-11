import { Teo_model } from './3d_model.jsx';
import { useNavigate } from 'react-router-dom';


export function Home_screen() {
    const navigate = useNavigate();

    const handleClick = (page) => {
        if (page == 1) {
            navigate("/Images");
        } else if (page == 2) {
            navigate("/Force");
        } else if (page == 3) {
            navigate("/ModeControl");
        } else if (page == 4) {
            navigate("/Imu");
        } else if (page == 5) {
            navigate("/Teleop");
        }
    };


    return (
        <main>
            <div id='home_teo3d' className='cont_3dmodel'>
                <Teo_model />
            </div>

            <div className='div_iconos'>

                <div id='home_camera' class="item" onClick={() => handleClick(1)}>

                    <button className='boton-item' style={{
                        backgroundColor: 'transparent',
                    }}>
                        <img
                            src='src/assets/camara.png'
                        />
                    </button>

                    <h1 style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '20px',
                        color: '#000000',
                        marginTop: '0px',
                        marginBottom: '0px'
                    }}>
                        Camera
                    </h1>
                </div>


                <div id='home_fuerzapar' class="item" onClick={() => handleClick(2)}>

                    <button className='boton-item' style={{
                        backgroundColor: 'transparent',
                    }}>
                        <img
                            src='src/assets/fuerzapar.png'
                        />
                    </button>

                    <h1 style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '20px',
                        color: '#000000',
                        marginTop: '0px',
                        marginBottom: '0px'
                    }}>
                        ForceTorque
                    </h1>
                </div>


                <div id='home_mode' class="item" onClick={() => handleClick(3)}>

                    <button className='boton-item' style={{
                        backgroundColor: 'transparent',
                    }}>
                        <img
                            src='src/assets/modo.png'
                        />
                    </button>

                    <h1 style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '20px',
                        color: '#000000',
                        marginTop: '0px',
                        marginBottom: '0px'
                    }}>
                        Mode Switch
                    </h1>
                </div>


                <div id='home_imu' class="item" onClick={() => handleClick(4)}>

                    <button className='boton-item' style={{
                        backgroundColor: 'transparent',
                    }}>
                        <img
                            src='src/assets/imu.png'
                        />
                    </button>
                    <h1 style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '20px',
                        color: '#000000',
                        marginTop: '0px',
                        marginBottom: '0px'
                    }}>
                        IMU
                    </h1>
                </div>


                <div id='home_teleop' style={{ gridColumn: '1 / 3' }} class="item" onClick={() => handleClick(5)}>

                    <button className='boton-item' style={{
                        backgroundColor: 'transparent',
                    }}>
                        <img
                            src="src/assets/brazo.png"
                            style={{ transform: 'rotate(90deg)' }}
                            alt="Brazo"
                        />
                    </button>

                    <h1 style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '20px',
                        color: '#000000',
                        marginTop: '0px',
                        marginBottom: '0px'
                    }}>
                        Teleoperation
                    </h1>
                </div>
            </div>
        </main >

    )
}