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
import { addConversation, getClientId } from "../api";

function Chat() {
  const [messageContent, setMessageContent] = useState("");
  const { data: clientId } = useQuery("getClientId", getClientId, {
    enabled: false,
  });

  const sampleChatDataMutation = useMutation((messageData) => {
    return addConversation(messageData);
  });

  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h1 className="display-2">Help Desk Chat</h1>
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Your chat with provider name</Card.Title>
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
              <Card.Title>Message your Provider, provider name</Card.Title>
              <InputGroup className="mt-2">
                <FormControl
                  placeholder="Type your question here"
                  as="textarea"
                  aria-label="Type your question here"
                  aria-describedby="submit-button"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                />
                <Button
                  variant="primary"
                  id="submit-button"
                  onClick={() => {
                    sampleChatDataMutation.mutate({
                      sender: clientId.client_id,
                      receiver: "provider",
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
