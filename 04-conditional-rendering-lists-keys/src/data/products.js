export const products = [
  { id: 'p-101', name: 'Mechanical Keyboard', category: 'Accessories', price: 89, inStock: true },
  { id: 'p-102', name: 'USB-C Hub', category: 'Accessories', price: 39, inStock: false },
  { id: 'p-103', name: '27" Monitor', category: 'Displays', price: 249, inStock: true },
  { id: 'p-104', name: 'Portable Monitor', category: 'Displays', price: 179, inStock: true },
  { id: 'p-105', name: 'Noise-Cancelling Headphones', category: 'Audio', price: 199, inStock: false },
  { id: 'p-106', name: 'USB Microphone', category: 'Audio', price: 119, inStock: true },
  { id: 'p-107', name: 'Laptop Stand', category: 'Accessories', price: 45, inStock: true },
];

export const categories = ['All', ...new Set(products.map((p) => p.category))];
