import { NavLink, useNavigate } from 'react-router-dom';
import styles from './signup.module.scss';
import logo from '../../assets/logo/logo.png';
import PrimaryButton from '../../components/primary-button/primary-button.component';
import FormInput from '../../components/form-field/form-field.component';
import React, { useCallback, useState } from 'react';
import User, { RegisterPayload } from '../../services/api/user.api.service';

interface ISignupPageProps { }

const SignupPage: React.FC<ISignupPageProps> = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData],
  );
  const signup: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.stopPropagation();
      setLoading(true);
      const { email, password } = formData;
      const payload: RegisterPayload = {
        email,
        password,
      };
      const registerResponse = await new User().register(payload)?.catch(() => setLoading(false));
      setLoading(false);
      if (registerResponse) {
        navigate('/login');
      }
    },
    [formData],
  );

  return (
    <div className={styles.signupPage}>
      <form className={styles.signupForm}>
        <NavLink to="/" className={styles.signupFormLogo}>
          <img src={logo} alt="logo" width={170} />
        </NavLink>
        <h1 className={styles.signupFormHeader}>Sign up</h1>
        <FormInput type="email" name="email" label={'Email'} onChange={handleChange} />
        <FormInput type="password" name="password" label={'Password'} onChange={handleChange} />
        <PrimaryButton content="Create Account" type="button" onClick={signup} loading={loading} />
        <div className={styles.note}>
          By continuing with Google, Apple, or Email, you agree to DoneDone Terms of Service and Privacy Policy .
        </div>
        <div className={styles.seperator}></div>
        <div className={styles.moveToLoginCta}>
          Already signed up? <NavLink to="/login">Go to login</NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
