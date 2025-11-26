import { PantryItem } from '../lib/supabase';
import { PantryCard } from './PantryCard';

interface PantryGridProps {
  items: PantryItem[];
  onUpdateItem: (item: PantryItem) => void;
  onDeleteItem: (id: string) => void;
}

export function PantryGrid({ items, onUpdateItem, onDeleteItem }: PantryGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No items in your pantry yet. Start adding some!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <PantryCard
          key={item.id}
          item={item}
          onUpdate={onUpdateItem}
          onDelete={onDeleteItem}
        />
      ))}
    </div>
  );
}
