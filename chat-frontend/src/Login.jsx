import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Login.css';
import { selectAuth, logIn, attemptTokenLogin } from './slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userAuth } = useSelector(selectAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        logIn({
          email,
          password,
        })
      );

      if (response.type === 'login/fulfilled') {
        await dispatch(attemptTokenLogin());
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  useEffect(() => {
    if (userAuth && userAuth.userName) navigate('/chat');
  }, [userAuth]);

  return (
    <div className="loginScreen">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
