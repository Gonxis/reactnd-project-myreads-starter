import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class Search extends Component {

    state = {
        query: '',
        search: []
    }

    async updateQuery(query) {
        this.setState(
            { query },
        )
          
        const books = await BooksAPI.search(query)
        
            if (!Array.isArray(books)) {
                this.setState({
                    search: []
                })
                return
            } 
            this.setState({
                search: books.map(book => {
                    const found = this.props.books.find(b => book.id === b.id)
                        if (found)
                            book.shelf = found.shelf
                        else
                            book.shelf = 'none'
                        return book
                })
            })
        
    }

    render() {

        const { updateShelf } = this.props;
        const { query, search } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to='/'>
                            Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {search === undefined || search.length < 1
                        ? 'Not results found yet...' 
                        : search.map( book => (
                            <Book key={book.id} book={book} updateBook={updateShelf}/>
                        ))
                    }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;