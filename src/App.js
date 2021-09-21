import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import SDLogo from "./assets/logo_snicker_darkbg.svg";
import SDTokenLogo from "./assets/logo_token.svg";
import NetflixLogo from "./assets/netflix_logo.svg";
import MMLogo from "./assets/logo_metamask.svg";
import NikeLogo from "./assets/nike_logo.svg";
import rewardsIcon from "./assets/rewards.svg";
import profileIcon from "./assets/profile.svg";
import profile from "./assets/profile.svg";
/* import { Auth, Hub } from "aws-amplify"; */
import {
  Button,
  Input,
  Container,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Spinner,
  Switch,
} from "@chakra-ui/react";

//Imports and setups for Ceramic
import CeramicClient from "@ceramicnetwork/http-client";
import KeyDidResolver from "key-did-resolver";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import { DID } from "dids";
import { ThreeIdConnect, EthereumAuthProvider } from "@3id/connect";
import { IDX } from "@ceramicstudio/idx";

const API_URL = "https://ceramic-clay.3boxlabs.com";
const ceramic = new CeramicClient(API_URL);

//for IDX
const aliases = {
  alias1: "basicProfile",
};
const idx = new IDX({ ceramic, aliases });

const resolver = {
  ...KeyDidResolver.getResolver(),
  ...ThreeIdResolver.getResolver(ceramic),
};
const did = new DID({ resolver });

ceramic.did = did;

//

const pageStatus = {
  username: "",
  password: "",
  accounts: "",
  email: "",
  authCode: "",
  pageType: "landing",
  /* signInClicked: false,
  signOutClicked: false,
  signUpClicked: false, */
  confirmSignUpClicked: false,
};

