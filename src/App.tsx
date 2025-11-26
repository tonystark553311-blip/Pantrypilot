import { useEffect, useState } from 'react';
import { supabase, PantryItem } from './lib/supabase';
import { PantryHeader } from './components/PantryHeader';
import { FilterBar } from './components/FilterBar';
import { PantryGrid } from './components/PantryGrid';
import { AddItemModal } from './components/AddItemModal';

function App() {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PantryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, selectedCategory, selectedLocation]);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('pantry_items')
        .select('*')
        .order('name');

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (selectedLocation) {
      filtered = filtered.filter((item) => item.location === selectedLocation);
    }

    setFilteredItems(filtered);
  };

  const handleAddItem = async (newItem: {
    name: string;
    category: string;
    quantity: number;
    unit: string;
    image_url: string;
    expiry_date: string;
    location: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('pantry_items')
        .insert([newItem])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setItems([...items, data]);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async (updatedItem: PantryItem) => {
    try {
      const { error } = await supabase
        .from('pantry_items')
        .update({
          quantity: updatedItem.quantity,
          updated_at: new Date().toISOString(),
        })
        .eq('id', updatedItem.id);

      if (error) throw error;
      setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase.from('pantry_items').delete().eq('id', id);

      if (error) throw error;
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading your pantry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PantryHeader onAddItem={() => setIsModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
        />

        <PantryGrid
          items={filteredItems}
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
        />
      </main>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddItem}
      />
    </div>
  );
}

export default App;
