import React from 'react';
import { Link } from 'react-router-dom'

const LoginEmailForm = ({ email, update, handleNext }) => {
  return(
    <form>
        <div>
            <h2>Sign In</h2>
        </div>
        <label>Email:
        <input type="text"
        value={email}
        onChange={update('email')}/>
        </label>
        <br/>
        <Link to="/signup">Create account</Link>
        <button onClick={handleNext}>Next</button>
    </form>
  )
}

export default LoginEmailForm;