import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import SDLogo from "./assets/logo_snicker_darkbg.svg";
import SDTokenLogo from "./assets/logo_token.svg";
/* import SherpaLogo from "./assets/sherpa.svg"; */
import rewardsIcon from "./assets/rewards.svg";
import adidasShoe from "./assets/adidasShoe.svg";
import adidasLogo from "./assets/Original_Adidas_logo.svg";
import netflixLogo from "./assets/Netflix_2015_logo.svg";
import appleLogo from "./assets/Apple_logo_white.svg";
import marvelLogo from "./assets/Marvel_Logo.svg";
import nikeLogo from "./assets/nike_logo_white.svg";
/* import profileIcon from "./assets/profile.svg"; */
import moreIcon from "./assets/more.svg";
import profile from "./assets/profile.svg";
import PortfolioTabPanel from "./Components/PortfolioTabPanel";
import ProfileTabPanel from "./Components/ProfileTabPanel";
import { useDisclosure } from "@chakra-ui/react";
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UnorderedList,
  ListItem,
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

const pageStatus = {
  username: "",
  password: "",
  accounts: "",
  email: "",
  authCode: "",
  pageType: "landing",
  confirmSignUpClicked: false,
};

function App() {
  const [page, updatePage] = useState(pageStatus);
  const [accounts, setAccounts] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [doneClicked, setDoneClicked] = useState(false);
  const [loginText, setLoginText] = useState(
    "Please connect your MetaMask wallet and IDX to login."
  );
  const [modalDetails, setModalDetails] = useState({
    company: "",
    logo: "",
    image: "",
    detail: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const availableRewardsList = [
    {
      company: "Adidas",
      logo: adidasLogo,
      image: adidasShoe,
      detail: "Digital Twin NFT of Purchased Shoe",
    },
    {
      company: "Apple",
      logo: appleLogo,
      image:
        "https://i.gadgets360cdn.com/large/iphone_12_pro_image_apple_1_1602738586134.jpg?downsize=950:*",
      detail: `NFT "Apple Ecosystem"`,
    },
    {
      company: "Marvel",
      logo: marvelLogo,
      image:
        "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fscottmendelson%2Ffiles%2F2018%2F12%2FCaptain-Marvel-Poster-B-1200x675.jpg",
      detail: `NFT "Captain Marvel"`,
    },
  ];

  const myRewardsList = [
    {
      company: "Netflix",
      logo: netflixLogo,
      image:
        "https://www.thebytenews.com/wp-content/uploads/2021/08/1182202-bg-full-netflix-grid-v2.desktop-1170x658.jpg",
      detail:
        "You are sharing your Profile with Netflix so you get $5 off your subscription",
    },
    {
      company: "Nike",
      logo: nikeLogo,
      image:
        "https://hips.hearstapps.com/esq.h-cdn.co/assets/16/40/1475524585-2015-nike-mag-02-original.jpg",
      detail:
        "You received a NFT of a shoe from Nike because you shared your profile with them",
    },
    {
      company: "Adidas",
      logo: adidasLogo,
      image: adidasShoe,
      detail:
        "You received a NFT of the ULTRABOOST 20 X JAMES BOND shoes from Adidas because you shared your profile with them",
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

    getWeb3();
  }, []);

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

  return (
    <div className="App">
      {pageType === "landing" && (
        <Container
          maxW="sm"
          style={{
            textAlign: "left",
            height: "100%",
            width: "50%",
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
            height: "1200px",
            position: "relative",
          }}
        >
          {/*placeholder for background size adjustment, to remove div backgrounds and also subsequent div's 500px width*/}
          <div
            style={{
              backgroundColor: "#37346d",
              width: "100%",
              height: "8.5%",
            }}
          >
            ""
          </div>
          <div
            style={{
              backgroundColor: "#f2f1f6",
              width: "100%",
              height: "4.2%",
            }}
          ></div>
          <div
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "89%",
            }}
          ></div>
          <div
            style={{
              backgroundColor: "white",
              width: "500px",
              height: "100%",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
              top: 0,
            }}
          >
            <Tabs align="end" width="100%" colorScheme="brand">
              <TabList
                style={{
                  backgroundColor: "#37346e",
                  color: "white",
                  height: "100px",
                  borderBottom: "none",
                }}
              >
                <img
                  src={SDTokenLogo}
                  alt="SD Token Logo"
                  style={{
                    width: "50px",
                    marginLeft: "30px",
                    marginRight: "auto",
                  }}
                />
                <Tab _focus={{ boxShadow: "none" }}>Rewards</Tab>
                <Tab _focus={{ boxShadow: "none" }}>Profile</Tab>
                <Tab _focus={{ boxShadow: "none" }}>Account</Tab>
                <img
                  src={moreIcon}
                  alt="more icon"
                  style={{ height: "25px", margin: "auto 25px auto 20px" }}
                />
              </TabList>

              <TabPanels>
                <TabPanel style={{ padding: 0 }}>
                  <Tabs colorScheme="main">
                    <TabList
                      style={{
                        backgroundColor: "#F2F1F7",
                        padding: "10px 20px 0 20px",
                        borderBottom: "none",
                      }}
                    >
                      <Tab
                        _focus={{ boxShadow: "none" }}
                        style={{ fontWeight: "bolder" }}
                      >
                        Accepted Rewards
                      </Tab>
                      <Tab
                        _focus={{ boxShadow: "none" }}
                        style={{ fontWeight: "bolder" }}
                      >
                        Available Rewards
                      </Tab>
                    </TabList>

                    <TabPanels>
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
                                <img
                                  src={item.logo}
                                  alt="logo"
                                  style={{
                                    position: "absolute",
                                    right: "20px",
                                    top: "20px",
                                    height: "40px",
                                  }}
                                />
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
                                <img
                                  src={item.logo}
                                  alt="logo"
                                  style={{
                                    position: "absolute",
                                    right: "20px",
                                    top: "20px",
                                    height: "50px",
                                  }}
                                />
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
                                onClick={() => {
                                  setModalDetails({
                                    company: item.company,
                                    logo: item.logo,
                                    image: item.image,
                                    detail: item.detail,
                                  });
                                  onOpen();
                                }}
                              >
                                Share Information
                              </Button>

                              <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent
                                  style={{
                                    width: "100vw",
                                    height: "100vh",
                                    padding: 0,
                                    margin: 0,
                                    borderRadius: 0,
                                  }}
                                >
                                  <ModalHeader
                                    style={{ backgroundColor: "#3a3370" }}
                                  >
                                    <Button
                                      _focus={{ boxShadow: "none" }}
                                      onClick={onClose}
                                      style={{
                                        color: "white",
                                        padding: 0,
                                        backgroundColor: "transparent",
                                        height: "67.5px",
                                      }}
                                    >
                                      {`<  Back to Rewards`}
                                    </Button>
                                  </ModalHeader>
                                  <ModalBody style={{ padding: 0 }}>
                                    <div
                                      style={{
                                        backgroundImage: `url(
                                        "${modalDetails.image}"
                                      )`,
                                        backgroundSize: "cover",
                                        height: "200px",
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
                                        {modalDetails.company}
                                      </p>
                                    </div>
                                    <div style={{ padding: "20px" }}>
                                      <div
                                        style={{
                                          padding: "10px",
                                          borderBottom: "solid 1px #E0E0E0",
                                        }}
                                      >
                                        <p
                                          style={{
                                            color: "#857DB0",
                                            fontSize: "16px",
                                          }}
                                        >
                                          Offered Reward(s)
                                        </p>
                                        <p
                                          style={{
                                            color: "#232039",
                                            fontSize: "24px",
                                            fontWeight: "bolder",
                                          }}
                                        >
                                          {modalDetails.detail}
                                        </p>
                                      </div>
                                      <div
                                        style={{
                                          padding: "20px",
                                          borderBottom: "solid 1px #E0E0E0",
                                        }}
                                      >
                                        <p
                                          style={{
                                            color: "#857DB0",
                                            fontSize: "16px",
                                          }}
                                        >
                                          {" "}
                                          Information requested:{" "}
                                        </p>
                                        <UnorderedList
                                          style={{
                                            color: "#232039",
                                            fontSize: "18px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          <ListItem>Age</ListItem>
                                          <ListItem>Gender</ListItem>
                                          <ListItem>Location</ListItem>
                                          <ListItem>NFT preferences</ListItem>
                                          <ListItem>
                                            Crypto preferences
                                          </ListItem>
                                        </UnorderedList>
                                      </div>
                                    </div>
                                  </ModalBody>

                                  <ModalFooter
                                    style={{
                                      padding: 0,
                                      paddingBottom: "30px",
                                    }}
                                  >
                                    <Button
                                      style={{
                                        backgroundColor: "#232138",
                                        borderRadius: "25px",
                                        margin: "0 auto 0 auto",
                                        minHeight: "52px",
                                        color: "white",
                                        width: "80%",
                                      }}
                                      _focus={{ boxShadow: "none" }}
                                      onClick={onClose}
                                    >
                                      Share Information
                                    </Button>
                                  </ModalFooter>
                                </ModalContent>
                              </Modal>
                            </Box>
                          );
                        })}
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </TabPanel>
                <TabPanel style={{ padding: 0 }}>
                  <PortfolioTabPanel></PortfolioTabPanel>
                </TabPanel>
                <TabPanel style={{ padding: 0 }}>
                  <ProfileTabPanel
                    gender={gender}
                    age={age}
                    location={location}
                    account={accounts}
                  ></ProfileTabPanel>
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
    </div>
  );
}

export default App;
