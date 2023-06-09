import axios from "axios";
import { createContext, useContext } from "react";
import { AuthorizationContext } from "./authorizationcontext";

export const axiosContext = createContext(null);

export function AxiosProvider({ children }) {
    const authorization = useContext(AuthorizationContext);

    let APIinstance;

    if (authorization != null) {
        APIinstance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${authorization}`
            }
        })
    }
    else {
        APIinstance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    return (
        <axiosContext.Provider value={APIinstance}>
            {children}
        </axiosContext.Provider>
    )
}