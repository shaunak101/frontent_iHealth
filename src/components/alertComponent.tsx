import { useEffect, useState } from "react";

let msgFunc:any;
let colorFunc:any;
let func:any;

function AlertComponent(){
    let [enabledState, setState] = useState(false);
    let [color, setColor] = useState("bg-emerald-500");
    let [msg, setMsg] = useState("");

    useEffect(() => {
        func = setState;
        msgFunc = setMsg;
        colorFunc = setColor;
    }, [enabledState]);

    function close(){
        setState(false);
    }

    if(enabledState){
        const renderedCol = `w-full text-white ${color} absolute inset-x-0 bottom-0`
         return(
            <div className={renderedCol}>
                <div className="container flex items-center justify-between px-6 py-4 mx-auto">
                    <div className="flex">
                        <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z">
                            </path>
                        </svg>

                        <p className="mx-3">{msg}</p>
                    </div>

                    <button onClick={close} className="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    } else{
        return (<div/>)
    }
}

function setAlertEnabled(val:boolean, success:any, msg:string){
    func(val);
    success? colorFunc("bg-emerald-500") : colorFunc("bg-red-500");
    msgFunc(msg);
}

export {AlertComponent, setAlertEnabled};
