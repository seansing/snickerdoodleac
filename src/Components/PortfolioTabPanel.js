import React from "react";
import "../App.css";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
} from "@chakra-ui/react";

function PortfolioTabPanel() {
  
  const TokenList = [
    {
      image:"",
      symbol:"ETH",
      name:"Ethereum",
      amount: 0.0411,
      price: "$161.70 USD"
    },
    {
      image:"",
      symbol:"USDC",
      name:"USD Coin",
      amount: 0.0411,
      price: "$161.70 USD"
    },
  ]

  const NFTList = [
    {
      image:"",
      name:"Cool Cat #3036",
      price:"$45,000",
      state:"Est. Price"
    },
    {
      image:"",
      name:"Cool Cat #4599",
      price:"$35,000",
      state: "Est. Price"
    },
    {
      image:"",
      name:"Cool Cat #154",
      price:"$15,000",
      state: "Est. Price"
    },
    {
      image:"",
      name:"Lunar Zxdiac - Rabbit",
      price:"$10,000",
      state: "Est. Price"
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
        <Tabs>
          <TabList style={{backgroundColor: "#F2F1F7", padding:"10px 15px 0 15px"}}>
            <Tab>Portfolio</Tab>
            <Tab>Tokens</Tab>
            <Tab>NFTs</Tab>
            <Tab>Stats</Tab>
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
              <Box style={{border:"solid 1px #CEC6FF", borderRadius:"10px", padding: "20px", marginTop: "20px", display: "flex", flexDirection:"column", justifyContent:"space-between"}}>
                {TokenList.map((item,index) => {

                  let border = "solid 1px #E0E0E0";
                  if (index === TokenList.length - 1 ) {
                    border = "none";
                  }

                  return (
                    <div style={{display: "flex",justifyContent: "space-between", padding:"15px 5px 15px 5px", borderBottom: border }}>
                      <div>
                        {/* <img/> */}
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
              <Box style={{border:"solid 1px #CEC6FF", borderRadius:"10px", padding: "20px", marginTop: "20px", display: "flex", flexDirection:"column", justifyContent:"space-between"}}>
                {NFTList.map((item,index) => {

                  let border = "solid 1px #E0E0E0";
                  if (index === NFTList.length - 1 ) {
                    border = "none";
                  }

                  return (
                    <div style={{display: "flex",alignItems: "center",justifyContent: "space-between", padding:"15px 5px 15px 5px", borderBottom: border }}>
                      {/* <img/> */}
                      <span>{item.name}</span>
                      <div style={{textAlign:"right"}}>
                      <span>{item.price}</span><br/>
                        <span style={{fontSize: "14px", color: "#777E93"}}>{item.state}</span>
                      </div>
                    </div>
                  )
                })}
              </Box>
            </TabPanel>
            <TabPanel>
              <div style={{border:"solid 1px #CEC6FF", borderRadius:"10px", padding: "20px"}}>

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
