import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getClientId } from "../client/api";
import { useQuery } from "react-query";

function SignIn() {
  const [isClientLoggingIn, setIsClientLoggingIn] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery("getClientId", getClientId, {
    enabled: isClientLoggingIn,
  });

  const goToHomePage = () => {
    setIsClientLoggingIn(true);
    if (!isLoading) {
      navigate(`/client/home/${data?.client_id}`);
    }
  };

  return (
    <Container>
      <Row className="my-5">
        <Col md={8}>
          <h1 className="display-1">Help Desk</h1>
          <p className="lead">
            If you are a Provider, please sign in. Otherwise, please login
            anonymously as a Guest.
          </p>
          <Button variant="primary" type="submit" onClick={goToHomePage}>
            Guest login
          </Button>

          <h2 className="mt-3">Provider Login</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formProviderEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProviderPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button
              variant="primary"
              as={Link}
              type="submit"
              to="/provider/home/123"
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
