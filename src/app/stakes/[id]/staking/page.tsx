'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Web3 from 'web3';
import { useAtom } from 'jotai';

import Button from '@/components/Buttons';
import ProductTokenStakeList from '@/components/Lists/ProductTokenStakeList';
import useWeb3 from '@/hooks/useWeb3';
import useToast from '@/hooks/useToast';
import useSpinner from '@/hooks/useSpinner';
import ProductStakingAbi from '@/abi/ProductStakingAbi.json';
import { currentPoolDataAtom } from '@/jotai/atoms';

const web3 = new Web3(window.ethereum);

function StakingPage() {
  const { erc1155Approve, isConnected, library, account } = useWeb3();
  const { openSpin, closeSpin } = useSpinner();
  const { showToast } = useToast();
  const router = useRouter();

  const [currentPoolData] = useAtom(currentPoolDataAtom);

  const [baseAmount, setBaseAmount] = useState<number>(0);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const productStakingWeb3: any = new web3.eth.Contract(
    ProductStakingAbi,
    currentPoolData.instanceAddress
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBaseAmount(Number(value));
  };

  const handleApprove = async () => {
    if (isApproved) {
      try {
        openSpin('Staking Product');
        await productStakingWeb3.methods
          .staking(baseAmount)
          .send({ from: account });
        router.push('/my-portfolio');
      } catch (err) {
        console.log(err);
      } finally {
        closeSpin();
      }
    } else {
      try {
        if (isConnected && library) {
          openSpin('Approving');
          let receipt = null;
          while (receipt === null || receipt.status === undefined) {
            const res = erc1155Approve(
              process.env.NEXT_PUBLIC_PRODUCTADDRESS!,
              currentPoolData.instanceAddress,
              true
            );
            receipt = await web3.eth.getTransactionReceipt(
              (
                await res
              ).transactionHash
            );
          }
          if (receipt && receipt.status !== undefined) {
            if (receipt.status) {
              setIsApproved(true);
            } else {
              setIsApproved(false);
            }
          } else {
            alert('Transaction is still pending');
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
          }
        } else showToast('warning', 'Please connect your wallet!');
      } catch (err: any) {
        console.log(err);
      } finally {
        closeSpin();
      }
    }
  };

  return (
    <React.Fragment>
      <h1 className="mt-16 text-3xl text-center font-semibold lg:mt-24 lg:text-4xl xl:text-5xl 2xl:text-6xl">
        Stakes
      </h1>
      <div className="relative grid grid-cols-12 my-24 rounded-[20px] bg-[#040E20]/75 gap-16 px-[72px] pt-[80px] pb-[93px]">
        <div className="col-span-7 bg-[#053F40] rounded-[20px]">
          <h3 className="text-[38px] text-center font-semibold pt-[42px] pb-[32px]">
            Product Token Stake
          </h3>
          <div className="flex flex-row justify-end items-center text-[22px] px-10 mb-6">
            <label className="font-semibold">Enter Base Amount :</label>
            <input
              className="w-20 ml-4 px-2 bg-transparent border-b-2 border-dashed"
              onChange={handleInputChange}
              value={baseAmount || ''}
            />
          </div>
          <div className="flex flex-col gap-7 px-[49px]">
            {currentPoolData.productInfo.map((product) => (
              <ProductTokenStakeList
                key={product.productId}
                productId={Number(product.productId)}
                amount={Number(product.ratio) * baseAmount}
              />
            ))}
            <div className="pb-10 mx-auto">
              <Button
                className="!w-[160px]"
                text={isApproved ? 'Stake' : 'Approve'}
                onClick={handleApprove}
              />
            </div>
          </div>
        </div>
        <div className="col-span-5 flex flex-col gap-16 h-full">
          <div className="bg-[#053F40] rounded-[20px] h-full pb-10">
            <h3 className="text-[38px] text-center font-semibold pt-[42px] pb-[32px]">
              Total Value Staked
            </h3>
            <div className="flex flex-col mx-10 gap-4">
              <div className="flex flex-row justify-between items-center bg-[#141D2D]/70 rounded-[20px] px-14 py-8 text-[28px] font-semibold">
                <p>Axe</p>
                <p>19302</p>
              </div>
              <div className="flex flex-row justify-between items-center bg-[#141D2D]/70 rounded-[20px] px-14 py-8 text-[28px] font-semibold">
                <p>Axe</p>
                <p>19302</p>
              </div>
              <div className="flex flex-row justify-between items-center bg-[#141D2D]/70 rounded-[20px] px-14 py-8 text-[28px] font-semibold">
                <p>Axe</p>
                <p>19302</p>
              </div>
            </div>
          </div>
          <div className="bg-[#053F40] rounded-[20px] py-10">
            <h3 className="text-[38px] text-center font-semibold pb-7">
              Number of Stakers
            </h3>
            <h3 className="text-[38px] text-center font-semibold">937643</h3>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StakingPage;
