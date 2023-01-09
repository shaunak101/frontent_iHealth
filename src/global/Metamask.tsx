import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer : string | number = 0;

async function connectAccount(){
    await provider.send("eth_requestAccounts", []);
    let signer = await provider.getSigner();
}

export {signer, connectAccount, provider};
