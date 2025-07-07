import './App.css'
import { useContext, useState, useEffect } from 'react';
import { Ros2Context } from "./context/RosContext.jsx"
import { Route, Routes, useLocation } from 'react-router-dom';
import { TourProvider } from '@reactour/tour'


import { Home_screen } from './components/home_screen/screens.jsx';

import { Head_screen } from './components/motor_control/head/head_screen.jsx';
import { Trunk_screen } from './components/motor_control/trunk/trunk_screen.jsx';
import { LeftArm_screen } from './components/motor_control/leftArm/leftArm_screen.jsx';
import { RightArm_screen } from './components/motor_control/rightArm/rightArm_screen.jsx';
import { LeftLeg_screen } from './components/motor_control/leftLeg/leftLeg_screen.jsx';
import { RightLeg_screen } from './components/motor_control/rightLeg/rightLeg_screen.jsx';

import { Header } from './components/home_screen/header.jsx';

import { Video } from './components/funcionalities/VideoComponent.jsx';
import { ForceTorque } from './components/funcionalities/ForceTorque.jsx';
import { ModeControl } from './components/funcionalities/mode_control.jsx';
import { Teleop_screen } from './components/funcionalities/teleoperation_screen.jsx';
import { Imu } from './components/funcionalities/Imu.jsx';


export function App() {

  const { ros } = useContext(Ros2Context)

  const location = useLocation();

  const [steps, setSteps] = useState(() => getStepsByPath(location.pathname));
  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    setIsTourOpen(false);
    const newSteps = getStepsByPath(location.pathname);
    setSteps(newSteps);
  }, [location.pathname]);

  return (
    <>
      <TourProvider
        key={steps}
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
        scrollSmooth
      >
        <Header />

        <Routes>
          <Route path='/' element={<Home_screen />} />

          <Route path='/LeftArm' element={<LeftArm_screen />} />
          <Route path='/RightArm' element={<RightArm_screen />} />
          <Route path='/Head' element={<Head_screen />} />
          <Route path='/LeftLeg' element={<LeftLeg_screen />} />
          <Route path='/RightLeg' element={<RightLeg_screen />} />
          <Route path='/Trunk' element={<Trunk_screen />} />
          <Route path='/Images' element={<Video ros={ros} />} />
          <Route path='/Force' element={<ForceTorque ros={ros} />} />
          <Route path='/ModeControl' element={<ModeControl />} />
          <Route path='/Imu' element={<Imu />} />
          <Route path='/Teleop' element={<Teleop_screen />} />
        </Routes>
      </TourProvider>
    </>
  )
}


