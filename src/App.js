import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css'
import BookList from './BookList';
import Search from './Search';


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
            updateShelf={this.updateShelf}
          />
        )} />

        <Route path="/search" render= {() => (
          <Search 
            searchedBooks={this.state.searchedBooks}
            books={this.state.books}
            updateShelf={this.updateShelf}
          />
        )} />

        <button>
          <Link to='/search'
            className='open-search'
          >
            Search a book
          </Link>
        </button> 
      </div>
    )
  }
}

export default BooksApp
