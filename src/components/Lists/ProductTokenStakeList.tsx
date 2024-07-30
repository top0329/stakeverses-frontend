import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { ethers } from 'ethers';
import { useAtom } from 'jotai';
import { Address } from 'viem';

import Button from '@/components/Buttons';
import useWeb3 from '@/hooks/useWeb3';
import useSpinner from '@/hooks/useSpinner';
import DefaultERC20Image from '@/assets/images/erc20.png';
import DefaultERC1155Image from '@/assets/images/erc1155.png';
import getTokenData from '@/lib/getTokenData';
import getERC1155Data from '@/lib/getERC1155Data';
import ERC20Abi from '@/abi/ERC20ABI.json';
import ERC1155Abi from '@/abi/ERC1155ABI.json';
import {
  baseAmountAtom,
  currentPoolDataAtom,
  isProductApproveAvailableAtom,
  productTokenInfoAtom,
} from '@/jotai/atoms';

function ProductTokenStakeList({
  tokenId,
  tokenAddress,
  isERC1155,
  amount,
  consumable,
  isApproved,
}: {
  tokenId: number;
  tokenAddress: string;
  isERC1155: boolean;
  amount: number;
  consumable: boolean;
  isApproved?: boolean;
}) {
  const {
    erc20Approve,
    erc1155Approve,
    isConnected,
    account,
    library,
    currentTokenDataUrl,
    web3,
  } = useWeb3();
  const { openSpin, closeSpin } = useSpinner();

  const [productTokenInfo, setProductTokenInfo] = useAtom(productTokenInfoAtom);
  const [, setIsProductApproveAvailable] = useAtom<boolean>(
    isProductApproveAvailableAtom
  );
  const [baseAmount] = useAtom<number>(baseAmountAtom);
  const [currentPoolData] = useAtom(currentPoolDataAtom);

  const [imageUri, setImageUri] = useState<string>(DefaultERC1155Image.src);
  const [name, setName] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        if (isERC1155) {
          const erc1155Data = await getERC1155Data(
            (tokenAddress || '') as Address,
            Number(tokenId),
            library
          );
          if (erc1155Data) {
            const { name, uri } = erc1155Data;
            setImageUri(uri);
            setName(name);
          }
          const erc1155Contract = new ethers.Contract(
            tokenAddress as Address,
            ERC1155Abi,
            library
          );
          const _balance = await erc1155Contract.balanceOf(
            account,
            Number(tokenId)
          );
          setBalance(Number(_balance));
        } else {
          const erc20Contract = new ethers.Contract(
            tokenAddress as Address,
            ERC20Abi,
            library
          );
          const _balance = await erc20Contract.balanceOf(account);
          const _ethBalance = ethers.formatEther(_balance);
          setBalance(Number(_ethBalance));
          const erc20Data = await getTokenData(
            tokenAddress as Address,
            library
          );
          if (erc20Data) {
            const { tokenName } = erc20Data;
            if (!currentTokenDataUrl) {
              setImageUri(DefaultERC20Image.src);
              setName(tokenName);
              return;
            }
            const response = await axios.get(
              `${currentTokenDataUrl}/${tokenAddress}`
            );
            let logo: string;
            if (response.data.image.large) {
              logo = response.data.image.large;
            } else {
              logo = DefaultERC20Image.src;
            }
            setImageUri(logo);
            setName(tokenName);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (tokenAddress) {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    account,
    currentTokenDataUrl,
    isApproved,
    isERC1155,
    library,
    tokenAddress,
    tokenId,
  ]);

  useEffect(() => {
    if (baseAmount > balance) {
      setIsProductApproveAvailable(false);
    } else {
      setIsProductApproveAvailable(true);
    }
  }, [balance, baseAmount, setIsProductApproveAvailable]);

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
              currentPoolData.instanceAddress,
              true
            );
          } else {
            const contract = new web3.eth.Contract(ERC20Abi, tokenAddress);
            const decimals = await contract.methods.decimals().call();
            res = erc20Approve(
              tokenAddress!,
              currentPoolData.instanceAddress,
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
            setProductTokenInfo(
              productTokenInfo.map((token) => {
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
            setProductTokenInfo(
              productTokenInfo.map((token) => {
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
    <div className="relative flex flex-col text-white text-lg px-4 py-6 bg-[#47556e] rounded-[20px] gap-2 2xl:text-xl dark:bg-[#141D2D]/70">
      <div className="flex flex-row justify-between w-full gap-2 xl:gap-6 lg:gap-2 md:gap-6 sm:gap-2 xs:gap-10">
        <Image
          className="aspect-square min-w-[90px] rounded-full"
          width={90}
          height={90}
          src={imageUri}
          alt="product"
          unoptimized
          onError={() => {
            setImageUri(DefaultERC1155Image.src);
          }}
        />
        <div className="flex flex-row justify-between items-center w-full gap-1">
          <div className="flex flex-col gap-2">
            <p className="truncate tracking-[-1px]">Token Name</p>
            <p className="font-semibold">{name}</p>
          </div>
          {isERC1155 && (
            <div className="flex flex-col gap-2">
              <p className="truncate tracking-[-1px]">Token Id</p>
              <p className="font-semibold">{tokenId}</p>
            </div>
          )}
          <div className="flex-col hidden gap-2 xs:flex">
            <p className="tracking-[-1px]">Balance</p>
            <p className="font-semibold">{balance}</p>
          </div>
          <div className="flex-col hidden gap-2 xs:flex">
            <p className="tracking-[-1px]">Amount</p>
            <p className="font-semibold">{amount}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between xs:hidden">
        <div className="flex-col flex gap-2">
          <p className="tracking-[-1px]">Balance</p>
          <p className="font-semibold">{balance}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="tracking-[-1px]">Amount</p>
          <p className="font-semibold">{amount}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-6">
        <p className="text-sm break-all">Token Address: {tokenAddress}</p>
        <Button
          className={`!min-w-[100px] !h-10 ${isApproved && 'opacity-50'}`}
          text="Approve"
          onClick={handleApprove}
          disabled={isApproved}
        />
      </div>
      {consumable && (
        <div className="absolute right-3 bg-[#141D2D] border border-[#2F3A42] rounded-full text-[#00B6E4] text-sm font-medium px-2 py-0.5 top-2">
          Consumable
        </div>
      )}
    </div>
  );
}

export default ProductTokenStakeList;
