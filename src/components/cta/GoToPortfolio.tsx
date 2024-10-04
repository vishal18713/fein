'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const GoToPortfolio = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWalletAddress = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });

          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          } else {
            alert('Please connect to MetaMask');
          }
        } catch (error) {
          console.error('Error fetching wallet address:', error);
          alert('Failed to retrieve wallet address.');
        }
      } else {
        alert('Please install MetaMask.');
      }
    };

    fetchWalletAddress();
  }, []);

  const handlePortfolioRedirect = () => {
    if (walletAddress) {
      router.push(`/portfolio/${walletAddress}`);
    }
  };

  return (
    <div>
      {walletAddress ? (
        <button onClick={handlePortfolioRedirect}>PORTFOLIO</button>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GoToPortfolio;
