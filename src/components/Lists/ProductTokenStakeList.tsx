import React from 'react';

import Button from '@/components/Buttons';

function ProductTokenStakeList({
  productId,
  amount,
}: {
  productId: number;
  amount: number;
}) {
  // const { erc1155Approve } = useWeb3();
  // const [isApproved, setIsApproved] = useState<boolean>(false);

  // const handleApprove = async () => {
  //   try {
  //     const res = erc1155Approve(
  //       process.env.NEXT_PUBLIC_PRODUCTADDRESS!,
  //       ,
  //       true
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <div className="flex flex-row justify-between pb-[18px] px-[32px] py-[18px] bg-[#141D2D]/70 rounded-[20px]">
      <div className="flex flex-col">
        <p className="text-[22px]">Token Name</p>
        <p className="text-[28px] text-center font-semibold">Bread</p>
      </div>
      <div className="flex flex-col">
        <p className="text-[22px]">Token Id</p>
        <p className="text-[28px] text-center font-semibold">{productId}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-[22px]">Amount</p>
        <p className="text-[28px] text-center font-semibold">{amount}</p>
      </div>
    </div>
  );
}

export default ProductTokenStakeList;
