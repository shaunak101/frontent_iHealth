import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAlertEnabled } from "../../components/alertComponent";
import { encryptData } from "../../global/encryption";
import { createAccountEth } from "../../global/interactWithEth";
import { addToIPFS } from "../../global/ipfs";
import { createKeyPair } from "../../global/DocEncryption";


function SignUp(){

    const deselected = "flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none";
    const selected = "flex justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-lg md:w-auto md:mx-2 focus:outline-none"

    let [patientBtnState, setPatientButton] = useState(false);
    let [doctorBtnState, setDoctorButton] = useState(false);

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [dob, setDob] = useState(0);
    let [eirCode, setEirCode] = useState("");
    let [pps, setPps] = useState("");
    let [registationNum, setRegistrationNum] = useState("");
    let [isDoctor, setIsDoctor] = useState(false);

    let [eventVal, setEventVal] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        if(eventVal == true){
            setAlertEnabled(true, true, "Account Created! Sign In to get started");
            navigator("/register");
        }

    }, [eventVal])

    async function submitFunction(e:any){
        e.preventDefault();
        let data;

        isDoctor? data = {
            firstname : firstName,
            lastname : lastName,
            dateofbirth : dob,
            address : eirCode,
            ppsnumber : pps,
            type : "Doctor",
            registationnum : registationNum
        } : data = {
            firstname : firstName,
            lastname : lastName,
            dateofbirth : dob,
            address : eirCode,
            ppsnumber : pps,
            type : "Patient",
        }

        let msg = await encryptData(JSON.stringify(data));
        const ipfsCID = await addToIPFS(msg);

        const {publicKey, encryptedKey} = await createKeys(firstName + lastName);
        createAccountEth(ipfsCID, pps, isDoctor, setEventVal, publicKey.toString(),encryptedKey);
    }

    return (
<div className="bg-white dark:bg-gray-900">
    <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/5" style={{backgroundImage: require("./img.png")}}>
            <img src={require("./img.png")} className="h-screen"></img>
        </div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
                <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                    Get your account now.
                </h1>

                <p className="mt-4 text-gray-500 dark:text-gray-400">
                    Let’s get you all set up so you can verify your personal account and begin setting up your profile. Please Approve the metamask box when it pops up. NOTE: There is a 30 second wait for account creation
                </p>

                <div className="mt-6">
                    <h1 className="text-gray-500 dark:text-gray-300">Select type of account</h1>

                    <div className="mt-3 md:flex md:items-center md:-mx-2">
                        <button className={patientBtnState? selected: deselected} onClick={() => {setDoctorButton(false); setPatientButton(true); setIsDoctor(true)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>

                            <span className="mx-2">
                                Doctor
                            </span>
                        </button>

                        <button className={doctorBtnState? selected: deselected} onClick={() => {setPatientButton(false); setDoctorButton(true); setIsDoctor(false)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>

                            <span className="mx-2">
                                Patient
                            </span>
                        </button>
                    </div>
                </div>

                <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={submitFunction}>
                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                        <input value={firstName} onChange={(e) => {setFirstName(e.target.value)}} type="text" placeholder="John" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last name</label>
                        <input value={lastName} onChange={(e) => {setLastName(e.target.value)}} type="text" placeholder="Snow" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Date of birth</label>
                        <input onChange={(e) => {setDob(e.target.valueAsNumber)}} type="date" placeholder="Date of Birth" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Address</label>
                        <input value={eirCode} onChange={(e) => {setEirCode(e.target.value)}} placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">PPS Number</label>
                        <input value={pps} onChange={(e) => {setPps(e.target.value)}} placeholder="Enter your PPS" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    { isDoctor? <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Registration Number</label>
                        <input value={registationNum} onChange={(e) => {setRegistrationNum(e.target.value)}} placeholder="Enter your Registration Number" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div> : null}

                    <button
                        type="submit"
                        className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        <span>Sign Up </span>

                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
    );
}


async function createKeys(name:string) {
    let {privateKey, publicKey} = await createKeyPair(name);

    let encryptedKey = await encryptData(privateKey);

    return {publicKey, encryptedKey}

}

export default SignUp;
