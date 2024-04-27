import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <main className="lg:w-[1440px] mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}

export default App
