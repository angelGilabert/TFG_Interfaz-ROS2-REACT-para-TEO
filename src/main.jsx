import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Ros2Provider } from './context/RosContext.jsx'

function Root() {
  return (
    <BrowserRouter>
      <Ros2Provider>
        <App />
      </Ros2Provider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<Root />);

