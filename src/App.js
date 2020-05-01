import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css'
import BookList from './BookList';


class BooksApp extends Component {
  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({
          books
        }))
      })
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <BookList
            books={this.state.books}
            onDeleteBook={this.removeBook}
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
