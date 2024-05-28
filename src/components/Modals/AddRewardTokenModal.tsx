import { useRef, useState } from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';

import {
  isAddRewardTokenModalOpenAtom,
  rewardTokenInfoAtom,
} from '@/jotai/atoms';
import PickAxeImage from '@/assets/images/pickaxe.svg';
import Button from '../Buttons';
import { RewardTokenInfo } from '@/types';

function AddRewardTokenModal() {
  const [isAddRewardTokenModalOpen, setIsAddRewardTokenModalOpen] = useAtom(
    isAddRewardTokenModalOpenAtom
  );
  const [, setRewardTokenInfo] = useAtom(rewardTokenInfoAtom);

  const [addRewardTokenInfo, setAddRewardTokenInfo] = useState<RewardTokenInfo>(
    {
      tokenAddress: '',
      tokenId: '',
      ratio: '',
      isERC1155: false,
    }
  );
  const [isERC1155, setIsERC1155] = useState(false);

  const modal = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setAddRewardTokenInfo((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    console.log(value);
    setAddRewardTokenInfo((prevState) => ({
      ...prevState!,
      consumable: value === 'on',
    }));
  };

  const handleAddProductTokenClicked = () => {
    setRewardTokenInfo((prev) => [
      ...prev,
      { ...addRewardTokenInfo, isERC1155 },
    ]);
    setAddRewardTokenInfo({
      tokenAddress: '',
      tokenId: '',
      ratio: '',
      isERC1155: false,
    });
    setIsAddRewardTokenModalOpen(false);
  };

  const handleCancelButtonClicked = () => {
    setIsAddRewardTokenModalOpen(false);
  };

  const handleRadioClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.id;
    if (value === 'erc20') {
      setIsERC1155(false);
    } else if (value === 'erc1155') {
      setIsERC1155(true);
    }
  };

  return (
    <div
      className={`fixed right-0 bottom-0 top-0 left-0 z-30 flex h-full min-h-screen w-full items-center justify-center px-4 py-5 ${
        isAddRewardTokenModalOpen ? 'block' : 'hidden'
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
                  checked={!isERC1155}
                  onChange={handleRadioClick}
                />
                <label className="text-[23px]">ERC20</label>
              </div>
              <div className="flex flex-row items-center gap-4">
                <input
                  id="erc1155"
                  className="w-5 h-5"
                  type="radio"
                  checked={isERC1155}
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
              <input
                id="token-address"
                className="h-[50px] w-[260px] bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2"
                name="tokenAddress"
                onChange={handleInputChange}
                value={addRewardTokenInfo.tokenAddress}
              />
            </div>
            {isERC1155 && (
              <div className="flex flex-row justify-between items-center">
                <label>Token Id</label>
                <input
                  id="token-id"
                  className="h-[50px] w-[260px] bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2"
                  name="tokenId"
                  onChange={handleInputChange}
                  value={addRewardTokenInfo.tokenId}
                />
              </div>
            )}
            <div className="flex flex-row justify-between items-center">
              <label>Ratio</label>
              <input
                id="product-token-ratio"
                className="h-[50px] w-[260px] bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2"
                name="ratio"
                onChange={handleInputChange}
                value={addRewardTokenInfo.ratio}
              />
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

export default AddRewardTokenModal;
