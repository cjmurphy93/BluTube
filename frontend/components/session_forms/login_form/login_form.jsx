import React from 'react';
import LoginEmailForm from './login_email_form';
import LoginPasswordForm from './login_password_form';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.user;
        this.handleNext = this.handleNext.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
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

    handleDemo(e) {
        e.preventDefault();
        const user = { email: 'demo@user.com', password: 'password'};
        this.props.login(user);
    }

    render() {
        const { email, password, formSection } = this.state;

        const currentSection = formSection === 'emailForm' ? (
            <LoginEmailForm email={email}
            update={this.update}
            handleNext={this.handleNext}
            handleDemo={this.handleDemo}
            />) : (
            <LoginPasswordForm password={password}
            update={this.update}
            handleSubmit={this.handleSubmit}
            handleDemo={this.handleDemo}
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