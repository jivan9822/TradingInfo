import { useState } from 'react';
import LoginForm from './Login';
import RegistrationForm from './Registration';

const LoginReg = (props) => {
  const [isRegister, setRegister] = useState(true);
  return (
    <div>
      {!isRegister && <RegistrationForm onSwap={setRegister} />}
      {isRegister && <LoginForm onSwap={setRegister} />}
    </div>
  );
};
export default LoginReg;
