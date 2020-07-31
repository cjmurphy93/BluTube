import React from 'react';
import { Link } from 'react-router-dom'

const LoginEmailForm = ({ email, update, handleNext }) => {
  return(
    <form className="login-form">
        <div className="form-header">
            <img src={window.logoIcon} alt="logo-icon" className="logo-icon"/>
            <h1 className="signin-form-text">Sign in</h1>
            <h3 className="continue-to-text">to continue to BluTube</h3>
        </div>
        <section className="input-section">
        
        <input type="text"
        value={email}
        onChange={update('email')}
        placeholder="Email"
        className="email-text"/>
     
        <section className="demo-user">
          <p>Don't want to make an account?</p>
        <p>Demo User</p>
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