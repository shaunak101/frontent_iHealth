import { useNavigate } from "react-router-dom";
import {UserNavBar} from "../../../components/navBar";

function UserHome(){
    let navigator = useNavigate();
    return (
        <div className="bg-white dark:bg-gray-900 w-full h-full">
            <UserNavBar/>

            <div className="container px-6 py-16 mx-auto text-center h-screen w-full">
                <div className="h-full w-full">
                    <ul className="list-none h-full w-full overflow-x-auto scrollbar-hide flex flex-row">
                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                            <div className="bg-white rounded-3xl overflow-hidden mb-10 m-5 w-9/10">
                                <img
                                    src={require("./img.png")}
                                    alt="image"
                                    className="w-full"
                                    />
                                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                                    <h3>
                                        <a
                                        href="javascript:void(0)"
                                        className="
                                        font-semibold
                                        text-dark text-xl
                                        sm:text-[22px]
                                        md:text-xl
                                        lg:text-[22px]
                                        xl:text-xl
                                        2xl:text-[22px]
                                        mb-4
                                        block
                                        hover:text-primary
                                        ">
                                            Add Doctors
                                        </a>
                                    </h3>
                                    <p className="text-base text-body-color leading-relaxed mb-7">
                                        If you need to add your doctors this is the place to start
                                    </p>
                                    <a
                                        onClick={() => {navigator("/home/addDoctors")}}
                                        href="javascript:void(0)"
                                        className="
                                        inline-block
                                        py-2
                                        px-7
                                        border border-[#E5E7EB]
                                        rounded-full
                                        text-base text-body-color
                                        font-medium
                                        hover:border-primary hover:bg-primary hover:text-white
                                        transition
                                        "
                                        >
                                        Click Here
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                            <div className="bg-white rounded-3xl overflow-hidden mb-10 m-5 w-9/10">
                                <img
                                    src={require("./img2.png")}
                                    alt="image"
                                    className="w-full"
                                    />
                                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                                    <h3>
                                        <a
                                        href="javascript:void(0)"
                                        className="
                                        font-semibold
                                        text-dark text-xl
                                        sm:text-[22px]
                                        md:text-xl
                                        lg:text-[22px]
                                        xl:text-xl
                                        2xl:text-[22px]
                                        mb-4
                                        block
                                        hover:text-primary
                                        ">
                                            View Records
                                        </a>
                                    </h3>
                                    <p className="text-base text-body-color leading-relaxed mb-7">
                                        Looking for records? Click below to view all of your recent records
                                    </p>
                                    <a
                                        href="javascript:void(0)"
                                        onClick={() => {navigator("/home/userRecords")}}
                                        className="
                                        inline-block
                                        py-2
                                        px-7
                                        border border-[#E5E7EB]
                                        rounded-full
                                        text-base text-body-color
                                        font-medium
                                        hover:border-primary hover:bg-primary hover:text-white
                                        transition
                                        "
                                        >
                                        Click Here
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                            <div className="bg-white rounded-3xl overflow-hidden mb-10 m-5 w-9/10">
                                <img
                                    src={require("./img3.png")}
                                    alt="image"
                                    className="w-full"
                                    />
                                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                                    <h3>
                                        <a
                                        href="javascript:void(0)"
                                        className="
                                        font-semibold
                                        text-dark text-xl
                                        sm:text-[22px]
                                        md:text-xl
                                        lg:text-[22px]
                                        xl:text-xl
                                        2xl:text-[22px]
                                        mb-4
                                        block
                                        hover:text-primary
                                        ">
                                            Account Info
                                        </a>
                                    </h3>
                                    <p className="text-base text-body-color leading-relaxed mb-7">
                                        Need to view details?
                                    </p>
                                    <a
                                        onClick={() => navigator("/home/accountInfo")}
                                        className="
                                        inline-block
                                        py-2
                                        px-7
                                        border border-[#E5E7EB]
                                        rounded-full
                                        text-base text-body-color
                                        font-medium
                                        hover:border-primary hover:bg-primary hover:text-white
                                        transition
                                        "
                                        >
                                        Click Here
                                    </a>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>

        </div>

    )
}

export default UserHome;
