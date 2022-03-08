import { ethers } from "ethers";

import abi from "../utils/Keyboards.json";

const contractAddress = "0x6b582c6734d2A817163433024b340020f1914D93";
const contractABI = abi.abi;

export default function getKeyboardsContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    return undefined;
  }
}
