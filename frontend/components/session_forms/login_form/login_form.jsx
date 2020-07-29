import React from 'react';
import LoginEmailForm from './login_email_form';
import LoginPasswordForm from './login_password_form';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.handleNext = this.handleNext.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleNext(e) {
        e.preventDefault();
        this.setState({formSection: "passwordForm"})
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.login(user);
    }

    render() {
        const { email, password, formSection } = this.state;

        const currentSection = formSection === 'emailForm' ? (
            <LoginEmailForm email={email}
            update={this.update}
            handleNext={this.handleNext}
            />) : (
            <LoginPasswordForm password={password}
            update={this.update}
            handleSubmit={this.handleSubmit}
            />);    
        
        return (
            <div className='login-form'>
                { currentSection }
            </div>
        )
    }
}

export default LoginForm;