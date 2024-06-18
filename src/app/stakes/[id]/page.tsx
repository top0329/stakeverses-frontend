'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Web3 from 'web3';
import { useAtom } from 'jotai';
import { Icon } from '@iconify/react/dist/iconify.js';

import Button from '@/components/Buttons';
import Subtitle from '@/components/Subtitle';
import ProductTokenForStakeList from '@/components/ProductToken/ProductTokenForStakeList';
import RewardTokenForStakeList from '@/components/ProductToken/RewardTokenForStakeList';
import ProductTokenListForPoolDetail from '@/components/Lists/ProductTokenListForPoolDetail';
import RewardTokenListForPoolDetail from '@/components/Lists/RewardTokenListForPoolDetail';
import useWeb3 from '@/hooks/useWeb3';
import ProductStakingAbi from '@/abi/ProductStakingAbi.json';
import { currentPoolDataAtom } from '@/jotai/atoms';
import { calcRemainingTime } from '@/lib/utils';
import {
  IProductTokenForStakeListProps,
  IRewardTokenInfoForStakeListProps,
} from '@/types';

let web3: any;
if (typeof window !== 'undefined') {
  web3 = new Web3(window.ethereum);
}

function PoolDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const { productStakingInstance } = useWeb3();

  const [currentPoolData, setCurrentPoolData] = useAtom(currentPoolDataAtom);

  const [poolStatus, setPoolStatus] = useState<boolean>(false);
  const [numberOfStakers, setNumberOfStakers] = useState<number>(0);
  const [remainingRewardAmount, setRemainingRewardAmount] = useState<number>(0);
  const [totalStakingBaseAmount, setTotalStakingBaseAmount] =
    useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    async function fetchPoolData() {
      const _poolData = await productStakingInstance.methods
        .getStakingInfo(id)
        .call();
      const _poolStatus =
        await productStakingInstance.methods.getInstancePausingStatus(id);
      const productStakingWeb3: any = new web3.eth.Contract(
        ProductStakingAbi,
        _poolData?.instanceAddress
      );
      const _numberOfStakers = await productStakingWeb3.methods
        .getStakers()
        .call();
      const _totalStakingBaseAmount = await productStakingWeb3.methods
        .totalStakingBaseAmount()
        .call();
      const _remainingTime = await productStakingWeb3.methods
        .devGetStakingEndTime()
        .call();
      const _remainingRewardAmount = await productStakingWeb3.methods
        .devGetRemainingTokens()
        .call();
      setCurrentPoolData(_poolData);
      setPoolStatus(_poolStatus);
      setNumberOfStakers(_numberOfStakers.length);
      setTotalStakingBaseAmount(Number(_totalStakingBaseAmount));
      setRemainingTime(Number(_remainingTime));
      setRemainingRewardAmount(Number(_remainingRewardAmount));
    }
    if (Object.keys(productStakingInstance).length > 0) {
      fetchPoolData();
    }
  }, [id, productStakingInstance, setCurrentPoolData]);

  return (
    <React.Fragment>
      <h1 className="mt-16 text-3xl text-center font-semibold lg:mt-24 lg:text-4xl xl:text-5xl 2xl:text-6xl">
        Stakes
      </h1>
      <div className="relative px-2 my-8 rounded-[20px] bg-[#040E20]/75 xl:my-20 lg:my-16 lg:px-4 md:px-8 sm:my-12 sm:px-2">
        <Subtitle text="Pool Details" />
        <div className="mb-12">
          <div className="flex flex-col items-center justify-center pt-6 gap-2 xl:flex-row xl:gap-0 xl:pt-0">
            <div className="flex items-center justify-center gap-0 lg:gap-4 xl:gap-0">
              {currentPoolData.productInfo.length > 0 &&
                currentPoolData.productInfo
                  .filter(
                    (product: IProductTokenForStakeListProps) =>
                      product.consumable === false
                  )
                  .map(
                    (
                      product: IProductTokenForStakeListProps,
                      index: number
                    ) => (
                      <React.Fragment key={index}>
                        <ProductTokenForStakeList
                          productId={product.productId}
                          ratio={product.ratio}
                        />
                        {currentPoolData.productInfo.filter(
                          (product: IProductTokenForStakeListProps) =>
                            product.consumable === true
                        ).length !== 0 && (
                          <p className="text-3xl font-medium -mt-16 px-0.5">
                            +
                          </p>
                        )}
                      </React.Fragment>
                    )
                  )}
              {currentPoolData.productInfo.length > 0 &&
              currentPoolData.productInfo.filter(
                (product: IProductTokenForStakeListProps) =>
                  product.consumable === true
              ).length > 0 ? (
                <React.Fragment>
                  <p className="text-3xl font-medium -mt-16 px-0.5 lg:text-5xl">
                    &#40;
                  </p>
                  {currentPoolData.productInfo
                    .filter(
                      (product: IProductTokenForStakeListProps) =>
                        product.consumable === true
                    )
                    .map(
                      (
                        product: IProductTokenForStakeListProps,
                        index: number
                      ) => (
                        <React.Fragment key={index}>
                          <ProductTokenForStakeList
                            productId={product.productId}
                            ratio={product.ratio}
                            consumable
                          />
                          {index !== currentPoolData.productInfo.length - 1 && (
                            <p className="text-2xl font-medium -mt-16 px-0 sm:text-3xl sm:px-0.5">
                              +
                            </p>
                          )}
                        </React.Fragment>
                      )
                    )}
                  <p className="text-3xl font-medium -mt-16 px-0.5 lg:text-5xl">
                    &#41;
                  </p>
                  <p className="text-sm -mt-14 px-0.5 whitespace-nowrap lg:text-xl md:text-lg">
                    * 1min
                  </p>
                </React.Fragment>
              ) : null}
            </div>
            <p className="text-xl -mt-14 px-0.5 whitespace-nowrap hidden xl:block">
              =
            </p>
            <p className="text-xl -mt-0 px-0.5 whitespace-nowrap xl:-mt-14 block xl:hidden">
              <Icon icon="mingcute:arrow-down-fill" width="36" height="36" />
            </p>
            <div className="flex justify-center items-center gap-0 lg:gap-4 xl:gap-0">
              {currentPoolData.rewardTokenInfo.length > 0 &&
                currentPoolData.rewardTokenInfo.map(
                  (
                    rewardToken: IRewardTokenInfoForStakeListProps,
                    index: number
                  ) => (
                    <React.Fragment key={index}>
                      <RewardTokenForStakeList
                        tokenId={rewardToken.tokenId}
                        tokenAddress={rewardToken.tokenAddress}
                        ratio={rewardToken.ratio}
                        isERC1155={rewardToken.isERC1155}
                      />
                      {index !== currentPoolData.rewardTokenInfo.length - 1 && (
                        <p className="text-2xl font-medium -mt-16 px-0 -mx-1 2xl:-mx-0 xl:-mx-2 md:-mx-0 sm:text-3xl sm:px-0.5">
                          +
                        </p>
                      )}
                    </React.Fragment>
                  )
                )}
            </div>
          </div>
          <div className="flex flex-col flex-wrap justify-between items-center text-base px-0 py-9 gap-4 lg:text-xl lg:px-10 xl:px-20 md:flex-nowrap sm:text-lg">
            <div className="flex justify-between w-full max-w-[450px] gap-4 sm:justify-center sm:max-w-max sm:gap-28">
              <div className="flex flex-col items-center gap-2.5 text-center w-[194px] md:hidden">
                <p className="truncate">Instance Id</p>
                <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 font-medium">
                  {id}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 text-center w-[194px] md:hidden">
                <p className="truncate">Pool State</p>
                <div
                  className={`w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 font-medium ${
                    poolStatus ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {poolStatus ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full gap-4 md:justify-between">
              <div className="hidden flex-col items-center gap-2.5 w-[48%] text-center md:w-[194px] md:flex">
                <p className="truncate">Instance Id</p>
                <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 font-medium">
                  {id}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 text-center w-auto">
                <p className="truncate">Instance Address</p>
                <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 font-medium break-all sm:break-normal">
                  {currentPoolData.instanceAddress}
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full gap-4 md:justify-between">
              <div className="hidden flex-col items-center gap-2.5 w-[48%] text-center md:w-[194px] md:flex">
                <p className="truncate">Pool State</p>
                <div
                  className={`w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 font-medium ${
                    poolStatus ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {poolStatus ? 'Active' : 'Inactive'}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 text-center w-auto">
                <p className="truncate">Creator Address</p>
                <div className="w-full bg-transparent border border-[#2F3A42] rounded-[15px] px-4 py-3 font-medium break-all sm:break-normal">
                  {currentPoolData.creator}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#192F3A] to-[#06C2C4] rounded-2xl p-0.5">
          <div className="bg-gradient-to-r from-[#010c09] to-[#044756] rounded-2xl">
            <div className="flex flex-row flex-wrap justify-between pt-10 px-6 text-base gap-2 lg:text-xl md:flex-nowrap sm:text-lg sm:px-16 md:px-10 xl:px-20 2xl:px-36">
              <div className="flex flex-col items-center gap-2.5 w-[48%] text-center md:w-[194px]">
                <p className="truncate">Total Value Staked</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 font-medium">
                  {totalStakingBaseAmount}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[48%] text-center md:w-[194px]">
                <p className="truncate">Remaining Reward</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 font-medium">
                  {remainingRewardAmount}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[48%] text-center md:w-[194px]">
                <p className="truncate">Number of Stakers</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 font-medium">
                  {numberOfStakers}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2.5 w-[48%] text-center md:w-[194px]">
                <p className="truncate">Remaining Time</p>
                <div className="w-full bg-transparent border rounded-[15px] px-4 py-3 font-medium">
                  {calcRemainingTime(remainingTime)} days
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch justify-between gap-4 mt-10 mx-2 pb-10 xl:mx-8 xl:gap-7 lg:flex-row sm:mx-6">
              <div className="w-full text-center">
                <div className="flex flex-col gap-5 bg-gradient-to-r from-[#0f3a38] to-[#0f484a] py-5 px-4 mt-20 rounded-[20px] h-[calc(100%-80px)]">
                  <h2 className="text-xl -mt-20 font-semibold mb-6 sm:text-2xl lg:text-3xl">
                    Staking Tokens
                  </h2>
                  {currentPoolData.productInfo.map(
                    (product: IProductTokenForStakeListProps) => (
                      <ProductTokenListForPoolDetail
                        key={product.productId}
                        productId={Number(product.productId)}
                        amount={totalStakingBaseAmount * Number(product.ratio)}
                        consumable={product.consumable}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="w-full text-center">
                <div className="flex flex-col gap-5 bg-gradient-to-r from-[#0f494c] to-[#10585e] py-5 px-4 mt-20 rounded-[20px] h-[calc(100%-80px)]">
                  <h2 className="text-xl -mt-20 font-semibold mb-6 sm:text-2xl lg:text-3xl">
                    Reward Tokens
                  </h2>
                  {currentPoolData.rewardTokenInfo.map(
                    (rewardToken: IRewardTokenInfoForStakeListProps, idx) => (
                      <RewardTokenListForPoolDetail
                        key={idx}
                        tokenAddress={rewardToken.tokenAddress}
                        tokenId={Number(rewardToken.tokenId)}
                        ratio={Number(rewardToken.ratio)}
                        isERC1155={rewardToken.isERC1155}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-10">
          <Button
            className="!w-[200px]"
            text="Stake"
            onClick={() => router.push(`/stakes/${id}/staking`)}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default PoolDetailsPage;
