import { atom } from "jotai";

import { ProductTokenInfo, RewardTokenInfo } from '@/types';

export const isAddProductTokenModalOpenAtom = atom(false);
export const isAddRewardTokenModalOpenAtom = atom(false);
export const productTokenInfoAtom = atom<ProductTokenInfo[]>([]);
export const rewardTokenInfoAtom = atom<RewardTokenInfo[]>([]);

isAddProductTokenModalOpenAtom.debugLabel = 'isAddProductTokenModalOpenAtom';
isAddRewardTokenModalOpenAtom.debugLabel = 'isAddRewardTokenModalOpenAtom';
productTokenInfoAtom.debugLabel = 'productTokenInfoAtom';
rewardTokenInfoAtom.debugLabel ='rewardTokenInfoAtom';