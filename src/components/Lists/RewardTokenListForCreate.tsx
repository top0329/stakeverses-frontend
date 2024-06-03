import React from 'react';
import Image from 'next/image';
import Web3 from 'web3';
import { useAtom } from 'jotai';

import IronImage from '@/assets/images/iron.svg';
import Button from '@/components/Buttons';
import useWeb3 from '@/hooks/useWeb3';
import useSpinner from '@/hooks/useSpinner';
import ERC20Abi from '@/abi/ERC20ABI.json';
import { rewardTokenInfoAtom } from '@/jotai/atoms';
import { truncateAddress } from '@/lib/utils';
import { IRewardTokenListForCreate } from '@/types';

function RewardTokenListForCreate({
  tokenAddress,
  tokenId,
  amount,
  isERC1155,
  isApproved
}: IRewardTokenListForCreate) {
  const { openSpin, closeSpin } = useSpinner();
  const { erc20Approve, erc1155Approve, isConnected, library } = useWeb3();

  const [rewardTokenInfo, setRewardTokenInfo] = useAtom(rewardTokenInfoAtom);

  const handleApprove = async () => {
    const web3 = new Web3(window.ethereum);
    try {
      if (isConnected && library) {
        openSpin('Approving');
        let receipt = null;
        while (receipt === null || receipt.status === undefined) {
          let res: any;
          if (isERC1155) {
            res = erc1155Approve(
              tokenAddress!,
              process.env.NEXT_PUBLIC_PRODUCTSTAKINGINSTANCEADDRESS!,
              true
            );
          } else {
            const contract = new web3.eth.Contract(ERC20Abi, tokenAddress);
            const decimals = await contract.methods.decimals().call();
            res = erc20Approve(
              tokenAddress!,
              process.env.NEXT_PUBLIC_PRODUCTSTAKINGINSTANCEADDRESS!,
              (amount * 10 ** Number(decimals)).toString()
            );
          }
          receipt = await web3.eth.getTransactionReceipt(
            (
              await res
            ).transactionHash
          );
        }
        if (receipt && receipt.status !== undefined) {
          if (receipt.status) {
            setRewardTokenInfo(
              rewardTokenInfo.map((token) => {
                if (
                  token.tokenId === tokenId &&
                  token.tokenAddress === tokenAddress
                ) {
                  return { ...token, isApproved: true };
                }
                return token;
              })
            );
          } else {
            setRewardTokenInfo(
              rewardTokenInfo.map((token) => {
                if (
                  token.tokenId === tokenId &&
                  token.tokenAddress === tokenAddress
                ) {
                  return { ...token, isApproved: false };
                }
                return token;
              })
            );
          }
        } else {
          alert('Transaction is still pending');
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
        }
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      closeSpin();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-2 px-8 bg-[#141D2D]/70 rounded-[20px]">
      <div className="flex flex-row gap-7 w-full">
        <div className="flex flex-col">
          <Image
            className="min-w-[90px] aspect-square rounded-full"
            src={IronImage}
            alt="bread"
          />
          <p className="text-[22px]">ERC20</p>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col gap-2">
            <p className="text-[22px] truncate">Token Name</p>
            <p className="text-[28px] font-semibold">Iron</p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[22px] truncate">Token Address</p>
            <p className="text-[24px] font-semibold">
              {tokenAddress ? truncateAddress(tokenAddress) : ''}
            </p>
          </div>
          {isERC1155 && (
            <div className="flex flex-col gap-3">
              <p className="text-[22px] truncate">Token Id</p>
              <p className="text-[24px] font-semibold">{tokenId}</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <p className="text-[22px]">Amount</p>
            <p className="text-[28px] font-semibold">{amount}</p>
          </div>
        </div>
      </div>
      <Button
        className={`!w-[160px] !h-10 mb-4 ${isApproved && 'opacity-50'}`}
        text="Approve"
        onClick={handleApprove}
        disabled={isApproved}
      />
    </div>
  );
}

export default RewardTokenListForCreate;
