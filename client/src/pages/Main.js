import React, { Component } from "react";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import "./style.css";

class Main extends Component {
  state = {
    books: [],
    query: "",
    message: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getBooks = () => {
    API.getBooks(this.state.query)
      .then(res =>
        this.setState({
          books: res.data
        })
      )
      .catch(() =>
        this.setState({
          books: [],
          message: "No Books Found, Try a Different Query"
        })
      );
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks();
  };

  handleBookSave = id => {
    const book = this.state.books.find(book => book.id === id);

    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getBooks());
  };

  render() {
    return (
      <Container>
          <img className="home-img " src={process.env.PUBLIC_URL + "/home.jpg"} alt=""/>
        <Row>
          <Col size="md-12">
              <h1 className="text-center">
                <strong>Google Library</strong>
              </h1>
              <h2 className="text-center">Find your book and save it too. It's that simple.</h2>
          </Col>
          <Col size="md-12">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                query={this.state.query}
              />
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results" disp={this.state.books.length ? ("") : ("d-none")}>
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <Book
                      key={book.id}
                      title={book.volumeInfo.title}
                      subtitle={book.volumeInfo.subtitle}
                      link={book.volumeInfo.infoLink}
                      authors={book.volumeInfo.authors.join(", ")}
                      description={book.volumeInfo.description}
                      image={book.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookSave(book.id)}
                          className="btn ml-2"
                          id="save-btn"
                        >
                          <i class="far fa-heart"></i>
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                  <h2 className="text-center">{this.state.message}</h2>
                )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
