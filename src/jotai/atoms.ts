import { atom } from 'jotai';

import { IProductTokenInfo, IRewardTokenInfo } from '@/types';

export const isAddProductTokenModalOpenAtom = atom(false);
export const isAddRewardTokenModalOpenAtom = atom(false);
export const productTokenInfoAtom = atom<IProductTokenInfo[]>([]);
export const rewardTokenInfoAtom = atom<IRewardTokenInfo[]>([]);
export const baseAmountAtom = atom<number>(0);

isAddProductTokenModalOpenAtom.debugLabel = 'isAddProductTokenModalOpenAtom';
isAddRewardTokenModalOpenAtom.debugLabel = 'isAddRewardTokenModalOpenAtom';
productTokenInfoAtom.debugLabel = 'productTokenInfoAtom';
rewardTokenInfoAtom.debugLabel = 'rewardTokenInfoAtom';
baseAmountAtom.debugLabel = 'baseAmountAtom';
