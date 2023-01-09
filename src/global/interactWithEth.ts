import { ethers } from "ethers";
import { setAlertEnabled } from "../components/alertComponent";
import { contractABI, contractAddress } from "./contractDetails";

async function createAccountEth(ipfsHash:any, pps:any, isDoctor:any, setData:any, publicKey:string, encryptedKey:any){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = contractAddress;

    let signer = await provider.getSigner();
    const contract = new ethers.Contract(address, contractABI, signer);

    await contract.createAccount(ipfsHash, pps, isDoctor, publicKey, encryptedKey);

    contract.on("createEvent", (account, msg, value) => {
        setData(value);
        if(value == false){
            setAlertEnabled(true, false, "Account Exists Already! Sign In to get started");
        }
    });
}

export {createAccountEth}
