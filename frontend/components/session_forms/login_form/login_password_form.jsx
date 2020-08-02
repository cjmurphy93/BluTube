import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faChevronDown, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const LoginPasswordForm = ({ password, update, handleSubmit, handleBack, handleDemo, passwordError, errors, email }) => {
    let error;

    if (passwordError) {
        error = (
            <div className="error-msg">
                <FontAwesomeIcon icon={faExclamationCircle}
                    className="ex-circle" />
                <p className="error-text">{passwordError}</p>
            </div>)
    } else if (errors.password) {
        error = (
            <div className="error-msg">
                <FontAwesomeIcon icon={faExclamationCircle}
                    className="ex-circle" />
                <p className="error-text">{errors.password}</p>
            </div>
        )
    } else if (errors.includes("Invalid email/password combination")) {
        error = ( 
        <div className="error-msg">
            <FontAwesomeIcon icon={faExclamationCircle} 
            className="ex-circle"/>
        <p className="error-text">Wrong password. Try again</p>
        </div>
        )
    } else {
        error = null
    };

    const prb = (error ? "rb" : "")

    return (
        <form className="login-form">
            <div className="form-header">
                <img src={window.logoIcon} alt="logo-icon" className="logo-icon" />
                <h1 className="signin-form-text">Welcome</h1>
               <div className="pword-email-bk"
               onClick={handleBack}>
                   <FontAwesomeIcon icon={faUserCircle} className="pword-user"/>
                   {email}
                   <FontAwesomeIcon icon={ faChevronDown} className="pword-chev" />
               </div>
            </div>
            <section className="input-section">
                <div className="whole-input">
                <div className="password-input">
                <input type="password"
                    value={password}
                    onChange={update('password')}
                    placeholder="Password"
                    className={`email-text ${prb}`} />
                </div>
                    {error}
                </div>
                <section className="demo-user">
                    <p>Don't want to make an account?</p>
                    <span onClick={handleDemo}>Demo User</span>
                </section>
                <section className="bottom-links">
                    <Link to="/signup" className="create-account">Create account</Link>
                    <button onClick={handleSubmit} className="next-btn">Next</button>
                </section>
            </section>
        </form>
    )
}

export default LoginPasswordForm;