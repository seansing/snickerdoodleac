import React, { useState, useEffect } from "react";
//import logo from "./logo.svg";
import "./App.css";
import SDLogo from "./assets/sd_full_logo.png";
import { Auth, Hub } from "aws-amplify";
import { Button, Input, Container } from "@chakra-ui/react";

const initialFormState = {
  username: "",
  password: "",
  email: "",
  authCode: "",
  formType: "signIn",
};

function App() {
  const [formState, updateFormState] = useState(initialFormState);
  const [user, updateUser] = useState(null);
  console.log(user);

  useEffect(() => {
    async function checkUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        updateUser(user);
        updateFormState(() => ({ ...formState, formType: "signedIn" }));
      } catch (err) {
        //updateUser(null)
      }
    }
    async function setAuthListener() {
      Hub.listen("auth", (data) => {
        switch (data.payload.event) {
          case "signOut":
            updateFormState(() => ({ ...formState, formType: "signIn" }));
            break;
          default:
            break;
        }
      });
    }
    checkUser();
    setAuthListener();
  }, [formState]);

  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }
  const { formType } = formState;

  async function signUp() {
    const { username, email, password } = formState;
    await Auth.signUp({ username, password, attributes: { email } });
    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
  }
  async function confirmSignUp() {
    const { username, authCode } = formState;
    await Auth.confirmSignUp(username, authCode);
    updateFormState(() => ({ ...formState, formType: "signIn" }));
  }
  async function signIn() {
    const { username, password } = formState;
    await Auth.signIn({ username, password });
    updateFormState(() => ({ ...formState, formType: "signedIn" }));
  }

  return (
    <div className="App">
      <Container
        maxW="sm"
        style={{
          textAlign: "left",
          height: "60%",
          paddingTop: "50px",
        }}
      >
        <img
          src={SDLogo}
          alt="Snickerdoodle Logo"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
        {formType === "signUp" && (
          <div>
            <div>
              <label style={{ marginBottom: "5px" }}>Username</label>
              <Input
                name="username"
                onChange={onChange}
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label style={{ marginBottom: "5px" }}>Password</label>
              <Input
                name="password"
                type="password"
                onChange={onChange}
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label>Email</label>
              <Input
                name="email"
                onChange={onChange}
                placeholder="Enter your email"
              />
            </div>
            <Button colorScheme="blue" onClick={signUp}>
              Button
            </Button>

            <Button
              width=""
              colorScheme="blue"
              onClick={() =>
                updateFormState(() => ({
                  ...formState,
                  formType: "signIn",
                }))
              }
            >
              Sign In
            </Button>
          </div>
        )}
        {formType === "confirmSignUp" && (
          <div>
            <Input
              name="authCode"
              onChange={onChange}
              placeholder="confirmation code"
            />
            <button onClick={confirmSignUp}>Confirm Sign Up</button>
          </div>
        )}
        {formType === "signIn" && (
          <div
            className="test"
            style={{
              height: "100%",
              backgroundCOlor: "red",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <div style={{ paddingTop: "30px" }}>
              <h2 style={{ paddingBottom: "5px" }}>Username</h2>
              <Input
                name="username"
                onChange={onChange}
                style={{
                  backgroundColor: "white",
                  border: "black",
                  borderRadius: "6px",
                  color: "black",
                }}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <h2 style={{ paddingBottom: "5px" }}>Password</h2>
              <Input
                name="password"
                type="password"
                onChange={onChange}
                style={{
                  backgroundColor: "white",
                  border: "black",
                  borderRadius: "6px",
                  color: "black",
                }}
              />
            </div>
            <Button
              width="100%"
              style={{
                backgroundColor: "#232138",
                borderRadius: "25px",
                marginTop: "20px",
                minHeight: "52px",
              }}
              onClick={signIn}
            >
              Sign In
            </Button>

            <h1 style={{ textAlign: "center", marginTop: "20px" }}>
              Don't have an account yet?{" "}
              <button
                style={{ color: "#FFD68F" }}
                onClick={() =>
                  updateFormState(() => ({
                    ...formState,
                    formType: "signUp",
                  }))
                }
              >
                Create Account
              </button>
            </h1>
          </div>
        )}
        {formType === "signedIn" && (
          <div>
            <h1>Hello user!</h1>
            <Button onClick={() => Auth.signOut()}>Sign Out</Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
