

const HeaderElement = ({currentEmail, signOut, buttonText}) =>{
  return(
      <header className="header">
        <a href="#" target="_blank" className="logo"/>
        <div className='header__wrapper'>
          {currentEmail && <p className='header__wrapper_email'>{currentEmail}</p>}
          <button className='header__wrapper_button'
                  onClick={(e)=>
                      signOut(e.target.textContent)}>{buttonText}</button>
        </div>
      </header>
  )
}

export default HeaderElement