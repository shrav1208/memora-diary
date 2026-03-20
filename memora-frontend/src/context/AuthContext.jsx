import {useState, useContext, createContext, useEffect} from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading ] = useState(true);

    useEffect(()=>{
        (async()=>{
            try{
                const res = await axios.get("/api/auth", {withCredentials: true});
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
