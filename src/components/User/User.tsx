import Navb from "../Nav";
import {ethers} from "ethers";
import abi from "../../sol/Twitter.json";
import { useEffect, useState } from "react";
import CardS from "./card";
interface Props{
    account:string|boolean;
    view: string;
}
function User ({account, view}:Props) {
    const [data, setData] = useState([]);
    const find = async() => {
        {/**@ts-ignore */}
        const {ethereum} = window;
        try{
            const providers = new ethers.providers.Web3Provider(ethereum);
            const {name} = await providers.getNetwork();
            if((name).toString() !== "goerli"){
              console.log("Invalid Network. Please select Goerli network to function");
            }else{
              const signer = providers.getSigner();
              const Twitter = new ethers.Contract("0x2ae08a2ed68F4262D1Bb6E5C00A5Dd6a0292e2Bf",abi.abi,signer);
              const data = await Twitter.getTweetByUser(view.toString());
              setData(data);
          } 
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        find().then().catch(err => console.log(err));
    })
    return (
        <>
        {typeof(account) === "string" ? 
        <>
            <Navb account={account} />
            <br />
            <hr />
            {/**@ts-ignore */}
            <h1 align="center">Your Viewing Tweet of {view}</h1>
            <br />
            <hr />
            {data.length ? 
                data.map((e:any,i:number) => <CardS body={e.body} hash={e.hash} time={new Date(e.time*1000).toLocaleString()} tweeter={e.tweeter}  key={i}/>) : <h1>There is no Tweet by this User</h1>}
            
        </>
        : null}
        </>
    )
}
export default User;