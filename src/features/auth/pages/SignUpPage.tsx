import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/organisms/SignUpForm';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-page">
      <img
        src="/images/logo.jpg"
        alt="dollars"
        className="auth-logo"
      />
      <div className="signup-card">
        <h1>Join the Dollars</h1>
        <SignUpForm onSuccess={() => navigate('/')} />
      </div>
    </div>
  );
};

export default SignUpPage;
