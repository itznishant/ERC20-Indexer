import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  useColorMode
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useState } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';

function App() {
  const [account, setAccount] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [ENS, setENS] = useState(null);
  const [results, setResults] = useState([]);
  const [data, setData] = useState("");
  const [hasQueried, setHasQueried] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  // const { toggleColorMode } = useColorMode();

  // const textColor = useColorModeValue('navy', 'white')
  // const headingColor = useColorModeValue('gray.800', 'white');
  // const backgroundColorBox = useColorModeValue('whitesmoke', 'gray.900');

  async function getTokenBalance() {
    const config = {
      apiKey: process.env.VITE_API_KEY_MAINNET,  // ALCHEMY API KEY
      network: Network.ETH_MAINNET,
    };
    const alchemy = new Alchemy(config);

    // Button loading starts
    setLoading(true);

    const data = await alchemy.core.getTokenBalances(userAddress);

    setResults(data);

    const tokenDataPromises = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      );
      tokenDataPromises.push(tokenData);
    }

    window.ethereum.on('accountsChanged', async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account);
    });

    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setLoading(false);
    setHasQueried(true);
  }

  return (
    <>
      <NavBar account= {account} setAccount= {setAccount} />

      <Box w="100vw" backgroundColor='whitesmoke'>
        <Center>
          <Flex
            alignItems={'center'}
            justifyContent="center"
            flexDirection={'column'}
          >
          <Text 
            // bgGradient='linear(to left, rgb(121,40,202), rgb(255,0,128))'}
            bgClip="text"
            color='navy'
            fontSize={24}
            mt={10}
          >
            Plug-in an address to get ERC20 Balances!
          </Text>
          </Flex>
        </Center>
        <Flex
          w="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent={'center'}
        >
          <Heading mt={24} mb={4} fontSize={32} >
            Get ALL the ERC20 token balances of this address:
          </Heading>
          <Input
            id="addressInput"
            onChange={(e) => setUserAddress(e.target.value)}
            color="black"
            placeholder="Enter a wallet address example: 0x123 or example.eth"
            w="600px"
            textAlign="center"
            p={6}
            bgColor="white"
            opacity={90}
            fontSize={18}
          />

          <button onClick = {getTokenBalance} className = {loading ? `btn btn--loading` : `btn`}>
            GET TOKEN BALANCES
          </button>

          <Heading my={36} >ERC20 Balances:</Heading>

          {hasQueried ? (
            <SimpleGrid w={'90vw'} columns={4} spacing={24}>
              {results.tokenBalances.map((e, i) => {
                return (
                  <Flex
                    flexDir={'column'}
                    color="white"
                    bg="slategray"
                    w={'16vw'}
                    key={i}
                  >
                    <Box>
                      <b>SYMBOL: </b>{tokenDataObjects[i].symbol}&nbsp;
                    </Box>
                    <Box>
                      <b>BALANCE: </b>&nbsp;
                      { Math.round(Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals
                      ) * 1e6) / 1e6 }
                    </Box>
                    <Image src={tokenDataObjects[i].logo} width="225px" height="200px" />
                  </Flex>
                );
              })}
            </SimpleGrid>
          ) : (
                <Spinner
                thickness='6px' speed='0.6s'
                emptyColor='gray.300' color='blue.500'  size="xl"
                />
          )}
        </Flex>
        
      </Box>

    <Footer />
  </>
  );
}

export default App;
