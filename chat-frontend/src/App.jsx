import './App.css'
import Login from './Login'
import SignUp from './SignUp'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
  
    <div className="App">
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>

    </div>

    
  )
}

export default App
