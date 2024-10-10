import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useAuth = () => {
    const userData = useSelector((state)=> state.auth.userData);
    const [userId, setUserId] = useState(null);
    useEffect(()=>{
        if(userData){
            setUserId(userData.$id);
        } else{
            setUserId(null)
        }
    }, [userData])
  return userId
}

export default useAuth;
