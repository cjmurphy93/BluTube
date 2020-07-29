import React from 'react';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
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
            <div className='signup-form'>
                <form onSubmit={this.handleSubmit}>
                    <h2>Sign Up</h2>
                    <br/>
                    {this.renderErrors()}
                    <div>
                        <label>Username:
                            <input type="text"
                            value={this.state.username}
                            onChange={this.update('username')}/>
                        </label>
                        <br/>
                        <label>Email:
                            <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}/>
                        </label>
                        <br/>
                        <label>Password:
                            <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}/>
                        </label>
                        <br/>
                        <input type="submit" value="submit"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignupForm;