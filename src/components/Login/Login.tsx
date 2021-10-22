import {useEffect, useState} from "react";
import { Alert, Container, Button } from "react-bootstrap";
import Home from "../Home/Home";
import Navb from "../Nav";
function Login(){
    const [isWallet, setWallet] = useState<boolean>(false);
    const [isAccount, setAccount] = useState<boolean|string>(false);
    // const checkWallet = async() => {
    //     {/**@ts-ignore */}
    //     const {ethereum} = window;
    //     if(!ethereum){
    //         setWallet(false);
    //     }else{
    //         setWallet(true);
    //         checkAccount().then().catch(err => console.log(err));
    //     }
    // }
    
    const checkAccount = async() => {
        {/**@ts-ignore */}
        const {ethereum} = window;
        if(!ethereum){
            setWallet(false);
        }else{
            setWallet(true);
            try{
                const account = await ethereum.request({method: "eth_accounts"});
                if(!(account.length > 0 && account[0])){
                    setAccount(false);
                }else{
                    setAccount(account[0].toString());
                }
            }catch(err){
                console.log(err);
            }
        }
    }
    useEffect(() => {
        checkAccount().then().catch(err => console.log(err));
    },[]);
    const connectApp = async() => {
        {/**@ts-ignore */}
        const {ethereum} = window;
        if(!ethereum){
           setWallet(false);
           setAccount(false);
        }else{
            try{
              const wallet = await ethereum.request({method: "eth_requestAccounts"});
              if(!(wallet.length > 0 && wallet[0])){
                setAccount(false);
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
    return(
        <>
        {
            isWallet ? (
                <>
                    {
                        isAccount ? 
                            <>
                                <Home account={isAccount} />
                            </>
                        : <>
                                <Navb account={false}/>
                                <Container>
                                <Alert variant="danger">
                                <Alert.Heading>Oh No! No Authorised Account!</Alert.Heading>
                                    <p>
                                        Connect Your Wallet to Dapp Twitter
                                    </p>
                                <h1><Button variant="primary" size="lg" active onClick={connectApp}>Connect Account</Button></h1>
                                </Alert>
                                </Container>
                           </>
                    }
                </>
            ): <>
                    <Navb account={false}/>
                    <hr />
                    <Container>
                    <Alert variant="danger">
                    <Alert.Heading>Oh No! No Address!</Alert.Heading>
                        <p>
                            Install a Wallet like a Metamask and Get a Address to connect with Dapp Twitter
                        </p>
                    </Alert>
                    </Container>
            </>
        }
        </>
    )
}
export default Login;