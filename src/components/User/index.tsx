import { useEffect, useState } from "react";
import {Redirect, useParams} from "react-router";
import User from "./User";
function Search(){
    const [wallet, setWallet] = useState<boolean>(true);
    const [account ,setAccount] = useState<boolean|string>(true);
    {/**@ts-ignore */}
    const {params} = useParams();
    const connectAccount = async() => {
        setWallet(false);
        {/**@ts-ignore */}
        const {ethereum} = window;
        if(!ethereum){
            setWallet(false);
            setAccount(false);
        }else{
            setWallet(true);
            try{
                const wallet = await ethereum.request({method: "eth_accounts"});
                if(!(wallet.length > 0 && wallet[0])){
                  setAccount(false);
                  setWallet(true);
                }else{
                  setWallet(true);
                  setAccount(wallet[0].toString()); 
  
                } 
              }catch(err){
                console.log(err);
                setAccount(false);
              }
        }
    }
    useEffect(() => {
        connectAccount().then().catch(err => console.log(err));
    },[])
    return (
        <>
            {wallet ? <>{
                account ? 
                <>
                    <User account={account} view={params}/>
                </>
                : <Redirect to="/" />
            }</>
            : <Redirect to="/" />}
        </>
    )
}
export default Search;