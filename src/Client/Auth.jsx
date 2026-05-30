import { create } from 'zustand';
import supabase from '../lib/util.jsx';

const useAuth = create((set) => ({
  user: null,
  loading: true,        // Start with true so we show loading on initial load
  error: null,

  // ====================== AUTH ACTIONS ======================
  signup: async (email, password, username, fullName, phonenumber) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, fullName, phonenumber },
      },
    });

    if (error) {
      set({ loading: false, user: null, error: error.message });
      throw new Error(error.message);
    }

    set({ loading: false, user: data.user, error: null });
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      set({ loading: false, user: null, error: error.message });
      throw new Error(error.message);
    }

    set({ loading: false, user: data.user, error: null });
  },

  GoogleAuth: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:5173/' },
    });
    if (error) throw new Error(error.message);
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, loading: false, error: null });
  },

  // ====================== GET USER ======================
  getUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.warn("getUser error:", error.message);
        set({ user: null, loading: false });
        return;
      }

      if (user) {
        const isGoogle = user.app_metadata?.provider === 'google';

        set({
          user: {
            email: user.email,
            username: isGoogle
              ? (user.user_metadata?.full_name || user.user_metadata?.name)
              : user.user_metadata?.username,
            avatar: isGoogle ? user.user_metadata?.avatar_url : null,
            phone: isGoogle ? null : user.user_metadata?.phonenumber,
          },
          loading: false,
          error: null,
        });
      } else {
        set({ user: null, loading: false });
      }
    } catch (err) {
      console.warn("getUser failed:", err.message);
      set({ user: null, loading: false });
    }
  },
}));

// ====================== AUTH STATE LISTENER ======================
// This runs once when the store is created
supabase.auth.onAuthStateChange((event, session) => {
  console.log("Auth state changed:", event);

  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
    if (session?.user) {
      const user = session.user;
      const isGoogle = user.app_metadata?.provider === 'google';

      useAuth.setState({
        user: {
          email: user.email,
          username: isGoogle
            ? (user.user_metadata?.full_name || user.user_metadata?.name)
            : user.user_metadata?.username,
          avatar: isGoogle ? user.user_metadata?.avatar_url : null,
          phone: isGoogle ? null : user.user_metadata?.phonenumber,
        },
        loading: false,
        error: null,
      });
    }
  } else if (event === 'SIGNED_OUT') {
    useAuth.setState({ user: null, loading: false, error: null });
  }
});

export default useAuth;