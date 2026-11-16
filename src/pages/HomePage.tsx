import { useMemo, useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { TopAppBar } from '../components/TopAppBar';
import { UserList } from '../components/UserList';
import { Loading, CriticalError, NotFound } from '../components/States';
import type { SortMode } from '../types';

export function HomePage() {
  const { users, status, reload } = useUsers();
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortMode>('alphabet');

  const visible = useMemo(() => {
    let list = users;
    if (tab !== 'all') list = list.filter((u) => u.department === tab);
    const q = query.trim().toLowerCase();
    if (q.length >= 2) {
      list = list.filter((u) =>
        `${u.firstName} ${u.lastName} ${u.userTag}`.toLowerCase().includes(q)
      );
    }
    if (sort === 'alphabet') {
      list = [...list].sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else {
      list = [...list].sort((a, b) => nextBirthday(a.birthday) - nextBirthday(b.birthday));
    }
    return list;
  }, [users, tab, query, sort]);

  if (status === 'loading') return <Loading />;
  if (status === 'error') return <CriticalError onRetry={reload} />;

  return (
    <>
      <TopAppBar
        tab={tab} onTabChange={setTab}
        query={query} onQueryChange={setQuery}
        sort={sort} onSortChange={setSort}
      />
      {visible.length === 0
        ? <NotFound query={query} />
        : <UserList users={visible} sort={sort} />}
    </>
  );
}

function nextBirthday(iso: string): number {
  const now = new Date();
  const b = new Date(iso);
  const next = new Date(now.getFullYear(), b.getMonth(), b.getDate());
  if (next < now) next.setFullYear(now.getFullYear() + 1);
  return next.getTime();
}