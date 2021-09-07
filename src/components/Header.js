
export default function Header({buttonText, signOut,currentEmail}) {


    return (
        <header className="header">
            <a href="#" target="_blank" className="logo"/>
          <div className='header__wrapper'>
            {currentEmail && <p className='header__wrapper_email'>{currentEmail}</p>}
            <button className='header__wrapper_button' onClick={signOut} >{buttonText}</button>
          </div>
        </header>
    )
}

