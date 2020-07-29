import React from 'react';
import { Link } from 'react-router-dom'

const LoginPasswordForm = ({ password, update, handleSubmit }) => {
    return (
        <form>
            <div>
                <h2>Sign In</h2>
            </div>
            <label>Password:
        <input type="password"
                    value={password}
                    onChange={update('password')} />
            </label>
            <br />
            <Link to="/signup">Create account</Link>
            <button onClick={handleSubmit}>Next</button>
        </form>
    )
}

export default LoginPasswordForm;