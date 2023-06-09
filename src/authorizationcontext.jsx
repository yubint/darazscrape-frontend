import { createContext, useState } from "react";

export const AuthorizationContext = createContext(null);
export const AuthorizationChangeContext = createContext(null);

export function AuthorizationProvider({ children }) {
    const [authorization, setAuthorization] = useState(JSON.parse(localStorage.getItem("Authorization")));

    return (
        <AuthorizationChangeContext.Provider value={setAuthorization}>
            <AuthorizationContext.Provider value={authorization}>
                {children}
            </AuthorizationContext.Provider>
        </AuthorizationChangeContext.Provider >
    )
}