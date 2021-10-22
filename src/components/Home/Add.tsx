import React, { useState } from "react";
import { Form , Button, Card} from "react-bootstrap";
import {ethers} from "ethers";
import abi from "../../sol/Twitter.json";
import Display from "./Display";
type NewType = {
    account:string;
};

function Add({account}:NewType){
  const [text, setText] = useState("");
  const [read, setRead] = useState(false);
  const [disable, setDisable] = useState(false);
  const createTweet = async() => {
    {/**@ts-ignore*/}
    const {ethereum} = window; 
    try{
      setDisable(true);
      const providers = new ethers.providers.Web3Provider(ethereum);
      const {name} = await providers.getNetwork();
      if((name).toString() !== "goerli"){
        console.log("Invalid Network. Please select Goerli network to function");
        setDisable(false);
      }else{
      const signer = providers.getSigner();
      const Twitter = new ethers.Contract("0x2ae08a2ed68F4262D1Bb6E5C00A5Dd6a0292e2Bf",abi.abi,signer);
      const txn = await Twitter.createTweet(text.toString());
      await txn.wait();
      setRead(false);
      setText("");
      setDisable(false);
      } 
      }catch(err){
      console.log(err);
      setDisable(false);
    }
  }
    const submit = (e:React.FormEvent) => {
        e.preventDefault();
        createTweet().then().catch(err => console.log(err));
    }
    return(
        <> 
        <Card style={{ width: '35rem'}} className="mx-auto mb-3">
            <Card.Body>
            <Form onSubmit={submit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control value={text} as="textarea" rows={3} placeholder="Create Your Tweet" onChange={e => setText(e.target.value)}/>
            </Form.Group>
            <div className="d-grid gap-4">
            <Button type="submit" variant="primary" size="lg" disabled={disable}>
                Tweet!
            </Button>
</div>
            </Form>
            </Card.Body>
            </Card>
        <Display dasta={read}/>
        </>
    )
}
export default Add;
