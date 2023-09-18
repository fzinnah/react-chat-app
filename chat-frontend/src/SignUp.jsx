import { useState } from "react"
import "./SignUp.css"

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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="text" name="password" id="password" value={formData.password} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor="email">email:</label>
                <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default SignUp