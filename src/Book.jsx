import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
    render() {

        const { book, updateBook} = this.props;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf} onChange= {(event) => {updateBook(book, event.target.value)}}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors.map(author => 
                        <div className="book-authors">{author}</div>
                    )}
                </div>
            </li>
        )
    }
  };
  
  Book.propTypes = {
    book: PropTypes.string.isRequired,
  };

export default Book;