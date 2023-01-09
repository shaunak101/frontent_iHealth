import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAlertEnabled } from "../../components/alertComponent";
import { connectAccount, signer } from "../../global/Metamask";

function Welcome(){
    let [isOpen, setOpen] = useState(false);
    let [connected, setConnected] = useState(false)
    let navigator = useNavigate();

    useEffect(() => {
        if(signer != 0){
            setConnected(true);
        }

        if(connected == true){
            navigator("/register")
        }
    }, [connected]);

    async function startButton(){
        try{
            await connectAccount();
            setConnected(true);
        } catch(e){
            console.log(e);
        }
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

            <div className="container px-6 py-16 mx-auto text-center">
                <div className="max-w-lg mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">A next gen Healthcare Platform using Blockchain</h1>

                    <p className="mt-6 text-gray-500 dark:text-gray-300">
                        A revolutionary Healthcare platform using blockchain technology at your fingertips
                    </p>

                    <div className="w-full max-w-sm mx-auto mt-6 bg-transparent border rounded-md dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-300 focus-within:ring-opacity-40">
                        <form className="flex flex-col md:flex-row" >
                            <label className = "flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0" >Try it out?</label>
                            <button type="button" onClick={startButton} className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400">Get Started</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Welcome;
