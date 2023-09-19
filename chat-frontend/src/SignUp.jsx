import { useState } from "react"
import "./SignUp.css"
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  })
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const response = await fetch('http://localhost:3001/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        if (response.ok) {
            console.log('Registration Successful');
        } else {
            console.log('Registration Failed', response)
        }
    } catch (error) {
        console.error('Error during registration', error)
    }
  }
  
    return (
<div className="signUpScreen">
  <form onSubmit={handleSubmit} className="signup-form">
    <h1>Sign Up</h1>
    <div>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        id="username"
        value={formData.username}
        onChange={handleChange}
        required
        className="input-field"
      />
    </div>
    <div>
      <label htmlFor="password">Password:</label>
      <input
        type="text"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="input-field"
      />
    </div>
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="input-field"
      />
    </div>
    <button type="submit" className="submit-button">
      Sign Up
    </button>
    <Link to='/login'>Already have an account?</Link>
    
  </form>
</div>
  )
}

export default SignUp