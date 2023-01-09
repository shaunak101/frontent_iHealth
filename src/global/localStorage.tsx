function createInLocalStorage(data:any, name:string){
    localStorage.setItem(name, data);
}

function getFromLocalStorage(name:string){
    if(localStorage.getItem(name) == null){
        return "error";
    } else{
        return JSON.stringify(localStorage.getItem(name))
    }
}

export {createInLocalStorage, getFromLocalStorage};
