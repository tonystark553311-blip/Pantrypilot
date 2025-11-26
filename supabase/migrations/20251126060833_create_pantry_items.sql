/*
  # PantryPilot - Food Inventory Management Schema

  1. New Tables
    - `pantry_items`
      - `id` (uuid, primary key) - Unique identifier for each food item
      - `name` (text) - Name of the food item
      - `category` (text) - Category (Fruits, Vegetables, Grains, Proteins, Dairy, etc.)
      - `quantity` (integer) - Current quantity in stock
      - `unit` (text) - Unit of measurement (pieces, kg, liters, etc.)
      - `image_url` (text) - URL to the food item image
      - `expiry_date` (date) - Expiration date of the item
      - `location` (text) - Storage location (Fridge, Pantry, Freezer)
      - `created_at` (timestamptz) - Timestamp of creation
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `pantry_items` table
    - Add policy for public read access (demo purposes)
    - Add policy for public insert access (demo purposes)
    - Add policy for public update access (demo purposes)
    - Add policy for public delete access (demo purposes)

  3. Notes
    - This is a demo application with public access
    - In production, you would restrict access to authenticated users
*/

CREATE TABLE IF NOT EXISTS pantry_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  quantity integer DEFAULT 0,
  unit text NOT NULL,
  image_url text NOT NULL,
  expiry_date date,
  location text DEFAULT 'Pantry',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pantry_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON pantry_items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access"
  ON pantry_items
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON pantry_items
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON pantry_items
  FOR DELETE
  TO public
  USING (true);