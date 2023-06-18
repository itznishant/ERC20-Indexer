import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useState } from 'react';
import NavBar from './Navbar';
import Footer from './Footer'; 

function App() {
  const [provider, setProvider] = useState("");
  const [account, setAccount] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [ENS, setENS] = useState(null);
  const [results, setResults] = useState([]);
  const [data, setData] = useState("");
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);

  async function getTokenBalance() {
    const config = {
      apiKey: process.env.VITE_API_KEY_MAINNET,  // ALCHEMY API KEY
      network: Network.ETH_MAINNET,
    };
    const alchemy = new Alchemy(config);

    const addressInput = document.getElementById('addressInput').value;

    if(window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(ethereum));
    }

    const isValidENS = await provider.resolveName(addressInput);

    console.log(isValidENS);

    if (isValidENS) {
        setENS(isValidENS);
        setData(await alchemy.core.getTokenBalances(ENS));

    } else {
        setUserAddress(addressInput);
        setData(await alchemy.core.getTokenBalances(userAddress));
    }

    console.log("ENS: ", ENS);
    console.log("USER: ", userAddress);

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
            color="blue"
            fontSize={24}
          >
            Plug in an address and this dAPP will return its ERC20
            Token Balances!
          </Text>
          </Flex>
        </Center>
        <Flex
          w="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent={'center'}
        >
          <Heading mt={42} >
            Get all the ERC20 token balances of this address:
          </Heading>
          <Input
            id="addressInput"
            onChange={(e) => e.target.value}
            color="black"
            placeholder="Enter a wallet address example: 0x123 or example.eth"
            w="600px"
            textAlign="center"
            p={6}
            bgColor="white"
            opacity={90}
            fontSize={18}
          />
          <Button fontSize={20} onClick={getTokenBalance} mt={36} bgColor="cornflowerblue">
            Get Token Balances
          </Button>

          <Heading my={36}>ERC20 Balances:</Heading>

          {hasQueried ? (
            <SimpleGrid w={'90vw'} columns={4} spacing={24}>
              {results.tokenBalances.map((e, i) => {
                return (
                  <Flex
                    flexDir={'column'}
                    color="white"
                    bg="blue"
                    w={'20vw'}
                    key={i}
                  >
                    <Box>
                      <b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;
                    </Box>
                    <Box>
                      <b>Balance:</b>&nbsp;
                      {Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals
                      )}
                    </Box>
                    <Image src={tokenDataObjects[i].logo} />
                  </Flex>
                );
              })}
            </SimpleGrid>
          ) : (
            'Please make a query! This may take a few seconds. . .'
          )}
        </Flex>
        <div> <Footer /> </div>
      </Box>
    </>
  );
}

export default App;
