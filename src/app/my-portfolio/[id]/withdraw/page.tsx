'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Web3 from 'web3';
import { useAtom } from 'jotai';

import Button from '@/components/Buttons';
import RewardTokenListForClaim from '@/components/Lists/RewardTokenListForClaim';
import ProductTokenListForWithdraw from '@/components/Lists/ProductTokenListForWithdraw';
import useWeb3 from '@/hooks/useWeb3';
import useSpinner from '@/hooks/useSpinner';
import ProductStakingAbi from '@/abi/ProductStakingAbi.json';
import { myStakingDataListAtom } from '@/jotai/atoms';
import { IStakingPoolListProps } from '@/types';

const web3 = new Web3(window.ethereum);

function WithDrawPage() {
  const router = useRouter();
  const { id } = useParams();
  const { account } = useWeb3();
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
      await productStakingWeb3.methods
        .withdraw()
        .send({ from: account });
    } catch (err) {
      console.log(err);
    } finally {
      closeSpin();
    }
  };

  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        Withdraw
      </h1>
      <div className="flex flex-col mt-24 py-20 px-24 rounded-b-[20px] rounded-tr-[20px] bg-[#040E20]/75 gap-16 mb-20">
        <div className="flex flex-col gap-10">
          <div className="text-[38px] font-semibold">Staked Token :</div>
          {selectedPoolData?.productInfo.map((productToken) => (
            <ProductTokenListForWithdraw
              key={productToken.productId}
              productId={Number(productToken.productId)}
              consumable={productToken.consumable}
            />
          ))}
        </div>
        <div className="flex flex-col gap-10">
          <div className="text-[38px] font-semibold">Reward Token :</div>
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

export default WithDrawPage;
