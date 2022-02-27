import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { getProviderIdClientIdData } from "../api";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { getClientId } from "../api";

function Home() {
  const navigate = useNavigate();
  const [isStartingChat, setIsStartingChat] = useState(false);
  const [isProviderAvailable, setIsProviderAvailable] = useState(true);
  const { data: clientData } = useQuery("getClientId", getClientId, {
    enabled: false,
  });

  const {
    data: providerIdClientIdData,
    isSuccess: isSuccessProviderIdClientIdData,
  } = useQuery(
    "getProviderIdClientIdData",
    () => getProviderIdClientIdData(clientData.client_id),
    {
      enabled: isStartingChat,
    }
  );

  useEffect(() => {
    if (isStartingChat) {
      setIsStartingChat(false);
      if (
        providerIdClientIdData?.provider_id &&
        providerIdClientIdData?.provider_id !== "undefined"
      ) {
        navigate(`/client/chat`);
      } else {
        setIsProviderAvailable(false);
      }
    }
  }, [providerIdClientIdData]);

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
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              className="mt-2"
              variant="primary"
              size="lg"
              onClick={() => setIsStartingChat(true)}
            >
              Chat with a Provider
            </Button>

            <Button
              as={Link}
              to={`/`}
              className="mt-2"
              variant="primary"
              size="lg"
            >
              Logout
            </Button>
          </div>

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
