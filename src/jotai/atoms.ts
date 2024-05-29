import { atom } from 'jotai';

import {
  IProductTokenInfo,
  IRewardTokenInfo,
  IStakingPoolListProps,
} from '@/types';

export const isAddProductTokenModalOpenAtom = atom(false);
export const isAddRewardTokenModalOpenAtom = atom(false);
export const productTokenInfoAtom = atom<IProductTokenInfo[]>([]);
export const rewardTokenInfoAtom = atom<IRewardTokenInfo[]>([]);
export const baseAmountAtom = atom<number>(0);
export const stakingDataListAtom = atom<IStakingPoolListProps[]>([]);
export const currentPoolDataAtom = atom<IStakingPoolListProps>({
  creator: '',
  instanceAddress: '',
  instanceId: '',
  productInfo: [],
  rewardTokenInfo: [],
});

isAddProductTokenModalOpenAtom.debugLabel = 'isAddProductTokenModalOpenAtom';
isAddRewardTokenModalOpenAtom.debugLabel = 'isAddRewardTokenModalOpenAtom';
productTokenInfoAtom.debugLabel = 'productTokenInfoAtom';
rewardTokenInfoAtom.debugLabel = 'rewardTokenInfoAtom';
baseAmountAtom.debugLabel = 'baseAmountAtom';
stakingDataListAtom.debugLabel = 'stakingDataListAtom';
currentPoolDataAtom.debugLabel = 'currentPoolDataAtom';
