import { useNavigate } from 'react-router-dom';
import SignInForm from '../components/organisms/SignInForm';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <img
        src="/images/logo.jpg"
        alt="dollars"
        className="auth-logo"
      />
      <div className="auth-card">
        <h1>Enter the Room</h1>
        <SignInForm onSuccess={() => navigate('/chat')} />
      </div>
      <div className="auth-footer">
        <img src="/images/firma_light.svg" alt="By Guiller" />
      </div>
    </div>
  );
};

export default SignInPage;
