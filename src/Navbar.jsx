import { ethers } from 'ethers';
import { Button, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function NavBar({ account, setAccount }) {
  const { colorMode, toggleColorMode } = useColorMode();
  
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account);
  }

  return (
    <nav>
      <div className='nav__brand'>

        <h1>TOKEN LISTER </h1>

        <ul className= 'nav__links'>
          <li><a href='https://linktr.ee/nishant.social' target='_blank' rel='noreferrer'>about</a></li>
        </ul>

        <ul className= 'nav__links'>
          <li><a href='https://github.com/itznishant?tab=repositories' target='_blank' rel='noreferrer'>github</a></li>
        </ul>

      </div>

      <Button className="button__toogle" onClick={toggleColorMode} >
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon /> }
      </Button>

      {account ? (
        <button
          type="button"
          className='nav__connect'
        >
        {"0x" + account.slice(2, 6) + " . . . " + account.slice(-4)}
        </button> 
        ) : (
        <button
          type="button"
          className='nav__connect'
          onClick={connectHandler}
        >
          CONNECT
        </button>
        )}
    </nav>
  );
}