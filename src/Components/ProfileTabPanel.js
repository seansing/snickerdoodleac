import React, { useState } from "react";
import "../App.css";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  UnorderedList,
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Progress,
} from "@chakra-ui/react";
import NetflixLogo from "../assets/netflix_logo.svg";
import AdidasIcon from "../assets/adidasIcon.svg";
import MMLogo from "../assets/logo_metamask.svg"; /* 
import SolLogo from "../assets/solana.svg";
import PhantomLogo from "../assets/phantomLogo.svg"; */
import NikeLogo from "../assets/nike_logo.svg";
import { useDisclosure } from "@chakra-ui/react";
import { defaults } from "react-chartjs-2";

defaults.font.family = "Montserrat";

function ProfileTabPanel(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirmDisplay, setConfirmDisplay] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    company: "",
    logo: "",
    duration: "",
    limitations: "",
  });

  const dataPermissionList = [
    {
      company: "Adidas",
      logo: AdidasIcon,
      duration: 10,
      limitations:
        "They do not have the right to export or share data with other parties.",
    },
    {
      company: "Netflix",
      logo: NetflixLogo,
      duration: 20,
      limitations:
        "They do not have the right to export or share data with other parties.",
    },
    {
      company: "Nike",
      logo: NikeLogo,
      duration: 5,
      limitations:
        "They do not have the right to export or share data with other parties.",
    },
  ];

  const TokenList = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7_L5U4WcqT-BbF-OfIXgXQwKgsguvbm0AqA&usqp=CAU",
      symbol: "ETH",
      name: "Ethereum",
      amount: 0.0909,
      price: "$328.02",
    },
    {
      image:
        "data:image/png;base64,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",
      symbol: "USDC",
      name: "USD Coin",
      amount: 218.68,
      price: "$218.68",
    },
  ];

  const TokenListPhantom = [
    {
      image:
        "https://yourcryptolibrary.com/wp-content/uploads/2021/05/solana-sol-logo.png",
      symbol: "SOL",
      name: "Solana",
      amount: 4,
      price: "$767.40",
    },
  ];

  const TokenListPolka = [
    {
      image: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
      symbol: "DOT",
      name: "Polkadot",
      amount: 10,
      price: "$443.10",
    },
  ];

  return (
    <div>
      <Tabs colorScheme="main">
        <TabList
          style={{
            backgroundColor: "#F2F1F7",
            padding: "10px 20px 0 20px",
            borderBottom: "none",
          }}
        >
          <Tab _focus={{ boxShadow: "none" }} style={{ fontWeight: "bolder" }}>
            My Profile
          </Tab>
          <Tab _focus={{ boxShadow: "none" }} style={{ fontWeight: "bolder" }}>
            Data & Permissions
          </Tab>
          <Tab _focus={{ boxShadow: "none" }} style={{ fontWeight: "bolder" }}>
            Wallets
          </Tab>
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
                  {/* <h2>{props.gender}</h2> */}
                  <h2>Male</h2>
                </div>
                <div
                  style={{
                    borderBottom: "solid 1px #E0E0E0",
                    marginTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  <h1 style={{ color: "#857DB0" }}>Age</h1>
                  {/* <h2>{props.age}</h2> */}
                  <h2>30</h2>
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  <h1 style={{ color: "#857DB0" }}>Location</h1>
                  {/* <h2>{props.location}</h2> */}
                  <h2>California</h2>
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
                    onClick={() => {
                      setModalDetails({
                        logo: item.logo,
                        company: item.company,
                        duration: item.duration,
                        limitations: item.limitations,
                      });
                      onOpen();
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
                              src={item.logo}
                              alt="netflix logo"
                              style={{
                                width: "50px",
                                marginRight: "25px",
                              }}
                            />
                            <h1 style={{ fontSize: "16px" }}>{item.company}</h1>
                          </div>
                        </Box>
                        <span>{`>`}</span>
                      </AccordionButton>
                    </h2>
                  </AccordionItem>
                </Accordion>
              );
            })}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent
                style={{
                  width: "100vw",
                  height: "100vh",
                  padding: 0,
                  margin: 0,
                  borderRadius: 0,
                  overflow: "auto",
                }}
              >
                <ModalHeader style={{ backgroundColor: "#3a3370" }}>
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
                    {`<  Back to Data and Permissions`}
                  </Button>
                </ModalHeader>
                <ModalBody style={{ padding: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "solid 1px #E0E0E0",
                      height: "100px",
                      backgroundColor: "#1b1644",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "left",
                        display: "flex",
                        color: "white",
                        alignItems: "center",
                        padding: "25px 0 25px 20px",
                      }}
                    >
                      <img
                        src={modalDetails.logo}
                        alt="company logo"
                        style={{ height: "60px", marginRight: "20px" }}
                      />
                      <h1 style={{ fontWeight: 600, fontSize: "27px" }}>
                        {modalDetails.company}
                      </h1>
                    </div>
                    <div>
                      <span
                        style={{
                          fontWeight: "bolder",
                          color: "#3B3370",
                          fontSize: "16px",
                        }}
                      >
                        {modalDetails.price}
                      </span>{" "}
                      <br />
                      <span style={{ color: "#777E93", fontSize: "14px" }}>
                        {modalDetails.state}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "40px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderBottom: "solid 1px #E0E0E0",
                      }}
                    >
                      <div style={{ marginBottom: "30px" }}>
                        <h1
                          style={{
                            color: "#857DB0",
                            fontSize: "16px",
                            marginBottom: "10px",
                          }}
                        >
                          Information you are sharing
                        </h1>
                        <UnorderedList
                          style={{
                            color: "#232039",
                            fontSize: "18px",
                          }}
                        >
                          <ListItem>Age</ListItem>
                          <ListItem>Gender</ListItem>
                          <ListItem>Location</ListItem>
                          <ListItem>NFT preferences</ListItem>
                          <ListItem>Crypto preferences</ListItem>
                        </UnorderedList>
                      </div>
                      <div style={{ marginBottom: "30px" }}>
                        <h1
                          style={{
                            color: "#857DB0",
                            fontSize: "16px",
                            marginBottom: "10px",
                          }}
                        >
                          Duration
                        </h1>
                        <span style={{ fontSize: "18px" }}>
                          <span
                            style={{ fontWeight: "bolder", fontSize: "20px" }}
                          >
                            {modalDetails.duration}
                          </span>{" "}
                          of 30 days left to claim reward
                        </span>
                        <Progress
                          value={((30 - modalDetails.duration) / 30) * 100}
                          style={{ borderRadius: "15px", marginTop: "15px" }}
                          colorScheme="brandlight"
                        />
                      </div>
                      <div style={{ marginBottom: "30px" }}>
                        <h1
                          style={{
                            color: "#857DB0",
                            fontSize: "16px",
                            marginBottom: "10px",
                          }}
                        >
                          Limitations
                        </h1>
                        <span style={{ fontSize: "18px" }}>
                          {modalDetails.limitations}
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: "10px" }}></div>
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
                      onClick={() => {
                        setConfirmDisplay(true);
                        console.log(confirmDisplay);
                      }}
                    >
                      Stop Sharing
                    </Button>
                  </div>
                </ModalBody>
                {confirmDisplay ? (
                  <div
                    style={{
                      zIndex: 1,
                      backgroundColor: "rgba(27,22,68,0.75)",
                      position: "absolute",
                      top: 0,
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        minHeight: "350px",
                        margin: "40px",
                        padding: "20px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h1
                        style={{
                          color: "#232039",
                          fontSize: "18px",
                          fontWeight: 600,
                          marginTop: "20px",
                        }}
                      >
                        Are you sure you want to stop?
                      </h1>
                      <h2
                        style={{
                          color: "#232039",
                          fontSize: "16px",
                          margin: "20px",
                        }}
                      >
                        If you stop sharing your information early, you won't be
                        able to claim your reward.
                      </h2>
                      <Button
                        style={{
                          backgroundColor: "rgba(55, 51, 84, 0.15)",
                          borderRadius: "25px",
                          minHeight: "52px",
                          color: "#373354",
                          width: "100%",
                        }}
                        _focus={{ boxShadow: "none" }}
                        onClick={() => {
                          setConfirmDisplay(false);
                        }}
                      >
                        Yes, Stop Sharing
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#232138",
                          borderRadius: "25px",
                          margin: "0 auto 0 auto",
                          minHeight: "52px",
                          color: "white",
                          width: "100%",
                        }}
                        _focus={{ boxShadow: "none" }}
                        onClick={() => {
                          setConfirmDisplay(false);
                        }}
                      >
                        No, Keep Sharing
                      </Button>
                    </Box>
                  </div>
                ) : (
                  <div></div>
                )}
              </ModalContent>
            </Modal>
          </TabPanel>
          <TabPanel>
            <Accordion allowToggle allowMultiple>
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
                        <h1 style={{ fontSize: "16px" }}>MetaMask</h1>
                      </div>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <div style={{ marginTop: "20px" }}>
                    <span>Connected Wallet : </span>
                    <span style={{ color: "orange", fontSize: "12px" }}>
                      0x71c7656ec7ab88b098defb751b7401b5f6d8976f
                    </span>
                    <Box
                      style={{
                        border: "solid 1px #CEC6FF",
                        borderRadius: "10px",
                        padding: "10px 20px 10px 20px",
                        marginTop: "20px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {TokenList.map((item, index) => {
                        let border = "solid 1px #E0E0E0";
                        if (index === TokenList.length - 1) {
                          border = "none";
                        }

                        return (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "15px 5px 15px 5px",
                              borderBottom: border,
                              alignItems: "center",
                            }}
                          >
                            <div style={{ display: "flex" }}>
                              <img
                                src={item.image}
                                alt="token symbol"
                                style={{
                                  height: "50px",
                                  marginRight: "20px",
                                }}
                              />
                              <div style={{ textAlign: "left" }}>
                                <span>{item.symbol}</span>
                                <br />
                                <span
                                  style={{
                                    fontSize: "14px",
                                    color: "#777E93",
                                  }}
                                >
                                  {item.name}
                                </span>
                              </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <span>{item.amount}</span>
                              <br />
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#777E93",
                                }}
                              >
                                {item.price}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </Box>
                  </div>
                </AccordionPanel>
              </AccordionItem>
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
                          src="https://pbs.twimg.com/profile_images/1394116783792025603/jTMcoZRY_400x400.jpg"
                          alt="phantom logo"
                          style={{
                            width: "50px",
                            marginRight: "25px",
                            borderRadius: "25px",
                          }}
                        />
                        <h1 style={{ fontSize: "16px" }}>Phantom</h1>
                      </div>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <div style={{ marginTop: "20px" }}>
                    <span>Connected Wallet : </span>
                    <span style={{ color: "purple", fontSize: "12px" }}>
                      DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK
                    </span>
                    <Box
                      style={{
                        border: "solid 1px #CEC6FF",
                        borderRadius: "10px",
                        padding: "10px 20px 10px 20px",
                        marginTop: "20px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {TokenListPhantom.map((item, index) => {
                        let border = "solid 1px #E0E0E0";
                        if (index === TokenListPhantom.length - 1) {
                          border = "none";
                        }

                        return (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "15px 5px 15px 5px",
                              borderBottom: border,
                              alignItems: "center",
                            }}
                          >
                            <div style={{ display: "flex" }}>
                              <img
                                src={item.image}
                                alt="token symbol"
                                style={{
                                  height: "50px",
                                  marginRight: "20px",
                                }}
                              />
                              <div style={{ textAlign: "left" }}>
                                <span>{item.symbol}</span>
                                <br />
                                <span
                                  style={{
                                    fontSize: "14px",
                                    color: "#777E93",
                                  }}
                                >
                                  {item.name}
                                </span>
                              </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <span>{item.amount}</span>
                              <br />
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#777E93",
                                }}
                              >
                                {item.price}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </Box>
                  </div>
                </AccordionPanel>
              </AccordionItem>
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
                          src="https://pbs.twimg.com/profile_images/1473973493498712065/7DwyK5yf_400x400.jpg"
                          alt="polka logo"
                          style={{
                            width: "50px",
                            marginRight: "25px",
                          }}
                        />
                        <h1 style={{ fontSize: "16px" }}>Polkawallet</h1>
                      </div>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <div style={{ marginTop: "20px" }}>
                    <span>Connected Wallet : </span>
                    <span style={{ color: "#D53F8C", fontSize: "12px" }}>
                      5F3sa2TJAWMqDhXG6jhV4N8ko9SxwGy8TpaNS1repo5EYjQX
                    </span>
                    <Box
                      style={{
                        border: "solid 1px #CEC6FF",
                        borderRadius: "10px",
                        padding: "10px 20px 10px 20px",
                        marginTop: "20px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      {TokenListPolka.map((item, index) => {
                        let border = "solid 1px #E0E0E0";
                        if (index === TokenListPolka.length - 1) {
                          border = "none";
                        }

                        return (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "15px 5px 15px 5px",
                              borderBottom: border,
                              alignItems: "center",
                            }}
                          >
                            <div style={{ display: "flex" }}>
                              <img
                                src={item.image}
                                alt="token symbol"
                                style={{
                                  height: "50px",
                                  marginRight: "20px",
                                }}
                              />
                              <div style={{ textAlign: "left" }}>
                                <span>{item.symbol}</span>
                                <br />
                                <span
                                  style={{
                                    fontSize: "14px",
                                    color: "#777E93",
                                  }}
                                >
                                  {item.name}
                                </span>
                              </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <span>{item.amount}</span>
                              <br />
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#777E93",
                                }}
                              >
                                {item.price}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </Box>
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default ProfileTabPanel;
