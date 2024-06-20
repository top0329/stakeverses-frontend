import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
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
    if (
      addProductTokenInfo.ratio === undefined ||
      Number.isNaN(addProductTokenInfo.ratio)
    ) {
      setError({
        ...error,
        ratio: 'Enter the ratio!',
      });
    } else {
      setError({
        ...error,
        ratio: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addProductTokenInfo.ratio]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addProductTokenInfo.productId]);

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

  const handleInputBlur = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;
    const erc1155Data = await getERC1155Data(
      (process.env.NEXT_PUBLIC_PRODUCTADDRESS || '') as Address,
      Number(value)
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
      setError({
        ...error,
        [name]: 'Product token not found!',
      });
    }
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

  const handleInputKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
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
        setError({
          ...error,
          productId: 'Product token not found!',
        });
      }
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
    <AnimatePresence>
      {isAddProductTokenModalOpen && (
        <div className="fixed right-0 bottom-0 top-0 left-0 z-30 flex h-full min-h-screen w-full items-center justify-center px-4 py-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-10 grid place-items-center overflow-y-scroll cursor-pointer"
            onClick={handleCancelButtonClicked}
          ></motion.div>
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            className="z-30 w-auto bg-gradient-to-r from-[#010e0c] to-[#05596d] text-white text-center rounded-[20px] border-2 border-white pb-8 lg:w-[826px] md:w-[670px] max-h-[90vh] overflow-auto modal-container"
            ref={modal}
          >
            <h2 className="text-xl font-bold mt-7 mb-6 xl:text-4xl lg:3xl md:text-2xl">
              Add Product Token
            </h2>
            <hr className="opacity-30 border" />
            <div className="flex flex-col justify-center items-center mx-5 my-8 gap-6 text-lg font-semibold lg:gap-10 lg:mx-[47px] md:flex-row md:items-between md:my-12 md:text-xl">
              {addProductTokenInfo.imageUri === '' ||
              addProductTokenInfo.imageUri === undefined ? (
                <div className="min-w-[143px] max-w-[143px] aspect-square bg-slate-600 border border-[#040E20] rounded-full md:max-w-[243px] md:min-w-[243px]"></div>
              ) : (
                <Image
                  className="min-w-[143px] max-w-[143px] aspect-square border border-[#040E20] rounded-full md:max-w-[243px] md:min-w-[243px]"
                  width={243}
                  height={243}
                  src={addProductTokenInfo.imageUri}
                  alt="product"
                  unoptimized
                />
              )}
              <div className="flex flex-col justify-between gap-4 w-full xs:gap-2 md:gap-4">
                <div className="flex flex-col justify-between items-start w-full xs:flex-row xs:items-center">
                  <label className="truncate tracking-[-1px]">
                    Product Name
                  </label>
                  <input
                    id="product-token-name"
                    className="h-[50px] w-full bg-[#A3A3A3]/50 border border-[#2F3A42] rounded-[15px] px-4 py-2 lg:w-[260px] xs:w-[200px]"
                    value={addProductTokenInfo.productName}
                    disabled
                  />
                </div>
                <div className="flex flex-col justify-between items-start w-full xs:flex-row xs:items-center">
                  <label className="truncate tracking-[-1px]">Token Id</label>
                  <div className="w-full xs:w-auto">
                    <input
                      id="product-token-id"
                      className="h-[50px] w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2 lg:w-[260px] xs:w-[200px]"
                      name="productId"
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      onKeyDown={handleInputKeyDown}
                      value={addProductTokenInfo.productId || ''}
                    />
                    {error.productId && (
                      <div className="text-red-600 text-xs text-left pl-2 pt-1">
                        {error.productId}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-start w-full xs:flex-row xs:items-center">
                  <label className="tracking-[-1px]">Ratio</label>
                  <div className="w-full xs:w-auto">
                    <input
                      id="product-token-ratio"
                      className="h-[50px] w-full bg-[#141D2D] border border-[#2F3A42] rounded-[15px] px-4 py-2 lg:w-[260px] xs:w-[200px]"
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
                    className="w-4 h-4 md:w-6 md:h-6"
                    name="consumable"
                    onChange={handleCheckboxChange}
                    checked={addProductTokenInfo.consumable}
                  />
                  <label>Consumable</label>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-6 px-5 md:gap-12">
              <Button
                className="!w-[120px] md:!w-[200px] xs:!w-[160px]"
                text="Add"
                onClick={handleAddProductTokenClicked}
              />
              <Button
                className="bg-[#192F3A] !w-[120px] md:!w-[200px] xs:!w-[160px]"
                text="Cancel"
                variant="outline"
                onClick={handleCancelButtonClicked}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default AddProductTokenModal;
