import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { getProviderIdStartChat } from "../api";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isStartingChat, setIsStartingChat] = useState(false);
  const [isProviderAvailable, setIsProviderAvailable] = useState(true);

  const { data: providerIdData, isSuccess: isSuccessProviderIdData } = useQuery(
    "getProviderIdStartChat",
    getProviderIdStartChat,
    {
      enabled: isStartingChat,
    }
  );

  useEffect(() => {
    if (isSuccessProviderIdData && providerIdData) {
      console.log("here");
      navigate(`/client/chat`);
    } else if (isSuccessProviderIdData && !providerIdData) {
      setIsProviderAvailable(false);
    }
  }, [isSuccessProviderIdData]);

  return (
    <Container>
      <Row className="my-5">
        <Col md={8}>
          <h1 className="display-2">Welcome to Help Desk</h1>
          <p className="lead">
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
            className="mt-2"
            variant="primary"
            size="lg"
            onClick={() => setIsStartingChat(true)}
          >
            Chat with a Provider
          </Button>

          <Button as={Link} to={`/`} className="mt-2" variant="primary" size="lg">
            Logout
          </Button>


          {!isProviderAvailable && (
            <Alert className="mt-3" variant="danger">
              No Provider available. Please try again later.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
