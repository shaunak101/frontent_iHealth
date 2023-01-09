import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { DoctorNavBar, UserNavBar } from "../../../../components/navBar";
import { doctorTokenABI, userABI } from "../../../../global/contractDetails";
import { getFromLocalStorage } from "../../../../global/localStorage";
import { addToIPFS } from "../../../../global/ipfs";
import makeBlockie from "ethereum-blockies-base64";
import { decrypt, encrypt } from "../../../../global/DocEncryption";
import recordComponent from "../../../../components/recordComponent";
import RecordComponent from "../../../../components/recordComponent";
import * as openpgp from "openpgp";
import { decryptData } from "../../../../global/encryption";
import { key } from "../../../../global/persistantKey";

function parseIpfs(link:string){
    let privKey = getFromLocalStorage("privateKey");
    let data;
    decrypt(link, privKey).then((res) => {
        data = res;
    });
    return data;
}

function UserRecords(){
    let {id} = useParams();


    let [records, setRecords]:any[] = useState([]);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = getFromLocalStorage("managingAddress")

    useEffect(() => {
        const getData = async () => {
            let requests = await fetchData();
            setRecords(requests);
        }

        getData();
    }, []);

    async function fetchData(){
        let signer = provider.getSigner();
        let account = await provider.send("eth_requestAccounts", []);
        console.log(account[0]);
        let fixedAddress = address.replaceAll('"', "");

        let contract = new ethers.Contract(fixedAddress, userABI, provider);

        let docs = await contract.getRecords(account[0]);
        console.log(docs);

        return docs;
    }

    async function addData(ipfsFile:string){
        let signer = provider.getSigner();
        let fixedAddress = address.replaceAll('"', "");
        let contract = new ethers.Contract(fixedAddress, doctorTokenABI, signer);

        let patientContract = new ethers.Contract(id!, userABI, signer);

        console.log(contract.getProfile());
        let text = await localStorage.getItem("privateKey")!.replaceAll('"',"").toString();

        console.log(text);

        const pubAdd = (await contract.getProfile()).encKey;
        const patientAdd = (await patientContract.getProfile()).pubAdd;

        const privateKey = await openpgp.readPrivateKey({armoredKey:text});

        let encFile = test([pubAdd, patientAdd], ipfsFile)

        let tx = await contract.createDocs(id,encFile);
        console.log(tx);
    }

    async function submitForm(event:any){
        event.preventDefault();
        const form = event.target;
        const files = (form[0]).files;

        const file = files[0];
        console.log(files);
        let filecid = await addToIPFS(file);
        console.log(filecid);
        addData(filecid);
    }

    return (
        <div>
            <UserNavBar></UserNavBar>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3 margin-auto">

                {records.map((ele:any) =>{
                    return <RecordComponent url={ele.ipfsLink.toString()} id={ele.id} doctor={ele.doctor} time={ele.time}></RecordComponent>
                })}

                </div>
        </div>
    )
}


async function test(pubKeys:any, ipfsFile:any){

    const publicKeys = await Promise.all(pubKeys.map((armoredKey: any) => openpgp.readKey({ armoredKey })));
    const message = await openpgp.createMessage({ text: ipfsFile });

    const encrypted = await openpgp.encrypt({
        message, // input as Message object
        encryptionKeys: publicKeys,
    });

    return encrypted;
}

async function decry(privateKey:any, msg:any){

    const message = await openpgp.readMessage({
        armoredMessage:msg
    });

    const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKey,
    });

    console.log(decrypted);
}

export {UserRecords}
