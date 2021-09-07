import {useState} from "react";
import * as auth from "../utils/auth";
import {useHistory} from "react-router-dom";
import Header from "./Header";

const Register = ({ setSuccessPopupOpen, setFailPopupOpen}) => {

  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    auth.register(email, password).then((response) => {
      if (response.statusCode !== 400) {
        setSuccessPopupOpen(true)
        history.push('/sing-in')
      } else {
        setFailPopupOpen(true)
      }
    })
  }

  const buttonText = 'Войти'

  function signOut() {
    history.push('/sing-in');
  }

  return (
      <>
        <Header buttonText={buttonText} signOut={signOut}/>
        <form onSubmit={handleSubmit} className='log__in_wrapper'>
          <h4 className='log__in_title'>Регистрация</h4>
          <input type="email" className="log__in_input"
                 name='name' placeholder='Email'
                 minLength="2" defaultValue={email || ''}
                 onChange={(e) => setEmail(e.target.value)}
                 maxLength="40" required/>

          <input type="password" className="log__in_input"
                 name='password' placeholder='Пароль'
                 minLength="2" defaultValue={password || ''}
                 onChange={(e) => setPassword(e.target.value)}
                 maxLength="200" required/>

          <button type='submit' className='log__in_button'>Зарегистрироваться</button>
          <p className='login__form_button-text'>Уже зарегистрированы?
            <button onClick={signOut} className='login__form_button'> Войти</button>
          </p>
        </form>
      </>
  )
}

export default Register