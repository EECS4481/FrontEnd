import React from "react";
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
import { useMutation } from "react-query";
import { addConversation } from "../api";

function Chat() {
  const sampleData = {
    sender: "P1",
    receiver: "C400",
    content: "testing 2",
  };
  const sampleChatDataMutation = useMutation((sampleData) => {
    return addConversation(sampleData);
  });
  console.log("samplechatdata", sampleChatDataMutation);

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
              <Card.Title>Message your Provider, provider name</Card.Title>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Type your question here"
                  as="textarea"
                  aria-label="Type your question here"
                  aria-describedby="submit-button"
                />
                <Button
                  variant="primary"
                  id="submit-button"
                  onClick={() => {
                    sampleChatDataMutation.mutate(sampleData);
                  }}
                >
                  Send
                </Button>
              </InputGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Your chat with provider name</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Each time you send a message, the message content will update
                here
              </Card.Subtitle>
              {sampleChatDataMutation.data ? (
                <Table striped bordered hover>
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
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
