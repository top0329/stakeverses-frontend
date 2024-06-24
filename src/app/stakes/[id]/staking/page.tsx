'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import Button from '@/components/Buttons';
import ProductTokenStakeList from '@/components/Lists/ProductTokenStakeList';
import useWeb3 from '@/hooks/useWeb3';
import useToast from '@/hooks/useToast';
import useSpinner from '@/hooks/useSpinner';
import ProductStakingAbi from '@/abi/ProductStakingAbi.json';
import {
  currentPoolDataAtom,
  isProductApproveAvailableAtom,
  stakeBaseAmountAtom,
} from '@/jotai/atoms';

function StakingPage() {
  const { erc1155Approve, isConnected, library, account, web3 } = useWeb3();
  const { openSpin, closeSpin } = useSpinner();
  const { showToast } = useToast();
  const router = useRouter();

  const [currentPoolData] = useAtom(currentPoolDataAtom);
  const [stakeBaseAmount, setStakeBaseAmount] =
    useAtom<number>(stakeBaseAmountAtom);
  const [isProductApproveAvailable] = useAtom<boolean>(
    isProductApproveAvailableAtom
  );

  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [numberOfStakers, setNumberOfStakers] = useState<number>(0);

  const productStakingWeb3: any = new web3.eth.Contract(
    ProductStakingAbi,
    currentPoolData.instanceAddress
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const _numberOfStakers = await productStakingWeb3.methods
          .getStakers()
          .call();
        setNumberOfStakers(Number(_numberOfStakers.length));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [productStakingWeb3.methods]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setStakeBaseAmount(Number(value));
  };

  const handleApprove = async () => {
    if (isApproved) {
      try {
        openSpin('Staking Product');
        await productStakingWeb3.methods
          .staking(stakeBaseAmount)
          .send({ from: account });
        setStakeBaseAmount(0);
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
      <div className="relative grid grid-cols-12 my-8 rounded-[20px] text-white bg-[#a0d8c2] gap-2 px-2 pt-[80px] pb-[93px] 2xl:px-16 2xl:gap-14 xl:my-20 xl:gap-12 lg:my-16 lg:gap-8 md:px-10 md:gap-6 sm:my-12 sm:gap-4 dark:bg-[#040E20]/75">
        <div className="col-span-12 bg-[#053F40] rounded-[20px] lg:col-span-7">
          <h3 className="text-2xl text-center font-semibold pt-10 pb-8 lg:text-4xl sm:text-3xl">
            Product Token Stake
          </h3>
          <div className="flex flex-row justify-end items-center text-base px-6 mb-6 2xl:px-12 xl:px-8 lg:text-xl sm:text-lg">
            <label className="font-semibold">Enter Base Amount :</label>
            <input
              className="w-20 ml-4 px-2 bg-transparent border-b-2 border-dashed"
              onChange={handleInputChange}
              value={stakeBaseAmount || ''}
            />
          </div>
          <div className="flex flex-col text-center gap-7 px-6 2xl:px-12 xl:px-8">
            {currentPoolData.productInfo.map((product) => (
              <ProductTokenStakeList
                key={product.productId}
                productId={Number(product.productId)}
                consumable={!!product.consumable}
                amount={Number(product.ratio) * stakeBaseAmount}
              />
            ))}
            <div className="pb-10 mx-auto">
              <Button
                className={`!w-[160px] ${
                  isProductApproveAvailable ? '' : 'opacity-50'
                }`}
                text={isApproved ? 'Stake' : 'Approve'}
                onClick={handleApprove}
                disabled={!isProductApproveAvailable}
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 flex flex-col h-full gap-2 2xl:gap-14 xl:gap-12 lg:col-span-5 lg:gap-8 md:gap-6 sm:gap-4">
          <div className="bg-[#053F40] rounded-[20px] h-full pb-10">
            <h3 className="text-2xl text-center font-semibold pt-10 pb-8 xl:text-4xl sm:text-3xl">
              Total Value Staked
            </h3>
            <div className="flex flex-col gap-4 px-6 2xl:px-12 xl:px-8">
              <div className="flex flex-row justify-between items-center bg-[#141D2D]/70 rounded-[20px] px-14 py-8 text-xl font-semibold lg:text-3xl sm:text-2xl">
                <p>Axe</p>
                <p>19302</p>
              </div>
              <div className="flex flex-row justify-between items-center bg-[#141D2D]/70 rounded-[20px] px-14 py-8 text-xl font-semibold lg:text-3xl sm:text-2xl">
                <p>Axe</p>
                <p>19302</p>
              </div>
              <div className="flex flex-row justify-between items-center bg-[#141D2D]/70 rounded-[20px] px-14 py-8 text-xl font-semibold lg:text-3xl sm:text-2xl">
                <p>Axe</p>
                <p>19302</p>
              </div>
            </div>
          </div>
          <div className="bg-[#053F40] rounded-[20px] py-10">
            <h3 className="text-2xl text-center font-semibold pt-8 pb-8 xl:text-4xl sm:text-3xl">
              Number of Stakers
            </h3>
            <h3 className="text-2xl text-center font-semibold pb-8 xl:text-4xl sm:text-3xl">
              {numberOfStakers}
            </h3>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StakingPage;
