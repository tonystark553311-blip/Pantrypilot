import { ChefHat, Plus } from 'lucide-react';

interface PantryHeaderProps {
  onAddItem: () => void;
}

export function PantryHeader({ onAddItem }: PantryHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ChefHat className="w-10 h-10" />
            <div>
              <h1 className="text-4xl font-bold">PantryPilot</h1>
              <p className="text-emerald-100 mt-1">Navigate your kitchen with ease</p>
            </div>
          </div>
          <button
            onClick={onAddItem}
            className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </div>
      </div>
    </header>
  );
}
