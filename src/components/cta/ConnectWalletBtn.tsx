'use client';

import React, { useState } from 'react';
import { logInUser } from '@/lib/actions/user.actions'; // Ensure the correct import

const ConnectWalletButton = () => {
  const [account, setAccount] = useState("");
  // const [isOpen, setIsOpen] = useState(false);
  // useEffect(() => {
  //   checkIfWalletIsConnected();
  // }, []);

  // const checkIfWalletIsConnected = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (!ethereum) {
  //       console.log("Make sure you have MetaMask installed!");
  //       return;
  //     } else {
  //       console.log("We have the ethereum object", ethereum);
  //     }

  //     const accounts = await ethereum.request({ method: "eth_accounts" });

  //     if (accounts.length !== 0) {
  //       const account = accounts[0];
  //       console.log("Found an authorized account:", account);
  //       setAccount(account);
  //     } else {
  //       console.log("No authorized account found");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
      setAccount(accounts[0]);
      
      // Log in user after getting the account
      await logInUser(accounts[0]); // Pass accounts[0] directly here
      console.log('User logged in or created successfully');
    } catch (error) {
      console.error('Error logging in user:', error);
      alert('Failed to log in or create the user.');
    }
  };

  return (
    <div>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
