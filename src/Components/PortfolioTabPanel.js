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
      name2: "Mario Wink",
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
                  <span style={{ color: "#CE435E", fontSize: "14px" }}>
                    -10.0% ($6.60)
                  </span>
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
                  <span style={{ color: "#CE435E", fontSize: "14px" }}>
                    -10.0% ($11)
                  </span>
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
                <span style={{ color: "#CE435E", fontSize: "14px" }}>
                  -10.0%
                </span>
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
                <h1 style={{ fontWeight: 600 }}>All Collections</h1>
                <span style={{ color: "#777E93" }}>{NFTList.length} NFTs</span>
              </div>
              <div>
                <span
                  style={{
                    fontWeight: "bolder",
                    color: "#3B3370",
                    fontSize: "16px",
                  }}
                >
                  $115
                </span>{" "}
                <br />
                <span style={{ color: "#CE435E", fontSize: "14px" }}>
                  -10.0%
                </span>
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
                      style={{ borderRadius: "10px", height: "410px" }}
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default PortfolioTabPanel;
