import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <main className="lg:w-[1440px] mx-auto">
      <Navbar />
      <Outlet />
    </main>
  )
}

export default App
