export function Loading() {
  return <p className="state">Загрузка…</p>;
}

export function CriticalError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="state state--error">
      <p>Критическая ошибка. Не удалось загрузить данные.</p>
      <button onClick={onRetry}>Повторить</button>
    </div>
  );
}

export function NotFound({ query }: { query: string }) {
  return (
    <p className="state">
      {query.trim()
        ? `По запросу «${query.trim()}» ничего не найдено.`
        : 'Список пуст.'}
    </p>
  );
}