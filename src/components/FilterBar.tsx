import { Search } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Grains</option>
          <option>Proteins</option>
          <option>Dairy</option>
          <option>Beverages</option>
          <option>Snacks</option>
          <option>Condiments</option>
        </select>

        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="">All Locations</option>
          <option>Pantry</option>
          <option>Fridge</option>
          <option>Freezer</option>
          <option>Cabinet</option>
        </select>
      </div>
    </div>
  );
}
