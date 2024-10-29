import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth } from "@/context/AuthContext";
import toast, {} from 'react-hot-toast'

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      toast.loading("logging out");
      await auth?.logout();
      toast.dismiss();
      toast.success("logged out");
      navigate('/login');
    }catch(err){
      toast.dismiss();
      toast.error("failed");
      console.log(err);
    }
  }


  return (
    <div className="flex p-3 justify-around ">
        <p className="font-bold text-xl hover:cursor-pointer select-none">ChatAI</p>
        {auth?.isLoggedIn ? (<div className="flex gap-3">
            <Link to="/chat"><Button>Chat</Button></Link>
            <Link to="/"><Button onClick={handleLogout}>Logout</Button></Link>
        </div> ):
        (<div className="flex gap-3">
            <Link to="/login"><Button>Login</Button></Link>
            <Link to="/signup"><Button>Sign up</Button></Link>
        </div>)}
    </div>

  )
}

export default Header