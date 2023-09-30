import React, { createContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Session } from '@supabase/supabase-js';
import { supabase } from 'config/initSupabase';

type ContextProps = {
  user: null | boolean;
  session: Session | null;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        router.push('/(tabs)/');
      }
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          setSession(session);
          if (session) {
            router.push('/(tabs)/');
          } else {
            router.replace('/login');
          }
        },
      );
      return () => {
        authListener.subscription.unsubscribe();
      };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
