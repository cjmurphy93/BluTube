import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
            passwordMatch: '',
            matchError: '',
            revealed: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
        this.toggleReveal = this.toggleReveal.bind(this);
    }

    // componentDidMount() {
    //     document.title = "Create your BluTube Account";
    // }
    componentWillUnmount() {
        this.props.clearErrors();
        
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password === this.state.passwordMatch) {
            const { first_name, last_name, email, password} = this.state;
            const info = { first_name, last_name, email, password };
        const user = Object.assign({}, info);
        this.props.signup(user);
        } else {
            this.setState({matchError: "Those passwords didn't match. Try again."})
        };
    }

    handleDemo(e) {
        e.preventDefault();
        const user = { email: 'demo@user.com', password: 'password123' };
        this.props.login(user);
    }

    toggleReveal() {
        const change = this.state.revealed ? false : true;
        this.setState({revealed: change});
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
        const errors = this.props.errors;

        const first_nameError = (errors.first_name ? (
            <div className="error-msg">
                <FontAwesomeIcon icon={faExclamationCircle}
                    className="ex-circle" />
                <p className="error-text">{errors.first_name}</p>
            </div>
        ) : (<></>));

        const frb = (errors.first_name ? "rb" : "")

        const last_nameError = (errors.last_name ? (
            <div className="error-msg">
                <FontAwesomeIcon icon={faExclamationCircle}
                    className="ex-circle" />
                <p className="error-text">{errors.last_name}</p>
            </div>
        ) : (<></>));

        const lrb = (errors.last_name ? "rb" : "")

        const emailError = (errors.email ? (
            <div className="error-msg">
                <FontAwesomeIcon icon={faExclamationCircle}
                    className="ex-circle" />
                <p className="error-text">{errors.email}</p>
            </div>
        ) : (<></>));

        const erb = (errors.email ? "rb" : "")

        let passwordError;
        
        if (errors.password) {
            if (this.state.password === '') {
                passwordError = (
            <div className="error-msg">
                <FontAwesomeIcon icon={faExclamationCircle}
                    className="ex-circle" />
                <p className="error-text">Enter a password</p>
            </div>
                )} else {
                    passwordError = (
                        <div className="error-msg">
                            <FontAwesomeIcon icon={faExclamationCircle}
                                className="ex-circle" />
                            <p className="error-text">{errors.password}</p>
                        </div>
                    )
                }} else {

                   passwordError = (<></>);
                };

        const prb = (errors.password ? "rb" : "");

        const revealIcon = (this.state.revealed ? <FontAwesomeIcon icon={faEye} className="reveal-icon" onClick={this.toggleReveal} /> : <FontAwesomeIcon icon={faEyeSlash} className="reveal-icon" onClick={this.toggleReveal} /> );

        const revealType = (this.state.revealed ? "text" : "password");

        const passwordMatchError = (this.state.matchError ? (
            <div className="error-msg">
                <FontAwesomeIcon icon={faExclamationCircle}
                    className="ex-circle" />
                <p className="error-text">{this.state.matchError}</p>
            </div>
        ) : (<></>));

        const mrb = (errors.email ? "rb" : "")

        return(
            <div className='form-page'>
                <div className='form-section'>
                <form className='login-form'>
                        <div className="form-header">
                            <img src={window.logoIcon} alt="logo-icon" className="logo-icon" />
                            <h1 className="signin-form-text">Create your BluTube Account</h1>
                            <h3 className="continue-to-text">to continue to BluTube</h3>
                        </div>
                    <section className="input-section">
                        <section className='name'>
                            <div className="fn">
                            <input className={`email-text name-text ${frb}`}
                            type="text"
                            value={this.state.first_name}
                            onChange={this.update('first_name')}
                            placeholder='First name'/>
                            {first_nameError}
                            </div>
                            <div className="ln">
                            <input  className={`email-text name-text ${lrb}`}
                            type="text"
                                value={this.state.last_name}
                                onChange={this.update('last_name')} 
                                placeholder='Last name'/>
                                {last_nameError}
                            </div>
                        
                        </section>
                            <section className="signup-email">
                            <input className={`email-text ${erb}`}
                            type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder='Your email address'/>
                            {emailError}
                            </section>
                          
                        <section className="signup-password">
                            <section className="signup-password-inputs">
                                <section className="signup-pw-main">
                            <input className={`email-text m-password ${prb}`}
                            type={`${revealType}`}
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"/>
                                {passwordError}
                                </section>
                                <section className="signup-pw-match">
                            <input className={`email-text m-password ${mrb}`}
                            type={`${revealType}`}
                            value={this.state.passwordMatch}
                            onChange={this.update('passwordMatch')}
                            placeholder="Confirm"/>
                            {passwordMatchError}
                                    </section>
                            {revealIcon}
                            </section>
                            <span className="passwordInstructions">Use 8 or more characters with a mix of letters & numbers</span>
                            </section>

                            <section className="demo-user signup-demo">
                                <p>Don't want to make an account?</p>
                                <span onClick={this.handleDemo}>Demo User</span>
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