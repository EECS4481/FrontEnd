import React, { useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { logout, setProviderReady, provideChatCheck } from "../api";
import { useMutation, useQuery } from "react-query";

function Home() {
  const { userId } = useParams();

  const providerListData = [
    {
      provider_id: "P1",
      name: "Simon Riley",
      email: "simon@gmail.com",
    },
    {
      provider_id: "P2",
      name: "John Price",
      email: "john@yahoo.com",
    },
    {
      provider_id: "P3",
      name: "John MacTavish",
      email: "john@gmail.com",
    },
  ];
  const providerChatData = providerListData.filter(
    (provider) => provider.provider_id !== userId
  );

  const { data: provideChatCheckData } = useQuery("provideChatCheck", () =>
    provideChatCheck(userId)
  );

  const setProviderReadyMutation = useMutation((userId) =>
    setProviderReady(userId)
  );

  useEffect(() => {
    setProviderReadyMutation.mutate(userId);
  }, [userId]);

  return (
    <Container>
      <Row className="my-5">
        <Col md={8}>
          <h1 className="display-2">Welcome to Help Desk</h1>
          <p>
            Join a chat with a Client or start a chat with a Provider. In the
            chat, you may send messages and may view the dialogue display on the
            browser. While chatting with one Client, you may transfer this
            Client to another Provider if desired. Additionally, you may send
            messages to other Providers at any time.
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            {/* <Button
              as={Link}
              to={`/provider/chat/`}
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
              onClick={() => logout(userId)}
            >
              Logout
            </Button>
          </div>

          <div className="my-3">
            <h2>Client chats</h2>

            {provideChatCheckData?.length ? (
              <ul className="list-inline">
                {provideChatCheckData.map((chat, index) => (
                  <li key={index} className="list-inline-item">
                    <Button
                      as={Link}
                      to={`/provider/chat/${chat.client_id}`}
                      variant="outline-primary"
                    >
                      {chat.client_id}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pending chats with Clients</p>
            )}
          </div>

          <div>
            <h2>Provider chats</h2>
            <ul className="list-inline">
              {providerChatData.map((provider) => (
                <li key={provider.provider_id} className="list-inline-item">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{provider.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Provider ID: {provider.provider_id}
                      </Card.Subtitle>
                      <Card.Text>{provider.email}</Card.Text>
                      <Link to={`/provider/chat/${provider.provider_id}`}>
                        Chat with {provider.name}
                      </Link>
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
