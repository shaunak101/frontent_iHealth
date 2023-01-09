import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserNavBar(){
    let [isOpen, setOpen] = useState(false)
    let navigator = useNavigate();

    return (
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
            <a onClick = {() => {navigator("/home")}} className="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500" href="#">Home</a>
            <a className="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500" href="#" onClick= {() => navigator("/home/userRecords")}>Records</a>
            <a className="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500" href="#">Alergies</a>
            <a onClick = {() => {navigator("/home/addDoctors")}} className="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500" href="#">Doctors</a>
        </div>

        <a onClick={() => navigator("/home/accountInfo")} className="block h-10 px-5 py-2 mt-4 text-sm text-center text-gray-700 capitalize transition-colors duration-300 transform border rounded-md dark:hover:bg-gray-700 dark:text-white lg:mt-0 hover:bg-gray-100 lg:w-auto" href="#">
            Account Info
    	</a>
    </div>: null}
</nav>)
}

function DoctorNavBar(){
    let [isOpen, setOpen] = useState(false)
    let navigator = useNavigate();

    return (
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
            <a onClick = {() => {navigator("/home")}} className="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500" href="#">Home</a>
            <a className="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500" onClick={() => {navigator("/home/createRecords")}}>Records</a>
            <a className="text-gray-700 lg:mx-6 dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500" onClick={() => {navigator("/home/addPatients")}}>Patients</a>
        </div>

        <a onClick={() => navigator("/home/accountInfo")} className="block h-10 px-5 py-2 mt-4 text-sm text-center text-gray-700 capitalize transition-colors duration-300 transform border rounded-md dark:hover:bg-gray-700 dark:text-white lg:mt-0 hover:bg-gray-100 lg:w-auto" href="#">
            Account Info
    	</a>
    </div>: null}
</nav>)
}

export {UserNavBar, DoctorNavBar}
