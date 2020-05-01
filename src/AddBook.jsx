import React, { Component } from 'react';

class AddBook extends Component {
    state = {
        books: this.props.books
    }

    render() {
        return (
            <h1>My Add Book page!</h1>
        )
    }
}

export default AddBook;