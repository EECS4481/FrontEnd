import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../api";
import { getProviderId, setProviderReady, provideChatCheck } from "../api";
import { useMutation, useQuery, useQueryClient } from "react-query";

function Home() {
  const queryClient = useQueryClient();
  const { data: providerData } = useQuery(
    "getProviderId",
    () => getProviderId,
    { enabled: false }
  );
  const providerId = providerData?.provider_id;

  const { data: provideChatCheckData } = useQuery("provideChatCheck", () =>
    provideChatCheck(providerId)
  );

  const setProviderReadyMutation = useMutation((providerId) =>
    setProviderReady(providerId)
  );

  useEffect(() => {
    setProviderReadyMutation.mutate(providerId);
  }, [providerId]);

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
            {/* <Button
              as={Link}
              to={`/provider/chat/123`}
              variant="primary"
              size="lg"
            >
              Chat with a Client
            </Button>*/}
            {/* <Button
              as={Link}
              to={`/provider/chat/123`}
              variant="primary"
              size="lg"
            >
              Chat with a Provider
            </Button> */}

            <Button
              as={Link}
              to={`/`}
              variant="primary"
              size="lg"
              onClick={() => logout(providerId)}
            >
              Logout
            </Button>
          </div>

          <div className="my-3">
            <h2>Client chats</h2>
            {provideChatCheckData?.length ? (
              provideChatCheckData.map((chat, index) => (
                <Button
                  as={Link}
                  to={`/provider/chat/${chat.client_id}`}
                  key={index}
                  variant="outline-primary"
                >
                  {chat.client_id}
                </Button>
              ))
            ) : (
              <p>No pending chats with Clients</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