function App() {
  const [page, updatePage] = useState(pageStatus);
  const [accounts, setAccounts] = useState("");
  const [email, setEmail] = useState("");
  /* const [password, setPassword] = useState(""); */
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [doneClicked, setDoneClicked] = useState(false);
  const [loginText, setLoginText] = useState(
    "Please connect your MetaMask wallet and IDX to login."
  );
  /* const [user, updateUser] = useState(null); */
  /* console.log(user); */
  const availableRewardsList = [
    {
      company: "Adidas",
      logo: "logo",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO2r-lF3OwRSvKtizuachdwdcifPjKm-2dPg&usqp=CAU",
      detail: "10% of all purchases",
    },
    {
      company: "Apple",
      logo: "logo",
      image:
        "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_new-iphone-se-black-camera-and-touch-id_04152020_big.jpg.large.jpg",
      detail: `NFT "Apple Ecosystem"`,
    },
    {
      company: "Marvel",
      logo: "logo",
      image:
        "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fscottmendelson%2Ffiles%2F2018%2F12%2FCaptain-Marvel-Poster-B-1200x675.jpg",
      detail: `NFT "Captain Marvel"`,
    },
  ];

  const myRewardsList = [
    {
      company: "Netflix",
      logo: "logo",
      image:
        "https://external-preview.redd.it/An0ibJEE6XhCcuj778sMEDDJPXC0wT7c6kFX8sLgL7Q.jpg?width=640&crop=smart&auto=webp&s=14edadacf1bbe152780009a8d92e11fe63d551a4",
      detail:
        "You are sharing your Profile with Netflix so you get $5 off your subscription",
    },
    {
      company: "Nike",
      logo: "logo",
      image:
        "https://sneakerbardetroit.com/wp-content/uploads/2016/01/kevin-durant-nike-kd-8-all-star-3.jpg",
      detail:
        "You received a NFT of a shoe from Nike because you shared your profile with them",
    },
  ];

  const dataPermissionList = [
    {
      company: "Netflix",
      logo: NetflixLogo,
    },
    {
      company: "Nike",
      logo: NikeLogo,
    },
  ];

  useEffect(() => {
    async function getWeb3() {
      new Promise((resolve, reject) => {
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        window.addEventListener("load", async () => {
          // Modern dapp browsers...
          //Metamask's global API window.ethereum
          if (window.ethereum) {
            //Get web3 provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            try {
              // Request account access on Metamask and 3ID connect
              const threeIdConnect = new ThreeIdConnect();
              const addresses = await window.ethereum.enable();
              const authProvider = new EthereumAuthProvider(
                window.ethereum,
                addresses[0]
              );
              await threeIdConnect.connect(authProvider);

              setLoginText(
                "MetaMask connected! Login into IDX via 3ID Connect..."
              );

              const provider = await threeIdConnect.getDidProvider();
              ceramic.did.setProvider(provider);
              await ceramic.did.authenticate();

              setLoginText("Success! Logging you in...");
              //test idx read
              const userId = await ceramic.did.id;
              const result = await idx.get("basicProfile", userId);

              console.log(userId);
              console.log(result);

              // Acccounts now exposed
              if (result == null) {
                updatePage({ pageType: "signUp" });
              } else {
                setEmail(result.email);
                setGender(result.gender);
                setAge(result.age);
                setLocation(result.location);
                updatePage({ pageType: "profilePage" });
              }
              const accounts = await signer.getAddress();
              console.log(accounts);
              setAccounts(accounts);
              resolve(provider);
            } catch (error) {
              reject(error);
            }
          }
          // Legacy dapp browsers...
          else if (window.web3) {
            // Use Mist/MetaMask's provider.
            const web3 = window.web3;
            console.log("Injected web3 detected.");
            resolve(web3);
          } else {
            updatePage({ pageType: "installMetamask" });
          }
        });
      });
    }

    //for web 2.0 usage
    /*
    async function checkUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        updateUser(user);
        updatePage(() => ({ pageType: "signedIn" }));
      } catch (err) {
        //updateUser(null)
      }
    }
    async function setAuthListener() {
      Hub.listen("auth", (data) => {
        switch (data.payload.event) {
          case "signIn":
            console.log("user signed in");
            break;
          case "signOut":
            updatePage(() => ({ pageType: "signIn" }));
            break;
          default:
            break;
        }
      });
    }

    checkUser();
    setAuthListener();
    */
    getWeb3();
  }, []);

  /* function onChange(e) {
    updatePage(() => ({ ...page, [e.target.name]: e.target.value }));
  } */

  async function onClickDone() {
    setDoneClicked(true);
    const content = {
      email: email,
      gender: gender,
      age: age,
      location: location,
    };

    try {
      console.log("Registering profile on IDX...");
      await idx.set("basicProfile", content);
      console.log("Profile set!");
    } catch (error) {
      console.log(error);
    }
    setDoneClicked(false);
    updatePage({ pageType: "profilePage" });
  }

  function onSelectGender(e) {
    let gender = "";
    switch (e.target.value) {
      case "option1":
        gender = "Male";
        break;
      case "option2":
        gender = "Female";
        break;
      case "option3":
        gender = "Non-binary";
        break;
      default:
        gender = "";
    }
    setGender(gender);
  }
  const { pageType } = page;

  //for web2 AWS functions
  /*
  async function signUp() {
    const { username, email, password } = page;
    updatePage(() => ({ ...page, signUpClicked: "true" }));

    try {
      await Auth.signUp({ username, password, attributes: { email } });
      updatePage(() => ({
        ...page,
        pageType: "confirmSignUp",
        signUpClicked: false,
      }));
    } catch {
      updatePage(() => ({
        ...page,
        signUpClicked: false,
      }));
      console.log("error");
    }
  }
  async function confirmSignUp() {
    const { username, authCode } = page;
    updatePage(() => ({ ...page, confirmSignUpClicked: "true" }));
    try {
      await Auth.confirmSignUp(username, authCode);
      updatePage(() => ({
        ...page,
        pageType: "signIn",
        confirmSignUpClicked: false,
      }));
    } catch {
      updatePage(() => ({
        ...page,
        confirmSignUpClicked: false,
      }));
      console.log("error");
    }
  }
  async function signIn() {
    const { username, password } = page;
    updatePage(() => ({ ...page, signInClicked: "true" }));
    try {
      await Auth.signIn({ username, password });
      updatePage(() => ({
        ...page,
        pageType: "signedIn",
        signInClicked: false,
      }));
    } catch {
      updatePage(() => ({
        ...page,
        signInClicked: false,
      }));
      console.log("error");
    }
  }
 */

  /* function truncate(fullStr) {
    let separator = "...";

    var frontChars = 6;
    var backChars = 4;

    return (
      fullStr.substr(0, frontChars) +
      separator +
      fullStr.substr(fullStr.length - backChars)
    );
  } */

  return (
    <div className="App" style={{ height: "100%" }}>
      <div
        style={{
          width: "100%",
          padding: "15px",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        {/* <div>
          <span>Connected Wallet : </span>
          <span style={{ color: "#FFD68F" }}>{truncate(accounts)}</span>
        </div> */}
      </div>

      {pageType === "landing" && (
        <Container
          maxW="sm"
          style={{
            textAlign: "left",
            height: "100%",
            width: "100%",
            padding: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              textAlign: "center",
              alignItems: "center",
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
            <h1 style={{ fontSize: "30px", marginTop: "40px" }}>Welcome!</h1>
            <h2 style={{ marginTop: "20px", marginBottom: "40px" }}>
              {loginText}
            </h2>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="#EB5C5D"
              color="#FFD690"
              size="xl"
            />
          </div>
        </Container>
      )}

      {pageType === "signUp" && (
        <Container
          maxW="sm"
          style={{
            textAlign: "left",
            height: "100%",
            width: "100%",
            padding: "50px",
          }}
        >
          <div
            style={{
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

            <div
              style={{
                textAlign: "center",
                marginTop: "30px",
                marginBottom: "20px",
              }}
            >
              <h2>Looks like it's your first time here!</h2>
              <h1>Go ahead and create an account</h1>
            </div>

            <div style={{ marginTop: "10px" }}>
              <h2 style={{ paddingBottom: "5px" }}>Email</h2>
              <Input
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: "white",
                  border: "black",
                  borderRadius: "6px",
                  color: "black",
                }}
              />
            </div>

            {/* <div style={{ marginTop: "10px" }}>
              <h2 style={{ paddingBottom: "5px" }}>Password</h2>
              <Input
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: "white",
                  border: "black",
                  borderRadius: "6px",
                  color: "black",
                }}
              />
            </div> */}
            {/*
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
              */}

            <Button
              width="100%"
              style={{
                backgroundColor: "#232138",
                borderRadius: "25px",
                marginTop: "20px",
                minHeight: "52px",
              }}
              onClick={() => {
                updatePage({ pageType: "signedIn" });
              }}
              _focus={{ boxShadow: "none" }}
            >
              Continue
            </Button>

            {/*
            {signUpClicked === false ? (
              <Button
                width="100%"
                style={{
                  backgroundColor: "#232138",
                  borderRadius: "25px",
                  marginTop: "20px",
                  minHeight: "52px",
                }}
                //onClick={signUp}
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
                //onClick={signUp}
                _focus={{ boxShadow: "none" }}
              >
                Create Account
              </Button>
            )}
              */}
            {/* <h1 style={{ textAlign: "center", marginTop: "20px" }}>
              Already have an account?{" "}
              <button
                style={{ color: "#FFD68F" }}
                onClick={() =>
                  updatePage(() => ({
                    ...page,
                    pageType: "signIn",
                  }))
                }
              >
                Sign In
              </button>
            </h1> */}
          </div>
        </Container>
      )}

      {pageType === "signedIn" && (
        <Container
          maxW="sm"
          style={{
            textAlign: "left",
            height: "100%",
            width: "100%",
            padding: "50px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
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
                marginTop: "30px",
                minHeight: "52px",
              }}
              _focus={{ boxShadow: "none" }}
              onClick={() => updatePage({ pageType: "askGender" })}
            >
              Build My Profile{" "}
            </Button>
            {/*
            <Button
              width="100%"
              style={{
                backgroundColor: "#232138",
                borderRadius: "25px",
                marginTop: "50px",
                minHeight: "52px",
              }}
              _focus={{ boxShadow: "none" }}
              onClick={async () => {
                await Auth.signOut();
                window.location.reload(false);
              }}
            >
              Sign Out
            </Button>
            */}
          </div>
        </Container>
      )}

      {pageType === "askGender" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            textAlign: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          >
            <img src={rewardsIcon} alt="Rewards Icon" />
            <span
              style={{
                fontSize: "20px",
                marginLeft: "20px",
                marginRight: "5px",
              }}
            >
              1 or 3 <span style={{ color: "#9E99B8" }}>Rewards</span>
            </span>
          </div>
          <div
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "15px",
                marginTop: "40px",
                marginBottom: "40px",
              }}
            >
              Please select the gender you identify as...
            </h1>
            <Select
              placeholder="Select"
              _focus={{ boxShadow: "none" }}
              width="30%"
              onChange={onSelectGender}
            >
              <option value="option1">Male</option>
              <option value="option2">Female</option>
              <option value="option3">Non-binary</option>
            </Select>
            <Button
              width="30%"
              style={{
                backgroundColor: "#232138",
                borderRadius: "25px",
                marginTop: "80px",
                minHeight: "52px",
                color: "white",
              }}
              _focus={{ boxShadow: "none" }}
              onClick={() => updatePage({ pageType: "askAge" })}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {pageType === "askAge" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            textAlign: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          >
            <img src={rewardsIcon} alt="Rewards Icon" />
            <span
              style={{
                fontSize: "20px",
                marginLeft: "20px",
                marginRight: "5px",
              }}
            >
              2 or 3 <span style={{ color: "#9E99B8" }}>Rewards</span>
            </span>
          </div>
          <div
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "15px",
                marginTop: "40px",
                marginBottom: "40px",
              }}
            >
              What is your age?
            </h1>
            <NumberInput
              min={10}
              max={100}
              width="30%"
              onChange={(string) => setAge(string)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              width="30%"
              style={{
                backgroundColor: "#232138",
                borderRadius: "25px",
                marginTop: "80px",
                minHeight: "52px",
                color: "white",
              }}
              _focus={{ boxShadow: "none" }}
              onClick={() => updatePage({ pageType: "askLocation" })}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {pageType === "askLocation" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            textAlign: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          >
            <img src={rewardsIcon} alt="Rewards Icon" />
            <span
              style={{
                fontSize: "20px",
                marginLeft: "20px",
                marginRight: "5px",
              }}
            >
              3 or 3 <span style={{ color: "#9E99B8" }}>Rewards</span>
            </span>
          </div>
          <div
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "15px",
                marginTop: "40px",
                marginBottom: "40px",
              }}
            >
              Where are you located?
            </h1>
            <h2 style={{ color: "#857DB0" }}>Zip Code</h2>
            <NumberInput
              min={1}
              max={99950}
              width="30%"
              onChange={(string) => setLocation(string)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {doneClicked ? (
              <Button
                isLoading
                width="30%"
                style={{
                  backgroundColor: "#232138",
                  borderRadius: "25px",
                  marginTop: "80px",
                  minHeight: "52px",
                  color: "white",
                }}
                _focus={{ boxShadow: "none" }}
                onClick={onClickDone}
              >
                Done!
              </Button>
            ) : (
              <Button
                width="30%"
                style={{
                  backgroundColor: "#232138",
                  borderRadius: "25px",
                  marginTop: "80px",
                  minHeight: "52px",
                  color: "white",
                }}
                _focus={{ boxShadow: "none" }}
                onClick={onClickDone}
              >
                Done!
              </Button>
            )}
          </div>
        </div>
      )}

      {pageType === "profilePage" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            textAlign: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Tabs align="end" width="100%" variant="enclosed">
              <TabList
                style={{
                  backgroundColor: "#37346e",
                  color: "white",
                  height: "100px",
                }}
              >
                <img
                  src={SDTokenLogo}
                  alt="Snickerdoodle Logo"
                  style={{
                    width: "60px",
                    marginLeft: "50px",
                    marginRight: "auto",
                  }}
                />
                <Tab
                  _focus={{ boxShadow: "none" }}
                  _selected={{ color: "black", bg: "white" }}
                >
                  <img
                    src={rewardsIcon}
                    alt="Rewards Icon"
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  Rewards
                </Tab>
                <Tab
                  _focus={{ boxShadow: "none" }}
                  _selected={{ color: "black", bg: "white" }}
                >
                  <img
                    src={profileIcon}
                    alt="Profile Icon"
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  Profile
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Tabs align="center">
                    <TabList>
                      <Tab _focus={{ boxShadow: "none" }}>My Rewards</Tab>
                      <Tab _focus={{ boxShadow: "none" }}>
                        Available Rewards
                      </Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        {availableRewardsList.map((item) => {
                          return (
                            <Box
                              style={{
                                border: "solid 1px #D6D4E0",
                                borderRadius: "10px",
                                margin: "20px",
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                              }}
                            >
                              <div
                                style={{
                                  backgroundImage: `url(
                                    "${item.image}"
                                  )`,
                                  backgroundSize: "cover",
                                  height: "200px",
                                  borderTopLeftRadius: "10px",
                                  borderTopRightRadius: "10px",
                                  position: "relative",
                                }}
                              >
                                <p
                                  style={{
                                    color: "white",
                                    position: "absolute",
                                    left: "10px",
                                    bottom: "10px",
                                    fontSize: "24px",
                                  }}
                                >
                                  {item.company}
                                </p>
                              </div>
                              <div
                                style={{
                                  padding: "10px",
                                }}
                              >
                                <p style={{ color: "#857DB0" }}>
                                  Offered Reward(s)
                                </p>

                                <p>{item.detail}</p>
                              </div>
                              <Button
                                style={{
                                  backgroundColor: "#232138",
                                  borderRadius: "25px",
                                  margin: "10px auto 10px auto",
                                  minHeight: "52px",
                                  color: "white",
                                  width: "50%",
                                }}
                                _focus={{ boxShadow: "none" }}
                              >
                                Share Profile
                              </Button>
                            </Box>
                          );
                        })}
                      </TabPanel>
                      <TabPanel>
                        {myRewardsList.map((item) => {
                          return (
                            <Box
                              style={{
                                border: "solid 1px #D6D4E0",
                                borderRadius: "10px",
                                margin: "20px",
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                              }}
                            >
                              <div
                                style={{
                                  backgroundImage: `url(
                                    "${item.image}"
                                  )`,
                                  backgroundSize: "cover",
                                  height: "200px",
                                  borderTopLeftRadius: "10px",
                                  borderTopRightRadius: "10px",
                                  position: "relative",
                                }}
                              >
                                <p
                                  style={{
                                    color: "white",
                                    position: "absolute",
                                    left: "10px",
                                    bottom: "10px",
                                    fontSize: "24px",
                                  }}
                                >
                                  {item.company}
                                </p>
                              </div>
                              <div
                                style={{
                                  padding: "10px",
                                }}
                              >
                                <p style={{ color: "#857DB0" }}>Reward</p>

                                <p>{item.detail}</p>
                              </div>
                            </Box>
                          );
                        })}
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </TabPanel>

                <TabPanel>
                  <Tabs align="center">
                    <TabList>
                      <Tab _focus={{ boxShadow: "none" }}>My Profile</Tab>
                      <Tab _focus={{ boxShadow: "none" }}>
                        Data & Permissions
                      </Tab>
                      <Tab _focus={{ boxShadow: "none" }}>Wallets</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <div
                          style={{
                            border: "solid 1px #E0E0E0",
                            borderRadius: "10px",
                            textAlign: "left",
                          }}
                        >
                          <div
                            style={{
                              borderBottom: "solid 1px #E0E0E0",
                              padding: "20px",
                              fontWeight: "bold",
                            }}
                          >
                            Profile Information
                          </div>
                          <div style={{ padding: "20px" }}>
                            <div
                              style={{
                                borderBottom: "solid 1px #E0E0E0",
                                paddingBottom: "10px",
                              }}
                            >
                              <h1 style={{ color: "#857DB0" }}>Gender</h1>
                              <h2>{gender}</h2>
                            </div>
                            <div
                              style={{
                                borderBottom: "solid 1px #E0E0E0",
                                marginTop: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              <h1 style={{ color: "#857DB0" }}>Age</h1>
                              <h2>{age}</h2>
                            </div>
                            <div
                              style={{
                                borderBottom: "solid 1px #E0E0E0",
                                marginTop: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              <h1 style={{ color: "#857DB0" }}>Location</h1>
                              <h2>{location}</h2>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        {dataPermissionList.map((item) => {
                          return (
                            <Accordion allowToggle>
                              <AccordionItem
                                style={{
                                  border: "solid 1px #E0E0E0",
                                  borderRadius: "10px",
                                  textAlign: "left",
                                  padding: "20px",
                                  marginBottom: "20px",

                                  width: "100%",
                                }}
                              >
                                <h2>
                                  <AccordionButton
                                    _focus={{ boxShadow: "none" }}
                                  >
                                    <Box flex="1" textAlign="left">
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          src={item.logo}
                                          alt="netflix logo"
                                          style={{
                                            width: "50px",
                                            marginRight: "25px",
                                          }}
                                        />
                                        <h1 style={{ fontSize: "16px" }}>
                                          {item.company}
                                        </h1>
                                      </div>
                                    </Box>
                                    <AccordionIcon />
                                  </AccordionButton>
                                </h2>
                                <AccordionPanel
                                  pb={4}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: "20px",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <div>Allow access to my profile</div>
                                  <Switch />
                                </AccordionPanel>
                              </AccordionItem>
                            </Accordion>
                          );
                        })}
                      </TabPanel>
                      <TabPanel>
                        <Accordion allowToggle>
                          <AccordionItem
                            style={{
                              border: "solid 1px #E0E0E0",
                              borderRadius: "10px",
                              textAlign: "left",
                              padding: "20px",
                              marginBottom: "20px",

                              width: "100%",
                            }}
                          >
                            <h2>
                              <AccordionButton _focus={{ boxShadow: "none" }}>
                                <Box flex="1" textAlign="left">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      src={MMLogo}
                                      alt="netflix logo"
                                      style={{
                                        width: "50px",
                                        marginRight: "25px",
                                      }}
                                    />
                                    <h1 style={{ fontSize: "16px" }}>
                                      MetaMask
                                    </h1>
                                  </div>
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              <div style={{ marginTop: "20px" }}>
                                <span>Connected Wallet : </span>
                                <span style={{ color: "orange" }}>
                                  {accounts}
                                </span>
                              </div>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      )}

      {pageType === "installMetamask" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            textAlign: "center",
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
          <h1 style={{ fontSize: "30px", marginTop: "40px" }}>Snicker-oops!</h1>
          <h2 style={{ marginTop: "20px", marginBottom: "40px" }}>
            Please install MetaMask{" "}
            <span style={{ color: "#FFD68F" }}>
              <a
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </span>{" "}
            to continue.
          </h2>
        </div>
      )}

      {
        //Sign in page
        /* {pageType === "signIn" && (
        <Container
          maxW="sm"
          style={{
            textAlign: "left",
            height: "100%",
            width: "100%",
            padding: "50px",
          }}
        >
          <div
            style={{
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
                //onClick={signIn}
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
                //onClick={signIn}
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
                  updatePage(() => ({
                    ...page,
                    pageType: "signUp",
                  }))
                }
              >
                Create Account
              </button>
            </h1>
          </div>
        </Container>
      )} */
      }

      {
        //Confirm sign up page
        /* {pageType === "confirmSignUp" && (
        <Container
          maxW="sm"
          style={{
            textAlign: "left",
            height: "100%",
            width: "100%",
            padding: "50px",
          }}
        >
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
                //onClick={confirmSignUp}
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
                //onClick={confirmSignUp}
                _focus={{ boxShadow: "none" }}
              >
                Confirm
              </Button>
            )}
          </div>
        </Container>
      )} */
      }
    </div>
  );
}

export default App;
