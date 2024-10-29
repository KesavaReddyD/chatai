import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [validemail , setValidemail] = useState(true);
  const [password, setPassword] = useState("");
  const [validpass, setValidpass] = useState(true);
  const [conpass, setConpass] = useState("");
  const [passwordmatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailregex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    return emailregex.test(email);
  }

  const validatepass = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    setValidpass(passwordRegex.test(password));
    console.log(`password validation: ${validpass}`);
    if(password != conpass) setPasswordMatch(false);
    else setPasswordMatch(true);

    console.log(`password matched: ${passwordmatch}`);
  }

  const auth = useAuth();

  const handleSubmit = async () => {
    setValidemail(validateEmail(email));
    validatepass(password);
    if(validemail && validpass && passwordmatch){
      try{
        const lot = toast.loading("signing up");
        await auth?.signup(name, email, password);
        toast.dismiss(lot);
        navigate('/chat');
      }catch(err: any){
        //console.log(err.response.status);
        toast.dismiss();
        if(err?.response?.status === 409){
          toast.success("User already exists!!");
          navigate('/login');
        }
        else{
          toast.error("failed to sign up");
        }
      }
    }
  }

  return (
    <div className="flex flex-col  gap-2 w-1/3 m-auto">
      <Input type="text" placeholder="name" onChange={(e) => setName(e.target.value)}/>
      <Input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} className={`${validemail ? 'border-gray-50' : 'border-red-600'}`}/>
      {!validemail && <p className="text-xs text-red-500">invalid email</p>}
      <Input type="password" placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} className={`${ (passwordmatch && validpass) ? 'border-gray-50' : 'border-red-600'}`}/>
      {!validpass && <p className="text-xs text-red-500">password must have min 8 chars and contain a number and alphabet.</p>}
      <Input type="password" placeholder="re-enter your password" onChange={(e) => setConpass(e.target.value)} className={`${passwordmatch ? 'border-gray-50' : 'border-red-600'}`}/>
      {!passwordmatch && <p className="text-xs text-red-500">password did not match</p>}
      <Button onClick={handleSubmit} className="w-1/2">Sign Up</Button>
    </div>
  )
}

export default Signup