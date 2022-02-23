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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addConversation, getProviderId, getConversationHistory } from "../api";
import { Link } from "react-router-dom";

function Chat() {
  const queryClient = useQueryClient();
  const [messageContent, setMessageContent] = useState("");
  const { data: providerId } = useQuery("getProviderId", getProviderId, {
    enabled: false,
  });

  // this needs to be dynamic once api call in place that automatically pairs a provider with a client
  const clientId = "C400";

  const { data: chatData } = useQuery("getConversationHistory", () =>
    getConversationHistory(clientId, providerId.provider_id)
  );

  const chatDataMutation = useMutation(
    (messageData) => addConversation(messageData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getConversationHistory");
      },
    }
  );

  return (
    <Container>
      <Row className="mt-5 mb-3">
        <Col>
          <h1 className="display-2">Help Desk Chat</h1>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={8}>
          <div className="mb-4" style={{ display: "flex", gap: "10px" }}>
            <Button variant="primary">
              Transfer Client to another Provider
            </Button>
            {/* if a provider leaves the chat, then they must be disconnected from the other user in the backend */}
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
              <Card.Title>Your chat with {clientId}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Each time you send a message, the message content will update
                here
              </Card.Subtitle>
              {chatData && chatData.length ? (
                <div style={{ maxHeight: "500px", overflow: "scroll" }}>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Sender</th>
                        <th>Content</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chatData.map((message) => (
                        <tr key={message.message_id}>
                          <td width={"15%"}>{message.sender_id}</td>
                          <td width={"65%"}>{message.content}</td>
                          <td width={"20%"}>{message.TIMESTAMP}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                "No messages to display"
              )}
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
                    chatDataMutation.mutate({
                      sender: providerId.provider_id,
                      receiver: clientId,
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
