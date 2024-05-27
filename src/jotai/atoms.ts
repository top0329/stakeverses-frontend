import { atom } from "jotai";

import { ProductTokenInfo } from '@/types';

export const isAddProductTokenModalOpenAtom = atom(false);
export const productTokenInfoAtom = atom<ProductTokenInfo[]>([]);

isAddProductTokenModalOpenAtom.debugLabel = 'isAddProductTokenModalOpenAtom';
productTokenInfoAtom.debugLabel = 'productTokenInfoAtom';