import React, {useState} from "react";
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
  Button
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react"

function PortfolioTabPanel() {


  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalDetails, setModalDetails] = useState(
    {
      image:"",
      name:"",
      price:"",
      state:"",
      category:""
    },
  )
  const TokenList = [
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7_L5U4WcqT-BbF-OfIXgXQwKgsguvbm0AqA&usqp=CAU",
      symbol:"ETH",
      name:"Ethereum",
      amount: 0.0411,
      price: "$161.70 USD"
    },
    {
      image:"data:image/png;base64,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",
      symbol:"USDC",
      name:"USD Coin",
      amount: 0.0411,
      price: "$161.70 USD"
    },
  ]

  const NFTList = [
    {
      image:"https://lh3.googleusercontent.com/luvRVF2ITAerq0fYCbUbU2J6wn3PngfLP_-jaAYsQdcMf5DIOL84xtg7ka2-shqb59VNgM6Ms63To1KASmTu2svQY27srSoJx0du=w600",
      name:"Cool Cat #2735",
      price:"$45,000",
      state:"Est. Price",
      category: "Art, Animal, Social Token"
    },
    {
      image:"data:image/png;base64,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",
      name:"Cool Cat #5839",
      price:"$35,000",
      state: "Est. Price",
      category: "Art, Animal, Social Token"
    },
    {
      image:"data:image/png;base64,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",
      name:"Cool Cat #9816",
      price:"$15,000",
      state: "Est. Price",
      category: "Art, Animal, Social Token"
    },
    {
      image:"https://lh3.googleusercontent.com/SERgQLZ2-nmMmtnneska-HZCgBVOoe8t7qZF6gUQRn3xiO5pjJLy5lJnGzQdJepS0Hnbz6H4sb2vIYkFXfufbC8EdtDrGiUedMgs=w1400-k",
      name:"Lunar Zxdiac - Rabbit",
      price:"$10,000",
      state: "Est. Price",
      category: "Art, Animal, Social Token"
    },

  ]

  const statsList = 
    {
      totalGasSpent:"$5.425.82",
      totalFundsSent:"168,494.06",
      totalFundsReceived: "174,944.52"
    }
  
  return (
    <div>
        <Tabs colorScheme="main">
          <TabList style={{backgroundColor: "#F2F1F7", padding:"10px 20px 0 20px", borderBottom:"none"}}>
            <Tab _focus={{ boxShadow: "none" }} style={{fontWeight:"bolder"}}>Portfolio</Tab>
            <Tab _focus={{ boxShadow: "none" }} style={{fontWeight:"bolder"}}>Tokens</Tab>
            <Tab _focus={{ boxShadow: "none" }} style={{fontWeight:"bolder"}}>NFTs</Tab>
            <Tab _focus={{ boxShadow: "none" }} style={{fontWeight:"bolder"}}>Stats</Tab>
          </TabList>
          <TabPanels > 
            <TabPanel >
              <div style={{display: "flex", flexDirection:"column"}}>
                <div style={{display:"flex", width: "100%", justifyContent:"space-between"}}>
                    <Box style={{border:"solid 1px #CEC6FF", borderRadius:"10px", padding:"20px", display: "flex", flexDirection:"column", textAlign:"left", width: "50%"}}>
                      <h1 style={{fontWeight: 600}}>Portfolio</h1>
                      <span style={{fontWeight:"bolder", color: "#3B3370", fontSize: "24px"}}>$661.70</span>
                      <span style={{color: "#CE435E", fontSize: "14px"}}>-10.0% ($6.60)</span>
                    </Box>
                    <Box style={{border:"solid 1px #CEC6FF", borderRadius:"10px", padding: "20px", display: "flex", flexDirection:"column", textAlign:"left", width: "50%", marginLeft:"20px"}}>
                      <h1 style={{fontWeight: 600}}>NFTs Worth</h1>
                      <span style={{fontWeight:"bolder", color: "#3B3370", fontSize: "24px"}}>$115,0000.00</span>
                      <span style={{color: "#CE435E", fontSize: "14px"}}>-10.0% ($11,500)</span>
                    </Box>
                </div>
                <Box style={{textAlign:"left", border:"solid 1px #CEC6FF", borderRadius:"10px", padding: "20px", display: "flex", flexDirection:"column", marginTop: "20px"}}>
                  <h1 style={{fontWeight: 600}}>Tokens Worth</h1>
                  <span style={{fontWeight:"bolder", color: "#3B3370", fontSize: "24px"}}>$661.70</span>
                  <div>
                    chart
                  </div>
                </Box>
                </div>
            </TabPanel>
            <TabPanel>
              <Box style={{border:"solid 1px #CEC6FF", borderRadius:"10px", padding: "20px", display:"flex", justifyContent:"space-between"}}>
                <h1 style={{fontWeight: 600}}>Tokens Worth</h1>
                <div>
                <span style={{fontWeight:"bolder", color: "#3B3370", fontSize: "16px"}}>$661.70</span> <br/>
                      <span style={{color: "#CE435E", fontSize: "14px"}}>-10.0%</span>
                </div>
              </Box>
              <Box style={{border:"solid 1px #CEC6FF", borderRadius:"10px", padding: "10px 20px 10px 20px", marginTop: "20px", display: "flex", flexDirection:"column", justifyContent:"space-between"}}>
                {TokenList.map((item,index) => {

                  let border = "solid 1px #E0E0E0";
                  if (index === TokenList.length - 1 ) {
                    border = "none";
                  }

                  return (
                    <div style={{display: "flex",justifyContent: "space-between", padding:"15px 5px 15px 5px", borderBottom: border , alignItems:"center"}}>
                      <div style={{display:"flex"}}> 

                    <img src={item.image} alt="token symbol" style={{height:"50px", marginRight:"20px"}}/>
                        <div style={{textAlign: "left"}}>
                          <span>{item.symbol}</span><br/>
                          <span style={{fontSize: "14px", color: "#777E93"}}>{item.name}</span>
                        </div>
                      </div>
                      <div style={{textAlign:"right"}}>
                      <span>{item.amount}</span><br/>
                        <span style={{fontSize: "14px", color: "#777E93"}}>{item.price}</span>
                      </div>
                    </div>
                  )
                })}
              </Box>
            </TabPanel>
            <TabPanel>
            <Box style={{border:"solid 1px #CEC6FF", borderRadius:"10px", padding: "20px", display:"flex", justifyContent:"space-between"}}>
                <div style={{textAlign:"left"}}>
                  <h1 style={{fontWeight: 600}}>All Collections</h1>
                  <span style={{color: "#777E93"}}>{NFTList.length} NFTs</span>
                </div>
                <div>
                  <span style={{fontWeight:"bolder", color: "#3B3370", fontSize: "16px"}}>$115,000.00</span> <br/>
                      <span style={{color: "#CE435E", fontSize: "14px"}}>-10.0%</span>
                </div>
              </Box>
              <Box style={{border:"solid 1px #CEC6FF", borderRadius:"10px", padding: "10px 20px 10px 20px", marginTop: "20px", display: "flex", flexDirection:"column", justifyContent:"space-between"}}>
                {NFTList.map((item,index) => {

                  let border = "solid 1px #E0E0E0";
                  if (index === NFTList.length - 1 ) {
                    border = "none";
                  }

                  return (
                    <div className="nftListItem" onClick={ () => { setModalDetails(
                        {
                          image:item.image,
                          name:item.name,
                          price:item.price,
                          state:item.state,
                          category: item.category
                        },
                    )
                      
                      onOpen()}} style={{display: "flex",alignItems: "center",justifyContent: "space-between", padding:"15px", borderBottom: border, }}>
                      <div style={{display: "flex", alignItems:"center"}}>
                        <img src={item.image} alt="nft" style={{height:"70px", marginRight:"20px", borderRadius:"10px"}}/>
                        <span>{item.name}</span>
                      </div>
                      <div style={{textAlign:"right"}}>
                      <span>{item.price}</span><br/>
                        <span style={{fontSize: "14px", color: "#777E93"}}>{item.state}</span>
                      </div>
                    </div>
                  )
                })}
                <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay/>
                <ModalContent style={{width:"100vw", height:"100vh", padding: 0, margin: 0, borderRadius:0, overflow:"auto"}}>
                  <ModalHeader style={{backgroundColor:"#3a3370"}}>
                  <Button _focus={{ boxShadow: "none" }} onClick={onClose} style={{color:"white", padding: 0, backgroundColor:"transparent", height: "67.5px"}}>
                      {`<  Back to NFTs`}
                    </Button>
                  </ModalHeader>
                  <ModalBody style={{padding:"20px"}}>
                    <img src={modalDetails.image} alt="nft" style={{borderRadius:"10px", height:"410px"}}/>
                    <div style={{display:"flex", justifyContent:"space-between", padding:"10px", borderBottom:"solid 1px #E0E0E0" }}>
                      <div style={{textAlign:"left"}}>
                        <h1 style={{fontWeight: 600}}>{modalDetails.name}</h1>
                      </div>
                      <div>
                        <span style={{fontWeight:"bolder", color: "#3B3370", fontSize: "16px"}}>{modalDetails.price}</span> <br/>
                            <span style={{color: "#777E93", fontSize: "14px"}}>{modalDetails.state}</span>
                      </div>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between", padding:"20px 10px 20px 10px", borderBottom:"solid 1px #E0E0E0",}}>
                      {modalDetails.category}
                    </div>
                    <div style={{padding:"10px"}}>
                      <p style={{color: "#777E93", marginTop: "10px", marginBottom:"5px"}}>View On...</p>
                      
                      <div style={{border: "solid 1px #e0e0e0", padding: "20px", borderRadius:"10px", marginBottom:"10px", display:"flex", alignItems:"center"}}>
                        <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/bmbgoqtahdiy8uxjn7zv" alt="opensea logo" style={{height:"50px",marginRight:"10px"}} />
                        OpenSea
                      </div>
                      <div style={{border: "solid 1px #e0e0e0", padding: "20px", borderRadius:"10px", marginBottom:"10px", display:"flex", alignItems:"center"}}>
                        <img src="data:image/jpeg;base64,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" alt="opensea logo" style={{height:"50px",marginRight:"10px"}} />
                        Rarible
                      </div>
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
              </Box>
            </TabPanel>
            <TabPanel>
              <div style={{border:"solid 1px #CEC6FF", borderRadius:"10px", padding: "10px 20px 10px 20px"}}>

                        <div style={{display: "flex",alignItems: "center",justifyContent: "space-between", padding:"15px 5px 15px 5px", borderBottom: "solid 1px #E0E0E0"  }}>
                          <span style={{fontWeight: "bold", color:"#3B3370",fontSize: "16px"}}>Total Gas Spent</span>
                          <span style={{fontWeight:"bolder", color: "#3B3370", fontSize:"18px"}}>{statsList.totalGasSpent}</span>
                        </div>
                        <div style={{display: "flex",alignItems: "center",justifyContent: "space-between", padding:"15px 5px 15px 5px", borderBottom: "solid 1px #E0E0E0"  }}>
                          <span style={{fontWeight: "bold", color:"#3B3370",fontSize: "16px"}}>Total Funds Sent</span>
                          <span style={{fontWeight:"bolder", color: "#3B3370", fontSize:"18px"}}>{statsList.totalFundsSent}</span>
                        </div>
                        <div style={{display: "flex",alignItems: "center",justifyContent: "space-between", padding:"15px 5px 15px 5px" }}>
                          <span style={{fontWeight: "bold", color:"#3B3370",fontSize: "16px"}}>Total Gas Received</span>
                          <span style={{fontWeight:"bolder", color: "#3B3370", fontSize:"18px"}}>{statsList.totalFundsReceived}</span>
                        </div>

              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
        </div>
      )
}

export default PortfolioTabPanel;
