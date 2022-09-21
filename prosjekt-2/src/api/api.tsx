import { useEffect, useState } from "react";

interface Props {
    accessToken: string;
    gitlabRepoLink: string;
}

function Connect({accessToken, gitlabRepoLink}: Props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [resultData, setResult] = useState([])

    // getRepo is based on the example in React's Ajax documentation https://reactjs.org/docs/faq-ajax.html
    const getRepo = () => {
        fetch(gitlabRepoLink,
            {
                method: 'GET',
                headers: {
                    'PRIVATE-TOKEN': accessToken
                }

            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setResult(result);
                    console.log(result);
                },
                // litt usikker på hva som skal til for å trigge denne atm 
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                    console.log(error);
                })
    }
    
    useEffect(() => {
        getRepo()
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [accessToken]);


    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return <p>{JSON.stringify(resultData)}</p>;
    }
}
export default Connect;