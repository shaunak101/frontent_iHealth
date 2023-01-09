import * as IPFS from "ipfs-http-client";
import { Buffer } from "buffer";

let node:any;

const projectId = '2HvEGzX7UPuN7t6oWNiQux5svIe';
const projectSecret = 'e7cc21afc3e2bdb81c226146e3bee873';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

async function addToIPFS(data:any){
    if(node == undefined){
        node = IPFS.create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            apiPath:"/api/v0",
            headers: {
                authorization: auth,
            },
        });
    }

    let file = await node.add(data);
    await node.pin.add(file.cid.toString());

    return file.cid.toString();
}

async function getFileIPFS(hash:any){
    if(node == undefined){
        node = IPFS.create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            apiPath:"/api/v0",
            headers: {
                authorization: auth,
            },
        });
    }

    const chunks = [];
    for await (const chunk of node.cat(hash)) {
        let data = Buffer.from(chunk).toString();
        chunks.push(data);
    }

    console.log(chunks.toString);
    return chunks;
}

export {addToIPFS, getFileIPFS};
