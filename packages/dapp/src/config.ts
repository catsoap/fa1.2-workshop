import token from '@fa1.2-workshop/contracts/deployments/token';

export const RPC: string = process.env.REACT_APP_RPC ?? 'http://localhost:8732';
export const CONTRACT_ADDRESS = token;
