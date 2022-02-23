import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Button,
  Table,
} from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { addConversation, getProviderId } from "../api";
import { Link } from "react-router-dom";

function Chat() {
  const [messageContent, setMessageContent] = useState("");
  const { data: providerId } = useQuery("getProviderId", getProviderId, {
    enabled: false,
  });

  const sampleChatDataMutation = useMutation((messageData) => {
    return addConversation(messageData);
  });

  return (
    <Container>
      <Row className="mt-5 mb-3">
        <Col>
          <h1 className="display-2">Help Desk Chat</h1>
        </Col>
      </Row>
      <Row className=" mb-5">
        <Col>
          <div className="mb-4" style={{ display: "flex", gap: "10px" }}>
            <Button variant="primary">
              Transfer Client to another Provider
            </Button>
            {/* if a provider leaves the chat, then they must be disconnected from the client in the backend */}
            <Button
              as={Link}
              to={`/provider/home/${providerId.provider_id}`}
              variant="primary"
            >
              Leave chat
            </Button>
          </div>
          <Card>
            <Card.Body>
              <Card.Title>Your chat with anonymous client</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Each time you send a message, the message content will update
                here
              </Card.Subtitle>
              {sampleChatDataMutation.data ? (
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Sender</th>
                      <th>Receiver</th>
                      <th>Content</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleChatDataMutation.data.map((message, index) => (
                      <tr key={message.message_id}>
                        <td>{message.sender_id}</td>
                        <td>{message.receiver_id}</td>
                        <td>{message.content}</td>
                        <td>{message.TIMESTAMP}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                "No messages to display"
              )}
            </Card.Body>
          </Card>
          <Card className="mt-2">
            <Card.Body>
              <Card.Title>Message the client, client_id</Card.Title>
              <InputGroup className="mt-2">
                <FormControl
                  placeholder="Type your message here"
                  as="textarea"
                  aria-label="Type your message here"
                  aria-describedby="submit-button"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                />
                <Button
                  variant="primary"
                  id="submit-button"
                  onClick={() => {
                    sampleChatDataMutation.mutate({
                      sender: providerId.provider_id,
                      receiver: "client",
                      content: messageContent,
                    });
                  }}
                >
                  Send
                </Button>
              </InputGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
