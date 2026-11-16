import axios from 'axios';
import type { User } from '../types';

const BASE =
  'https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users';

export async function getUsers(example = 'all'): Promise<User[]> {
  const { data } = await axios.get(BASE, {
    params: { __example: example },
    headers: { 'Content-Type': 'application/json' },
  });
  return data.items ?? data;
}