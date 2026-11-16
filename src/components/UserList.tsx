import { UserCard } from './UserCard';
import type { SortMode, User } from '../types';

interface Props {
  users: User[];
  sort: SortMode;
}

export function UserList({ users, sort }: Props) {
  if (sort === 'alphabet') {
    return (
      <div className="grid">
        {users.map((u) => <UserCard key={u.id} user={u} />)}
      </div>
    );
  }
  // сортировка по ДР с блоком года
  const byYear = new Map<number, User[]>();
  for (const u of users) {
    const year = nextBirthday(u.birthday).getFullYear();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(u);
  }
  return (
    <div>
      {[...byYear.entries()].map(([year, list]) => (
        <section key={year}>
          <h3 className="year">{year}</h3>
          <div className="grid">
            {list.map((u) => <UserCard key={u.id} user={u} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

function nextBirthday(iso: string): Date {
  const now = new Date();
  const b = new Date(iso);
  const next = new Date(now.getFullYear(), b.getMonth(), b.getDate());
  if (next < now) next.setFullYear(now.getFullYear() + 1);
  return next;
}