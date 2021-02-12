import React, { useEffect, useState } from "react";
import Account from "./Account";
import Axios from "axios";
import debounce from "../Library/debounce";
import "./index.css";
import Input from "../Input";

export default function AccountSearch(props) {
  const [results, setResults] = useState([]);
  const [username, setUsername] = useState("");
  const debouncedSetUsername = debounce((username) => {
    setUsername(username);
  }, 500);

  useEffect(() => {
    async function getResults() {
      let formattedUsername = username.trim();
      if (formattedUsername !== "") {
        const response = await Axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/channel/${props.platform}/search?username=${formattedUsername}`
        );
        setResults(response.data.data.results.channels);
      }
    }
    getResults();
  }, [username, props.platform]);

  const handleAccountSelection = (channel) => {
    props.onAccountSelection(channel);
  };

  function handleChange(value) {
    debouncedSetUsername(value);
  }

  return (
    <div className="account-container">
      <Input onChange={handleChange} label={`${props.platform} username`} />
      <div className="account-search-results">
        {results.map((result) => {
          return (
            <Account
              profilePicture={result.profilePicture}
              key={result.id}
              id={result.id}
              subscriberCount={result.subscriberCount}
              onClick={handleAccountSelection}
              username={result.username}
            />
          );
        })}
      </div>
    </div>
  );
}
