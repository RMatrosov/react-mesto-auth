import {useState} from "react";
import * as auth from "../utils/auth";
import {useHistory} from "react-router-dom";
import Header from "./Header";


const Login = ({setLoggedIn, setFailPopupOpen}) => {

  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault()

    auth.authorize(email, password).then((data) => {
      if (data.token) {
        setEmail('')
        setPassword('')
        setLoggedIn(true)
        history.push('/')
      }
    })
        .catch((err) => {
          setFailPopupOpen(true)
          console.log(err)
        });
  }

  const buttonText = 'Регистрация'

  function signOut() {
    history.push('/sing-up');
  }

  return (
      <>
        <Header buttonText={buttonText} signOut={signOut}/>
        <form onSubmit={handleSubmit} className='log__in_wrapper'>
          <h4 className='log__in_title'>Вход</h4>
          <input type="email" className="log__in_input"
                 name='email' placeholder='Email'
                 onChange={(e) => setEmail(e.target.value)}
                 minLength="2" defaultValue={email || ''}
                 maxLength="40" required/>

          <input type="password" className="log__in_input"
                 name='password' placeholder='Пароль'
                 minLength="2" defaultValue={password || ''}
                 onChange={(e) => setPassword(e.target.value)}
                 maxLength="200" required/>

          <button type='submit' className='log__in_button'>Войти</button>
        </form>
      </>
  )
}

export default Login