const shortenAddress = (addr: string) => addr.slice(0, 6) + '...' + addr.slice(addr.length - 6);

export default shortenAddress;
