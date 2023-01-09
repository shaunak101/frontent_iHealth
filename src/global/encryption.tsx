import { Buffer } from "buffer";
const sigUtil = require("@metamask/eth-sig-util");

async function getPublicKey(){
    const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
    const encryptionKey = await window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [accounts[0]],
    });
    return encryptionKey;
}


async function encryptData(data:any) {
    const publicKey = await getPublicKey();
    const encryptMessage = Buffer.from(JSON.stringify(
        sigUtil.encrypt({
            publicKey:publicKey,
            data: data,
            version: 'x25519-xsalsa20-poly1305',
        })
    ));

    return encryptMessage.toString("hex");
}

async function decryptData(data:any){
    const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
    let msg = await window.ethereum.request({
        method: "eth_decrypt",
        params: [data, accounts[0]]
    });

    return msg;
}

export {encryptData, decryptData}
