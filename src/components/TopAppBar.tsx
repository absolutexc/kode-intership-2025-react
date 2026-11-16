import { useState } from 'react';
import { SearchInput } from './SearchInput';
import { Tabs } from './Tabs';
import { SortModal } from './SortModal';
import type { SortMode } from '../types';

interface Props {
  tab: string;
  onTabChange: (v: string) => void;
  query: string;
  onQueryChange: (v: string) => void;
  sort: SortMode;
  onSortChange: (v: SortMode) => void;
}

export function TopAppBar({ tab, onTabChange, query, onQueryChange, sort, onSortChange }: Props) {
  const [sortOpen, setSortOpen] = useState(false);
  return (
    <header className="appbar">
      <div className="appbar__row">
        <SearchInput value={query} onChange={onQueryChange} />
        <button className="appbar__sort" onClick={() => setSortOpen(true)}>
          Сортировка
        </button>
      </div>
      <Tabs value={tab} onChange={onTabChange} />
      <SortModal
        open={sortOpen}
        value={sort}
        onSelect={onSortChange}
        onClose={() => setSortOpen(false)}
      />
    </header>
  );
}