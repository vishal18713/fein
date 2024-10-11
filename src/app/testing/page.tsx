'use client';

import React, { useEffect, useState } from 'react';
import FeinAddress from '@/contract_data/Fein-address.json';
import FeinAbi from '@/contract_data/Fein.json';
import { ethers, BigNumber } from 'ethers';

const Testing = () => {
  const [Fein, setFein] = useState<any>(null);
  const [fractionPrice, setFractionPrice] = useState<BigNumber>(BigNumber.from(0));
  const [songId, setSongId] = useState<BigNumber>(BigNumber.from(0));
  const [totalSupply, setTotalSupply] = useState<BigNumber>(BigNumber.from(0));
  const [totalFractionalAmount, setTotalFractionalAmount] = useState<BigNumber>(BigNumber.from(0));
  const [percentageShare, setPercentageShare] = useState<BigNumber>(BigNumber.from(0));
  const [tokenId, setTokenId] = useState<BigNumber>(BigNumber.from(0));
  const [revenue, setRevenue] = useState<BigNumber>(BigNumber.from(0));

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contractInstance5 = new ethers.Contract(
          FeinAddress.address,
          FeinAbi.abi,
          signer
        );
        setFein(contractInstance5);
      } else {
        alert('MetaMask not detected. Please install MetaMask.');
      }
    };

    init();
  }, []);

  const _listSong = async () => {
    if (Fein) {
      try {
        const tx = await Fein.mintNFT(totalSupply, totalFractionalAmount, percentageShare);
        await tx.wait();
        console.log('Song listed:', tx);
      } catch (error) {
        console.error('Error listing song:', error);
      }
    }
  };

  const _getSong = async () => {
    if (Fein) {
      try {
        const song = await Fein.tokenData(songId);
        setFractionPrice(song.pricePerToken);
        console.log(song.tokenSupply.toString());
        console.log('Song data:', song);
      } catch (error) {
        console.error('Error getting song:', error);
      }
    }
  };

  const _buyFraction = async () => {
    if (Fein) {
      try {
        const tx = await Fein.buyStake(tokenId, { value: fractionPrice });
        await tx.wait();
        console.log('Fraction purchased successfully');
      } catch (error: any) {
        console.error('Error buying fraction:', error);
      }
    }
  };

  const _participants = async () => {
    if (Fein) {
      try {
        const participants: string[] = await Fein.getparticipants(tokenId);
        console.log('Participants:', participants);
      } catch (error) {
        console.error('Error getting participants:', error);
      }
    }
  };

  const _artistTokenSales = async () => {
    if (Fein) {
      try {
        const tx = await Fein.artistTokenSales(tokenId);
        await tx.wait();
        console.log('Artist token sales completed');
      } catch (error) {
        console.error('Error in artistTokenSales:', error);
      }
    }
  };

  const _releaseSong = async () => {
    if (Fein) {
      try {
        const tx = await Fein.releaseSong(tokenId);
        await tx.wait();
        console.log('Song released successfully');
      } catch (error) {
        console.error('Error releasing song:', error);
      }
    }
  };

  const _addRevenueGen = async () => {
    if (Fein) {
      try {
        const tx = await Fein.addRevenueGen(tokenId, { value: revenue });
        await tx.wait();
        console.log('Revenue added successfully');
      } catch (error) {
        console.error('Error adding revenue:', error);
      }
    }
  };

  const _distributeRevenue = async () => {
    if (Fein) {
      try {
        const tx = await Fein.distributeRevenue(tokenId);
        await tx.wait();
        console.log('Revenue distributed successfully');
      } catch (error) {
        console.error('Error distributing revenue:', error);
      }
    }
  };

  return (
    <div>
      <div className='w-full flex gap-4'>
      <button onClick={_listSong}>List Song</button>
      <button onClick={_getSong}>Get Song</button>
      <button onClick={_buyFraction}>Buy Fraction</button>
      <button onClick={_participants}>Participants</button>
      <button onClick={_releaseSong}>Release Song</button>
      <button onClick={_artistTokenSales}>Artist Token Sales</button>
      <button onClick={_addRevenueGen}>Add Revenue</button>
      <button onClick={_distributeRevenue}>Distribute Revenue</button>
      </div>

      <div className="text-black">
        <input
          type="number"
          step="0.01"
          placeholder="totalSupply"
          onChange={(e) => setTotalSupply(BigNumber.from(e.target.value))}
        />
        <input
          type="number"
          step="0.01"
          placeholder="totalFractionalAmount"
          onChange={(e) => setTotalFractionalAmount(ethers.utils.parseUnits(e.target.value, 18))}
        />
        <input
          type="number"
          step="0.01"
          placeholder="percentageShare"
          onChange={(e) => setPercentageShare(BigNumber.from(e.target.value))}
        />
        <input
          type="number"
          step="0.01"
          placeholder="revenue"
          onChange={(e) => setRevenue(ethers.utils.parseEther(e.target.value))}
        />
      </div>
      <h1 className="text-lg text-white">{fractionPrice.toString()}</h1>
    </div>
  );
};

export default Testing;
