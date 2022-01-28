import { useMemo } from 'react';
import { useAppSelector } from 'src/app/store';
import { IUser } from 'src/models/IUser';

export default function useAuth() {
  const user = useAppSelector((state) => state.auth.user);

  const isLoggedIn = useMemo<boolean>(() => {
    return !!user;
  }, [user]);

  return {
    isLoggedIn,
    user,
  };
}
