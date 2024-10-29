import { ChangeEvent, useState } from 'react'
import bg from '../assets/images/loginbg.jpg'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePass = (e: ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  }

  const handleSubmit = async () => {
    try{
      const lot = toast.loading("signing in");
      await auth?.login(email, pass);
      toast.dismiss(lot);
      toast.success("logged in");
      navigate('/chat');
    }catch(err){
      console.log(err);
      toast.dismiss();
      toast.error("failed to login");
    }
    
  }

  if(auth?.isLoggedIn) navigate('/chat');
  
  return (
    <div className='flex overflow-hidden'>
      <img src={bg} className='w-1/2 h-full object-cover'/>
      <div className='flex-grow flex flex-col gap-4 justify-center items-center'>
        <Input type='email' placeholder='email' onChange={handleEmail} className='w-1/2'/>
        <Input type='password' placeholder='password' onChange={handlePass} className='w-1/2'/>
        <Button onClick={handleSubmit}>sumbit</Button>
      </div>
    </div>

  )
}

export default Login