import Navb from "../Nav";
import Add from "./Add";
interface Props {account:string|boolean;}
const Home = ({account}:Props) => {
    return (
        <>
        <Navb account={account.toString()} />
        <Add account={account.toString()}/>
        </>
    )
}
export default Home;
