import {DoctorNavBar, UserNavBar} from "../../../components/navBar";
import { getFromLocalStorage } from "../../../global/localStorage";

function AcountInfo(){
    let data = JSON.parse(JSON.parse(getFromLocalStorage("userData")));

    let date = new Date(data.dateofbirth);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    const managingContractAddress = getFromLocalStorage("managingAddress");

    return (
        <div className="bg-white dark:bg-gray-900 h-screen">
            {data.type == "Patient"? <UserNavBar/>: <DoctorNavBar/>}
            <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <div className="lg:flex lg:-mx-6">
                    <div className="lg:w-3/4 lg:px-6">
                        <img className="object-cover object-center w-full h-80 xl:h-[28rem] rounded-xl" src={require("./img.png")} alt=""/>

                        <div>
                            <br/>
                            <h1 className="max-w-lg mt-4 text-4xl font-semibold leading-tight text-gray-800 dark:text-white">
                                Account Information
                            </h1>
                        </div>
                    </div>

                    <div className="mt-8 lg:w-1/4 lg:mt-0 lg:px-6">
                        <div>
                            <h3 className="text-blue-500 capitalize">Name</h3>

                            <a href="#" className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400 ">
                                {`${data.firstname} ${data.lastname}`}
                            </a>
                        </div>

                        <hr className="my-6 border-gray-200 dark:border-gray-700"/>

                        <div>
                            <h3 className="text-blue-500 capitalize">Date of Birth</h3>

                            <a href="#" className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400 ">
                                {`${day}/${month}/${year}`}
                            </a>
                        </div>

                        <hr className="my-6 border-gray-200 dark:border-gray-700"/>

                        <div>
                            <h3 className="text-blue-500 capitalize">Address</h3>

                            <a href="#" className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400 ">
                            {data.address}
                            </a>
                        </div>

                        <hr className="my-6 border-gray-200 dark:border-gray-700"/>

                        <div>
                            <h3 className="text-blue-500 capitalize">Managing Contract Address</h3>

                            <a children={managingContractAddress} href="#" className="block mt-2 font-medium text-gray-700 hover:underline hover:text-gray-500 dark:text-gray-400 "/>                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>

    )
}

export default AcountInfo;
