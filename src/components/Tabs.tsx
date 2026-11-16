import { DEPARTMENTS } from '../constants';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function Tabs({ value, onChange }: Props) {
  return (
    <nav className="tabs" aria-label="Департаменты">
      {DEPARTMENTS.map((d) => (
        <button
          key={d.value}
          className={`tabs__item ${value === d.value ? 'tabs__item--active' : ''}`}
          onClick={() => onChange(d.value)}
        >
          {d.label}
        </button>
      ))}
    </nav>
  );
}