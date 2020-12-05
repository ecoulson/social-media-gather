import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../Input";
import "./index.css";
import SearchDropdown from "./SearchDropdown";
import { ReactComponent as SearchIcon } from "../Assets/search.svg";
import Form from "../Form";

export default function SearchBar(props) {
    const history = useHistory();
    const [user, setUser] = useState("");
    
    function search() {
        setUser(() => "");
        history.push(`/search?query=${user}`)
    }

    return (
        <div className="search-bar-container">
            <SearchIcon className="search-icon" />
            <Form id="search-form" autoComplete="off" onSubmit={search}>
                <Input 
                    className="search-input" 
                    type="text"
                    value={user}
                    onChange={setUser} 
                    placeholder="Search for users" />
            </Form>
            <SearchDropdown onSelect={props.onSelect} username={user} />
        </div>
    )
}