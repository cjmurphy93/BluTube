import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };

        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.history.push(`/videos/search?query=${this.state.query}`);
        this.setState({query: ''});
    }

    render() {

        const { query } = this.state;
        return (

                <form className='search-bar'
                onSubmit={this.handleSubmit}>
                    <input type="text"
                    value={query}
                    onChange={this.update('query')}
                    placeholder='Search'/>
                    <button className='search-bar-button'
                    type='submit'>
                        <FontAwesomeIcon icon={faSearch} className='search-bar-icon' />
                    </button>
                </form>

        )
    }
}

export default SearchBar;