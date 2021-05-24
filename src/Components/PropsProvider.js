import React, { useContext, useState } from 'react'

const PropsContext=React.createContext();

export function useProps(){
    return useContext(PropsContext);
}

function PropsProvider({children}) {
    const [props,setProps]=useState({
        id:"",
        uname:"",
    });
    const setProperties=()=>{
        setProps(prevProps=>{
            return [ ...prevProps,{id:prevProps.id,uname:prevProps.uname}]
        })
        console.log(props);
    }
    return (
        <PropsContext.Provider value={{props,setProperties}}>
            {children}
        </PropsContext.Provider>
    )
}

export default PropsProvider;