function getStepsByPath(pathname) {
  switch (pathname) {
    case "/":
      return [
        {
          selector: '#header-conexion',
          content: 'Indica si ha sido posible conectarse al rosbridge',
        },
        {
          selector: '#header-teosim',
          content: 'Puedes cambiar el estado según si quieres controlar al Teo real o al modelo en Gazebo',
        },
        {
          selector: '#home_teo3d',
          content: 'Haz click en la extremidad de TEO que quieras controlar',
        },
        {
          selector: '#home_camera',
          content: 'Visualización en tiempo real de las cámaras del robot',
        },
        {
          selector: '#home_fuerzapar',
          content: 'Ver valores en tiempo real del sensor de fuerz',
        },
        {
          selector: '#home_mode',
          content: 'Cambia el modo de operación de las articulaciones',
        },
        {
          selector: '#home_imu',
          content: 'Accede a los valores de la IMU en tiempo real',
        },
        {
          selector: '#home_teleop',
          content: 'Teleopera el brazo del robot desde el movil',
        },
      ];
    case '/LeftArm':
      return [
        {
          selector: '#header-conexion',
          content: 'Indica si ha sido posible conectarse al rosbridge',
        },
        {
          selector: '#header-teosim',
          content: 'Puedes cambiar el estado según si quieres controlar al Teo real o al modelo en Gazebo',
        },
        {
          selector: '#leftarm_3d',
          content: 'Puedes observar el estado actual real del brazo y el estado deseado que puedes modificar con los sliders',
        },
        {
          selector: '#leftarm_pos',
          content: 'Posición del extremo del brazo con respecto al punto central. Para funcionar necesario abrir el servidor cartesian_controllers',
        },
        {
          selector: '#leftarm_orient',
          content: 'Orientación del extremo del brazo con respecto al punto central. Para funcionar necesario abrir el servidor cartesian_controllers',
        },
        {
          selector: '#leftarm_switch',
          content: 'Cambia entre modo en el que se determinan angulos de los joints a modo en el que se especifica la posición del extremo deseada.',
        },
        {
          selector: '#leftarm_sliders',
          content: 'Usa los sliders para elegir la posición del brazo que quieras',
        },
        {
          selector: '#leftarm_play',
          content: 'Pulsa para mover brazo a la posición deseada',
        },
        {
          selector: '#leftarm_play',
          content: 'Pulsa para mover brazo a la posición deseada',
        }
      ];
    case '/RightArm':
      return [
        {
          selector: '#header-conexion',
          content: 'Indica si ha sido posible conectarse al rosbridge',
        },
        {
          selector: '#header-teosim',
          content: 'Puedes cambiar el estado según si quieres controlar al Teo real o al modelo en Gazebo',
        },
        {
          selector: '#rightarm_3d',
          content: 'Puedes observar el estado actual real del brazo y el estado deseado que puedes modificar con los sliders',
        },
        {
          selector: '#rightarm_pos',
          content: 'Posición del extremo del brazo con respecto al punto central. Para funcionar necesario abrir el servidor cartesian_controllers',
        },
        {
          selector: '#rightarm_orient',
          content: 'Orientación del extremo del brazo con respecto al punto central. Para funcionar necesario abrir el servidor cartesian_controllers',
        },
        {
          selector: '#rightarm_switch',
          content: 'Cambia entre modo en el que se determinan angulos de los joints a modo en el que se especifica la posición del extremo deseada.',
        },
        {
          selector: '#rightarm_sliders',
          content: 'Usa los sliders para elegir la posición del brazo que quieras',
        },
        {
          selector: '#rightarm_play',
          content: 'Pulsa para mover brazo a la posición deseada',
        },
        {
          selector: '#rightarm_play',
          content: 'Pulsa para mover brazo a la posición deseada',
        }
      ];
    case '/Head':
      return [
        {
          selector: '#header-conexion',
          content: 'Indica si ha sido posible conectarse al rosbridge en LeftArm',
        },
        {
          selector: '#header-teosim',
          content: 'Puedes cambiar el estado según si quieres controlar al Teo real o al modelo en Gazebo',
        },
        {
          selector: '#head_3d',
          content: 'Puedes observar el estado actual real dela cabeza y el estado deseado que puedes modificar con los sliders',
        },
        {
          selector: '#head_sliders',
          content: 'Usa los sliders para elegir la posición de la cabeza que quieras',
        },
        {
          selector: '#head_play',
          content: 'Pulsa para mover la cabeza a la posición deseada',
        },
        {
          selector: '#head_qr',
          content: 'Escanea para teleoperar desde movil',
        }
      ];
    case '/Trunk':
      return [
        {
          selector: '#header-conexion',
          content: 'Indica si ha sido posible conectarse al rosbridge',
        },
        {
          selector: '#header-teosim',
          content: 'Puedes cambiar el estado según si quieres controlar al Teo real o al modelo en Gazebo',
        },
        {
          selector: '#trunk_3d',
          content: 'Puedes observar el estado actual real del tronco y el estado deseado que puedes modificar con los sliders',
        },
        {
          selector: '#trunk_sliders',
          content: 'Usa los sliders para elegir la posición del tronco que quieras',
        },
        {
          selector: '#trunk_play',
          content: 'Pulsa para mover el tronco a la posición deseada',
        }
      ];
    case '/LeftLeg':
      return [
        {
          selector: '#header-conexion',
          content: 'Indica si ha sido posible conectarse al rosbridge',
        },
        {
          selector: '#header-teosim',
          content: 'Puedes cambiar el estado según si quieres controlar al Teo real o al modelo en Gazebo',
        },
        {
          selector: '#leftleg_3d',
          content: 'Puedes observar el estado actual real de la pierna y el estado deseado que puedes modificar con los sliders',
        },
        {
          selector: '#leftleg_sliders',
          content: 'Usa los sliders para elegir la posición de la pierna que quieras',
        },
        {
          selector: '#leftleg_play',
          content: 'Pulsa para mover la pierna a la posición deseada',
        }
      ];
    case '/RightLeg':
      return [
        {
          selector: '#header-conexion',
          content: 'Indica si ha sido posible conectarse al rosbridge',
        },
        {
          selector: '#header-teosim',
          content: 'Puedes cambiar el estado según si quieres controlar al Teo real o al modelo en Gazebo',
        },
        {
          selector: '#rightleg_3d',
          content: 'Puedes observar el estado actual real de la pierna y el estado deseado que puedes modificar con los sliders',
        },
        {
          selector: '#rightleg_sliders',
          content: 'Usa los sliders para elegir la posición de la pierna que quieras',
        },
        {
          selector: '#rightleg_play',
          content: 'Pulsa para mover la pierna a la posición deseada',
        }
      ];
    case '/Images':
      return [
        {
          selector: '#header-conexion',
          content: 'Indica si ha sido posible conectarse al rosbridge',
        },
        {
          selector: '#header-teosim',
          content: 'Puedes cambiar el estado según si quieres controlar al Teo real o al modelo en Gazebo',
        },
        {
          selector: '#dropdown',
          content: 'Selecciona imagen que desees en el desplegable',
        }
      ];
    case '/Force':
      return [
        {
          selector: '#header-conexion',
          content: 'Indica si ha sido posible conectarse al rosbridge',
        },
        {
          selector: '#header-teosim',
          content: 'Puedes cambiar el estado según si quieres controlar al Teo real o al modelo en Gazebo',
        },
        {
          selector: '#options',
          content: 'Selecciona el sensor, la velocidad de monitorización o pausala',
        },
        {
          selector: '#fuerzas',
          content: 'Fuerza medida en cada eje',
        },
        {
          selector: '#torques',
          content: 'Torque medido en cada eje',
        }
      ];
    case '/ModeControl':
      return [
        {
          selector: '#header-conexion',
          content: 'Indica si ha sido posible conectarse al rosbridge',
        },
        {
          selector: '#header-teosim',
          content: 'Puedes cambiar el estado según si quieres controlar al Teo real o al modelo en Gazebo',
        },
        {
          selector: '#extremidad',
          content: 'Selecciona cualquier extremidad',
        },
        {
          selector: '#modotodo',
          content: 'Cambia de modo a toda la articulación',
        },
        {
          selector: '#arts',
          content: 'Muestra todas las articulaciones de la extremidad, se puede cambiar de modo por separado',
        }
      ];
    case '/Imu':
      return [
        {
          selector: '#header-conexion',
          content: 'Indica si ha sido posible conectarse al rosbridge',
        },
        {
          selector: '#header-teosim',
          content: 'Puedes cambiar el estado según si quieres controlar al Teo real o al modelo en Gazebo',
        },
        {
          selector: '#vel',
          content: 'Muestra la velocidad de cada eje',
        },
        {
          selector: '#acel',
          content: 'Muestra la aceleración de cada eje',
        },
        {
          selector: '#orient',
          content: 'Muestra la orientación de cada eje',
        }
      ];
    case '/Teleop':
      return [
        {
          selector: '#header-conexion',
          content: 'Indica si ha sido posible conectarse al rosbridge',
        },
        {
          selector: '#header-teosim',
          content: 'Puedes cambiar el estado según si quieres controlar al Teo real o al modelo en Gazebo',
        },
        {
          selector: '#rightarm_pos',
          content: 'Muestra la posicion y orientación del extremo del brazo con respecto al TCP',
        },
        {
          selector: '#modelo',
          content: 'Muestra modelo del brazo',
        },
        {
          selector: '#qr',
          content: 'Escanea para empezar a teleoperar',
        }
      ];
  }
}
