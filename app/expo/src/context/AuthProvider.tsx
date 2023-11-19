import React, { createContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from 'config/initSupabase';

type ContextProps = {
  user: null | User;
  session: Session | null;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setUser(session?.user);

        console.log(session);
        if (session.user.user_metadata.userType == 'TRAVELER') {
          router.push('/(tabs)');
        } else {
          router.push('/businessProfile/businessList');
        }
      }
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session) {
            setSession(session);
            setUser(session?.user);
            if (session.user.user_metadata.userType == 'TRAVELER') {
              router.push('/(tabs)');
            } else {
              router.push('/businessProfile/businessList');
            }
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
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
