import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useAtom } from 'jotai';
import { Address } from 'viem';

import useWeb3 from '@/hooks/useWeb3';
import Button from '@/components/Buttons';
import useSpinner from '@/hooks/useSpinner';
import getERC1155Data from '@/lib/getERC1155Data';
import getTokenData from '@/lib/getTokenData';
import DefaultERC20Image from '@/assets/images/erc20.png';
import ERC20Abi from '@/abi/ERC20ABI.json';
import { myCreatedInstanceDataListAtom } from '@/jotai/atoms';
import { IRewardTokenListForCreate } from '@/types';
import { useParams } from 'next/navigation';

function RewardTokenListForChargeReward({
  tokenAddress,
  tokenId,
  amount,
  isERC1155,
  isApproved,
  instanceAddress,
}: IRewardTokenListForCreate) {
  const { id } = useParams();
  const { openSpin, closeSpin } = useSpinner();
  const {
    erc20Approve,
    erc1155Approve,
    isConnected,
    library,
    currentTokenDataUrl,
    web3,
  } = useWeb3();

  const [, setMyCreatedInstanceDataList] = useAtom(
    myCreatedInstanceDataListAtom
  );

  const [imageUri, setImageUri] = useState<string>(DefaultERC20Image.src);
  const [name, setName] = useState<string>('');

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
        } else {
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
    fetchData();
  }, [isERC1155, tokenId, tokenAddress, library, currentTokenDataUrl]);

  const handleApprove = async () => {
    try {
      if (isConnected && library) {
        openSpin('Approving');
        let receipt: { status?: boolean } = {};
        while (receipt.status === undefined) {
          let res: any;
          if (isERC1155) {
            res = await erc1155Approve(tokenAddress!, instanceAddress!, true);
          } else {
            const contract = new web3.eth.Contract(ERC20Abi, tokenAddress);
            const decimals = await contract.methods.decimals().call();
            res = await erc20Approve(
              tokenAddress!,
              instanceAddress!,
              (amount * 10 ** Number(decimals)).toString()
            );
          }
          if (res.approved) {
            receipt.status = true;
          } else {
            receipt = await web3.eth.getTransactionReceipt(
              (
                await res
              ).transactionHash
            );
          }
        }
        if (receipt.status !== undefined) {
          if (receipt.status) {
            setMyCreatedInstanceDataList((prevList) =>
              prevList.map((instance) => {
                if (Number(instance.instanceId) === Number(id)) {
                  return {
                    ...instance,
                    rewardTokenInfo: instance.rewardTokenInfo.map((token) => {
                      if (
                        Number(token.tokenId) === tokenId &&
                        token.tokenAddress === tokenAddress
                      ) {
                        return { ...token, isApproved: true };
                      }
                      return token;
                    }),
                  };
                }
                return instance;
              })
            );
          } else {
            setMyCreatedInstanceDataList((prevList) =>
              prevList.map((instance) => {
                if (Number(instance.instanceId) === Number(id)) {
                  return {
                    ...instance,
                    rewardTokenInfo: instance.rewardTokenInfo.map((token) => {
                      if (
                        Number(token.tokenId) === tokenId &&
                        token.tokenAddress === tokenAddress
                      ) {
                        return { ...token, isApproved: false };
                      }
                      return token;
                    }),
                  };
                }
                return instance;
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
    <div className="flex flex-col text-lg bg-[#47556e] rounded-[20px] px-4 py-5 gap-4 lg:px-14 md:text-xl sm:px-8 dark:bg-[#053F40]">
      <div className="flex flex-row justify-start items-center gap-4 sm:justify-between">
        <div className="flex flex-col justify-center items-center gap-1 lg:flex-row lg:gap-4">
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
          <div className="font-semibold">{isERC1155 ? 'ERC1155' : 'ERC20'}</div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center gap-4 sm:justify-between sm:gap-4 lg:gap-6 2xl:gap-20">
            <div className="flex flex-col text-center">
              <div className="truncate tracking-[-1px]">
                <span className="hidden md:block">Token Name</span>
                <span className="block md:hidden">Name</span>
              </div>
              <div className="font-semibold">{name}</div>
            </div>
            <div className="hidden flex-col text-center gap-2 sm:flex">
              <div className="truncate tracking-[-1px]">
                <span className="hidden md:block">Token Address</span>
                <span className="block md:hidden">Address</span>
              </div>
              <div className="text-sm break-all">{tokenAddress}</div>
            </div>
            {isERC1155 && (
              <div className="flex flex-col text-center gap-2">
                <div className="truncate tracking-[-1px]">
                  <span className="hidden md:block">Token Id</span>
                  <span className="block md:hidden">Id</span>
                </div>
                <div className="font-semibold">{tokenId}</div>
              </div>
            )}
            <div className="flex flex-col text-center gap-2">
              <div className="truncate tracking-[-1px]">
                <span className="hidden md:block">Token Amount</span>
                <span className="block md:hidden">Amount</span>
              </div>
              <div className="font-semibold">{amount}</div>
            </div>
          </div>
          <div className="flex flex-row justify-between sm:hidden">
            <div className="flex flex-col text-center gap-2">
              <div className="truncate tracking-[-1px]">Address</div>
              <div className="text-sm break-all">{tokenAddress}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end w-full'>
        <Button
          className={`!w-[160px] !h-10 ${isApproved && 'opacity-50'}`}
          text="Approve"
          onClick={handleApprove}
          disabled={isApproved}
        />
      </div>
    </div>
  );
}

export default RewardTokenListForChargeReward;
