import { ReactNode, createContext, useContext, useState } from "react";

export type StateContextType = {
    baseUrl: string | null,
    user: string | null;
    setUser: (user: string) => void;
    token: string | null;
    setToken: (token: string) => void;
}

export type TokenProviderProps = {
    children: ReactNode
}

export const tokenContext = createContext<StateContextType | null>(null)

export const TokenProvider = ({ children }: TokenProviderProps) => {
    const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api`;
    const [user, setUser] = useState("");
    const [token, _setToken] = useState(localStorage.getItem('TOKEN'));

    const setToken = (token: string | null) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return <tokenContext.Provider value={{ baseUrl, user, setUser, token, setToken }}>
        {children}
    </tokenContext.Provider>
}

//consumer
export const useToken = () => {
    const tokenConsumer = useContext(tokenContext);
    if (!tokenConsumer) {
        throw new Error("useToken used outside of provider");
    }
    return tokenConsumer;
}
