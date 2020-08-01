import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const LoginEmailForm = ({ email, update, handleNext, handleDemo, emailError }) => {
  const error = (emailError ? (
    <div className="error-msg">
      <FontAwesomeIcon icon={faExclamationCircle}
        className="ex-circle" />
      <p className="error-text">{emailError}</p>
    </div>
  ) : (<></>));

  const erb = (emailError ? "rb" : "")
  return(
    <form className="login-form">
        <div className="form-header">
            <img src={window.logoIcon} alt="logo-icon" className="logo-icon"/>
            <h1 className="signin-form-text">Sign in</h1>
            <h3 className="continue-to-text">to continue to BluTube</h3>
        </div>
        <section className="input-section">
        
        <div className="email-input">
        <input type="text"
        value={email}
        onChange={update('email')}
        placeholder="Email"
        className={`email-text ${erb}`}/>
        {error}
        </div>
        <section className="demo-user">
          <p>Don't want to make an account?</p>
        <span onClick={handleDemo}>Demo User</span>
        </section>
        <section className="bottom-links">
        <Link to="/signup" className="create-account">Create account</Link>
        <button onClick={handleNext} className="next-btn">Next</button>
        </section>
      </section>
    </form>
  )
}

export default LoginEmailForm;