import Image from 'next/image';

import { IProductTokenForStakeListProps } from '@/types';
import BreadImage from '@/assets/images/bread.svg';

function ProductTokenForStakeList({
  productId,
  ratio,
  consumable,
}: IProductTokenForStakeListProps) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center h-16 gap-1">
        <div className="text-[22px] rounded-full border border-white aspect-square min-w-[28px] text-center leading-6">
          {Number(ratio)}
        </div>
        <Image className="aspect-square w-16" src={BreadImage} alt="text" />
      </div>
      <div className="relative flex flex-col items-center text-center pb-6">
        <div className="text-2xl text-right">Bread</div>
        <div
          className={`absolute bottom-0 text-[11px] rounded-full bg-[#2F3A42] px-1.5 py-1 w-[92px] ${
            consumable ? 'block' : 'hidden'
          }`}
        >
          Consumable
        </div>
      </div>
    </div>
  );
}

export default ProductTokenForStakeList;
