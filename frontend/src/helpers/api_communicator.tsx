import axios from "axios";

export const signupapihit = async (name: string, email: string, password: string) => {
   const res = await axios.post('/users/signup', {name, email, password},{
      withCredentials: true
   });
   if(res.status === 409){
      throw new Error("user already exists");
   }
   return res.data;
}


export const loginapihit = async (email: string, password: string) => {
   const res = await axios.post('/users/login', {email, password},{
      withCredentials:true
   });
   if(res.status !== 200){
        throw new Error("Unable to login");
   }
   const data = res.data;
   return data;
}

export const verifyapihit = async () => {
   const data = await axios.get('/users/authverify', {
      withCredentials: true
   });
   if(data.status !== 200){
      throw new Error("Need to login again");
   }
   return data.data;
}