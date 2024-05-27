import Button from '@/components/Buttons';
import React from 'react';

function Stake() {
  return (
    <React.Fragment>
      <h1 className="mt-[203px] text-[62px] text-center font-semibold">
        Stakes
      </h1>
      <div className="relative grid grid-cols-12 my-24 rounded-[20px] bg-[#030C1B] gap-16 px-[72px] pt-[80px] pb-[93px]">
        <div className="col-span-7 bg-[#053F40] rounded-[20px]">
          <h3 className="text-[38px] text-center font-semibold pt-[42px] pb-[32px]">
            Token Stake
          </h3>
          <div className="flex flex-col gap-7 px-[49px]">
            <div className="grid grid-cols-12 px-[32px] py-[18px] bg-[#141D2D]/70 rounded-[20px] gap-6">
              <div className="col-span-7">
                <div className="flex flex-row justify-between pb-[18px]">
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Name</p>
                    <p className="text-[28px] font-semibold">Axe</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Id</p>
                    <p className="text-[28px] font-semibold">11564</p>
                  </div>
                </div>
                <div className="relative">
                  <input className="w-full h-[50px] bg-[#141D2D] rounded-[15px] border border-[#2F3A42]" />
                  <button className="absolute right-[6px] inset-y-1.5 bg-gradient-to-r from-[#192F3A] to-[#06C2C4] rounded-[15px] text-center text-[22px] font-semibold w-[109px] h-[38px]">
                    Max
                  </button>
                </div>
              </div>
              <div className="col-span-5 flex justify-center items-center">
                <Button className="!w-full" text="Approve" />
              </div>
            </div>
            <div className="grid grid-cols-12 px-[32px] py-[18px] bg-[#141D2D]/70 rounded-[20px] gap-6">
              <div className="col-span-7">
                <div className="flex flex-row justify-between pb-[18px]">
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Name</p>
                    <p className="text-[28px] font-semibold">Axe</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Id</p>
                    <p className="text-[28px] font-semibold">11564</p>
                  </div>
                </div>
                <div className="relative">
                  <input className="w-full h-[50px] bg-[#141D2D] rounded-[15px] border border-[#2F3A42]" />
                  <button className="absolute right-[6px] inset-y-1.5 bg-gradient-to-r from-[#192F3A] to-[#06C2C4] rounded-[15px] text-center text-[22px] font-semibold w-[109px] h-[38px]">
                    Max
                  </button>
                </div>
              </div>
              <div className="col-span-5 flex justify-center items-center">
                <Button className="!w-full" text="Approve" />
              </div>
            </div>
            <div className="grid grid-cols-12 px-[32px] py-[18px] bg-[#141D2D]/70 rounded-[20px] gap-6">
              <div className="col-span-7">
                <div className="flex flex-row justify-between pb-[18px]">
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Name</p>
                    <p className="text-[28px] font-semibold">Axe</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[22px]">Token Id</p>
                    <p className="text-[28px] font-semibold">11564</p>
                  </div>
                </div>
                <div className="relative">
                  <input className="w-full h-[50px] bg-[#141D2D] rounded-[15px] border border-[#2F3A42]" />
                  <button className="absolute right-[6px] inset-y-1.5 bg-gradient-to-r from-[#192F3A] to-[#06C2C4] rounded-[15px] text-center text-[22px] font-semibold w-[109px] h-[38px]">
                    Max
                  </button>
                </div>
              </div>
              <div className="col-span-5 flex justify-center items-center">
                <Button className="!w-full" text="Approve" />
              </div>
            </div>
            <div className="pb-10 mx-auto">
              <Button text="Stake" />
            </div>
          </div>
        </div>
        <div className="col-span-5 flex flex-col gap-16 h-full">
          <div className="bg-[#053F40] rounded-[20px] h-full">
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
            <h3 className="text-[38px] text-center font-semibold">
              937643
            </h3>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Stake;
