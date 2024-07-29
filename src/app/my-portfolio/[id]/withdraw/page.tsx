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
import { getGasPrice } from '@/lib/getGasPrice';

function WithDrawPage() {
  const router = useRouter();
  const { id } = useParams();
  const { account, web3, chainId } = useWeb3();
  const { openSpin, closeSpin } = useSpinner();

  const [myStakingDataList] = useAtom(myStakingDataListAtom);

  const [selectedPoolData, setSelectedPoolData] =
    useState<IStakingPoolListProps | null>(null);
  const [baseAmount, setBaseAmount] = useState(0);
  const [claimableRewardArray, setClaimableRewardArray] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const productStakingWeb3: any = new web3.eth.Contract(
        ProductStakingAbi,
        myStakingDataList.filter(
          (item) => Number(item.instanceId) === Number(id)
        )[0].instanceAddress
      );
      const _claimableRewardArray = await productStakingWeb3.methods
        .getClaimableReward(account)
        .call();
      const withdrawData = await productStakingWeb3.methods
        .stakingUser(account)
        .call();
      setClaimableRewardArray(_claimableRewardArray);
      setBaseAmount(Number(withdrawData.totalAmount));
      setSelectedPoolData(
        myStakingDataList.filter(
          (item) => Number(item.instanceId) === Number(id)
        )[0]
      );
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, myStakingDataList]);

  const handleWithdraw = async () => {
    try {
      openSpin('Withdrawing');
      const gasPrice = await getGasPrice(web3, chainId!);
      const productStakingWeb3: any = new web3.eth.Contract(
        ProductStakingAbi,
        selectedPoolData?.instanceAddress
      );
      await productStakingWeb3.methods
        .withdraw()
        .send({ from: account, gasPrice });
      router.push('/my-portfolio');
    } catch (err) {
      console.log(err);
    } finally {
      closeSpin();
    }
  };

  return (
    <React.Fragment>
      <h1 className="mt-16 mb-10 text-3xl text-center font-semibold lg:my-24 lg:text-4xl xl:text-5xl 2xl:text-6xl">
        Withdraw
      </h1>
      <div className="relative flex flex-col py-10 px-2 rounded-[20px] bg-[#e4f0fd] text-white gap-10 mb-20 border-2 border-[#7a9acb]/50 2xl:px-16 md:px-10 md:py-14 xl:py-20 dark:bg-[#040E20]/75 dark:border-none">
        <div className="flex flex-col gap-10">
          <div className="text-black text-xl font-semibold lg:text-4xl md:text-3xl sm:text-2xl dark:text-white">
            Staked Token :
          </div>
          {selectedPoolData?.stakingTokenInfo.map((stakingToken) => (
            <ProductTokenListForWithdraw
              key={stakingToken.tokenId}
              tokenId={Number(stakingToken.tokenId)}
              tokenAddress={stakingToken.tokenAddress}
              amount={Number(stakingToken.ratio) * baseAmount}
              isERC1155={stakingToken.isERC1155}
              consumable={stakingToken.consumable}
            />
          ))}
        </div>
        <div className="flex flex-col gap-10">
          <div className="text-black text-xl font-semibold lg:text-4xl md:text-3xl sm:text-2xl dark:text-white">
            Reward Token :
          </div>
          {selectedPoolData?.rewardTokenInfo.map((rewardToken, idx) => (
            <RewardTokenListForClaim
              key={idx}
              tokenId={Number(rewardToken.tokenId)}
              tokenAddress={rewardToken.tokenAddress}
              amount={
                Number(rewardToken.ratio) * Number(claimableRewardArray[idx])
              }
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
