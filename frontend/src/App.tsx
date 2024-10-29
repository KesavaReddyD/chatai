import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup'
import Chat from './components/Chat'
import Notfound from './components/Notfound'
import Home from './components/Home'
// import { useAuth } from './context/AuthContext'



function App() {
  
  // console.log(useAuth()?.isLoggedIn);

  return (
    <div className='flex flex-col h-screen'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/*' element={<Notfound/>}/>
      </Routes>
    </div>
  )
}

export default App
