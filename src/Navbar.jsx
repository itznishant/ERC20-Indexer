import {
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Heading,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
  useMediaQuery,
  useDisclosure,
  HStack,
  Link,
} from "@chakra-ui/react";
import { ethers } from 'ethers';
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function NavBar({ account, setAccount, color }) {
  const colors = {
  "blue": "#3182CE",
  "cyan": "#00B5D8",
  "gray": "#718096",
  "green": "#38A169",
  "orange": "#DD6B20",
  "pink": "#D53F8C",
  "purple": "#805AD5",
  "red": "#E53E3E",
  "teal": "#319795",
  "yellow": "#D69E2E",
  "almostBlack": "#202020",
  // "buttonColor": "#EF6EAE",
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  const headingColor = useColorModeValue(colors["almostBlack"], "whitesmoke");
  // const buttonBgColor  = useColorModeValue(colors["almostBlack"], "");

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account);
  }

  return (
    <>
      <Flex
        bg={useColorModeValue( 'gray.200' , 'gray.900' )}
        px={8}
        h={16}
        boxShadow={scroll ? "base" : "none"}
        zIndex="sticky"
        position="fixed"
        as="header"
        alignItems={"center"}
        justifyContent={"space-between"}
        w="100%"
      >

      <Flex alignItems={"center"}>
        <Heading 
        color={headingColor}
        fontFamily={"Signika"}
        fontSize={42}
        fontWeight={800}
        letterSpacing={4}
        spacing={24}
        >
          TOKEN LISTER 
        </Heading>

        <Stack direction={"row"} spacing={10} >
        {isLargerThanMD ? (
          <>
            <a href='https://linktr.ee/nishant.social' target='_blank' rel='noreferrer'>
              <Button variant="ghost" h="60px" fontSize={18} fontFamily={"Signika"} spacing={10} mx={12} >
                About
              </Button>
            </a>
            <a href='https://github.com/itznishant?tab=repositories' target='_blank' rel='noreferrer'>
              <Button variant="ghost" h="60px" fontSize={18} fontFamily={"Signika"} spacing={10}  mx={12} >
                GitHub
              </Button>
            </a>
          </>
          ) : (
            <></>
          )}
          <Button variant="ghost" h="60px" w="70px" onClick={toggleColorMode} spacing={10} >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>

          {account ? (
            <Button variant="ghost"
              onClick={connectHandler}
              w="100px"
              h="60px"
              m={0}
              color={colors[color]}
              fontFamily={"Signika"}
              fontSize={18}
              fontWeight={600}
              cursor={"pointer"}
            >
            {"0x" + account.slice(2, 6) + " . . . " + account.slice(-4)}
            </Button> 
            ) : (
            <Button variant="ghost"
              onClick={connectHandler}
              w="100px"
              h="60px"
              m={0}
              color={colors[color]}
              fontFamily={"Signika"}
              fontSize={18}
              fontWeight={600}
              cursor={"pointer"}
            >
              CONNECT
            </Button>
          )}

          {isLargerThanMD ? (
          <></>
          ) : (
            <>
              <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerBody>
                   <a href='https://linktr.ee/nishant.social' target='_blank' rel='noreferrer'>
                    <Button variant="ghost" h="60px" fontSize={18} fontFamily={"Signika"} mx={12} >
                      About
                    </Button>
                  </a>
                  <a href='https://github.com/itznishant?tab=repositories' target='_blank' rel='noreferrer'>
                    <Button variant="ghost" h="60px" fontSize={18} fontFamily={"Signika"} mx={12} >
                      GitHub
                    </Button>
                  </a>

                  <Button variant="ghost"  h="60px" w="70px" onClick={toggleColorMode} spacing={10} >
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon /> }
                  </Button>

                  {account ? (
                    <Button variant="ghost"
                      onClick={connectHandler}
                      w="100px"
                      h="60px"
                      m={0}
                      color={colors[color]}
                      fontFamily={"Signika"}
                      fontSize={18}
                      fontWeight={600}
                      cursor={"pointer"}
                    >
                    {"0x" + account.slice(2, 6) + " . . . " + account.slice(-4)}
                    </Button> 
                    ) : (
                    <Button  variant="ghost"
                      onClick={connectHandler}
                      w="120px"
                      h="60px"
                      color={colors[color]}
                      fontFamily={"Signika"}
                      fontSize={12}
                      fontWeight={600}
                      cursor={"pointer"}
                    >
                      CONNECT
                    </Button>
                    )}

                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          )}
          </Stack>
        </Flex>
      </Flex>
    </>   
  );
}