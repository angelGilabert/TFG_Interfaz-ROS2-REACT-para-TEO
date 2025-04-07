import './App.css'
import { useContext } from 'react';
import { Ros2Context } from "./context/RosContext.jsx"


import { Route, Routes } from 'react-router-dom';
import { Home_screen } from './components/screens/screens.jsx';

import { Head_screen } from './components/motor_control/head/head_screen.jsx';
import { Trunk_screen } from './components/motor_control/trunk/trunk_screen.jsx';
import { LeftArm_screen } from './components/motor_control/leftArm/leftArm_screen.jsx';
import { RightArm_screen } from './components/motor_control/rightArm/rightArm_screen.jsx';
import { LeftLeg_screen } from './components/motor_control/leftLeg/leftLeg_screen.jsx';
import { RightLeg_screen } from './components/motor_control/rightLeg/rightLeg_screen.jsx';



export function App() {

  const { isConnected } = useContext(Ros2Context)


  return (
    <>
      <header>
        <h1>Estado de conexión: {isConnected ? "🟢 Conectado" : "🔴 Desconectado"}</h1>
      </header>

      <Routes>
        <Route path='/' element={<Home_screen />} />

        <Route path='/LeftArm' element={<LeftArm_screen />} />
        <Route path='/RightArm' element={<RightArm_screen />} />
        <Route path='/Head' element={<Head_screen />} />
        <Route path='/LeftLeg' element={<LeftLeg_screen />} />
        <Route path='/RightLeg' element={<RightLeg_screen />} />
        <Route path='/Trunk' element={<Trunk_screen />} />
      </Routes>
    </>
  )
}
