import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Address } from 'viem';

import Button from '../Buttons';
import useWeb3 from '@/hooks/useWeb3';
import useToast from '@/hooks/useToast';
import getERC1155Data from '@/lib/getERC1155Data';
import getTokenData from '@/lib/getTokenData';
import DefaultERC20Image from '@/assets/images/erc20.png';
import DefaultERC1155Image from '@/assets/images/erc1155.png';
import {
  isAddRewardTokenModalOpenAtom,
  rewardTokenInfoAtom,
} from '@/jotai/atoms';
import { IRewardTokenInfo } from '@/types';

function AddRewardTokenModal() {
  const { library, currentTokenDataUrl } = useWeb3();
  const { showToast } = useToast();

  const [isAddRewardTokenModalOpen, setIsAddRewardTokenModalOpen] = useAtom(
    isAddRewardTokenModalOpenAtom
  );
  const [rewardTokenInfo, setRewardTokenInfo] = useAtom(rewardTokenInfoAtom);

  const [addRewardTokenInfo, setAddRewardTokenInfo] =
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

  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (addRewardTokenInfo.isERC1155 === true) {
      if (
        addRewardTokenInfo.ratio === undefined ||
        Number.isNaN(addRewardTokenInfo.ratio)
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
    if (addRewardTokenInfo.isERC1155 === false) {
      if (
        addRewardTokenInfo.ratio === undefined ||
        Number.isNaN(addRewardTokenInfo.ratio)
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
  }, [addRewardTokenInfo.ratio]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (addRewardTokenInfo.isERC1155 === true) {
          const erc1155Data = await getERC1155Data(
            (addRewardTokenInfo.tokenAddress || '') as Address,
            Number(addRewardTokenInfo.tokenId),
            library
          );
          if (erc1155Data) {
            const { name, uri } = erc1155Data;
            setAddRewardTokenInfo({
              ...addRewardTokenInfo,
              tokenName: name,
              imageUri: uri,
            });
          }
          if (
            rewardTokenInfo
              .filter((item) => item.isERC1155 === true)
              .some(
                (item) =>
                  item.tokenAddress === addRewardTokenInfo.tokenAddress &&
                  item.tokenId === addRewardTokenInfo.tokenId
              )
          ) {
            setError({
              ...error,
              tokenId: 'This token has already been added!',
            });
          } else if (
            addRewardTokenInfo.tokenId === undefined ||
            Number.isNaN(addRewardTokenInfo.tokenId)
          ) {
            setAddRewardTokenInfo({
              ...addRewardTokenInfo,
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
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addRewardTokenInfo.tokenId]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (addRewardTokenInfo.isERC1155 === true) {
          if (
            addRewardTokenInfo.tokenAddress !== undefined &&
            addRewardTokenInfo.tokenAddress !== ''
          ) {
            const erc1155Data = await getERC1155Data(
              (addRewardTokenInfo.tokenAddress || '') as Address,
              Number(addRewardTokenInfo.tokenId),
              library
            );
            if (erc1155Data) {
              const { name, uri } = erc1155Data;
              setAddRewardTokenInfo({
                ...addRewardTokenInfo,
                tokenName: name,
                imageUri: uri,
              });
            }
          }
          if (
            rewardTokenInfo
              .filter((item) => item.isERC1155 === true)
              .some(
                (item) =>
                  item.tokenAddress === addRewardTokenInfo.tokenAddress &&
                  item.tokenId === addRewardTokenInfo.tokenId
              )
          ) {
            setError({
              ...error,
              tokenId: 'This token has already been added!',
            });
          } else if (
            addRewardTokenInfo.tokenAddress === undefined ||
            addRewardTokenInfo.tokenAddress === ''
          ) {
            setError({
              ...error,
              tokenAddress: 'Enter the token address!',
            });
            setAddRewardTokenInfo({
              ...addRewardTokenInfo,
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
        if (addRewardTokenInfo.isERC1155 === false) {
          if (
            addRewardTokenInfo.tokenAddress !== undefined &&
            addRewardTokenInfo.tokenAddress !== ''
          ) {
            const erc20Data = await getTokenData(
              addRewardTokenInfo.tokenAddress as Address,
              library
            );
            if (erc20Data) {
              const _tokenName = erc20Data.tokenName;
              if (!currentTokenDataUrl) {
                setAddRewardTokenInfo({
                  ...addRewardTokenInfo,
                  tokenName: _tokenName,
                  imageUri: DefaultERC20Image.src,
                });
                return;
              }
              const response = await axios.get(
                `${currentTokenDataUrl}/${addRewardTokenInfo.tokenAddress}`
              );
              let logo: string;
              if (response.data.image.large) {
                logo = response.data.image.large;
              } else {
                logo = DefaultERC20Image.src;
              }
              setAddRewardTokenInfo({
                ...addRewardTokenInfo,
                tokenName: _tokenName,
                imageUri: logo,
              });
            }
          }
          if (
            rewardTokenInfo.some(
              (item) => item.tokenAddress === addRewardTokenInfo.tokenAddress
            )
          ) {
            setError({
              ...error,
              tokenAddress: 'This token has already been added!',
            });
          } else if (
            addRewardTokenInfo.tokenAddress === undefined ||
            addRewardTokenInfo.tokenAddress === ''
          ) {
            setError({
              ...error,
              tokenAddress: 'Enter the token address!',
            });
            setAddRewardTokenInfo({
              ...addRewardTokenInfo,
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
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addRewardTokenInfo.tokenAddress]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === 'ratio' || name === 'tokenId') {
      setAddRewardTokenInfo((prevState) => ({
        ...prevState!,
        [name]: parseInt(value),
      }));
    } else {
      setAddRewardTokenInfo((prevState) => ({
        ...prevState!,
        [name]: value.trim(),
      }));
    }
  };

  const handleRadioClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.id;
    if (value === 'erc20') {
      setAddRewardTokenInfo((prev) => {
        return { ...prev, isERC1155: false };
      });
      setError({ tokenAddress: '', tokenId: '', ratio: '' });
    } else if (value === 'erc1155') {
      setAddRewardTokenInfo((prev) => {
        return { ...prev, isERC1155: true };
      });
      setError({ tokenAddress: '', tokenId: '', ratio: '' });
    }
  };

  const handleAddRewardTokenClicked = () => {
    if (
      (addRewardTokenInfo.isERC1155 === false &&
        addRewardTokenInfo.tokenAddress &&
        addRewardTokenInfo.ratio &&
        !rewardTokenInfo.some(
          (item) => item.tokenAddress === addRewardTokenInfo.tokenAddress
        )) ||
      (addRewardTokenInfo.isERC1155 === true &&
        addRewardTokenInfo.tokenAddress &&
        addRewardTokenInfo.tokenId &&
        addRewardTokenInfo.ratio &&
        !rewardTokenInfo.some(
          (item) =>
            item.tokenAddress === addRewardTokenInfo.tokenAddress &&
            item.tokenId === addRewardTokenInfo.tokenId
        ))
    ) {
      setRewardTokenInfo((prev) => [
        ...prev,
        { ...addRewardTokenInfo, isERC1155: addRewardTokenInfo.isERC1155 },
      ]);
      setAddRewardTokenInfo({
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
      setIsAddRewardTokenModalOpen(false);
    } else {
      showToast('warning', 'Fill in all the information!');
    }
  };

  const handleCancelButtonClicked = () => {
    setIsAddRewardTokenModalOpen(false);
    setAddRewardTokenInfo({
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
    <AnimatePresence>
      {isAddRewardTokenModalOpen && (
        <div className="fixed right-0 bottom-0 top-0 left-0 z-30 flex h-full min-h-screen w-full items-center justify-center px-4 py-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-10 grid place-items-center overflow-y-auto cursor-pointer"
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
              Add Reward Token
            </h2>
            <hr className="opacity-30 border" />
            <div className="flex flex-col justify-center items-center mx-5 my-8 gap-6 text-lg font-semibold lg:gap-10 lg:mx-[47px] md:flex-row md:items-between md:my-12 md:text-xl">
              {addRewardTokenInfo.imageUri === '' ||
              addRewardTokenInfo.imageUri === undefined ? (
                <div className="min-w-[143px] max-w-[143px] aspect-square bg-slate-600 border border-white rounded-full md:max-w-[243px] md:min-w-[243px] dark:border-[#040E20]"></div>
              ) : (
                <Image
                  className="col-span-4 min-w-[243px] aspect-square border border-[#040E20] rounded-full"
                  width={243}
                  height={243}
                  src={addRewardTokenInfo.imageUri}
                  alt="reward"
                  unoptimized
                  onError={() => {
                    setAddRewardTokenInfo({
                      ...addRewardTokenInfo,
                      imageUri: addRewardTokenInfo.isERC1155
                        ? DefaultERC1155Image.src
                        : DefaultERC20Image.src,
                    });
                  }}
                />
              )}
              <div className="flex flex-col justify-between gap-4 w-full xs:gap-2">
                <div className="flex flex-row justify-center items-center text-base gap-16 sm:text-lg lg:text-xl">
                  <div className="flex flex-row items-center gap-4">
                    <input
                      id="erc20"
                      className="w-5 h-5"
                      type="radio"
                      checked={!addRewardTokenInfo.isERC1155}
                      onChange={handleRadioClick}
                    />
                    <label>ERC20</label>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <input
                      id="erc1155"
                      className="w-5 h-5"
                      type="radio"
                      checked={addRewardTokenInfo.isERC1155}
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
                    value={addRewardTokenInfo.tokenName}
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
                      value={addRewardTokenInfo.tokenAddress}
                    />
                    {error.tokenAddress && (
                      <div className="text-red-600 text-xs text-left pl-2 pt-1">
                        {error.tokenAddress}
                      </div>
                    )}
                  </div>
                </div>
                {addRewardTokenInfo.isERC1155 && (
                  <div className="flex flex-col justify-between items-start w-full xs:flex-row xs:items-center">
                    <label className="truncate tracking-[-1px]">Token Id</label>
                    <div className="w-full xs:w-auto">
                      <input
                        id="token-id"
                        className="h-[50px] w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2 lg:w-[260px] xs:w-[200px]"
                        name="tokenId"
                        onChange={handleInputChange}
                        value={addRewardTokenInfo.tokenId || ''}
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
                      value={addRewardTokenInfo.ratio || ''}
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
                text="Add"
                onClick={handleAddRewardTokenClicked}
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

export default AddRewardTokenModal;
