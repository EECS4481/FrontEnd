import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  return (
    <Container>
      <Row className="my-5">
        <Col md={8}>
          <h1 class="display-2">Welcome to Help Desk</h1>
          <p class="lead">
            Chat with Help Desk Providers for assistance on resolving issues.
          </p>
          <p>
            Please note that you may only chat with one Provider at a time. Once
            you join a chat and are automatically assigned to a Provider, you
            may send messages to one another and will view the chat dialogue
            displayed on your browser. Click the button below to be connected
            with a Provider.
          </p>
          <Button
            as={Link}
            to={`/client/chat/123`}
            className="mt-2"
            variant="primary"
            size="lg"
          >
            Chat with a Provider
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
