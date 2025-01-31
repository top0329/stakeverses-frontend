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
export const isProductApproveAvailableAtom = atom(false);
export const productTokenInfoAtom = atom<IProductTokenInfo[]>([]);
export const rewardTokenInfoAtom = atom<IRewardTokenInfo[]>([]);
export const baseAmountAtom = atom<number>(0);
export const stakeBaseAmountAtom = atom<number>(0);
export const stakingDataListAtom = atom<IStakingPoolListProps[]>([]);
export const myStakingDataListAtom = atom<IStakingPoolListProps[]>([]);
export const myCreatedInstanceDataListAtom = atom<IStakingPoolListProps[]>([]);
export const currentPoolDataAtom = atom<IStakingPoolListProps>({
  creator: '',
  instanceAddress: '',
  instanceId: '',
  stakingTokenInfo: [],
  rewardTokenInfo: [],
});
export const selectedProductInfoAtom = atom<IProductTokenInfo>({
  tokenId: 0,
  ratio: 0,
  isERC1155: false,
  consumable: false,
  imageUri: '',
});
export const selectedRewardInfoAtom = atom<IRewardTokenInfo>({
  tokenId: 0,
  ratio: 0,
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
selectedRewardInfoAtom.debugLabel = 'selectedRewardInfoAtom';
