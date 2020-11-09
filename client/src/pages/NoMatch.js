import React from "react";
import { Col, Row, Container } from "../components/Grid";

function NoMatch() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Container>
            <h1 className="text-center">404 Page Not Found</h1>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;
