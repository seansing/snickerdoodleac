import React, { useState } from "react";
import "../App.css";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { defaults } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

defaults.font.family = "Montserrat";

function PortfolioTabPanel() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalDetails, setModalDetails] = useState({
    image: "",
    name: "",
    name2: "",
    price: "",
    state: "",
    category: "",
  });

  const tokenWorthData = {
    labels: ["16 Sep", "17 Sep", "18 Sep", "19 Sep", "20 Sep"],
    datasets: [
      {
        label: "Tokens Worth",
        data: [630, 550, 630, 700, 661.7],
        fill: true,
        backgroundColor: "#F3EBFF",
        borderColor: "#3B3371",
        borderWidth: 4,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      labels: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

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

  const NFTList = [
    {
      image:
        "https://lh3.googleusercontent.com/luvRVF2ITAerq0fYCbUbU2J6wn3PngfLP_-jaAYsQdcMf5DIOL84xtg7ka2-shqb59VNgM6Ms63To1KASmTu2svQY27srSoJx0du=w600",
      name: "Cool Cat #2735",
      price: "$45",
      state: "Est. Price",
      category: "Art, Animal, Social Token",
    },
    {
      image: "https://miro.medium.com/max/960/1*OGfTUWooSC2NMqw8x6nn4w@2x.png",
      name: "Axie #5839",
      price: "$35",
      state: "Est. Price",
      category: "Art, Animal, Gaming Token",
    },
    {
      image:
        "data:image/jpeg;base64,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",
      name: "Super Mario",
      name2: "Paper Mario",
      price: "$15",
      state: "Est. Price",
      category: "Art, Animal, Social Token",
    },
    {
      image:
        "https://assets.nbatopshot.com/editions/2_base_set_common/2d0fe5aa-617a-4492-89d2-faa125e4b196/play_2d0fe5aa-617a-4492-89d2-faa125e4b196_2_base_set_common_capture_Hero_2880_2880_Black.jpg",
      name: "LeBron James",
      name2: "Dunk Base Set (Series 2)",
      price: "$20",
      state: "Est. Price",
      category: "Art, Animal, Social Token",
    },
  ];

  const statsList = {
    totalGasSpent: "$5.42",
    totalFundsSent: "$168.49",
    totalFundsReceived: "$174.94",
  };

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
            Portfolio
          </Tab>
          <Tab _focus={{ boxShadow: "none" }} style={{ fontWeight: "bolder" }}>
            Tokens
          </Tab>
          <Tab _focus={{ boxShadow: "none" }} style={{ fontWeight: "bolder" }}>
            NFTs
          </Tab>
          <Tab _focus={{ boxShadow: "none" }} style={{ fontWeight: "bolder" }}>
            Stats
          </Tab>
          <Tab _focus={{ boxShadow: "none" }} style={{ fontWeight: "bolder" }}>
            Interests
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  style={{
                    border: "solid 1px #CEC6FF",
                    borderRadius: "10px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    width: "50%",
                  }}
                >
                  <h1 style={{ fontWeight: 600 }}>Portfolio</h1>
                  <span
                    style={{
                      fontWeight: "bolder",
                      color: "#3B3370",
                      fontSize: "24px",
                    }}
                  >
                    $661.70
                  </span>
                  {/* <span style={{ color: "#CE435E", fontSize: "14px" }}>
                    -10.0% ($6.60)
                  </span> */}
                </Box>
                <Box
                  style={{
                    border: "solid 1px #CEC6FF",
                    borderRadius: "10px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    width: "50%",
                    marginLeft: "20px",
                  }}
                >
                  <h1 style={{ fontWeight: 600 }}>NFTs Worth</h1>
                  <span
                    style={{
                      fontWeight: "bolder",
                      color: "#3B3370",
                      fontSize: "24px",
                    }}
                  >
                    $115
                  </span>
                  {/* <span style={{ color: "#CE435E", fontSize: "14px" }}>
                    -10.0% ($11)
                  </span> */}
                </Box>
              </div>
              <Box
                style={{
                  textAlign: "left",
                  border: "solid 1px #CEC6FF",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <h1 style={{ fontWeight: 600 }}>Tokens Worth</h1>
                <span
                  style={{
                    fontWeight: "bolder",
                    color: "#3B3370",
                    fontSize: "24px",
                  }}
                >
                  $661.70
                </span>
                <div style={{ marginTop: "20px" }}>
                  <Line data={tokenWorthData} options={options} />
                </div>
              </Box>
            </div>
          </TabPanel>
          <TabPanel>
            <Box
              style={{
                border: "solid 1px #CEC6FF",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h1 style={{ fontWeight: 600 }}>Tokens Worth</h1>
              <div>
                <span
                  style={{
                    fontWeight: "bolder",
                    color: "#3B3370",
                    fontSize: "16px",
                  }}
                >
                  $661.70
                </span>{" "}
                <br />
                {/* <span style={{ color: "#CE435E", fontSize: "14px" }}>
                  -10.0%
                </span> */}
              </div>
            </Box>
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
                        style={{ height: "50px", marginRight: "20px" }}
                      />
                      <div style={{ textAlign: "left" }}>
                        <span>{item.symbol}</span>
                        <br />
                        <span style={{ fontSize: "14px", color: "#777E93" }}>
                          {item.name}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span>{item.amount}</span>
                      <br />
                      <span style={{ fontSize: "14px", color: "#777E93" }}>
                        {item.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              style={{
                border: "solid 1px #CEC6FF",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <h1 style={{ fontWeight: 600 }}>All Collections (24 NFTs)</h1>
                <span style={{ color: "#777E93" }}>
                  {NFTList.length} Most Recent NFTs
                </span>
              </div>
              <div>
                <span
                  style={{
                    fontWeight: "bolder",
                    color: "#3B3370",
                    fontSize: "16px",
                    marginRight: "15px",
                  }}
                >
                  $115
                </span>{" "}
                <br />
                {/* <span style={{ color: "#CE435E", fontSize: "14px" }}>
                  -10.0%
                </span> */}
              </div>
            </Box>
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
              {NFTList.map((item, index) => {
                let border = "solid 1px #E0E0E0";
                if (index === NFTList.length - 1) {
                  border = "none";
                }

                return (
                  <div
                    className="nftListItem"
                    onClick={() => {
                      setModalDetails({
                        image: item.image,
                        name: item.name,
                        name2: item.name2,
                        price: item.price,
                        state: item.state,
                        category: item.category,
                      });

                      onOpen();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "15px",
                      borderBottom: border,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={item.image}
                        alt="nft"
                        style={{
                          width: "70px",
                          marginRight: "20px",
                          borderRadius: "10px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "left",
                        }}
                      >
                        <span>{item.name}</span>
                        <span>{item.name2}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span>{item.price}</span>
                      <br />
                      <span style={{ fontSize: "14px", color: "#777E93" }}>
                        {item.state}
                      </span>
                    </div>
                  </div>
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
                      {`<  Back to NFTs`}
                    </Button>
                  </ModalHeader>
                  <ModalBody style={{ padding: "20px" }}>
                    <img
                      src={modalDetails.image}
                      alt="nft"
                      style={{
                        borderRadius: "10px",
                        width: "100%",
                        marginBottom: "20px",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        borderBottom: "solid 1px #E0E0E0",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <h1 style={{ fontWeight: 600 }}>{modalDetails.name}</h1>
                        <h1 style={{ fontWeight: 600 }}>
                          {modalDetails.name2}
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
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "20px 10px 20px 10px",
                        borderBottom: "solid 1px #E0E0E0",
                      }}
                    >
                      {modalDetails.category}
                    </div>
                    <div style={{ padding: "10px" }}>
                      <p
                        style={{
                          color: "#777E93",
                          marginTop: "10px",
                          marginBottom: "5px",
                        }}
                      >
                        View On...
                      </p>

                      <div
                        style={{
                          border: "solid 1px #e0e0e0",
                          padding: "20px",
                          borderRadius: "10px",
                          marginBottom: "10px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/bmbgoqtahdiy8uxjn7zv"
                          alt="opensea logo"
                          style={{ height: "50px", marginRight: "10px" }}
                        />
                        OpenSea
                      </div>
                      <div
                        style={{
                          border: "solid 1px #e0e0e0",
                          padding: "20px",
                          borderRadius: "10px",
                          marginBottom: "10px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="data:image/jpeg;base64,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"
                          alt="opensea logo"
                          style={{ height: "50px", marginRight: "10px" }}
                        />
                        Rarible
                      </div>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Box>
          </TabPanel>
          <TabPanel>
            <div style={{ textAlign: "left", margin: "15px" }}>
              <span
                style={{
                  fontWeight: "bold",
                  color: "grey",
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >
                My Interests
              </span>
            </div>
            <div
              style={{
                border: "solid 1px #CEC6FF",
                borderRadius: "10px",
                padding: "10px 20px 10px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 5px 15px 5px",
                  borderBottom: "solid 1px #E0E0E0",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#3B3370",
                    fontSize: "16px",
                  }}
                >
                  Total Gas Spent
                </span>
                <span
                  style={{
                    fontWeight: "bolder",
                    color: "#3B3370",
                    fontSize: "18px",
                  }}
                >
                  {statsList.totalGasSpent}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 5px 15px 5px",
                  borderBottom: "solid 1px #E0E0E0",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#3B3370",
                    fontSize: "16px",
                  }}
                >
                  Total Funds Sent
                </span>
                <span
                  style={{
                    fontWeight: "bolder",
                    color: "#3B3370",
                    fontSize: "18px",
                  }}
                >
                  {statsList.totalFundsSent}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 5px 15px 5px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#3B3370",
                    fontSize: "16px",
                  }}
                >
                  Total Gas Received
                </span>
                <span
                  style={{
                    fontWeight: "bolder",
                    color: "#3B3370",
                    fontSize: "18px",
                  }}
                >
                  {statsList.totalFundsReceived}
                </span>
              </div>
            </div>
            <div
              style={{ textAlign: "left", margin: "15px", marginTop: "30px" }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  color: "grey",
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >
                Applications Used
              </span>
            </div>
            <div
              style={{
                border: "solid 1px #e0e0e0",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/bmbgoqtahdiy8uxjn7zv"
                alt="opensea logo"
                style={{ height: "50px", marginRight: "10px" }}
              />
              OpenSea
            </div>
            <div
              style={{
                border: "solid 1px #e0e0e0",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="data:image/jpeg;base64,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"
                alt="opensea logo"
                style={{ height: "50px", marginRight: "10px" }}
              />
              Rarible
            </div>
          </TabPanel>
          <TabPanel>
            <div style={{ textAlign: "left", margin: "15px" }}>
              <span
                style={{
                  fontWeight: "bold",
                  color: "grey",
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >
                My Interests
              </span>
            </div>
            <div
              style={{
                border: "solid 1px #CEC6FF",
                borderRadius: "10px",
                padding: "10px 20px 10px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 5px 15px 5px",
                  borderBottom: "solid 1px #E0E0E0",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#3B3370",
                    fontSize: "16px",
                  }}
                >
                  Sports
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 5px 15px 5px",
                  borderBottom: "solid 1px #E0E0E0",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#3B3370",
                    fontSize: "16px",
                  }}
                >
                  NFT Gaming
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 5px 15px 5px",
                  borderBottom: "solid 1px #E0E0E0",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#3B3370",
                    fontSize: "16px",
                  }}
                >
                  Art
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 5px 15px 5px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#3B3370",
                    fontSize: "16px",
                  }}
                >
                  Traditional Game Collectibles
                </span>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default PortfolioTabPanel;
