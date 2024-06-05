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
import { Contract, ethers } from 'ethers';
import { useWriteContract } from 'wagmi';

const web3 = new Web3(window.ethereum);

function WithDrawPage() {
  const router = useRouter();
  const { id } = useParams();
  const { account, productStakingInstance, library } = useWeb3();
  const { openSpin, closeSpin } = useSpinner();
  const { writeContractAsync } = useWriteContract();

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
      writeContractAsync({
        abi: ProductStakingAbi,
        address: selectedPoolData?.instanceAddress as `0x${string}`,
        functionName: 'withdraw',
        args: [],
      });
      // writeContractAsync({
      //   abi: ProductStakingAbi,
      //   address: selectedPoolData?.instanceAddress as `0x${string}`,
      //   functionName: 'claim',
      //   args: [account],
      // });
      // let provider;
      // provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_DEFAULTRPC);
      // const signer = await provider.getSigner();
      // const productStakingEthers: Contract = new ethers.Contract(
      //   selectedPoolData?.instanceAddress || '',
      //   ProductStakingAbi,
      //   library
      // ) as Contract;
      // const productStakingWeb3: any = new web3.eth.Contract(
      //   ProductStakingAbi,
      //   selectedPoolData?.instanceAddress
      // );

      // console.log(
      //   'ProductStaking instance data:',
      //   await productStakingInstance.methods.getStakingInfo(1).call()
      // );

      // console.log(
      //   'Calculate EndTime>>>>',
      //   await productStakingWeb3.methods.devGetStakingEndTime().call()
      // );

      // console.log(
      //   'Total reward base amount',
      //   await productStakingWeb3.methods.rewardBaseAmount().call()
      // );

      // console.log(
      //   'Total Staking Base Amount>>>',
      //   await productStakingWeb3.methods.totalStakingBaseAmount().call()
      // );

      // console.log(
      //   'Claimable Reward:',
      //   await productStakingWeb3.methods.getClaimableReward(account).call()
      // );

      // console.log(
      //   'Staker Information:',
      //   await productStakingWeb3.methods.stakingUser(account).call()
      // );

      // await productStakingWeb3.methods.withdraw().send({ from: account });
      // await productStakingEthers.withdraw().then((tx) => tx.wait());
      // router.push('/my-portfolio');
      console.log('clicked');
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
