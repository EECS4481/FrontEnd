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
import {
  addConversation,
  getProviderId,
  getConversationHistory,
  transferCustomer,
  getReadyProviders,
  downloadFile,
} from "../api";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [messageContent, setMessageContent] = useState("");
  const [fileName, setFileName] = useState("");
  const { data: providerId } = useQuery("getProviderId", getProviderId, {
    enabled: false,
  });
  const [error, setError] = useState("");

  const { receiverId } = useParams();

  const [transferMessageRef, changeTransferMessageRef] = useState(
    React.createRef()
  );

  const { data: chatData } = useQuery("getConversationHistory", () =>
    getConversationHistory(receiverId, providerId.provider_id)
  );

  const chatDataMutation = useMutation(
    (messageData) => addConversation(messageData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getConversationHistory");
      },
    }
  );

  function toggleProvidersShow() {
    getReadyProviders()
      .then((data) => {
        console.log(data);
        if (transferMessageRef)
          if (data.length < 1) {
            setError("No other provider available");
          } else {
            changeTransferMessageRef((ref) => {
              setError("");
              return ref;
            });
            transferCustomer(receiverId, providerId.provider_id)
              .then((data) => {
                navigate(`/provider/home/${providerId.provider_id}`);
              })
              .catch((error) => {});
          }
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
            <Button variant="primary" onClick={toggleProvidersShow}>
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
          <div ref={transferMessageRef} className="container-fluid w-100 p-3">
            {error}
          </div>

          <Card>
            <Card.Body>
              <Card.Title>Your chat with {receiverId}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Each time you send a message, the message content will update
                here
              </Card.Subtitle>
              {chatData && chatData.length ? (
                <div style={{ height: "500px", overflow: "scroll" }}>
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
                      receiver: receiverId,
                      content: messageContent,
                    });
                  }}
                >
                  Send
                </Button>
              </InputGroup>

              {/* <InputGroup className="mt-2">
                <FormControl
                  placeholder="Type file to download"
                  as="textarea"
                  aria-label="Type file name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
                <Button
                  variant="primary"
                  id="submit-button"
                  onClick={() => {
                    downloadFile(fileName);
                  }}
                >
                  Download file
                </Button>
              </InputGroup> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
