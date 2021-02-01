import { useHistory } from "react-router-dom";


const NoUser  = () =>
{
    let history = useHistory();

    const handleClick = () =>
    {
        history.goBack();
    }

    return(
        <div>
            <h3> This User Is Not Exiest</h3>
            <button type="button" onClick={handleClick}>Go Back </button>
        </div>
    ) 
}

export default NoUser
