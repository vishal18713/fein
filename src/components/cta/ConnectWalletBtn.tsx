'use client';

import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import axios from 'axios';
import { useState } from 'react';

const ConnectWalletButton = () => {
  const router = useRouter();
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletConnected(true);
      setAddress(address);
      console.log('Connected with address:', address);

      try {
        // Call API to generate JWT
        const response = await axios.post('/api/generateToken', { address }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem('userToken', token);
          console.log('Token:', token);

          // Redirect to the same page to refresh the state
          router.refresh();
        } else {
          console.error('Failed to generate token');
        }
      } catch (error) {
        console.error('Error generating token:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setAddress(null);
    localStorage.removeItem('userToken');
    console.log('Disconnected from wallet');
    router.refresh();
  };

  return (
    walletConnected ? (
      <div>
        <button className='bg-green-500 text-white px-4 py-2 rounded-xl'>
          {address}
        </button>
        <button onClick={disconnectWallet} className='bg-red-500 text-white px-4 py-2 rounded-xl ml-2'>
          Disconnect
        </button>
      </div>
    ) : (
      <button onClick={connectWallet} className='bg-blue-500 text-white px-4 py-2 rounded-xl'>
        Connect Wallet
      </button>
    )
  );
};

export default ConnectWalletButton;