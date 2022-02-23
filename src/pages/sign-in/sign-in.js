import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getClientId } from "../client/api";
import { getProviderId } from "../provider/api";
import { useQuery } from "react-query";

function SignIn() {
  const navigate = useNavigate();

  const [isClientLoggingIn, setIsClientLoggingIn] = useState(false);
  const [isProviderLoggingIn, setIsProviderLoggingIn] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const isInputInvalid = !email || !password;

  const { data: clientData, isSuccess: clientIsSuccess } = useQuery(
    "getClientId",
    getClientId,
    {
      enabled: isClientLoggingIn,
    }
  );

  const { data: providerData, isSuccess: providerIsSuccess } = useQuery(
    "getProviderId",
    () => getProviderId(email, password),
    {
      enabled: isProviderLoggingIn,
    }
  );

  useEffect(() => {
    if (clientIsSuccess) {
      navigate(`/client/home/${clientData?.client_id}`);
    }
    if (providerIsSuccess) {
      navigate(`/provider/home/${providerData?.provider_id}`);
    }
  }, [
    clientIsSuccess,
    providerIsSuccess,
    clientData?.client_id,
    providerData?.provider_id,
  ]);

  return (
    <Container>
      <Row className="my-5">
        <Col md={8}>
          <h1 className="display-1">Help Desk</h1>
          <p className="lead">
            If you are a Provider, please sign in. Otherwise, please login
            anonymously as a Guest.
          </p>
          <Button
            variant="primary"
            type="submit"
            onClick={() => setIsClientLoggingIn(true)}
          >
            Guest login
          </Button>

          <h2 className="mt-3">Provider Login</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formProviderEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProviderPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => setIsProviderLoggingIn(true)}
              disabled={isInputInvalid}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
