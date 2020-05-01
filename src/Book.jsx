import React from 'react';
import PropTypes from 'prop-types';

const Book = props => {
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${props.book.imageLinks.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{props.book.title}</div>
                {props.book.authors.map(author => 
                    <div className="book-authors">{author}</div>
                )}
            </div>
        </li>
    )
  };
  
  Book.propTypes = {
    book: PropTypes.string.isRequired,
  };

export default Book;