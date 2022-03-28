import React, {useEffect, useState} from "react";
import {
    Container, Row, Col, Card, InputGroup, FormControl, Button, Table, Form,
} from "react-bootstrap";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {
    addConversation, checkProviderId,
    getClientId,
    getConversationHistory,
    getProviderIdClientIdData,
    sendFile,
} from "../api";
import {Link} from "react-router-dom";

function Chat() {
    const queryClient = useQueryClient();
    const [messageContent, setMessageContent] = useState("");
    const [providerId, setProviderId] = useState("");
    const {data: clientId} = useQuery("getClientId", getClientId, {
        enabled: false,
    });

    const {data: providerIdClientIdData} = useQuery(
        "getProviderIdClientIdData",
        () => checkProviderId(clientId.client_id),
        {
            enabled: false,
        }
    );

    useEffect(() => {
        checkProviderId(clientId.client_id).then(data => {
            console.log(data)
            setProviderId(data.provider_id);
        })
    })
    console.log(providerId)
    // updates every minute
    const {data: chatData} = useQuery("getConversationHistory", () =>
        getConversationHistory(
            clientId.client_id,
            providerId
        )
    );

    // each time a user sends a message, the conversation history updates
    const chatDataMutation = useMutation(
        (messageData) => addConversation(messageData), {
            onSuccess: () => {
                queryClient.invalidateQueries("getConversationHistory");
            },
        }
    );

    //file upload
    const [file, setFile]= useState("");
    const onFile = e =>{
        setFile(e.target.files[0]);
    }
    const handleUpload= e =>{
        e.preventDefault();
        const formData= new FormData();
        formData.append('file',file)
        sendFile(formData);
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
                    {/* if a client leaves the chat, then they must be disconnected from the provider in the backend */}
                    {/* <Button
            as={Link}
            to={`/client/home/${clientId.client_id}`}
            variant="primary"
            className="mb-4"
          >
            Leave chat
          </Button> */}
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Your chat with {providerId}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Each time you send a message, the message content will update
                                here
                            </Card.Subtitle>
                            {chatData && chatData.length ? (
                                <div style={{height: "500px", overflow: "scroll"}}>
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
                                        chatDataMutation.mutate({
                                            sender: clientId?.client_id,
                                            receiver: providerIdClientIdData?.provider_id,
                                            content: messageContent,
                                        });
                                    }}
                                >
                                    Send
                                </Button>
                            </InputGroup>

                            <Form onSubmit={handleUpload}>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload File</Form.Label>
                                    <Form.Control type="file" name="file" onChange={onFile}/>
                                </Form.Group>
                                <Button type="submit">Upload</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Chat;
