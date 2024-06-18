'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Web3 from 'web3';
import { useAtom } from 'jotai';

import Button from '@/components/Buttons';
import RewardTokenListForClaim from '@/components/Lists/RewardTokenListForClaim';
import useWeb3 from '@/hooks/useWeb3';
import useSpinner from '@/hooks/useSpinner';
import ProductStakingAbi from '@/abi/ProductStakingAbi.json';
import { myCreatedInstanceDataListAtom } from '@/jotai/atoms';

let web3: any;
if (typeof window !== 'undefined') {
  web3 = new Web3(window.ethereum);
}

function ChargeRewardPage() {
  const router = useRouter();
  const { id } = useParams();
  const { account } = useWeb3();
  const { openSpin, closeSpin } = useSpinner();

  const [myCreatedInstanceDataList] = useAtom(myCreatedInstanceDataListAtom);

  const [baseAmount, setBaseAmount] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBaseAmount(Number(value));
  };

  const handleChargeReward = async () => {
    try {
      openSpin('Charging Reward');
      const productStakingWeb3: any = new web3.eth.Contract(
        ProductStakingAbi,
        myCreatedInstanceDataList.filter(
          (createdInstance) => Number(createdInstance.instanceId) === Number(id)
        )[0].instanceAddress
      );
      await productStakingWeb3.methods
        .chargeReward(baseAmount)
        .send({ from: account });
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
        Charge Reward Token
      </h1>
      <div className="relative flex flex-col py-10 px-2 rounded-[20px] bg-[#040E20]/75 gap-10 mb-20 2xl:px-16 md:px-10 md:py-14 xl:py-20">
        <div className="flex flex-row justify-end items-center text-[22px] px-10 -mt-4 xl:-mt-10">
          <label className="font-semibold truncate">Base Amount :</label>
          <input
            className="w-20 ml-4 px-2 bg-transparent border-b-2 border-dashed"
            step={1}
            onChange={handleInputChange}
            value={baseAmount || ''}
          />
        </div>
        {myCreatedInstanceDataList.length > 0 &&
          myCreatedInstanceDataList
            .filter(
              (createdInstance) =>
                Number(createdInstance.instanceId) === Number(id)
            )[0]
            .rewardTokenInfo.map((rewardToken, idx) => (
              <RewardTokenListForClaim
                key={idx}
                tokenId={Number(rewardToken.tokenId)}
                tokenAddress={rewardToken.tokenAddress}
                amount={Number(rewardToken.ratio) * baseAmount}
                isERC1155={rewardToken.isERC1155}
              />
            ))}
        <div className="flex justify-center items-center gap-10">
          <Button text="Charge reward" onClick={handleChargeReward} />
          <Button
            className="!bg-[#192F3A]"
            text="Cancel"
            variant="outline"
            onClick={() => router.push('/my-portfolio')}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChargeRewardPage;
