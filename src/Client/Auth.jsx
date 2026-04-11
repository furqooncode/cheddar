import { create } from 'zustand';
import  supabase  from '../lib/util.jsx'


const useAuth = create((set)=> ({
  user:null,
  loading:false,
  error:null,
  
  signup: async(email, password, username, fullName, phonenumber) => {
    set({loading: true})
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
         options: {
             data: {
                 username,
                 fullName,
                 phonenumber,
             }
         }
    });
    
    if(error){
      set({
        loading:false,
        user:null,
        error:error.message,
      })
    throw new Error(error.message)
    return;
    }
    
    const { error: fnError } = await supabase.functions.invoke("create-virtual-account", {
      body: {
        userId: data.user.id,
        email: email,
        fullName: fullName
      }
    })
    
    if(fnError){
      set({
        loading:false,
        user:null,
        error:fnError.message,
      })
    throw new Error(fnError.message)
    return
    }
    
    set({
      loading:false,
      user:data.user,
      error:null
    })
    
  },
  
  login: async(email, password) => {
    set({loading: true})
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if(error){
      set({
        loading:false,
        error:error.message,
        user:null
      })
      throw new Error(error.message)
    }else{
      set({
        loading:false,
        error:null,
        user: data.user,
      })
    }
  
  },
  
  GoogleAuth: async()=>{
  const { data, error } = await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{
        redirectTo:'http://localhost:5173/DropCountdown'
      }
    })
    if(error){
      throw new Error(error.message)
    }
  },
  
  getUser: async()=>{
    const { data: { user } } = await supabase.auth.getUser();
    if(user){
      const isGoogle = user.app_metadata.provider === 'google';
      set({
        user:{
          email: user.email,
          username: isGoogle ? user.user_metadata.full_name : user.user_metadata.username,
          avatar: isGoogle ? user.user_metadata.avatar_url : null,
          phone: isGoogle ? null : user.user_metadata.phonenumber,
        }
      })
    }
  },
  
  logout: async()=>{
    await supabase.auth.signOut()
    set({
      user:null,
      loading:false
    })
  }
  
}))


export default useAuth

