import { useEffect, useState } from 'react';
import { getUsers } from '../api/users';
import type { User } from '../types';

type Status = 'loading' | 'error' | 'ready';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  const load = () => {
    setStatus('loading');
    getUsers()
      .then((data) => {
        setUsers(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(load, []);
  return { users, status, reload: load };
}