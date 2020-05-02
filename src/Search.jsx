import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {

    state = {
        query: ''
    }

    updateQuery = query => {
        this.setState(() => ({
            query: query
        }))
    }

    render() {

        const { books, updateShelf, searchedBooks } = this.props;
        const { query } = this.state;

        const showingBooks = query === ''
            ? searchedBooks
            : books.filter(book => (
                book.title.toLowerCase().includes(query.toLocaleLowerCase())
            )) || 
              books.authors.filter(author => (
                    author.toLowerCase().includes(query.toLocaleLowerCase())
                ))

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
                    {showingBooks.map( book => (
                        <Book key={book.id} book={book} updateBook={updateShelf}/>
                    ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;