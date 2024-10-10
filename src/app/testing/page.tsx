'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import SongFractionalizedAbi from '@/contract_data/SongFractionalized.json'
import SongFractionalizedAddress from '@/contract_data/SongFractionalized-address.json'
import SongEscrowAddress from '@/contract_data/SongEscrow-address.json'
import SongEscrowAbi from '@/contract_data/SongEscrow.json'
import FractionPurchaseAddress from '@/contract_data/FractionPurchase-address.json'
import FractionPurchaseAbi from '@/contract_data/FractionPurchase.json'
import SongRevenueAddress from '@/contract_data/SongRevenue-address.json'
import SongRevenueAbi from '@/contract_data/SongRevenue.json'
import FeinAddress from '@/contract_data/Fein-address.json'
import FeinAbi from '@/contract_data/Fein.json'





import { ethers , BigNumber } from 'ethers'

const Testing = () => {

  // const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [SongFractionalized, setSongFractionalized] = useState<any>(null);
  const [SongEscrow, setSongEscrow] = useState<any>(null);
  const [FractionPurchase, setFractionPurchase] = useState<any>(null);
  const [SongRevenue, setSongRevenue] = useState<any>(null);
  const [Fein, setFein] = useState<any>(null);


  const [title, setTitle] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [releaseTime, setReleaseTime] = useState<bigint>(BigInt(0));
  const [fractionPrice, setFractionPrice] = useState<bigint>(BigInt(0));
  const [totalFractions, setTotalFractions] = useState<bigint>(BigInt(0));
  const [songId, setSongId] = useState<bigint>(BigInt(0));
  const [amount, setAmount] = useState<bigint>(BigInt(0));
  const [totalSupply, setTotalSupply] = useState<bigint>(BigInt(0));
  const [totalFractionalAmount, setTotalFractionalAmount] = useState<bigint>(BigInt(0));
  const [percentageShare, setPercentageShare] = useState<bigint>(BigInt(0));
  const [tokenId, setTokenId] = useState<bigint>(BigInt(0));




  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contractInstance1 = new ethers.Contract(
          SongFractionalizedAddress.address,
          SongFractionalizedAbi.abi,
          signer
        );
        setSongFractionalized(contractInstance1);

        const contractInstance2 = new ethers.Contract(
          SongEscrowAddress.address,
          SongEscrowAbi.abi,
          signer
        );
        setSongEscrow(contractInstance2);

        const contractInstance3 = new ethers.Contract(
          FractionPurchaseAddress.address,
          FractionPurchaseAbi.abi,
          signer
        );
        setFractionPurchase(contractInstance3);

        const contractInstance4 = new ethers.Contract(
          SongRevenueAddress.address,
          SongRevenueAbi.abi,
          signer
        );
        setSongRevenue(contractInstance4);

        const contractInstance5 = new ethers.Contract(
          FeinAddress.address,
          FeinAbi.abi,
          signer
        );
        setFein(contractInstance5);




      } else {
        alert("MetaMask not detected. Please install MetaMask.");
      }
    };

    init();
  }, []);

  // const _getCurrentBlockTimestamp = async () => {
  //   if (contract) {
  //     try {
  //       const currentBlock = await contract.getCurrentBlockTimestamp();
  //       console.log(currentBlock.toString());
  //     } catch (error) {
  //       console.error('Error fetching wallet address:', error);
  //     }
  //   }
  // }

  // const _listSong = async () => {
  //   if (SongFractionalized) {
  //     try {
  //       const currentBlock = await SongFractionalized.listSong(title, artistName, releaseTime, fractionPrice, totalFractions);
  //       console.log(currentBlock);
  //     } catch (error) {
  //       console.error('Error listing song:', error);
  //     }
  //   }
  // }

  // const _getSong = async () => {
  //   if (SongFractionalized) {
  //     try {
  //       const song = await SongFractionalized.getSong(songId);
  //       setFractionPrice(song.fractionPrice);
        
  //       console.log(song);
  //     } catch (error) {
  //       console.error('Error listing song:', error);
  //     }
  //   }
  // }
  // const _buyFraction = async () => {
  //   if (FractionPurchase) {
  //     try {
  //       // Convert fraction price to Wei
  //       const priceInWei = ethers.utils.parseEther(fractionPrice.toString());
  //       // Calculate the total value in Wei (fractionPrice * amount)
  //       const totalValue = priceInWei.mul(BigNumber.from(amount));
  
  //       console.log(`Total Value in Wei: ${totalValue}`);
  
  //       // Perform the purchase transaction with the correct value
  //       const tx = await FractionPurchase.buyFraction(songId, amount, { value: totalValue });
  //       await tx.wait();
  //       console.log("Fraction purchased successfully");
  //     } catch (error: any) {
  //       console.error('Error buying fraction:', error);
  //       if (error.data && error.data.message) {
  //         console.error('Detailed error message:', error.data.message);
  //       }
  //     }
  //   }
  // };
  const _listSong = async () => {
    if (Fein) {
      try {
        const currentBlock = await Fein.mintNFT(totalSupply,totalFractionalAmount,percentageShare);
        console.log(currentBlock);
      } catch (error) {
        console.error('Error listing song:', error);
      }
    }
  }

  const _getSong = async () => {
    if (Fein) {
      try {
        const song = await Fein.tokenData(songId);
        setFractionPrice(song.pricePerToken);
        console.log(song.tokenSupply.toString());
        
        console.log(song);
      } catch (error) {
        console.error('Error listing song:', error);
      }
    }
  }
  const _buyFraction = async () => {
    if (Fein) {
      try {
        // Convert fraction price to Wei
      
        const tx = await Fein.buyStake(tokenId,{value:ethers.utils.parseEther(fractionPrice.toString())});
        await tx.wait();
        console.log("Fraction purchased successfully");
      } catch (error: any) {
        console.error('Error buying fraction:', error);
        if (error.data && error.data.message) {
          console.error('Detailed error message:', error.data.message);
        }
      }
    }
  };

  const _particepents = async () => {
    if(Fein){
      try {

        const particepents: string[] = await Fein.getparticipants(tokenId);
        console.log(particepents);
        
      } catch (error) {
        console.error('Error ', error);
        
      }
    }
  }


  
 
  return (
    <div >testing
      {/* <button onClick={_getCurrentBlockTimestamp}>Get Current Block Timestamp</button> */}
      <button onClick={_listSong}>List Song</button>
      <button onClick={_getSong}>Get Song</button>
      <button onClick={_buyFraction}>Buy Fraction</button>
      <button onClick={_particepents}>particepents</button>
      <div className='text-black'>
        {/* <input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="artistName" onChange={(e) => setArtistName(e.target.value)} />
        <input type="number" placeholder="releaseTime" onChange={(e) => setReleaseTime(BigInt(e.target.value))} />
        <input type="number" placeholder="fractionPrice" onChange={(e) => setFractionPrice(BigInt(e.target.value))} />
        <input type="number" placeholder="totalFractions" onChange={(e) => setTotalFractions(BigInt(e.target.value))} />
        <input type="number" placeholder="songId" onChange={(e) => setSongId(BigInt(e.target.value))} />
        <input type="string" placeholder="amount" onChange={(e) => setAmount(BigInt(e.target.value))} /> */}
        <input type="number" placeholder="totalSupply" onChange={(e) => setTotalSupply(BigInt(e.target.value))} />
        <input type="number" placeholder="totalFractionalAmount" onChange={(e) => setTotalFractionalAmount(BigInt(e.target.value))} />
        <input type="number" placeholder="percentageShare" onChange={(e) => setPercentageShare(BigInt(e.target.value))} />


      </div>
      <h1 className='text-lg text-white'>{fractionPrice.toString()}</h1>
      {/* <h1 className='text-lg text-white'>{amount.toString()}</h1> */}
      {/* <h1 className='text-lg text-white'>{(fractionPrice * amount).toString()}</h1> */}

      
    </div>
  )
}

export default Testing