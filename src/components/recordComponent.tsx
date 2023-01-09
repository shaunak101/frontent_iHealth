import makeBlockie from "ethereum-blockies-base64"
import { useEffect, useState } from "react";
import { createKeyPair, decrypt, theKey } from "../global/DocEncryption";
import { getFromLocalStorage } from "../global/localStorage";
import * as openpgp from "openpgp";
import { Buffer } from "buffer";
import { createReadStream } from "fs";
import { ethers } from "ethers";
import { userABI } from "../global/contractDetails";
import { provider } from "../global/Metamask";

function RecordComponent(props:any){
    let [link, setLink] = useState("");

    useEffect(() => {
        const getData = async () => {
            let msg = props.url.toString()
            let text = await localStorage.getItem("privateKey")!.replaceAll('"',"").toString();

            const message = await openpgp.readMessage({
                armoredMessage:msg
            })

            const privateKey = await openpgp.readPrivateKey({armoredKey:text});
            const {data:decrypted} = await openpgp.decrypt({
                message,
                decryptionKeys: privateKey
            });

            console.log(msg);

            console.log(decrypted);
            setLink(decrypted.toString());
        }

        getData();
    }, []);


    let date = new Date(props.time.toNumber() * 1000);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return (
    <div className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 ml-6">
        <div className="w-1/3 bg-cover" style={{backgroundImage: `url(${makeBlockie(props.doctor)})`}}></div>
        <div className="w-2/3 p-4 md:p-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{link}</h1>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Created by {props.doctor } at {`${day}/${month}/${year}`}</p>

            <div className="flex justify-between mt-3 item-center">
                <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">ID : {props.id.toString()}</h1>
                <a href={`https://bt-project.infura-ipfs.io/ipfs/${link}`} className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">View Document</a>
            </div>
    </div>
</div>)
}

export default RecordComponent
