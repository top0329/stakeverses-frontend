import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';

import Button from '../Buttons';
import useToast from '@/hooks/useToast';
import {
  isEditRewardTokenModalOpenAtom,
  rewardTokenInfoAtom,
  selectedRewardInfoAtom,
} from '@/jotai/atoms';
import { IRewardTokenInfo } from '@/types';

function EditRewardTokenModal() {
  const { showToast } = useToast();

  const [isEditRewardTokenModalOpen, setIsEditRewardTokenModalOpen] = useAtom(
    isEditRewardTokenModalOpenAtom
  );
  const [rewardTokenInfo, setRewardTokenInfo] = useAtom(rewardTokenInfoAtom);
  const [selectedRewardInfo] = useAtom(selectedRewardInfoAtom);

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

  const [initialRewardTokenId, setInitialRewardTokenId] = useState<number>(0);
  const [initialRewardTokenAddress, setInitialRewardTokenAddress] =
    useState<string>('');

  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditRewardTokenInfo({
      tokenName: selectedRewardInfo.tokenName,
      imageUri: selectedRewardInfo.imageUri,
      tokenAddress: selectedRewardInfo.tokenAddress,
      tokenId: selectedRewardInfo.tokenId,
      ratio: selectedRewardInfo.ratio,
      isERC1155: selectedRewardInfo.isERC1155,
    });
    setInitialRewardTokenId(selectedRewardInfo.tokenId || 0);
    setInitialRewardTokenAddress(selectedRewardInfo.tokenAddress || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditRewardTokenModalOpen]);

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
          ) &&
        initialRewardTokenId !== editRewardTokenInfo.tokenId &&
        initialRewardTokenAddress !== editRewardTokenInfo.tokenAddress
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
  };

  return (
    <AnimatePresence>
      {isEditRewardTokenModalOpen && (
        <div className="fixed right-0 bottom-0 top-0 left-0 z-30 flex h-full min-h-screen w-full items-center justify-center px-4 py-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-10 grid place-items-center overflow-y-scroll cursor-pointer"
            onClick={handleCancelButtonClicked}
          ></motion.div>
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            ref={modal}
            className="z-30 w-auto bg-[#47556e] text-white text-center rounded-[20px] border-2 border-white pb-8 lg:w-[826px] md:w-[670px] max-h-[90vh] overflow-auto modal-container dark:bg-gradient-to-r dark:from-[#010e0c] dark:to-[#05596d]"
          >
            <h2 className="text-xl font-bold mt-7 mb-6 xl:text-4xl lg:3xl md:text-2xl">
              Edit Reward Token
            </h2>
            <hr className="opacity-30 border" />
            <div className="flex flex-col justify-center items-center mx-5 my-8 gap-6 text-lg font-semibold lg:gap-10 lg:mx-[47px] md:flex-row md:items-between md:my-12 md:text-xl">
              {editRewardTokenInfo.imageUri === '' ||
              editRewardTokenInfo.imageUri === undefined ? (
                <div className="min-w-[143px] max-w-[143px] aspect-square bg-slate-600 border border-white rounded-full md:max-w-[243px] md:min-w-[243px] dark:border-[#040E20]"></div>
              ) : (
                <Image
                  className="min-w-[143px] max-w-[143px] aspect-square border border-[#040E20] rounded-full md:max-w-[243px] md:min-w-[243px]"
                  width={243}
                  height={243}
                  src={editRewardTokenInfo.imageUri}
                  alt="product"
                  unoptimized
                />
              )}
              <div className="flex flex-col justify-between gap-4 w-full xsgap-2">
                <div className="flex flex-row justify-center items-center text-base gap-16 sm:text-lg lg:text-xl">
                  <div className="flex flex-row items-center gap-4">
                    <input
                      id="erc20"
                      className="w-5 h-5"
                      type="radio"
                      checked={!editRewardTokenInfo.isERC1155}
                      onChange={handleRadioClick}
                    />
                    <label>ERC20</label>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <input
                      id="erc1155"
                      className="w-5 h-5"
                      type="radio"
                      checked={editRewardTokenInfo.isERC1155}
                      onChange={handleRadioClick}
                    />
                    <label>ERC1155</label>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-start w-full xs:flex-row xs:items-center">
                  <label className="truncate tracking-[-1px]">Token Name</label>
                  <input
                    id="token-name"
                    className="h-[50px] w-full bg-[#A3A3A3]/50 border border-[#2F3A42] rounded-[15px] px-4 py-2 lg:w-[260px] xs:w-[200px]"
                    value={editRewardTokenInfo.tokenName}
                    disabled
                  />
                </div>
                <div className="flex flex-col justify-between items-start w-full xs:flex-row xs:items-center">
                  <label className="truncate tracking-[-1px]">
                    Token Address
                  </label>
                  <div className="w-full xs:w-auto">
                    <input
                      id="token-address"
                      className="h-[50px] w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2 lg:w-[260px] xs:w-[200px]"
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
                  <div className="flex flex-col justify-between items-start w-full xs:flex-row xs:items-center">
                    <label className="truncate tracking-[-1px]">Token Id</label>
                    <div className="w-full xs:w-auto">
                      <input
                        id="token-id"
                        className="h-[50px] w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2 lg:w-[260px] xs:w-[200px]"
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
                <div className="flex flex-col justify-between items-start w-full xs:flex-row xs:items-center">
                  <label className="tracking-[-1px]">Ratio</label>
                  <div className="w-full xs:w-auto">
                    <input
                      id="product-token-ratio"
                      className="h-[50px] w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2 lg:w-[260px] xs:w-[200px]"
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
            <div className="flex flex-row justify-center items-center gap-6 px-5 md:gap-12">
              <Button
                className="!w-[120px] md:!w-[200px] xs:!w-[160px]"
                text="Update"
                onClick={handleAddProductTokenClicked}
              />
              <Button
                className="bg-[#192F3A] !text-white !border-white !w-[120px] md:!w-[200px] xs:!w-[160px]"
                text="Cancel"
                variant="outline"
                onClick={handleCancelButtonClicked}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default EditRewardTokenModal;
