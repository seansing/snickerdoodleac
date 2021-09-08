import React, { useState, useEffect } from "react";
//import logo from "./logo.svg";
import "./App.css";
import SDLogo from "./assets/logo_snicker_darkbg.svg";
import profile from "./assets/profile.svg";
import { Auth, Hub } from "aws-amplify";
import { Button, Input, Container } from "@chakra-ui/react";

const initialFormState = {
  username: "",
  password: "",
  email: "",
  authCode: "",
  formType: "signIn",
  signInClicked: false,
  signOutClicked: false,
  signUpClicked: false,
  confirmSignUpClicked: false,
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
  const { formType, signInClicked, signUpClicked, confirmSignUpClicked } =
    formState;

  async function signUp() {
    const { username, email, password } = formState;
    updateFormState(() => ({ ...formState, signUpClicked: "true" }));
    await Auth.signUp({ username, password, attributes: { email } });
    updateFormState(() => ({
      ...formState,
      formType: "confirmSignUp",
      signUpClicked: false,
    }));
  }
  async function confirmSignUp() {
    const { username, authCode } = formState;
    updateFormState(() => ({ ...formState, confirmSignUpClicked: "true" }));
    await Auth.confirmSignUp(username, authCode);
    updateFormState(() => ({
      ...formState,
      formType: "signIn",
      confirmSignUpClicked: false,
    }));
  }
  async function signIn() {
    const { username, password } = formState;
    updateFormState(() => ({ ...formState, signInClicked: "true" }));
    await Auth.signIn({ username, password });
    updateFormState(() => ({
      ...formState,
      formType: "signedIn",
      signInClicked: false,
    }));
  }

  return (
    <div className="App">
      <Container
        maxW="sm"
        style={{
          textAlign: "left",
          height: "100%",
          padding: "50px",
          paddingLeft: "45px",
        }}
      >
        {formType === "signIn" && (
          <div
            style={{
              backgroundCOlor: "red",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <img
              src={SDLogo}
              alt="Snickerdoodle Logo"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            />
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
            {signInClicked === false ? (
              <Button
                width="100%"
                style={{
                  backgroundColor: "#232138",
                  borderRadius: "25px",
                  marginTop: "20px",
                  minHeight: "52px",
                }}
                onClick={signIn}
                _focus={{ boxShadow: "none" }}
              >
                Sign In
              </Button>
            ) : (
              <Button
                isLoading
                width="100%"
                style={{
                  backgroundColor: "#232138",
                  borderRadius: "25px",
                  marginTop: "20px",
                  minHeight: "52px",
                }}
                onClick={signIn}
                _focus={{ boxShadow: "none" }}
              >
                Sign In
              </Button>
            )}

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
        {formType === "signUp" && (
          <div
            style={{
              backgroundCOlor: "red",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <img
              src={SDLogo}
              alt="Snickerdoodle Logo"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            />
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
            <div style={{ marginTop: "10px" }}>
              <h2 style={{ paddingBottom: "5px" }}>Email</h2>
              <Input
                name="email"
                type="email"
                onChange={onChange}
                style={{
                  backgroundColor: "white",
                  border: "black",
                  borderRadius: "6px",
                  color: "black",
                }}
              />
            </div>
            {signUpClicked === false ? (
              <Button
                width="100%"
                style={{
                  backgroundColor: "#232138",
                  borderRadius: "25px",
                  marginTop: "20px",
                  minHeight: "52px",
                }}
                onClick={signUp}
                _focus={{ boxShadow: "none" }}
              >
                Create Account
              </Button>
            ) : (
              <Button
                isLoading
                width="100%"
                style={{
                  backgroundColor: "#232138",
                  borderRadius: "25px",
                  marginTop: "20px",
                  minHeight: "52px",
                }}
                onClick={signUp}
                _focus={{ boxShadow: "none" }}
              >
                Create Account
              </Button>
            )}

            <h1 style={{ textAlign: "center", marginTop: "20px" }}>
              Already have an account?{" "}
              <button
                style={{ color: "#FFD68F" }}
                onClick={() =>
                  updateFormState(() => ({
                    ...formState,
                    formType: "signIn",
                  }))
                }
              >
                Sign In
              </button>
            </h1>
          </div>
        )}

        {formType === "confirmSignUp" && (
          <div
            style={{
              textAlign: "center",
              marginTop: "80px",
            }}
          >
            <h1 style={{ fontSize: "30px" }}>Confirmation</h1>
            <h2 style={{ marginTop: "20px", marginBottom: "40px" }}>
              Please confirm your account using the 6 digit code we sent to your
              email address
            </h2>
            <Input
              name="authCode"
              onChange={onChange}
              style={{
                backgroundColor: "white",
                border: "black",
                borderRadius: "6px",
                color: "black",
              }}
            />
            {confirmSignUpClicked === false ? (
              <Button
                width="100%"
                style={{
                  backgroundColor: "#232138",
                  borderRadius: "25px",
                  marginTop: "80px",
                  minHeight: "52px",
                }}
                _focus={{ boxShadow: "none" }}
                onClick={confirmSignUp}
              >
                Confirm
              </Button>
            ) : (
              <Button
                isLoading
                width="100%"
                style={{
                  backgroundColor: "#232138",
                  borderRadius: "25px",
                  marginTop: "20px",
                  minHeight: "52px",
                }}
                onClick={confirmSignUp}
                _focus={{ boxShadow: "none" }}
              >
                Confirm
              </Button>
            )}
          </div>
        )}

        {formType === "signedIn" && (
          <div
            style={{
              textAlign: "center",
              marginTop: "80px",
            }}
          >
            <h1 style={{ fontSize: "30px" }}>Welcome!</h1>
            <img
              src={profile}
              alt="Profile Icon"
              style={{
                marginTop: "40px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            />
            <h2 style={{ marginTop: "20px", marginBottom: "40px" }}>
              Get started by building your profile and earn rewards
            </h2>
            <Button
              width="100%"
              style={{
                backgroundColor: "#232138",
                borderRadius: "25px",
                marginTop: "50px",
                minHeight: "52px",
              }}
              _focus={{ boxShadow: "none" }}
            >
              Build My Profile{" "}
            </Button>
            <Button
              width="100%"
              style={{
                backgroundColor: "#232138",
                borderRadius: "25px",
                marginTop: "50px",
                minHeight: "52px",
              }}
              _focus={{ boxShadow: "none" }}
              onClick={() => Auth.signOut()}
            >
              Sign Out
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
