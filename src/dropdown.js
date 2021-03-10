import React,{useEffect, useRef, useState}  from "react";
import './App.css';
import './dropdown.css';
import recipes from './recipes.json';
import './App.js'


export default function Dropdown({
    options,
    id,
    label,
    prompt, 
    value, 
    onChange}) {

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState();
    const ref = useRef(null); 

    useEffect(() => {
     document.addEventListener("click", toggle)
     return() => document.removeEventListener("click", toggle);   
    },[]
    );

    function toggle(e) {
        console.dir([e.target, ref.current])
        setOpen(e && e.target === ref.current)
    }

    function filter (options) {
        return options.filter(
            (option) =>
            option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
        ); 
    }

    function displayValue() {
        if(query.length > 0) return query;
        if(value) return value[label];
        return "";
    }

    return (
    <div className="dropdown">
        <div className="control" 
        onClick={() => setOpen(prev => !prev)} >
            <div className="selected-value">
                <input type="text"
                ref={ref} 
                placeholder={value ? value[label] : prompt}
                value={displayValue()}
                onChange={e  => {
                    setQuery(e.target.value);
                    onChange(null);
                    }}
                    onClick={() => setOpen((prev) => !prev)}
                />
    
    

                </div>
                
            <div className={'arrow ${open ? "open" : null}'}/>
            </div>
            <div className={'options  ${open ? "open" : null}'}>
                {filter(options).map((option) => ( 
                <div 
                key={option[id]}
                className={'option ${value === option ? "selected" : null}'}
                onClick={() => {
                    setQuery("");
                    onChange(option);
                    setOpen(false);
                }}>{option[label]}</div>
                ))}
            </div>
        </div>
    );
}
    