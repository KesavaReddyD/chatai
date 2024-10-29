import { loginapihit, signupapihit, verifyapihit } from "@/helpers/api_communicator";
import axios from "axios";
import {createContext, ReactNode, useContext, useEffect, useState } from "react";

type User = {
    name: string;
    email: string;
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    login(email: string , password: string): Promise<void>;
    signup(name: string, email: string, password: string): Promise<void>;
    logout(): Promise<void>;
}

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setisLoggedIN] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifying = async() => {
            const data = await verifyapihit();
            if(data){
                setUser({name: data.name, email: data.email});
                setisLoggedIN(true);
                setLoading(false);
                // console.log(user);
            }
        }
        verifying();
    },[]);

    const login = async (name: string , password: string) => {
        const data = await loginapihit(name, password);
        if(data){
            setUser({name: data.name, email: data.email});
            setisLoggedIN(true);
            setLoading(false);
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        const data = await signupapihit(name, email, password);
        if(data){
            setUser({name: data.name, email: data.email});
            setisLoggedIN(true);
            setLoading(false);
        }
    };


    const logout = async () => {
        const data = await axios.get('/users/logout', {
            withCredentials: true
        });
        if(data.status !== 200){
            throw new Error("not logged out");
        }
        setUser(null);
        setisLoggedIN(false);
    };

    const value : UserAuth = {
        user,
        isLoggedIn,
        login,
        signup,
        logout,
        loading 
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// export default const useAuth = useContext(AuthContext);
export const useAuth = (): UserAuth | null => useContext(AuthContext);
