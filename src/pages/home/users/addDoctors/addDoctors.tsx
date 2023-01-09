import { ethers } from "ethers";
import { useEffect, useState } from "react";
import DoctorTileComponent from "../../../../components/doctorTileComponent";
import {UserNavBar} from "../../../../components/navBar";
import { userABI } from "../../../../global/contractDetails";
import { getFromLocalStorage } from "../../../../global/localStorage";

function AddDoctors(){
    let [docAddress, setDocAddress] = useState("");
    let [nickName, setNickName] = useState("");
    let [doctors, setDoctors] :any[] = useState([]);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = getFromLocalStorage("managingAddress")

    useEffect(() => {
        const getData = async () => {
            let docs = await fetchData();
            setDoctors(docs);
        }

        getData();
    }, [])


    async function fetchData(){
        let signer = await provider.getSigner();
        let fixedAddress = address.replaceAll('"', "");
        let contract = new ethers.Contract(fixedAddress, userABI, signer);

        const doctors = contract.getDoctors();
        return doctors;
    }

    async function addDoctor(e:any){
        e.preventDefault();
        let signer = await provider.getSigner();
        let fixedAddress = address.replaceAll('"', "");

        let contract = new ethers.Contract(fixedAddress, userABI, signer);

        await contract.addDoctor(docAddress, nickName);
    }

    return (
        <div className="bg-white dark:bg-gray-900 w-full min-h-full">
            <UserNavBar/>
            <div className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-24 mx-auto lg:py-32">
                    <div className="lg:flex">
                        <div className="lg:w-1/2">
                            <h1 className="text-gray-600 dark:text-gray-300 md:text-lg">Ready to add Doctors?</h1>

                            <h1 className="mt-4 text-3xl font-medium text-gray-800 capitalize md:text-4xl lg:text-5xl dark:text-white">
                                Add your doctors here
                            </h1>
                        </div>

                        <div className="mt-8 lg:w-1/2 lg:mt-0">
                            <form className="w-full lg:max-w-xl" onSubmit={addDoctor}>
                                <div className="relative flex items-center">
                                    <input type="text" value={docAddress} onChange={(e) => {setDocAddress(e.target.value)}} className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Doctor Address"/>
                                </div>

                                <div className="relative flex items-center mt-4">
                                    <input type="password" value={nickName} onChange={(e) => {setNickName(e.target.value)}} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Doctor Nickname"/>
                                </div>

                                <div className="mt-8 md:flex md:items-center">
                                    <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        Add Doctor
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        <div>
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">Your <span className="text-blue-500">Doctors</span></h1>

                <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
                    Want to check out the people that care for you? Below is a list of all the doctors that you have added so far! There is an address as well as the custom image that you added for them
                </p>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2">
                    {doctors.length != 0? doctors.map((ele:any) => <DoctorTileComponent address={ele}></DoctorTileComponent>) : null}
                </div>
                </div>
            </div>
        </div>
    );
}


function arrIncludes(arr:any[], search:any){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == search){
            return true;
        }
    }
    return false;
}
export default AddDoctors;
