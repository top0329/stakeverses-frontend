export const middleEllipsis = (str: string, len: number) => {
  if (!str) {
    return '';
  }

  return `${str.substr(0, len)}...${str.substr(str.length - len, str.length)}`;
};

export function truncateAddress(address: string): string {
  if (!address) return '';
  const start = address.substring(0, 6);
  const end = address.substring(address.length - 4);
  return `${start}...${end}`;
}
