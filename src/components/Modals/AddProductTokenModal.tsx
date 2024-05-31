import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { Address } from 'viem';

import {
  isAddProductTokenModalOpenAtom,
  productTokenInfoAtom,
} from '@/jotai/atoms';
import Button from '@/components/Buttons';
import useToast from '@/hooks/useToast';
import getERC1155Data from '@/lib/getERC1155Data';
import { IProductTokenInfo } from '@/types';

function AddProductTokenModal() {
  const { showToast } = useToast();

  const [isAddProductTokenModalOpen, setIsAddProductTokenModalOpen] = useAtom(
    isAddProductTokenModalOpenAtom
  );
  const [productTokenInfo, setProductTokenInfo] = useAtom(productTokenInfoAtom);

  const [addProductTokenInfo, setAddProductTokenInfo] =
    useState<IProductTokenInfo>({
      productName: '',
      productAddress: '0xaaF0e2a505F074d8080B834c33a9ff44DD7946F1',
      productId: 0,
      ratio: 0,
      imageUri: '',
      consumable: false,
    });
  const [error, setError] = useState({
    productId: '',
    ratio: '',
  });

  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const erc1155Data = await getERC1155Data(
          (process.env.NEXT_PUBLIC_PRODUCTADDRESS || '') as Address,
          addProductTokenInfo.productId
        );
        if (erc1155Data) {
          const { name, uri } = erc1155Data;
          setAddProductTokenInfo({
            ...addProductTokenInfo,
            productName: name,
            imageUri: uri,
          });
        } else {
          setAddProductTokenInfo({
            ...addProductTokenInfo,
            productName: '',
            imageUri: '',
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (addProductTokenInfo.productId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addProductTokenInfo.productId]);

  useEffect(() => {
    if (
      productTokenInfo.some(
        (item) => item.productId === addProductTokenInfo.productId
      )
    ) {
      setError({
        ...error,
        productId: 'This product token has already been added!',
      });
    } else if (
      addProductTokenInfo.productId === undefined ||
      Number.isNaN(addProductTokenInfo.productId)
    ) {
      setAddProductTokenInfo({
        ...addProductTokenInfo,
        productName: '',
        imageUri: '',
      });
      setError({
        ...error,
        productId: 'Enter the product id!',
      });
    } else {
      setError({
        ...error,
        productId: '',
      });
    }
    if (
      addProductTokenInfo.ratio === undefined ||
      Number.isNaN(addProductTokenInfo.ratio)
    ) {
      setError({
        ...error,
        ratio: 'Enter the ratio!',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addProductTokenInfo.productId, addProductTokenInfo.ratio]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === 'ratio' || name === 'productId') {
      setAddProductTokenInfo((prevState) => ({
        ...prevState!,
        [name]: parseInt(value),
      }));
    } else {
      setAddProductTokenInfo((prevState) => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = () => {
    setAddProductTokenInfo((prevState) => ({
      ...prevState!,
      consumable: !addProductTokenInfo.consumable,
    }));
  };

  const handleAddProductTokenClicked = () => {
    if (
      addProductTokenInfo.imageUri &&
      addProductTokenInfo.productId &&
      addProductTokenInfo.ratio &&
      !productTokenInfo.some(
        (item) => item.productId === addProductTokenInfo.productId
      )
    ) {
      setProductTokenInfo(
        (prev) =>
          [...prev, addProductTokenInfo].filter(
            Boolean as any
          ) as IProductTokenInfo[]
      );
      setAddProductTokenInfo({
        productAddress: '0xaaF0e2a505F074d8080B834c33a9ff44DD7946F1',
        productName: '',
        imageUri: '',
        productId: 0,
        ratio: 0,
        consumable: false,
      });
      setIsAddProductTokenModalOpen(false);
      setError({ productId: '', ratio: '' });
    } else {
      showToast('warning', 'Fill in all the information!');
    }
  };

  const handleCancelButtonClicked = () => {
    setAddProductTokenInfo({
      productAddress: '0xaaF0e2a505F074d8080B834c33a9ff44DD7946F1',
      productName: '',
      imageUri: '',
      productId: 0,
      ratio: 0,
      consumable: false,
    });
    setError({ productId: '', ratio: '' });
    setIsAddProductTokenModalOpen(false);
  };

  return (
    <div
      className={`fixed right-0 bottom-0 top-0 left-0 z-30 flex h-full min-h-screen w-full items-center justify-center px-4 py-5 ${
        isAddProductTokenModalOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        className="z-20 fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center bg-opacity-80 bg-[#1D2127]"
        onClick={handleCancelButtonClicked}
      ></div>
      <div
        ref={modal}
        className="z-30 w-[826px] bg-gradient-to-r from-[#010e0c] to-[#05596d] text-white text-center rounded-[20px] border-2 border-white pb-8"
      >
        <h2 className="text-[38px] font-bold mt-7 mb-6">
          Add Product Token For Staker
        </h2>
        <hr className="opacity-30 border" />
        <div className="grid grid-cols-12 mx-[47px] mt-12 mb-11 gap-10 text-[22px] font-semibold">
          {addProductTokenInfo.imageUri === '' ||
          addProductTokenInfo.imageUri === undefined ? (
            <div className="col-span-4 w-[243px] aspect-square bg-slate-600 border border-[#040E20] rounded-full"></div>
          ) : (
            <Image
              className="col-span-4 min-w-[243px] aspect-square border border-[#040E20] rounded-full"
              width={243}
              height={243}
              src={addProductTokenInfo.imageUri}
              alt="product"
              unoptimized
            />
          )}
          <div className="col-span-8 flex flex-col justify-between">
            <div className="flex flex-row justify-between items-center">
              <label className="truncate">Product Name</label>
              <input
                id="product-token-name"
                className="h-[50px] w-[260px] bg-[#A3A3A3]/50 border border-[#2F3A42] rounded-[15px] px-4 py-2"
                value={addProductTokenInfo.productName}
                disabled
              />
            </div>
            <div className="flex flex-row justify-between items-center">
              <label>Token Id</label>
              <div>
                <input
                  id="product-token-id"
                  className="h-[50px] w-[260px] bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2"
                  name="productId"
                  onChange={handleInputChange}
                  value={addProductTokenInfo.productId || ''}
                />
                {error.productId && (
                  <div className="text-red-600 text-xs text-left pl-2 pt-1">
                    {error.productId}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <label>Ratio</label>
              <div>
                <input
                  id="product-token-ratio"
                  className="h-[50px] w-[260px] bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2"
                  name="ratio"
                  step={1}
                  min={1}
                  onChange={handleInputChange}
                  value={addProductTokenInfo.ratio || ''}
                />
                {error.ratio && (
                  <div className="text-red-600 text-xs text-left pl-2 pt-1">
                    {error.ratio}
                  </div>
                )}
              </div>
            </div>
            <div
              id="consumable"
              className="flex flex-row justify-start items-center gap-4"
            >
              <input
                id="consumable"
                type="checkbox"
                className="w-6 h-6"
                name="consumable"
                onChange={handleCheckboxChange}
                checked={addProductTokenInfo.consumable}
              />
              <label>Consumable</label>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-12">
          <Button
            className="!w-[200px]"
            text="Add"
            onClick={handleAddProductTokenClicked}
          />
          <Button
            className="bg-[#192F3A] !w-[200px]"
            text="Cancel"
            variant="outline"
            onClick={handleCancelButtonClicked}
          />
        </div>
      </div>
    </div>
  );
}

export default AddProductTokenModal;
