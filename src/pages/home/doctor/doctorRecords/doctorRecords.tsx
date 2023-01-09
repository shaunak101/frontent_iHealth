import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { DoctorNavBar } from "../../../../components/navBar";
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

function DoctorRecords(){
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
        let fixedAddress = address.replaceAll('"', "");

        let contract = new ethers.Contract(id!, userABI, provider);

        let docs = await contract.getRecords(fixedAddress);
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
            <DoctorNavBar/>
                <section className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-900 md:flex-row md:h-48">
                    <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-900 md:dark:bg-gray-900">
                        <div className="px-6 py-6 md:px-8 md:py-0">
                            <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">Click here for adding<span className="text-blue-600 dark:text-blue-400 md:text-blue-300"> Documents</span></h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">Upload the file below and the rest of the work will be handled by us</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
                        <form onSubmit={submitForm}>
                            <div className="flex flex-col p-1.5 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                                <input className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent file:text-gray-700 file:bg" type="file" name="file"/>
                                <button type="submit" className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">Upload</button>
                            </div>
                        </form>
                    </div>
                </section>

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

export {DoctorRecords}
