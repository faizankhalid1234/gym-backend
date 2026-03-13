require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Accessory = require('./models/Accessory');

// Real product/accessory images from Unsplash (free to use)
const products = [
  {
    name: 'Premium Adjustable Dumbbells Set',
    description: 'Professional grade adjustable dumbbells 5-52.5 lbs. Perfect for home gym. Space-saving design with quick weight change mechanism.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600',
    category: 'equipment',
    stock: 25,
    brand: 'ProForm',
    rating: 4.8,
    featured: true
  },
  {
    name: 'Whey Protein isolate 5lbs',
    description: '24g protein per serving. Zero sugar, fast absorption. Available in Chocolate, Vanilla, Strawberry. Supports muscle recovery.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600',
    category: 'supplements',
    stock: 50,
    brand: 'Optimum Nutrition',
    rating: 4.9,
    featured: true
  },
  {
    name: 'Resistance Bands Set',
    description: '5 levels of resistance. Includes bands, handles, door anchor, carrying bag. Ideal for strength training and physical therapy.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
    category: 'equipment',
    stock: 100,
    brand: 'TheraBand',
    rating: 4.6,
    featured: true
  },
  {
    name: 'Men\'s Gym Tank Top',
    description: 'Lightweight moisture-wicking fabric. Breathable mesh panels. Available in multiple colors. S-XXL.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
    category: 'apparel',
    stock: 80,
    brand: 'Nike',
    rating: 4.5,
    featured: true
  },
  {
    name: 'Yoga Mat 6mm',
    description: 'Extra thick non-slip mat. Eco-friendly TPE material. Includes carrying strap. Perfect for gym and home workouts.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600',
    category: 'equipment',
    stock: 60,
    brand: 'Manduka',
    rating: 4.7,
    featured: false
  },
  {
    name: 'Pre-Workout Energy Boost',
    description: 'Caffeine, Beta-Alanine, Creatine blend. Berry blast flavor. 30 servings. Enhances focus and performance.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
    category: 'supplements',
    stock: 45,
    brand: 'C4',
    rating: 4.4,
    featured: false
  }
];

const accessories = [
  {
    name: 'Lifting Gloves - Leather',
    description: 'Padded palm protection. Breathable mesh back. Velcro closure. Prevents calluses during heavy lifting.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600',
    category: 'gloves',
    stock: 75,
    brand: 'Harbinger',
    color: 'Black',
    size: 'L',
    rating: 4.7,
    featured: true
  },
  {
    name: 'Weightlifting Belt 4"',
    description: 'Genuine leather. 4 inch width for maximum support. Double prong buckle. Sizes 28-44 inches.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600',
    category: 'belts',
    stock: 30,
    brand: 'Rogue',
    color: 'Black',
    size: 'M',
    rating: 4.9,
    featured: true
  },
  {
    name: 'Lifting Straps',
    description: 'Cotton loop straps. Extra grip for deadlifts and rows. Wrist support. One size fits all.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1534368959876-26bf04f2c947?w=600',
    category: 'straps',
    stock: 90,
    brand: 'Rogue',
    color: 'Grey',
    rating: 4.6,
    featured: true
  },
  {
    name: 'Knee Sleeves - Neoprene',
    description: '7mm neoprene for warmth and support. Ideal for squats. Machine washable. Pair.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600',
    category: 'knee_sleeves',
    stock: 40,
    brand: 'Rehband',
    color: 'Blue',
    size: 'M',
    rating: 4.8,
    featured: true
  },
  {
    name: 'Wrist Wraps 24"',
    description: 'Heavy duty wrist support for pressing movements. Hook and loop closure. Washable.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600',
    category: 'wrist_wraps',
    stock: 55,
    brand: 'Rogue',
    color: 'Black',
    rating: 4.5,
    featured: true
  },
  {
    name: 'Protein Shaker Bottle 28oz',
    description: 'BPA-free plastic. Leak-proof. Built-in whisk ball. Dishwasher safe. Multiple colors.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
    category: 'shakers',
    stock: 120,
    brand: 'BlenderBottle',
    color: 'Blue',
    rating: 4.7,
    featured: true
  },
  {
    name: 'Gym Bag - Large',
    description: '35L capacity. Separate shoe compartment. Laptop sleeve. Water-resistant. Perfect for gym and travel.',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
    category: 'other',
    stock: 35,
    brand: 'Nike',
    color: 'Black',
    rating: 4.6,
    featured: false
  },
  {
    name: 'Foam Roller',
    description: 'High density EVA foam. 12 inch length. Great for muscle recovery and myofascial release.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
    category: 'other',
    stock: 45,
    brand: 'TriggerPoint',
    color: 'Blue',
    rating: 4.5,
    featured: false
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME || 'gym_management'
    });
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    await Accessory.deleteMany({});

    await Product.insertMany(products);
    await Accessory.insertMany(accessories);

    console.log('✅ Seeded', products.length, 'products and', accessories.length, 'accessories with images!');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
