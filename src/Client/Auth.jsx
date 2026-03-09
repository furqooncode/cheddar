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
  
  
  logout: async()=>{
    await supabase.auth.signOut()
    set({
      user:null,
      loading:false
    })
  }
  
}))


export default useAuth