'use client';

import {
  User,
  useSessionContext,
  useUser as useSupaUser,
} from '@supabase/auth-helpers-react';
import { createContext, FC, useEffect, useState } from 'react';

import { Subscription, UserDetails } from '@/types';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

type Props = {
  [propName: string]: any;
  children: React.ReactNode;
};

const UserProvider: FC<Props> = ({ props, children }: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();

  const accessToken = session?.access_token ?? null;

  const [isLoadingData, setIsloadingData] = useState(false);

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetail = () => supabase.from('users').select('*').single();

  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .maybeSingle();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true);

      Promise.allSettled([getUserDetail(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];

          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === 'fulfilled') {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }

          if (subscriptionPromise.status === 'fulfilled') {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          setIsloadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return (
    <UserContext.Provider value={value} {...props}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
