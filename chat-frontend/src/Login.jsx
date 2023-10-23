import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        logIn({
          email,
          password,
        })
      );

      if (response.ok) {
        // Login successful, you can redirect the user or show a success message
        console.log('Login successful');
        navigate('/chat');
      } else {
        // Handle login error, such as displaying an error message
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <div className="loginScreen">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div>
          Want to <Link to="/">sign up?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
