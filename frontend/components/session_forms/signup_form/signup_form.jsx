import React from 'react';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '' 
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.signup(user);
    }

    renderErrors() {
        return(
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return(
            <div className='form-page'>
                <div className='form-section'>
                <form className='login-form'>
                        <div className="form-header">
                            <img src={window.logoIcon} alt="logo-icon" className="logo-icon" />
                            <h1 className="signin-form-text">Create your BluTube Account</h1>
                            <h3 className="continue-to-text">to continue to BluTube</h3>
                        </div>
                    {this.renderErrors()}
                    <section className="input-section">
                        <section className='name'>
                        
                            <input className="email-text name-text fn"
                            type="text"
                            value={this.state.first_name}
                            onChange={this.update('first_name')}
                            placeholder='First Name'/>
                        
                            <input  className="email-text name-text ln"
                            type="text"
                                value={this.state.last_name}
                                onChange={this.update('last_name')} 
                                placeholder='Last Name'/>
                        
                        </section>
                            <section className="signup-email">
                            <input className="email-text "
                            type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder='Your email address'/>
                            </section>
                          
                        <section className="signup-password">
                            <input className="email-text"
                            type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"/>
                            </section>

                            <section className="demo-user signup-demo">
                                <p>Don't want to make an account?</p>
                                <p>Demo User</p>
                            </section>
                        
                            <section className="bottom-links">
                                <Link to="/signin" className="create-account">Sign in instead</Link>
                                <button onClick={this.handleSubmit} className="next-btn">Next</button>
                            </section>
                    </section>
                </form>
                </div>
            </div>
        )
    }
}

export default SignupForm;