import { ethers } from 'ethers';
import { Button, useColorMode } from "@chakra-ui/react";
// import { ColorModeToggler } from './ColorModeToggler';

export default function NavBar({ account, setAccount }) {
  const { colorMode, toggleColorMode } = useColorMode();
  
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account);
  }

  const colorModeToggler = () => {
    console.log("LIGHT / DARK MODE SWITCHER");
    toggleColorMode;
  }

  return (
    <nav>
      <div className='nav__brand'>

        <h1>ERC20 INDEXER</h1>
        
        <ul className= 'nav__links'>
          <li><a href='https://linktr.ee/nishant.social' target='_blank' rel='noreferrer'>about</a></li>
        </ul>

        <ul className= 'nav__links'>
          <li><a href='https://github.com/itznishant' target='_blank' rel='noreferrer'>github</a></li>
        </ul>

      </div>

      <Button className="button__toogle" onClick={colorModeToggler} >
      {colorMode === 'light' ? 'Dark' : 'Light'}
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