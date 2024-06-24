'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import Button from '@/components/Buttons';
import RewardTokenListForClaim from '@/components/Lists/RewardTokenListForClaim';
import ProductTokenListForWithdraw from '@/components/Lists/ProductTokenListForWithdraw';
import useWeb3 from '@/hooks/useWeb3';
import useSpinner from '@/hooks/useSpinner';
import ProductStakingAbi from '@/abi/ProductStakingAbi.json';
import { myStakingDataListAtom } from '@/jotai/atoms';
import { IStakingPoolListProps } from '@/types';

function WithDrawPage() {
  const router = useRouter();
  const { id } = useParams();
  const { account, web3 } = useWeb3();
  const { openSpin, closeSpin } = useSpinner();

  const [myStakingDataList] = useAtom(myStakingDataListAtom);

  const [selectedPoolData, setSelectedPoolData] =
    useState<IStakingPoolListProps | null>(null);

  useEffect(() => {
    setSelectedPoolData(
      myStakingDataList.filter(
        (item) => Number(item.instanceId) === Number(id)
      )[0]
    );
  }, [id, myStakingDataList]);

  const handleWithdraw = async () => {
    try {
      openSpin('Withdrawing');
      const productStakingWeb3: any = new web3.eth.Contract(
        ProductStakingAbi,
        selectedPoolData?.instanceAddress
      );
      await productStakingWeb3.methods.withdraw().send({ from: account });
      router.push('/my-portfolio');
    } catch (err) {
      console.log(err);
    } finally {
      closeSpin();
    }
  };

  return (
    <React.Fragment>
      <h1 className="mt-16 mb-10 text-3xl text-center font-semibold lg:mt-24 lg:text-4xl xl:text-5xl 2xl:text-6xl">
        Withdraw
      </h1>
      <div className="relative flex flex-col py-10 px-2 rounded-[20px] bg-[#a0d8c2] text-white gap-10 mb-20 2xl:px-16 md:px-10 md:py-14 xl:py-20 dark:bg-[#040E20]/75">
        <div className="flex flex-col gap-10">
          <div className="text-xl font-semibold lg:text-4xl md:text-3xl sm:text-2xl">
            Staked Token :
          </div>
          {selectedPoolData?.productInfo.map((productToken) => (
            <ProductTokenListForWithdraw
              key={productToken.productId}
              productId={Number(productToken.productId)}
              consumable={productToken.consumable}
            />
          ))}
        </div>
        <div className="flex flex-col gap-10">
          <div className="text-xl font-semibold lg:text-4xl md:text-3xl sm:text-2xl">
            Reward Token :
          </div>
          {selectedPoolData?.rewardTokenInfo.map((rewardToken) => (
            <RewardTokenListForClaim
              key={rewardToken.tokenId}
              tokenId={Number(rewardToken.tokenId)}
              tokenAddress={rewardToken.tokenAddress}
              amount={Number(rewardToken.ratio)}
              isERC1155={rewardToken.isERC1155}
            />
          ))}
        </div>
        <div className="flex justify-center items-center gap-10">
          <Button text="Withdraw" onClick={handleWithdraw} />
          <Button
            className="!bg-[#192F3A] !text-white !border-white"
            text="Cancel"
            variant="outline"
            onClick={() => router.push('/my-portfolio')}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default WithDrawPage;
