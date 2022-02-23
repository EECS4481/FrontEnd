import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { setProviderReady, getProviderId } from "../api";
// import { useMutation, useQuery, useQueryClient } from "react-query";

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
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              as={Link}
              to={`/provider/chat/123`}
              variant="primary"
              size="lg"
            >
              Chat with a Client
            </Button>
            <Button
              as={Link}
              to={`/provider/chat/123`}
              variant="primary"
              size="lg"
            >
              Chat with a Provider
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
