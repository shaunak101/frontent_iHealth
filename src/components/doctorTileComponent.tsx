import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { userABI } from "../global/contractDetails";
import { getFromLocalStorage } from "../global/localStorage";
import makeBlockie from 'ethereum-blockies-base64';


function DoctorTileComponent(props:any){
    let [name, setName] = useState("");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = getFromLocalStorage("managingAddress")

    useEffect(() => {
        const getData = async () => {
            let docs = await fetchData();
            setName(docs);
        }

        getData();
    }, [])


    async function fetchData(){
        let signer = await provider.getSigner();
        let fixedAddress = address.replaceAll('"', "");
        let contract = new ethers.Contract(fixedAddress, userABI, signer);

        const doctors = contract.getNickName(props.address);
        return doctors;
    }

    return(
    <div className="h-40 px-12 py-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-blue-600 dark:border-gray-700 dark:hover:border-transparent">
        <div className="flex flex-row sm:-mx-4">
            <img className="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-gray-300" src={makeBlockie(props.address)} alt=""/>

            <div className="mt-4 ml-9 sm:mt-0">
                <h1 className="text-xl font-semibold text-gray-700 capitalize md:text-2xl dark:text-white group-hover:text-white">{name}</h1>

                <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300 break-words">{props.address}</p>
            </div>
        </div>
    </div>
    )
}

export default DoctorTileComponent;
