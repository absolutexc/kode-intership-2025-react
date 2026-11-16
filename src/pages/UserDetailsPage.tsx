import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUsers } from '../api/users';
import type { User } from '../types';
import { Loading, CriticalError } from '../components/States';

export function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');

  useEffect(() => {
    getUsers()
      .then((list) => {
        setUser(list.find((u) => u.id === id) ?? null);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [id]);

  if (status === 'loading') return <Loading />;
  if (status === 'error') return <CriticalError onRetry={() => location.reload()} />;
  if (!user) return <p className="state">Сотрудник не найден</p>;

  return (
    <section className="details">
      <Link to="/" className="details__back">← Назад</Link>
      <img src={user.avatarUrl} alt={user.firstName} className="details__avatar" />
      <h2>{user.firstName} {user.lastName}</h2>
      <p>{user.userTag} · {user.department}</p>
      <p>Дата рождения: {new Date(user.birthday).toLocaleDateString('ru-RU')}</p>
      <a href={`tel:${user.phone}`}>{user.phone}</a>
    </section>
  );
}