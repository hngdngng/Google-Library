import React, { Component } from "react";
import Card from "../components/Card";
import Book from "../components/Book";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Saved extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getSavedBooks();
  }

  getSavedBooks = () => {
    API.getSavedBooks()
      .then(res =>
        this.setState({
          books: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleBookDelete = id => {
    API.deleteBook(id).then(res => this.getSavedBooks());
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
              <h2 className="text-center">We've got your books saved here.</h2>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Saved Books">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <Book
                      key={book._id}
                      title={book.title}
                      subtitle={book.subtitle}
                      link={book.link}
                      authors={book.authors.join(", ")}
                      description={book.description}
                      image={book.image}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookDelete(book._id)}
                          className="btn btn-danger ml-2"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                  <h2 className="text-center">No Saved Books</h2>
                )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
