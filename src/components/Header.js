import {Route, Switch} from "react-router-dom";
import HeaderElement from "./HeaderElement";

export default function Header({signOut, currentEmail}) {


  return (
      <Switch>
        <Route exact path='/'>
          <HeaderElement signOut={signOut} currentEmail={currentEmail} buttonText={'Выйти'}/>
        </Route>
        <Route exact path='/sign-up'>
          <HeaderElement signOut={signOut} buttonText={'Войти'}/>
        </Route>
        <Route exact path='/sign-in'>
          <HeaderElement signOut={signOut} buttonText={'Регистрация'}/>
        </Route>
      </Switch>
  )
}

