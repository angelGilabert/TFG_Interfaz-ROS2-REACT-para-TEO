import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Ros2Provider } from './context/RosContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Ros2Provider>
      <App />
    </Ros2Provider>
  </BrowserRouter>,
)
