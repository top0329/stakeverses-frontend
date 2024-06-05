import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';

import Button from '../Buttons';
import useToast from '@/hooks/useToast';
import PickAxeImage from '@/assets/images/pickaxe.svg';
import {
  isEditRewardTokenModalOpenAtom,
  rewardTokenInfoAtom,
} from '@/jotai/atoms';
import { IRewardTokenInfo } from '@/types';

function EditRewardTokenModal() {
  const { showToast } = useToast();

  const [isEditRewardTokenModalOpen, setIsEditRewardTokenModalOpen] = useAtom(
    isEditRewardTokenModalOpenAtom
  );
  const [rewardTokenInfo, setRewardTokenInfo] = useAtom(rewardTokenInfoAtom);

  const [editRewardTokenInfo, setEditRewardTokenInfo] =
    useState<IRewardTokenInfo>({
      tokenName: '',
      imageUri: '',
      tokenAddress: '',
      tokenId: 0,
      ratio: 0,
      isERC1155: false,
    });
  const [error, setError] = useState({
    tokenAddress: '',
    tokenId: '',
    ratio: '',
  });

  useEffect(() => {
    if (editRewardTokenInfo.isERC1155 === true) {
      if (
        editRewardTokenInfo.ratio === undefined ||
        Number.isNaN(editRewardTokenInfo.ratio)
      ) {
        setError({
          ...error,
          ratio: 'Enter the ratio!',
        });
      } else {
        setError({
          ...error,
          ratio: '',
        });
      }
    }
    if (editRewardTokenInfo.isERC1155 === false) {
      if (
        editRewardTokenInfo.ratio === undefined ||
        Number.isNaN(editRewardTokenInfo.ratio)
      ) {
        setError({
          ...error,
          ratio: 'Enter the ratio!',
        });
      } else {
        setError({
          ...error,
          tokenAddress: '',
          ratio: '',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRewardTokenInfo.ratio]);

  useEffect(() => {
    if (editRewardTokenInfo.isERC1155 === true) {
      if (
        rewardTokenInfo
          .filter((item) => item.isERC1155 === true)
          .some(
            (item) =>
              item.tokenAddress === editRewardTokenInfo.tokenAddress &&
              item.tokenId === editRewardTokenInfo.tokenId
          )
      ) {
        setError({
          ...error,
          tokenId: 'This token has already been added!',
        });
      } else if (
        editRewardTokenInfo.tokenId === undefined ||
        Number.isNaN(editRewardTokenInfo.tokenId)
      ) {
        setEditRewardTokenInfo({
          ...editRewardTokenInfo,
          tokenName: '',
          imageUri: '',
        });
        setError({
          ...error,
          tokenId: 'Enter the token id!',
        });
      } else {
        setError({
          ...error,
          tokenAddress: '',
          tokenId: '',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRewardTokenInfo.tokenId]);

  useEffect(() => {
    if (editRewardTokenInfo.isERC1155 === true) {
      if (
        rewardTokenInfo
          .filter((item) => item.isERC1155 === true)
          .some(
            (item) =>
              item.tokenAddress === editRewardTokenInfo.tokenAddress &&
              item.tokenId === editRewardTokenInfo.tokenId
          )
      ) {
        setError({
          ...error,
          tokenId: 'This token has already been added!',
        });
      } else if (
        editRewardTokenInfo.tokenAddress === undefined ||
        editRewardTokenInfo.tokenAddress === ''
      ) {
        setError({
          ...error,
          tokenAddress: 'Enter the token address!',
        });
        setEditRewardTokenInfo({
          ...editRewardTokenInfo,
          tokenName: '',
          imageUri: '',
        });
      } else {
        setError({
          ...error,
          tokenAddress: '',
          tokenId: '',
        });
      }
    }
    if (editRewardTokenInfo.isERC1155 === false) {
      if (
        rewardTokenInfo.some(
          (item) => item.tokenAddress === editRewardTokenInfo.tokenAddress
        )
      ) {
        setError({
          ...error,
          tokenAddress: 'This token has already been added!',
        });
      } else if (
        editRewardTokenInfo.tokenAddress === undefined ||
        editRewardTokenInfo.tokenAddress === ''
      ) {
        setError({
          ...error,
          tokenAddress: 'Enter the token address!',
        });
        setEditRewardTokenInfo({
          ...editRewardTokenInfo,
          tokenName: '',
          imageUri: '',
        });
      } else {
        setError({
          ...error,
          tokenAddress: '',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRewardTokenInfo.tokenAddress]);

  const modal = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === 'ratio' || name === 'tokenId') {
      setEditRewardTokenInfo((prevState) => ({
        ...prevState!,
        [name]: parseInt(value),
      }));
    } else {
      setEditRewardTokenInfo((prevState) => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };

  const handleRadioClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.id;
    if (value === 'erc20') {
      setEditRewardTokenInfo((prev) => {
        return { ...prev, isERC1155: false };
      });
      setError({ tokenAddress: '', tokenId: '', ratio: '' });
    } else if (value === 'erc1155') {
      setEditRewardTokenInfo((prev) => {
        return { ...prev, isERC1155: true };
      });
      setError({ tokenAddress: '', tokenId: '', ratio: '' });
    }
  };

  const handleAddProductTokenClicked = () => {
    if (
      (editRewardTokenInfo.isERC1155 === false &&
        editRewardTokenInfo.tokenAddress &&
        editRewardTokenInfo.ratio &&
        !rewardTokenInfo.some(
          (item) => item.tokenAddress === editRewardTokenInfo.tokenAddress
        )) ||
      (editRewardTokenInfo.isERC1155 === true &&
        editRewardTokenInfo.tokenAddress &&
        editRewardTokenInfo.tokenId &&
        editRewardTokenInfo.ratio &&
        !rewardTokenInfo.some(
          (item) =>
            item.tokenAddress === editRewardTokenInfo.tokenAddress &&
            item.tokenId === editRewardTokenInfo.tokenId
        ))
    ) {
      setRewardTokenInfo((prev) => [
        ...prev,
        { ...editRewardTokenInfo, isERC1155: editRewardTokenInfo.isERC1155 },
      ]);
      setEditRewardTokenInfo({
        tokenName: '',
        imageUri: '',
        tokenAddress: '',
        tokenId: 0,
        ratio: 0,
        isERC1155: false,
      });
      setError({
        tokenAddress: '',
        tokenId: '',
        ratio: '',
      });
      setIsEditRewardTokenModalOpen(false);
    } else {
      showToast('warning', 'Fill in all the information!');
    }
  };

  const handleCancelButtonClicked = () => {
    setIsEditRewardTokenModalOpen(false);
    setEditRewardTokenInfo({
      tokenName: '',
      imageUri: '',
      tokenAddress: '',
      tokenId: 0,
      ratio: 0,
      isERC1155: false,
    });
    setError({
      tokenAddress: '',
      tokenId: '',
      ratio: '',
    });
  };

  return (
    <div
      className={`fixed right-0 bottom-0 top-0 left-0 z-30 flex h-full min-h-screen w-full items-center justify-center px-4 py-5 ${
        isEditRewardTokenModalOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        className="z-20 fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center bg-opacity-80 bg-[#1D2127]"
        onClick={handleCancelButtonClicked}
      ></div>
      <div
        ref={modal}
        className="z-30 w-[826px] bg-gradient-to-r from-[#010e0c] to-[#05596d] text-white text-center rounded-[20px] border-2 border-white pb-8"
      >
        <h2 className="text-[38px] font-bold mt-7 mb-6">Add Reward Token</h2>
        <hr className="opacity-30 border" />
        <div className="grid grid-cols-12 mx-[47px] mt-12 mb-11 gap-10 text-[22px] font-semibold">
          <Image
            className="col-span-4 w-[243px] aspect-square border border-[#040E20] rounded-full"
            src={PickAxeImage}
            alt="pickaxe"
          />
          <div className="col-span-8 flex flex-col justify-between gap-3">
            <div className="flex flex-row justify-center items-center gap-16">
              <div className="flex flex-row items-center gap-4">
                <input
                  id="erc20"
                  className="w-5 h-5"
                  type="radio"
                  checked={!editRewardTokenInfo.isERC1155}
                  onChange={handleRadioClick}
                />
                <label className="text-[23px]">ERC20</label>
              </div>
              <div className="flex flex-row items-center gap-4">
                <input
                  id="erc1155"
                  className="w-5 h-5"
                  type="radio"
                  checked={editRewardTokenInfo.isERC1155}
                  onChange={handleRadioClick}
                />
                <label className="text-[23px]">ERC1155</label>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <label className="truncate">Token Name</label>
              <input
                id="token-name"
                className="h-[50px] w-[260px] bg-[#A3A3A3]/50 border border-[#2F3A42] rounded-[15px] px-4 py-2"
                disabled
              />
            </div>
            <div className="flex flex-row justify-between items-center">
              <label>Token Address</label>
              <div>
                <input
                  id="token-address"
                  className="h-[50px] w-[260px] bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2"
                  name="tokenAddress"
                  onChange={handleInputChange}
                  value={editRewardTokenInfo.tokenAddress}
                />
                {error.tokenAddress && (
                  <div className="text-red-600 text-xs text-left pl-2 pt-1">
                    {error.tokenAddress}
                  </div>
                )}
              </div>
            </div>
            {editRewardTokenInfo.isERC1155 && (
              <div className="flex flex-row justify-between items-center">
                <label>Token Id</label>
                <div>
                  <input
                    id="token-id"
                    className="h-[50px] w-[260px] bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2"
                    name="tokenId"
                    onChange={handleInputChange}
                    value={editRewardTokenInfo.tokenId || ''}
                  />
                  {error.tokenId && (
                    <div className="text-red-600 text-xs text-left pl-2 pt-1">
                      {error.tokenId}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-row justify-between items-center">
              <label>Ratio</label>
              <div>
                <input
                  id="product-token-ratio"
                  className="h-[50px] w-[260px] bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2"
                  name="ratio"
                  step={1}
                  min={1}
                  onChange={handleInputChange}
                  value={editRewardTokenInfo.ratio || ''}
                />
                {error.ratio && (
                  <div className="text-red-600 text-xs text-left pl-2 pt-1">
                    {error.ratio}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-12">
          <Button
            className="!w-[200px]"
            text="Add"
            onClick={handleAddProductTokenClicked}
          />
          <Button
            className="bg-[#192F3A] !w-[200px]"
            text="Cancel"
            variant="outline"
            onClick={handleCancelButtonClicked}
          />
        </div>
      </div>
    </div>
  );
}

export default EditRewardTokenModal;
