import type { SortMode } from '../types';

interface Props {
  open: boolean;
  value: SortMode;
  onSelect: (v: SortMode) => void;
  onClose: () => void;
}

export function SortModal({ open, value, onSelect, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__body">
        <h3>Сортировка</h3>
        {(['alphabet', 'birthday'] as SortMode[]).map((mode) => (
          <label key={mode} className="modal__option">
            <input
              type="radio"
              checked={value === mode}
              onChange={() => {
                onSelect(mode);
                onClose();
              }}
            />
            {mode === 'alphabet' ? 'По алфавиту' : 'По дню рождения'}
          </label>
        ))}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}