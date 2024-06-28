import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { Address } from 'viem';

import Button from '@/components/Buttons';
import useWeb3 from '@/hooks/useWeb3';
import useSpinner from '@/hooks/useSpinner';
import ERC20Abi from '@/abi/ERC20ABI.json';
import getTokenData from '@/lib/getTokenData';
import getERC1155Data from '@/lib/getERC1155Data';
import DefaultERC20Image from '@/assets/images/erc20.png';
import { rewardTokenInfoAtom } from '@/jotai/atoms';
import { IRewardTokenListForCreate } from '@/types';

function RewardTokenListForCreate({
  tokenAddress,
  tokenId,
  amount,
  isERC1155,
  isApproved,
}: IRewardTokenListForCreate) {
  const { openSpin, closeSpin } = useSpinner();
  const { erc20Approve, erc1155Approve, isConnected, library, web3 } = useWeb3();

  const [rewardTokenInfo, setRewardTokenInfo] = useAtom(rewardTokenInfoAtom);

  const [imageUri, setImageUri] = useState<string>(DefaultERC20Image.src);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        if (isERC1155) {
          const erc1155Data = await getERC1155Data(
            (tokenAddress || '') as Address,
            Number(tokenId)
          );
          if (erc1155Data) {
            const { name, uri } = erc1155Data;
            setImageUri(uri);
            setName(name);
          }
        } else {
          const erc20Data = await getTokenData(tokenAddress as Address);
          if (erc20Data) {
            const { tokenName } = erc20Data;
            setImageUri(
              `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`
            );
            setName(tokenName);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [isERC1155, tokenId, tokenAddress]);

  const handleApprove = async () => {
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
    <div className="flex flex-col py-2 px-4 bg-[#4e5a6e] rounded-[20px] text-lg gap-2 2xl:text-xl dark:bg-[#141D2D]/70">
      <div className="flex flex-row gap-4 lg:gap-2 md:gap-10 sm:gap-2">
        <div className="flex flex-col justify-center items-center gap-0">
          <Image
            className="aspect-square min-w-[90px] rounded-full"
            width={90}
            height={90}
            src={imageUri}
            alt="reward"
            unoptimized
            onError={() => {
              setImageUri(DefaultERC20Image.src);
            }}
          />
          <p>{isERC1155 ? 'ERC1155' : 'ERC20'}</p>
        </div>
        <div className="flex flex-row justify-between items-center w-full gap-1">
          <div className="flex flex-col gap-2">
            <p className="truncate tracking-[-1px]">Token Name</p>
            <p className="font-semibold">{name}</p>
          </div>
          <div className="hidden flex-col gap-1 2xl:flex lg:hidden sm:flex">
            <p className="truncate tracking-[-1px]">Token Address</p>
            <p className="text-sm w-48 break-all">{tokenAddress || ''}</p>
          </div>
          {isERC1155 && (
            <div className="hidden flex-col gap-2 2xl:flex lg:hidden sm:flex">
              <p className="truncate tracking-[-1px]">Token Id</p>
              <p className="font-semibold">{tokenId}</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <p className="tracking-[-1px]">Amount</p>
            <p className="font-semibold">{amount}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full 2xl:hidden lg:flex sm:hidden">
        <div
          className={`flex ${
            isERC1155 ? 'flex-col' : 'flex-row'
          } justify-between items-center gap-2`}
        >
          <p className="truncate min-w-20 tracking-[-1px]">Address: </p>
          {/* <p className="flex flex-col justify-start items-start text-sm w-auto">
            <span>{tokenAddress?.slice(0, 21)}</span>
            <span>{tokenAddress?.slice(21)}</span>
          </p> */}
          <p className="flex flex-col justify-start items-start text-sm break-all w-auto">
            {tokenAddress}
          </p>
        </div>
        {isERC1155 && (
          <div className="flex flex-col gap-3">
            <p className="truncate tracking-[-1px]">Token Id</p>
            <p className="font-semibold">{tokenId}</p>
          </div>
        )}
      </div>
      <div className="flex justify-end w-full">
        <Button
          className={`!w-[160px] !h-10 mb-4 ${isApproved && 'opacity-50'}`}
          text="Approve"
          onClick={handleApprove}
          disabled={isApproved}
        />
      </div>
    </div>
  );
}

export default RewardTokenListForCreate;
