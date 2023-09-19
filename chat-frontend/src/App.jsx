import './App.css'
import Login from './Login'
import SignUp from './SignUp'
import Chat from './Chat'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
  
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/' element={<SignUp/>}/>
      </Routes>

    </div>

    
  )
}

export default App
