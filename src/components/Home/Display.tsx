import abi from "../../sol/Twitter.json";
import {ethers} from "ethers";
import React, {useEffect, useState} from "react";
import Tweet from "./Tweet";
interface showoff{
  dasta:boolean;
}
function Display({dasta}:showoff){
    const [data, setData] = useState([]);
    const showTweet = async() => {
        {/**@ts-ignore*/}
        const {ethereum} = window; 
        try{
          const providers = new ethers.providers.Web3Provider(ethereum);
          const {name} = await providers.getNetwork();
          if((name).toString() !== "goerli"){
            console.log("Invalid Network. Please select Goerli network to function");
          }else{
            const signer = providers.getSigner();
            const Twitter = new ethers.Contract("0x2ae08a2ed68F4262D1Bb6E5C00A5Dd6a0292e2Bf",abi.abi,signer);
            setData(await Twitter.getAllTweets());
        } 
          }catch(err){
          console.log(err);
        }
      }
      useEffect(() => {
          showTweet().then().catch(err => console.log(err));
      },[]);
      return (
          <>
            {data ? 
              <>
              {data.map((e:any,i:any) => <Tweet body={e.body} hash={e.hash} time={new Date(Number(e.time*1000)).toLocaleString()} tweeter={e.tweeter} key={i} />)}
              </>
            : null}
          </>
      )
}
export default Display;