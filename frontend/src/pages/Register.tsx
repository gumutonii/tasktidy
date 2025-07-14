import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Replace with actual API call
    if (email && password) {
      console.log('Registering:', { email, password });
      navigate('/dashboard');
    }
  };

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
