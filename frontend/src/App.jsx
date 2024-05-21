import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <main className="app">
      <Navbar />
      <div className='min-h-screen'>
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </main>
  )
}

export default App
