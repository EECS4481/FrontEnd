import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container>
      <Row className="my-5">
        <Col md={8}>
          <h1 className="display-2">Welcome to Help Desk</h1>
          <p>
            Click the button below to assist a Client. In the chat, you may send
            messages to the Client that you are paired with and may view the
            dialogue display on the browser. While chatting with one Client, you
            may transfer this Client to another Provider if desired.
            Additionally, you may send messages to other Providers at any time.
          </p>
          <Button
            as={Link}
            to={`/provider/chat/123`}
            className="mt-2"
            variant="primary"
            size="lg"
          >
            Chat with a Client
          </Button>
          <Button
            as={Link}
            to={`/provider/chat/123`}
            className="mt-2"
            variant="primary"
            size="lg"
          >
            Chat with another Provider
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
