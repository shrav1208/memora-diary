import {useState, useContext, createContext, useEffect} from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading ] = useState(true);

    useEffect(()=>{
        (async()=>{
            try{
                const res = await api.get("/api/auth");
                setUser(res.data.user);
                setLoading(false);
            }
            catch(err){
                console.error(err);
                setUser(null);
                setLoading(false);
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{user, loading, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>{
    return useContext(AuthContext);
};
