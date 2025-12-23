-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'sarees',
  sizes TEXT[] DEFAULT ARRAY['Free Size'],
  colors TEXT[],
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products are publicly viewable
CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

-- Create cart items table (uses session ID for guests)
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  selected_size TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(session_id, product_id, selected_size)
);

-- Enable RLS
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Anyone can manage their own cart items by session
CREATE POLICY "Anyone can view their cart" 
ON public.cart_items 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can add to cart" 
ON public.cart_items 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update their cart" 
ON public.cart_items 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete from cart" 
ON public.cart_items 
FOR DELETE 
USING (true);

-- Insert sample products
INSERT INTO public.products (name, description, price, image_url, category, sizes, colors, featured) VALUES
('Royal Kanjivaram Silk', 'Handwoven pure silk saree with intricate gold zari work. Perfect for weddings and special occasions.', 24999.00, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop', 'bridal', ARRAY['Free Size'], ARRAY['Red', 'Maroon', 'Gold'], true),
('Banarasi Silk Elegance', 'Traditional Banarasi silk with classic motifs and rich pallu design.', 18999.00, 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop', 'festive', ARRAY['Free Size'], ARRAY['Purple', 'Green', 'Blue'], true),
('Mysore Silk Classic', 'Lightweight pure Mysore silk saree ideal for daily elegance.', 8999.00, 'https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&h=800&fit=crop', 'everyday', ARRAY['Free Size'], ARRAY['Pink', 'Cream', 'Peach'], false),
('Patola Silk Heritage', 'Double ikat Patola silk saree with geometric patterns.', 32999.00, 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop', 'bridal', ARRAY['Free Size'], ARRAY['Red', 'Yellow', 'Green'], true),
('Chanderi Silk Grace', 'Delicate Chanderi silk with subtle gold borders.', 6999.00, 'https://images.unsplash.com/photo-1617627143233-46972d6012f7?w=600&h=800&fit=crop', 'everyday', ARRAY['Free Size'], ARRAY['White', 'Beige', 'Lavender'], false),
('Tussar Silk Natural', 'Organic Tussar silk with natural texture and earthy tones.', 12999.00, 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&h=800&fit=crop', 'festive', ARRAY['Free Size'], ARRAY['Beige', 'Brown', 'Rust'], false);