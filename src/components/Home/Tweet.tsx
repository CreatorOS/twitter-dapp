import {Card} from "react-bootstrap";
interface Props{
    body:string;
    hash:string;
    time: String;
    tweeter: String;

}
function Tweet(props:Props){
    return(
        <>
            <Card style={{ width: '35rem' }} className="mx-auto text-white bg-secondary mb-3">
            <Card.Body>
                <Card.Text>
                    <b><i>{props.body}</i></b>
                </Card.Text>
                <Card.Text>Created At: {props.time}</Card.Text>
                <Card.Text>Created By: <a href={`/${props.tweeter}`}>{props.tweeter}</a></Card.Text>
            </Card.Body>
            </Card>
        </>
    )
}
export default Tweet;