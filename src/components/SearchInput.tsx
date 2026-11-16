interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function SearchInput({ value, onChange }: Props) {
  return (
    <input
      type="search"
      className="search"
      placeholder="Поиск по имени, фамилии или нику (от 2 символов)…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Поиск сотрудников"
    />
  );
}