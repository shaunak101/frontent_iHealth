import { randomBytes } from 'ethers/lib/utils';
import * as openpgp from 'openpgp';
import { Buffer } from 'buffer';

let theKey:any;

function setKey(key:String){
    theKey = key
}
async function createKeyPair(userName:string){
    const {privateKey, publicKey} = await openpgp.generateKey({
        type: "ecc",
        curve: "curve25519",
        format: "armored",
        userIDs: [{name:userName}],
    });

    console.log(privateKey);
    return {privateKey, publicKey};
}

async function encrypt(pubKeys:any, ipfsLink:any){
    console.log(pubKeys);



    const encrypted = openpgp.encrypt({
        message: await openpgp.createMessage({text: ipfsLink}),
        encryptionKeys: await openpgp.readKey({armoredKey:pubKeys}),
        config: { allowInsecureDecryptionWithSigningKeys: true }

    });

    console.log(await encrypted);
    return await encrypted;
}


async function decrypt(msg:any, privKey:any){
    const message = await openpgp.readMessage({
        armoredMessage:msg
    })

    const privateKey = await openpgp.readPrivateKey({armoredKey:privKey});
    const {data:decrypted} = await openpgp.decrypt({
        message,
        config: {
            allowInsecureDecryptionWithSigningKeys: true,
          },
        decryptionKeys: [privateKey]
    })

    return decrypted
}

export {createKeyPair, encrypt, decrypt, setKey, theKey}
