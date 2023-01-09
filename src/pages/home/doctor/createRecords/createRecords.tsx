import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { setAlertEnabled } from "../../../../components/alertComponent";
import { DoctorNavBar } from "../../../../components/navBar";
import DoctorRecordTile from "../../../../components/patientRecordTile";
import { doctorTokenABI } from "../../../../global/contractDetails";
import { getFromLocalStorage } from "../../../../global/localStorage";

function CreateRecords(){
    let [patients, setPatients]:any[] = useState([]);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = getFromLocalStorage("managingAddress")

    useEffect(() => {
        const getData = async () => {
            let requests = await fetchData();

            let currentPatients = await getPatients();
            setPatients(currentPatients)
        }

        getData();
    }, []);

    async function fetchData(){
        let signer = provider.getSigner();
        let fixedAddress = address.replaceAll('"', "");
        let contract = new ethers.Contract(fixedAddress, doctorTokenABI, signer);

        let running = true;
        let recordsArr:any[] = [];
        let iterator = 0;

        while (running){
            try{
                const requests = await contract.requests(iterator);
                recordsArr.push(requests);
                iterator++
            } catch(e){
                running = false;
            }
        }
        return recordsArr
    }

    async function addPatient(patientAddress:string){
        let signer = provider.getSigner();
        let fixedAddress = address.replaceAll('"', "");
        let contract = new ethers.Contract(fixedAddress, doctorTokenABI, signer);

        const res = await contract.addPatient(patientAddress).then(() => {setAlertEnabled(true, true, `Added ${patientAddress}!`)});

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

        <div>
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">Your <span className="text-blue-500">Patients</span></h1>

                <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
                    Click on one of your patients to view their past records or create a custom record for them. If you dont see your patient, make sure you have added them before
                </p>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2">
                    {patients.length != 0? patients.map((ele:any) => <DoctorRecordTile address={ele}></DoctorRecordTile>) : null}
                </div>
                </div>
            </div>
    </div>)
}


export {CreateRecords};
