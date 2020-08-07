import React from 'react';
import LoginEmailForm from './login_email_form';
import LoginPasswordForm from './login_password_form';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleNext(e) {
        e.preventDefault();
        const { email } = this.state;
        function validateEmail(email)
        {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        if (email === '') {
            this.setState({ emailError: 'Enter an email' })
        } else if (validateEmail(email) === false) {
            this.setState({ emailError: `${email} is not a valid email address`})
        } else {
            this.props.clearErrors();
            this.setState({ emailError: '', formSection: "passwordForm", passwordError: ''})
        }
    }

    handleBack(e) {
        e.preventDefault();
        const { email } = this.state;
        this.props.clearErrors();
        this.setState({email: email, password: '', formSection: 'emailForm', passwordError: '', emailError: ''})
    }

    handleSubmit(e) {
        e.preventDefault();
        const { password } = this.state
        if (password === '') {
            this.setState({passwordError: 'Enter a password'})
        } else {
        this.setState({passwordError: ''});
        const user = Object.assign({}, this.state);
        this.props.login(user);
        }
    }

    handleDemo(e) {
        e.preventDefault();
        const user = { email: 'demo@user.com', password: 'password'};
        this.props.login(user);
    }

    

    render() {
        const { email, password, formSection, emailError, passwordError } = this.state;
        const errors = this.props.errors;

        const currentSection = formSection === 'emailForm' ? (
            <LoginEmailForm email={email}
            update={this.update}
            handleNext={this.handleNext}
            handleDemo={this.handleDemo}
            emailError={emailError}
            />) : (
            <LoginPasswordForm 
            email={email}
            password={password}
            update={this.update}
            handleSubmit={this.handleSubmit}
            handleBack={this.handleBack}
            handleDemo={this.handleDemo}
            passwordError={passwordError}
            errors={errors}
            />);    
        
        return (
            <div className='form-page'>
                <div className="form-section">
                { currentSection }
                </div>
            </div>
        )
    }
}

export default LoginForm;