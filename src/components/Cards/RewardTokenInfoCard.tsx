import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { Address } from 'viem';

import Button from '@/components/Buttons';
import EditRewardTokenModal from '../Modals/EditRewardTokenModal';
import getERC1155Data from '@/lib/getERC1155Data';
import getTokenData from '@/lib/getTokenData';
import DefaultERC20Image from '@/assets/images/erc20.png';
import { IRewardTokenInfo } from '@/types';
import {
  isEditRewardTokenModalOpenAtom,
  rewardTokenInfoAtom,
  selectedRewardInfoAtom,
} from '@/jotai/atoms';

function RewardTokenInfoCard({
  tokenAddress,
  tokenId,
  ratio,
  isERC1155,
}: IRewardTokenInfo) {
  const [, setRewardTokenInfo] = useAtom(rewardTokenInfoAtom);
  const [, setIsEditRewardTokenModalOpen] = useAtom(
    isEditRewardTokenModalOpenAtom
  );
  const [, setSelectedRewardInfo] = useAtom(selectedRewardInfoAtom);

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

  const handleEdit = () => {
    setIsEditRewardTokenModalOpen(true);
    setSelectedRewardInfo({
      imageUri: imageUri,
      tokenName: name,
      tokenAddress: tokenAddress,
      tokenId: tokenId,
      ratio: ratio,
      isERC1155: isERC1155,
    });
  };

  const handleRemove = () => {
    if (isERC1155) {
      setRewardTokenInfo((prevRewardTokenInfo) => {
        return prevRewardTokenInfo.filter(
          (reward) =>
            reward.tokenAddress !== tokenAddress && reward.tokenId !== tokenId
        );
      });
    } else {
      setRewardTokenInfo((prevRewardTokenInfo) => {
        return prevRewardTokenInfo.filter(
          (reward) => reward.tokenAddress !== tokenAddress
        );
      });
    }
  };

  return (
    <div className="col-span-12 flex items-center bg-[#47556e] text-white rounded-[20px] px-4 py-8 text-xl md:px-8 xs:col-span-6 dark:bg-[#053F40]">
      <div className="flex flex-col justify-between items-center w-full h-full gap-4 2xl:gap-10 xl:flex-row">
        <div className="flex flex-col items-center gap-1">
          <Image
            className="min-w-[205px] aspect-square border border-[#040E20] rounded-full"
            width={205}
            height={205}
            src={imageUri}
            alt="reward"
            unoptimized
            onError={() => {
              setImageUri(DefaultERC20Image.src);
            }}
          />
          {isERC1155 ? <p>ERC1155</p> : <p>ERC20</p>}
        </div>
        <div
          className={`flex flex-col justify-between text-base w-full ${
            isERC1155 ? 'gap-4 xl:gap-6' : 'gap-6 xl:gap-8'
          } md:text-lg`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-center min-w-[120px] tracking-[-1px]">
              Token Address
            </div>
            <div className="flex justify-center items-center text-center text-sm w-full break-all px-4">
              {tokenAddress}
            </div>
          </div>
          <div className="flex flex-row gap-1">
            <div className="flex flex-row justify-between min-w-[120px]">
              <div className="tracking-[-1px]">Token Name</div>
              <div>:</div>
            </div>
            <div className="flex justify-center items-center text-center w-full truncate font-semibold">
              {name}
            </div>
          </div>
          {isERC1155 && (
            <div className="flex flex-row gap-1">
              <div className="flex flex-row justify-between min-w-[120px]">
                <div className="tracking-[-1px]">Token Id</div>
                <div>:</div>
              </div>
              <div className="flex justify-center items-center text-center w-full font-semibold">
                {tokenId}
              </div>
            </div>
          )}
          <div className="flex flex-row gap-1">
            <div className="flex flex-row justify-between min-w-[120px]">
              <div className="tracking-[-1px]">Ratio</div>
              <div>:</div>
            </div>
            <div className="flex justify-center items-center text-center w-full font-semibold">
              {ratio}
            </div>
          </div>
          <div className="flex flex-row justify-center gap-4 sm:justify-end">
            <Button
              className="!w-[88px] !h-[34px] !text-[18px]"
              text="Edit"
              onClick={handleEdit}
            />
            <Button
              className="!w-[88px] !text-white !border-white !h-[34px] !text-[18px] !bg-[#2F3A42]"
              text="Remove"
              variant="outline"
              onClick={handleRemove}
            />
          </div>
        </div>
      </div>
      <EditRewardTokenModal />
    </div>
  );
}

export default RewardTokenInfoCard;
