import React, { useEffect, useState } from 'react';
import Account from './Account';
import Axios from "axios"
import debounce from "../../Library/debounce";
import "./index.css";
import Input from '../../Input';

export default function AccountSearch(props) {
    const [results, setResults] = useState([])
    const [username, setUsername] = useState("")
    const debouncedSetResults = debounce((username) => {
        setUsername(username)
    }, 500)


    useEffect(() => { 
        async function getResults() {
            let formattedUsername = username.trim();
            if (formattedUsername !== "") {
                const response = await Axios.get(`/api/register/${props.platform}?username=${formattedUsername}`);
                setResults(response.data)
            }
        }
        getResults()
    }, [username, props.platform])

    return (
        <div className="account-container">
            <Input onChange={(event) => { handleChange(event, debouncedSetResults)}} label="username" />
            <div className="account-search-results">
                {results.map((result) => {
                    return <Account 
                                profilePicture={result.profilePicture} 
                                key={result.id}
                                id={result.id}
                                onClick={handleAccountSelection(props.onAccountSelection)}
                                username={result.username} />
                })}
            </div>
        </div>
    )
}

function handleAccountSelection(onAccountSelection) {
    return (id) => {
        onAccountSelection(id);
    }
}

function handleChange(value, setResults) {
    setResults(value)
}