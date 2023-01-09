import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { setAlertEnabled } from "../../../../components/alertComponent";
import DoctorTileComponent from "../../../../components/doctorTileComponent";
import { DoctorNavBar } from "../../../../components/navBar";
import { doctorTokenABI } from "../../../../global/contractDetails";
import { getFromLocalStorage } from "../../../../global/localStorage";

function AddPatients(){
    let [patientRequests, setPatientRequests]:any[] = useState([]);
    let [patients, setPatients]:any[] = useState([]);

    let [selectedPatient, setSelectedPatient] = useState("");

    let [addressOpen, setAddressOpen] = useState(false);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = getFromLocalStorage("managingAddress")

    useEffect(() => {
        const getData = async () => {
            let requests = await fetchData();
            setPatientRequests(requests);
            console.log(requests);

            let currentPatients = await getPatients();
            setPatients(currentPatients)
        }

        getData();
    }, []);

    async function fetchData(){
        let fixedAddress = address.replaceAll('"', "");
        let contract = new ethers.Contract(fixedAddress, doctorTokenABI, provider);

        let running = true;
        let recordsArr:any[] = await contract.getRequests();
        return recordsArr
    }

    async function addPatient(patientAddress:string){
        let signer = provider.getSigner();
        let fixedAddress = address.replaceAll('"', "");
        let contract = new ethers.Contract(fixedAddress, doctorTokenABI, signer);

        const res = await contract.addPatient(patientAddress, "").then(() => {setAlertEnabled(true, true, `Added ${patientAddress}!`)});

    }

    async function getPatients(){
        let signer = provider.getSigner();
        let fixedAddress = address.replaceAll('"', "");
        let contract = new ethers.Contract(fixedAddress, doctorTokenABI, signer);

        let running = true;
        let patientArr:any[] = [];
        let iterator = 0;

        while (running){
            try{
                const requests = await contract.patients(iterator);
                patientArr.push(requests);
                iterator++
            } catch(e){
                running = false;
            }
        }

        return patientArr
    }

    return (
    <div className="bg-white dark:bg-gray-900 w-full min-h-full">
        <DoctorNavBar/>

        <div className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-24 mx-auto lg:py-32">
                    <div className="lg:flex">
                        <div className="lg:w-1/2">
                            <h1 className="text-gray-600 dark:text-gray-300 md:text-lg">Ready to add Patients?</h1>

                            <h1 className="mt-4 text-3xl font-medium text-gray-800 capitalize md:text-4xl lg:text-5xl dark:text-white">
                                Add your patients here
                            </h1>
                        </div>

                        <div className="mt-8 lg:w-1/2 lg:mt-0">
                            <form className="w-full lg:max-w-xl">
                                <div className="relative flex items-center">
                                    <input onClick={() => {setAddressOpen(!addressOpen)}} type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" readOnly = {true} value = {selectedPatient} placeholder="Patient Address"/>
                                    {addressOpen?
                                        <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800">
                                            {patientRequests.length == 0? <a href="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"> No Patient Request 🥳 </a>: patientRequests.map((ele:any) => <a onClick={() => {addPatient(ele)}} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"> {ele} </a>)
}
                                        </div>: null
                                    }
                                </div>

                                <div className="mt-8 md:flex md:items-center">
                                    <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        Add Patient
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        <div>
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">Your <span className="text-blue-500">Patients</span></h1>

                <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
                    Want to check out the people that you provide care for? Below is a list of all the patients that you have added so far! There is an address as well as the custom image that you added for them. If you don't see someone in the list, make sure to add them using the box above
                </p>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2">
                    {patients.length != 0? patients.map((ele:any) => <DoctorTileComponent address={ele}></DoctorTileComponent>) : null}
                </div>
                </div>
            </div>
    </div>)
}

export default AddPatients;
