import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AuthorizationChangeContext, AuthorizationContext } from "./authorizationcontext";
import { axiosContext } from "./axioscontext";
import { fetchUserData } from "./fetchdata";

export const userContext = createContext(null);
export const userDispatchContext = createContext(null);

function userReducer(user, action) {
    switch (action.type) {
        case 'logout': {
            localStorage.setItem("User", null);
            return null;
        }
        case 'add-product': {
            let newProducts = [...user.products, action.product]
            let newUser = {
                ...user,
                "products": newProducts
            };
            localStorage.setItem("User", JSON.stringify(newUser))
            return newUser;
        }
        case 'delete-product': {
            let products = user.products.filter(p => p.id != action.id);
            let newUser = {
                ...user,
                "products": products
            }
            return newUser;
        }
        case 'load-user-data': {
            localStorage.setItem("User", JSON.stringify(action.data));
            return action.data;
        }
        default: {
            return user;
        }
    }
}

export function UserProvider({ children }) {
    const [user, userDispatch] = useReducer(userReducer, JSON.parse(localStorage.getItem("User")));
    const authorization = useContext(AuthorizationContext);
    const setAuthorization = useContext(AuthorizationChangeContext);
    const [requireFetch, setRequireFetch] = useState(false);
    const axios = useContext(axiosContext);


    useEffect(() => {
        if (requireFetch) {
            fetchUserData(axios)
                .then((data) => {
                    if (data == 401) {
                        localStorage.setItem('Authorization', null);
                        localStorage.setItem('User', null);
                        localStorage.setItem('lastFetchTime', null);
                        setAuthorization(false);
                    }
                    if (data != null) {
                        userDispatch({
                            type: 'load-user-data',
                            data: data
                        });
                        setRequireFetch(false);
                    }
                })
        }
    }, [requireFetch])

    const lastFetchTime = localStorage.getItem('lastFetchTime');
    // if the user is authorized and (there is no data about user or there is not data about last fetch time or if the last fetch time was more than 24 hours) and requirefetch is false then set the requirefetch to true to trigger useEffect
    if ((user == null || lastFetchTime == null || (Date.now() - lastFetchTime) > (24 * 60 * 60 * 100)) && authorization && !requireFetch) {
        setRequireFetch(true);
        localStorage.setItem('lastFetchTime', Date.now());
    }

    return (
        <userContext.Provider value={user}>
            <userDispatchContext.Provider value={userDispatch}>
                {children}
            </userDispatchContext.Provider>
        </userContext.Provider >
    )
}