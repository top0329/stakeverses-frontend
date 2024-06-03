import { atom } from 'jotai';

import {
  IProductTokenInfo,
  IRewardTokenInfo,
  IStakingPoolListProps,
} from '@/types';

export const isAddProductTokenModalOpenAtom = atom(false);
export const isEditProductTokenModalOpenAtom = atom(false);
export const isAddRewardTokenModalOpenAtom = atom(false);
export const isEditRewardTokenModalOpenAtom = atom(false);
export const productTokenInfoAtom = atom<IProductTokenInfo[]>([]);
export const rewardTokenInfoAtom = atom<IRewardTokenInfo[]>([]);
export const baseAmountAtom = atom<number>(0);
export const stakingDataListAtom = atom<IStakingPoolListProps[]>([]);
export const myStakingDataListAtom = atom<IStakingPoolListProps[]>([]);
export const currentPoolDataAtom = atom<IStakingPoolListProps>({
  creator: '',
  instanceAddress: '',
  instanceId: '',
  productInfo: [],
  rewardTokenInfo: [],
});
export const selectedProductInfoAtom = atom<IProductTokenInfo>({
  productId: 0,
  ratio: 0,
  consumable: false,
});

isAddProductTokenModalOpenAtom.debugLabel = 'isAddProductTokenModalOpenAtom';
isEditProductTokenModalOpenAtom.debugLabel = 'isEditProductTokenModalOpenAtom';
isAddRewardTokenModalOpenAtom.debugLabel = 'isAddRewardTokenModalOpenAtom';
isEditRewardTokenModalOpenAtom.debugLabel = 'isEditRewardTokenModalOpenAtom';
productTokenInfoAtom.debugLabel = 'productTokenInfoAtom';
rewardTokenInfoAtom.debugLabel = 'rewardTokenInfoAtom';
baseAmountAtom.debugLabel = 'baseAmountAtom';
stakingDataListAtom.debugLabel = 'stakingDataListAtom';
myStakingDataListAtom.debugLabel = 'myStakingDataListAtom';
currentPoolDataAtom.debugLabel = 'currentPoolDataAtom';
selectedProductInfoAtom.debugLabel = 'selectedProductInfoAtom';
