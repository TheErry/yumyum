import './App.css'
import { RouterProvider } from "react-router-dom"
import router from './router/router'

function App() {

  return (
    <main>
      <div className='text-logo-container'>
        <div className='text-logo-row'>
          <p>Y</p>
          <p>Y</p>
        </div>
        <div className='text-logo-row'>
          <p>G</p>
          <p>S</p>
        </div>
      </div>
      <RouterProvider router={router}/>
    </main>
  )
}

export default App
