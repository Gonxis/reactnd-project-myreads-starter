import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css'
import BookList from './BookList';


class BooksApp extends Component {
  state = {
    books: [],
    searchedBooks: [],
    shelf: ["wantToRead", "currentlyReading", "read"],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({
          books
        }))
      })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(this.setState(state => ({
        books: state.books.concat(state.searchedBooks)
          .map(item => {
            if (item.id === book.id)
                item.shelf = shelf;
            return item;
        })
    })))
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <BookList
            books={this.state.books}
            onDeleteBook={this.removeBook}
            updateShelf={this.updateShelf}
          />
        )} />

        <Route path="/search" render= {({ history }) => (
          <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
