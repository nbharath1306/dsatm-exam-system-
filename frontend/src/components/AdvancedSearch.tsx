import React from 'react';
import Select from 'react-select';

interface Option { label: string; value: string; }

interface AdvancedSearchProps {
  search: string;
  setSearch: (s: string) => void;
  filterOptions: Option[];
  selectedFilter: Option | null;
  setSelectedFilter: (o: Option | null) => void;
  placeholder?: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  search, setSearch, filterOptions, selectedFilter, setSelectedFilter, placeholder
}) => (
  <div className="flex gap-2 mb-6">
    <input
      type="text"
      placeholder={placeholder || 'Search...'}
      className="flex-1 px-4 py-2 rounded-lg bg-indigo-100/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
    <Select
      className="w-48"
      options={filterOptions}
      value={selectedFilter}
      onChange={setSelectedFilter}
      isClearable
      placeholder="Filter by..."
      styles={{
        control: base => ({ ...base, borderRadius: '0.75rem', minHeight: '2.5rem' }),
        menu: base => ({ ...base, borderRadius: '0.75rem' })
      }}
    />
  </div>
);

export default AdvancedSearch;
