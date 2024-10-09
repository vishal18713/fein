'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import SongFractionalizedAbi from '@/contract_data/SongFractionalized.json'
import SongFractionalizedAddress from '@/contract_data/SongFractionalized-address.json'
import { ethers } from 'ethers'


type Props = {}

const page = (props: Props) => {

    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        const init = async () => {
          if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractInstance = new ethers.Contract(
              SongFractionalizedAddress.address,
              SongFractionalizedAbi.abi,
              signer
            );
            setContract(contractInstance);
          } else {
            alert("MetaMask not detected. Please install MetaMask.");
          }
        };
    
        init();
      }, []);

      const _getCurrentBlockTimestamp = async () => {
        if (contract) {
            try {
                const currentBlock = await contract.getCurrentBlockTimestamp();
                console.log(currentBlock.toNumber());
            } catch (error) {
                console.error('Error fetching wallet address:', error);          
            }
        }
      }
  return (
    <div>testing
        <button onClick={_getCurrentBlockTimestamp}>Get Current Block Timestamp</button>
    </div>
  )
}

export default page