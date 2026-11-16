import { Link } from 'react-router-dom';
import type { User } from '../types';

export function UserCard({ user }: { user: User }) {
  return (
    <Link to={`/users/${user.id}`} className="card">
      <img src={user.avatarUrl} alt={user.firstName} className="card__avatar" />
      <div>
        <h3 className="card__name">{user.firstName} {user.lastName}</h3>
        <p className="card__tag">{user.userTag}</p>
        <p className="card__dept">{user.department}</p>
      </div>
    </Link>
  );
}