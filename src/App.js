import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import SDLogo from "./assets/logo_snicker_darkbg.svg";
import SDTokenLogo from "./assets/logo_token.svg";
import NetflixLogo from "./assets/netflix_logo.svg";
import MMLogo from "./assets/logo_metamask.svg";
import NikeLogo from "./assets/nike_logo.svg";
import rewardsIcon from "./assets/rewards.svg";
/* import profileIcon from "./assets/profile.svg"; */
import moreIcon from "./assets/more.svg";
import profile from "./assets/profile.svg";
import PortfolioTabPanel from "./Components/PortfolioTabPanel";
import { useDisclosure } from "@chakra-ui/react"

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

const TokenList = [
  {
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7_L5U4WcqT-BbF-OfIXgXQwKgsguvbm0AqA&usqp=CAU",
    symbol:"ETH",
    name:"Ethereum",
    amount: 0.0411,
    price: "$161.70 USD"
  },
  {
    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEUndcr///8jc8khcsn5+/77/f4eccnv9fsYb8ityOn1+f3x9vwqeMswe8zm7/nr8vqVuuTe6vfE2PCjwed2p901fs6Ks+LU4/RLiNHK3fK0zevi7PhnndlUj9TY5vVWk9WDrN5Ag8+kxOhxoNmcveWRt+PG2O9hl9eDsOBEhc+0zOu61O5VkdVrodt7qt5gmtiq4T8UAAAX/klEQVR4nM1da3uqOBDGCURUELUgiKLitVar///fLXhpTQKTAbR75tPueQrmJcncL0brvWSZ7eEk/hj7s0VySAM3pyA9JIuZP97Ek6FnWm9egfGuF1vdXj+MB/7iEBg8IwY5GTld/4txbnPDPSz8QRxO2923AX0LQqs9nXxtZ5HLbsiMMroitbkbXcZfk2nbfMdiXo+wN9x1lvs02zgEmgyUcyNdLFe7Yfvl63kxwnYYjy+pk+8cEd0PSoNlKPfjr9B77ZJeibA3WZ1PAauO7ncvGQSJ/zF55U6+DuF85SdutsSa6H5RghutP+Yv4zwvQtg9niPXqL15BSD9Y+81S3sJwv5q4WAssxZI5/TRf8XimiM0w8/Abnw4C0Ay2z1PmguQpgh7O9/lr4f3AOl+j5pynWYIvd36ffhuGJ3ZyGvEdZog9Ebn4K34bhhd/9hERNZH2BstU/ZmeHeM6bnBWa2L0ArHkfHu/fvBCIfPSd2jWhNhf5M4f4XvitGIBtO/RHjM5d8fAsy30TnFtbaxDsL+p/vH+G4Y3XOdbayOsNs5vJ2BlmC00051Va4qQmu+dP6EgxZjdPzKKnlFhL3j6Q0KWgWILIkrbmM1hNNB8P9t4I1YsB2+D2E4+zMRWE5gXCrJxgoIu3HyP7EYkYAnne47EHqD9F/AlxOkW7rpSEY4Pbv/9xX8JXB98mWkIpz/C1fwlwD24UsRWqPI/r9BScTTI43fkBCaccr/b0QKsaBDcnFQEJqrf+gK/hI4HxSIBITd1Z8aSnQCY0PQb/QI2xu3OkCo6hqGOp5ycLd621+LsLcJKv8040aQOlWuLjPS1OCV70IGUevC0SFsVwbIOEvXnUkYR/QF8/QrDDv+gVcFCYF2FzUIu1UBgm3sV/Nezsgn5EeZM8r+3urNOxfHrvh77lZzF3GEGRet8oO5m9qfPHRGy6fKUD57iDYzPLsVHejuBueoKEKzEhfNWEWyedIXrQEVoT1+Et7eR+JUwZhxVBQihtCKq+wgc/cr4drXRJjd/c4sqMBZwe1g2g2GcFTB45vh60j6fhWE0i978ayCqQ3BsR7CeUTl98CMxUrxgzVA2Gr1O3v6WWUpooaXI5zOqAsEiAZz9QWNELZaw01Chsj35cZUKULvTMXH3OWkyOaufQ/vZE4+yYEfWJeaxGUIuwMql2GnuFivaIowYznxnriN4JSKxTKEMdFlwZzlsISTVUD4WfaK6ZjonYWgjKGWIAwTGkA7LQ8mWN9kiX8pf8nxQHsLRJMqCKczEhtlcEE8QhOycxxgVP6a9jdNNpZxm0KEvS3FKQMQDBCvXv9Ed3zwaFoutM1NSsEIMC5UwosQWkeKzgyQlJ/Q7vS4r2I98UU8Lf9axwXpi7tfRespQjg/UY6XMyt1PXuTzb6SeZhBdBaDSamtF64pJ54lRYK/AGF3SXgbOOcCIX+l/nEZQWVrlnE4nOOyAOHwkyK8mF8gMgoQdggGBXPLvM5eZ52yWvEpYCxYd0r20aPIZzBWFIT9g/7zg7MpNq278dptEH7L9KPZV/Gbex+Egwqpyk9VhJ96Fsh4sR/PmqyDhuFFyPZxVHi/rQ6Bo3JfeVZBeNSfBsY3hZ+5vw2qO5NUjDz4LL6OBIjgxDqE/QXhLQWnPTugX4eKPpbSH7DT4vBZrDcaIZHPqYTQ2mjZDAQfRadoeAb9zz9I94eMrYvi9VZHCzFTwaUHJYR6fRSCTcH37Y4i7QYCcx7EtAu1D8eCnzFXWl1E0U9FhL2xbguL3cz9TaAV8OCuNw9a65Um7m4LbqPePw3GUlygiHAU6Z53lqoctEKfIEKdwe+T/Y2r/Xsw1gVKk6ffg4PotREQekvtz85UgWON9oaehbLZsyz31nqlDmBxVIXSdK3TUcEXNkFAONKZvUWanxlHFNWfD55Xa60IaitAVBAinC80j0IgWATPCD1fsxXgqm47a0WybQwmKAlWhyQ4M7amQtzpGCpbPx+XZ4SjQPODdoGkHxDd4rUQZqdfZv4ZrTRaV7YRTw89IezpvA78W93BT5uoxdRDaDBb1cNaZ91CL0+b+IRwp9HXWKKwb3NLVmNqIswk46ciGL0F/jQ4T7fpF6Hp4zeYqb7z7oDARB+P10RoMBgrVp8u3sBnv1/lF2GIbyEYW/lbdj8qRG5qI8xs0YEM0dw46CPg/Co2vwg/8S3kF1kSmp0qaWD1EWanZyV/3Olas4m+irCPq0OgJOhYR50CJC6zPsJM15R9XtYIt9PB+dmPH4Q4CwZDcdWFejvrmZogzGwi2d2rc3jaAxlhF2dPTPmJ/rpSegjYjRCymczHw71mwY8deSA84oLb2UjHxNzS3RXAbZs7QlzB6mT/VAEksE9ZucFTDH6N/QfCM7pernjvv6hyAhhzonMnlA65dxzvg+wdZHHKZceChzMbWJsCwjnKNcDtSK+fEwPgmdWbLEuKlsz5ah2Q6055ICv9R5SVw2EiIMS3nM2kNZq0+DCAu//AUl27oyW5esreSyKjixoK4G6eEfZ8dKGKSdEhKWvM2KvRfXkjJ0uabZLzKunZEZoyCXcL44Zwgrpn7Jn09Wg5DDwYh4Qk1168p22jko9grrGTBNHuCSF6SMGWtpAU2DB4VOK9lsman2mRRpDDEhOMn2fH1PpB2EY5KT9JjPpIyXXhEb0qwtuSODMLZHfvHt3EW/bCFWGIhtO4xEj7Gp3w9lBhpKuMulsS52IX6VrHWK7GXRG6IowxnZQdpHBQhxA/taMqAMkxf1cSit0EYQh3GZcj7I3RLZRcF0NcXboSS3eVAGYXRedfur33JAUtUYcWW3p3hMML8ncsFV9qERIymbtSHUiW2Wv3p9O+1+4VBa4mJB1CTl4fHrClL+Z3hDtMOeBnUVQMZ4Qwnq+4jXvz48BfJFEUnS7nzU4N2psDkk9yL37vLmbVQjC6IbTQoK8jmmbWl34LIZKTR3q7ceJwm2XEr02FFgMlUWyocb7clyN5UEeonMt3PEPYXiLfgUvRKoKzWokctIZjKYObMUjkvh7mB8UvySUzaopxBe57V4ToHzHJDbTTM1JIJQ1hPjMU0Zzn+0msP0woGRKu6GvoDhCpz/LtMfI7jrSqckUhi577x3tn4u60L4UrB+MsbnV7TDE5Zb4wQj45BLscofWFqIVcYs8o77q/1tmKezMoUdPBkOQQKpYfJPP2IZaZxFZWhrC7xf5EulIE54OckzwsFQMsEO84rlo9SDIxetjO82U3Q9hDsvRk09ckpHIxiTdtyhdg+8Jfts8kjf4kHlNs59minSHsI+Y9k0LGc4IRwC7CCixEiwVXSu6ncFMwxDVhDCrPrzFQXzeTkos3BO2RiaEUVB2zBT5GQyhnhWMxQXB2GcIY+QNjLMpXivIIS+GRPmZc24J7hKIuGfk1EH4A/S6skyEc0K9hn3SKxE/cx9gHOOO5176RFy5pYRAwxIuOXUQ+tgwLCTnJmRsxxcSRELZR5gTOyX/QglqCZIvffYIwEv5tGSaiDsJeVDsIKW8KQozTGNckInYnsg9dYsF95HCzpGu0D4hO4Ats0aTZcGfh91uDl5fY8kQQ0uYS02r6xrD8FIMhaidDUi2SxEtbkxpFtjiBKzoQkEw1cEJjUq6zyYwmJl0Utpcsi88XJfQ9kbQuTOYfjRhhNIFo59HOG0SSl7t9eXXPJemqT5CLxlbGRzlCFglKrqVLt7n/vBLvn56b5tXKC1sLYnqKaDV8a4wRhCdBqWoTXFDGNUNaQngtmayX+122MEHVyg5J6Z/ys4GIQyZ684fESiG2Vn3d03h5csGmtxZGCURfpbVGTunMwISJKHdo3rCyCqT2/LhZJ4GRR0abbiekIoP4RMTFwkCi8dKFJlXSGFcTuLj0uOsNJ1+D8yUKmG3X7zaseh4QFgiRgR098UJ1qIINEI/+1WsaHjf+KeCV4tzCDziiFbxCEKYGptKIPnR9CvjjuYIsJhmo1Z0exwvHriUrZVUkRmR6YJS7ocAQzwKpoO32JF4//kv9jp/W6K8MsBTej6VZOAaitDmCYLOQ+ywTPxRXhRTQcFWp+P6+tLNw03HFsDzhGhyBY2EKrkIsIUNstY9+VYxMNAlqI3QFrt/1KyV5RTG9jXM7numLNYS3iyI3RLn8mxAaPNhU6MU5HVdqV/hPIDSYs47p3X97HULJ3O+7/wmEeYdj/0jGaB717vQfqoQQ4aUNEeZcPbisqM3xrJjeaERCOEcRIvJQ4qV46lvJOxik36W1ryJ1NYm/T8TWgkqBuXwdRKeR5eGyGrif19i2k3zG856lkx/0hE4gS4tMpynXS2WdZly7cyLjOcrvbT4bqIfMzDkiKqRIok4zQhw1KWZbSO4Qau1I8S9Bbk846Wm9/ZoMS2bm9IhXHQzR6sH00gizDw1Jg2/eei+P49tGcDqvdtMikKQIoupG6CB/usBsfJA0+Be5BfPtNNLZpqCpDaFG9/oGKXNoU/6nmY2P+WnEGMvohV2S88zhZKyakTTdV3Z2jVE/DRIwg7Vwn8NK1Qf6ZTIjUQqvkfP2ROwg+kmQyCrfYv5SybeLRpHqEDBXhqgp3HksTKzA6iK8xF5hPm/pRSYlJ7EacTkp1iNpp+wiCHzvhOzS0Rgi0jIVDwNy3OsS80WWikXCnp4Sgz/I9QEjNDxEqZEOEe2S/FbdUwrvD9ImklLkQRRjiBMwjz0hX00WO7QoEriH6E6pvn2BXOdA6SYpKcyYoIakZ7QwgbgUzpBHSWBnycdocqfjVl/9PhAWqy0PvT50EPMnEHWSzyyjhfQcEyvMWy1KIq/7/H27K00BX6Z/iWoqBaHUGqyHOPXtcYYQC69Jrl1diXH+6zPhCW1OuOQXJJ1SW9z3IaII8VXLQE0PKcsw1Acc7E/hCWuAGyTKHlKOiS2y+BHCK41RhnCK8FqpZM3USytbqvfW6NLyPaRICxaIHvUV4oi55kS1kSxvJiVI6m8JO4h7Mj/hCCWB5BHaK0sfsbssF0ps4WlyE9lJvIg7rYQDJiW+43azHBKnCCQxVQytHbjlJmL5pbIS39Z/YlsqicCC7NknlHpCrnSvz0+eyOCxZh63/NLWJC1/myH1DcRyUW8kX0RrjOy7XKxFSRWwRe5rYrkm7u6W543cbrn+Vn+KQMrhbU3Li5OASQV3c8I1lBSaPvJRHnneWK4+k5RvT98UE+REhUlZgyVgUs62ptDztqK9J70duYb3XH1zhVxEQyxSsfTaN+zlcpLdoqgAC7gzliqq+jMtQABxQSZWLAJ5SytdzYysuA0RW+z+Wrn8Kjt8+aRSGR9POrLLn1AzxqWSMQ9Tqx81Myi/lW1EtL7h/ojaKrW3Owe2/ZODwZjNo63Sr2xK2EK5/iNElJBbHViOsI2Ztmwg2qgTrYGR6Smq09eadvKByHZO3Dn4cV/5G4wr/qxGKoozV1g1zE/tWusLS31LxGvV3WqlPpOLZh7UHmYW1XESquhyOhIiM3IOhIckhN6zCW41pEjKCbAvcSETffEOI48qeiJKtQUcpJqxEaIx3TOXrgg9zJvOpUru7lZvubN1telvrTyNXd+dXKkZMzFjiz3VAbfQVjqOlMRF6YQNVcdNDteEVDAlnwwLjQq13GgyuJxWTekemXuTKx3U8EIBqKSTYYnnjxN9Q9heoy+WjhxazvcgtqDnm5jxgpIbxU7SQtCuQTB77qmAq0vK6IKY0vCWHzbEAXfTLa1htyP3H8Ha2v84Cu8I0ZiEokzTJsiAs48Jcwq78Z4WtrO/pbdNMdEs9zax0NgkyJvYJ4WhgDkXHUbzeCGOFmaGzJ/RvHN4fA9SjyFZdcujrrSMaNtOPyelcW1zODhQsxOByepuiKWnqD2G2mh5EshmjvVJzfNlNiSfcdiXivCt9nSyubjUnoTZEqQIR8tE/SMQPSyGn15fH2gTDUUPI/HT+8MZyCCZiax1MoucKhO62EI+o3g3Wfsnfv3brw03PpUpJ5jlqRAAl3t9VZtbxZR0Tu+MXV9wfpjjb8+9M9piQhmnWK3jXtN+bYHchsLCrIXs1369Rb8IcRcMW8g6Sm9Qae5jI4SKN6A1Ly6Bv1Pu61YRmt9ooaCh5G73l1VSiBogzLiMrOVq1H9+Kep9iWUWGVfXqWqTV0mYbNAZUmlKqel4LGRzPfegxf1oBQ1ahxUGrTTo7qkWN3h41XxZD1q8T0huYyhpTMMFGWL9Dq2JMirEWuJtLIV+LBV6QataRV42Rp2qVRMhsIJ+TDGu54mNOZ4RWnifPoO5akHTfP9WhACLgt/UaMXl/bxzKYo+yveq5T7X9khvgBBgpu5gX5OvIbVJkPrqaxI82VkdAzNckowfLiEkpXU4vjqup6dJ64FUjL6JCNuf+IYwt2CGVX9LsaXs5fOTpj6Ilf/aWD0z5ofu16RdkOZboA4bI/9ABRVNpEoCsWaQotVC+qGeGEs38k5pUiXPKNElAkNU4O21RlhnuDuxaDWc3mjYITRMsqOCyQitkcbRB47UykOZMzPF4+5FHYWvj33rLT1mBOmNAr39DHbBnAmC2xgi+eaqs4J0fIMXj+FbpXpzKBdjYBDK8YAFheOIQl3kS/VWqQgtbb4FPxW6QsNGs6yEZYI7K/yKc22LI/6tnGx1otVUGyApgdheLSqNKi4FaCQFLOYGUJcmF6jSpWjumlaEl7XuDLdRtSq7AmLsUNK6lgBQ7h5WgrCnT4jgBbpUTt3dMm00tgvsYDkqLiIOtQALOwEUzz8kxM8SxVq8UXt3Dnjdswrc9Uclw/NG+nwwuW9XOUKLUNhROOTmSl6+j1SLQ4DHg3MZPivWf/WS+uriOaSEEidIN2Ul6b3sPrKqc+45j7Zh2Ru7K0JFFCwLP0/xLFm0Z+vjhc5n6VRNy4sv2sljz8T4vlMc+86pPSY4vfiieKhmyTxgvMH3fVW24n97piN5WG6uYyu1JU80vxBc42rTVByhRfKG2ilWsL0iM5wi78HvUuKUcOIhWFWb6dzqbkmjTWFbPsgXDYWIr0nKu0z0B5SzkCncZRXHpbPV+6RaQMZmJeLrOguKiNA+l32m7m5Gmwi2Ls0bKEWINwb9IWCHQUneRZXZ6mVr2ESkoy5n+tIQtkJabTU4JeNfG0+P78UzGrdiQcnUcQ1CWv/8q6lzLvqFpnsYkudCqONViQjxNthPxOAwLhj82AihtyXP9nDK2KgWYcv8oP4IY9FKPqpNEPZWEbWbFDBswrsGYcskTNO8E7cPG1ErqX8PvY/IpraQAEeZllYFYatHEos3yvZxM3/6tZoIu8OPhJNbZIBbKghpCFvtLbHDV/5rPLNed95jtRXk4U8zScubbA+MbpmAWzD5tRrC7MZXKFK/jUe/z3bqE1yMN2L3upJ2+OUHVSwvAkA9wmwXK9Xhg+0ky6/Qaw+XdL0U/HnPm8fjk1PJQ5DpavrEMj3CVm9TrSFGvpEnf0mcAHSHuF/6i8q9FVnR9OUaCIlTCySQ1VZb+QHjmk9OSJsjIWyZ+onff0/MUeY+1keYx07pLY7+hlggT31shDD35b26kWwjAnZClO1aCFvDdfPmLS8jcOhJ1mSErf6YLvvfTBAUhE6bI2x1O+TEi/cSV7X81yBsWZN/4TICVMiRr4gwH/pTKVvvHcTcZbFf9DUIW+2v5LWNqysSsKhT6od+CcKWFfq1m5q9ACCsKUMjGyHMzW9CPPs9+FiwqcBiaiPMbqNPLCB4Lb5MCFa7gfUR5rGuP8cITmk87w0I80IesifsNfiMaFxnA+sjzGTjktzksDmx9DyqtYENEN4aHP8Jy8kYzDquKCJegjDTVI9r9+16HHBnFhOL4F6OsGV5o4s6+O+1+IxLQdn3nyFs5TPSv5237SOwDJ/XCF9zhJnJMfHdaiU+RHhgO98jkqPizQgzGg4y+fhSkJDJ92hbUz6I9BKEeVf19cEl9Ngjwzt8V9Wwy+hFCPMx8Jt19AKQAMyJCtu31qSXIWzl2VCbdeI2mbECjLnRelOWGVWLXokwEx/9SWe5CKBOZhsAh+C07EyaCQeFXoswJ28++vCToMqouOxkcu4m2ebNm8oGlV6PMCPTG+5Wy0XqZAvHcWb3lnNupIvlajf0Xnb3nuktCHOyuhnMzvg7CRx2A/oENf+f7B9tZgTJ7HM1ysC9fO8e9DaEN7Ksbj88rrbn2SJKg0fffCdIo8XsvF0dw76+GX1D+g+FD4rj2T1H/wAAAABJRU5ErkJggg==",
    symbol:"USDC",
    name:"USD Coin",
    amount: 0.0411,
    price: "$161.70 USD"
  },
]

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
  const [modalDetails, setModalDetails] = useState({company:"", logo:"", image:"", detail:""})
  /* const [user, updateUser] = useState(null); */
  /* console.log(user); */

  const { isOpen, onOpen, onClose } = useDisclosure()

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
            <Tabs align="end" width="100%" colorScheme="brand">
              <TabList
                style={{
                  backgroundColor: "#37346e",
                  color: "white",
                  height: "100px",
                  borderBottom:"none"
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
                >
                  Portfolio
                </Tab>
                <Tab
                  _focus={{ boxShadow: "none" }}
                >
                  Rewards
                </Tab>
                <Tab
                  _focus={{ boxShadow: "none" }}
                >
                  Profile
                </Tab>
                <img src={moreIcon} alt="more icon" style={{height: "25px", margin:"auto 25px auto 20px"}}/>
              </TabList>

              <TabPanels>
                <TabPanel style={{padding:0}}>
                  <PortfolioTabPanel></PortfolioTabPanel>
                  </TabPanel>
                <TabPanel style={{padding:0}}>
                  <Tabs colorScheme="main">
                    <TabList style={{backgroundColor: "#F2F1F7", padding:"10px 20px 0 20px", borderBottom:"none"}}
                     >
                      <Tab _focus={{ boxShadow: "none" }} style={{fontWeight:"bolder"}}>My Rewards</Tab>
                      <Tab _focus={{ boxShadow: "none" }} style={{fontWeight:"bolder"}}>
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
                                onClick = {() => {
                                  setModalDetails({company: item.company, logo: item.logo, image:item.image, detail:item.detail});
                                  onOpen();
                                }}
                              >
                                Share Information
                              </Button>
                              
                              <Modal isOpen={isOpen} onClose={onClose} >
                                <ModalOverlay/>
                                <ModalContent style={{width:"100vw", height:"100vh", padding: 0, margin: 0, borderRadius:0}}>
                                  <ModalHeader style={{backgroundColor:"#3a3370"}}>
                                  <Button _focus={{ boxShadow: "none" }} onClick={onClose} style={{color:"white", padding: 0, backgroundColor:"transparent", height: "67.5px"}}>
                                      {`<  Back to Rewards`}
                                    </Button>
                                  </ModalHeader>
                                  <ModalBody style={{padding:0}}>
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
                                  <div style={{padding:"20px"}}>
                                    <div
                                      style={{
                                        padding: "10px",
                                        borderBottom:"solid 1px #E0E0E0"
                                      }}
                                    >
                                      <p style={{ color: "#857DB0", fontSize:"16px"}}>
                                        Offered Reward(s)
                                      </p>
                                      <p style={{ color: "#232039", fontSize:"24px", fontWeight:"bolder"}}>{modalDetails.detail}</p>
                                    </div>
                                    <div style={{padding: "20px", 
                                        borderBottom:"solid 1px #E0E0E0"}}>
                                      <p style={{ color: "#857DB0", fontSize:"16px"}}> Information requested: </p>
                                      <UnorderedList style={{color: "#232039", fontSize:"18px", fontWeight:"bold"}}>
                                        <ListItem>Age</ListItem>
                                        <ListItem>Gender</ListItem>
                                        <ListItem>Location</ListItem>
                                      </UnorderedList>
                                    </div>
                                  </div>
                                  </ModalBody>

                                  <ModalFooter style={{padding: 0, paddingBottom:"30px"}}>
                                    
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

                <TabPanel style={{padding:0}}>
                  <Tabs colorScheme="main">
                    <TabList style={{backgroundColor: "#F2F1F7", padding:"10px 20px 0 20px", borderBottom:"none"}}>
                      <Tab _focus={{ boxShadow: "none" }} style={{fontWeight:"bolder"}}>My Profile</Tab>
                      <Tab _focus={{ boxShadow: "none" }} style={{fontWeight:"bolder"}}>
                        Data & Permissions
                      </Tab>
                      <Tab _focus={{ boxShadow: "none" }} style={{fontWeight:"bolder"}}>Wallets</Tab>
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
                                <span style={{ color: "orange", fontSize:"12px" }}>
                                  {accounts}
                                </span>
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
