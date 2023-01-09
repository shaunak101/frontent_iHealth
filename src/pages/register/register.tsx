import { ethers } from "ethers";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { setAlertEnabled } from "../../components/alertComponent";
import { contractABI, contractAddress, userABI } from "../../global/contractDetails";
import { decryptData } from "../../global/encryption";
import { getFileIPFS } from "../../global/ipfs";
import { createInLocalStorage } from "../../global/localStorage";
import { createKeyPair, setKey } from "../../global/DocEncryption";

function fixManagingAddress(address:string){
    return address;
}

function Register(){
    let [isOpen, setOpen] = useState(false);
    let naviagator = useNavigate();
    createKeyPair("");

    function registerBtn(route:string){
        naviagator(route);
    }

    async function handleSignInClick(){
        const address = contractAddress;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const ABI = contractABI;

        const contract = new ethers.Contract(address, ABI, signer);
        const userIPFSLink = await contract.signIn();

        let ipfsData = await getFileIPFS(userIPFSLink);
        let jsonData = await decryptData(ipfsData[0]);

        await createInLocalStorage(jsonData, "userData");

        const managingAddress = await contract.getManagingAddress();

        const accountContract = new ethers.Contract(fixManagingAddress(managingAddress), userABI, signer);
        const {encKey, pubAdd} = await accountContract.getProfile();
        const privateKey = await decryptData(encKey.toString());

        console.log(await accountContract.getProfile());

        localStorage.setItem("privateKey", privateKey);


        createInLocalStorage(fixManagingAddress(managingAddress), "managingAddress");

        naviagator("/home");
        setAlertEnabled(true, true, "Everything is Set!");
    }
    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
            <nav className="container p-6 mx-auto lg:flex lg:justify-between lg:items-center">
                <div className="flex items-center justify-between">
                    <div>
                        <a className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300" href="#">
                            iHealth
                        </a>
                    </div>

                    <div className="flex lg:hidden">
                        <button onClick={() => {setOpen(!isOpen)}} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                            {isOpen? <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" /></svg>: null}
                            {!isOpen? <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>: null}
                        </button>
                    </div>
                </div>

                {!isOpen?
                <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md lg:shadow-none dark:bg-gray-900 lg:mt-0 lg:p-0 lg:top-0 lg:bg-transparent lg:dark:bg-transparent lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
                    <div className="flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:space-y-0">
                        <a className="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500" href="#">Home</a>
                        <a className="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500" href="#">Features</a>
                        <a className="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500" href="#">Pricing</a>
                        <a className="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500" href="#">Contact</a>
                        <a className="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500" href="#">FAQ</a>
                    </div>

                    <a className="block h-10 px-5 py-2 mt-4 text-sm text-center text-gray-700 capitalize transition-colors duration-300 transform border rounded-md dark:hover:bg-gray-700 dark:text-white lg:mt-0 hover:bg-gray-100 lg:w-auto" href="#">
                        Contact Us
                    </a>
                </div>: null}
            </nav>

            <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-800 xl:text-4xl dark:text-white">
                            Sign In or Create an Account
                        </h2>

                        <br/>
                        <p className="block max-w-4xl mt-4 text-gray-500 dark:text-gray-300">
                            New? Click create account to get started. Returning member? Don't worry we havn't forgotten about you. Click sign in to return to your profile.
                        </p>

                    <div className="mt-6">
                        <a onClick={()=>{registerBtn("signUp")}} className="inline-flex items-center justify-center w-full px-5 py-3 overflow-hidden text-white transition-colors duration-300 bg-gray-900 rounded-lg shadow sm:w-auto sm:mx-2 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                            <span className="mx-2">
                                Create Account
                            </span>
                        </a>

                        <a onClick={handleSignInClick} href="#" className="inline-flex items-center justify-center w-full px-5 py-3 mt-4 overflow-hidden text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                            <span className="mx-2">
                                Sign In
                            </span>
                        </a>
                    </div>
            </div>
        </div>)
}

export default Register;
