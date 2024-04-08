interface GroceryItem {

  id: number;

  name: string;

  price: number;

  image: string;

  category: string;

  description: string;

}
 
export const groceryData: GroceryItem[] = [

  {

    id: 1,

    name: 'Apples',

    price: 150,

    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJHB2LmJDE8mRo5vCggGcP-G5Jkov0nOYt700GGxzzQg&s',

    category: 'Fruits',

    description: 'Fresh and crunchy apples, rich in vitamins and fiber.',

  },

  {

    id: 2,

    name: 'Bananas',

    price: 90,

    image: 'https://www.shutterstock.com/image-photo/bunch-bananas-isolated-on-white-600nw-99478112.jpg',

    category: 'Fruits',

    description: 'Ripe and sweet bananas, a great source of potassium.',

  },

  {

    id: 3,

    name: 'Milk',

    price: 180,

    image: 'https://media.post.rvohealth.io/wp-content/uploads/2022/05/soy-milk-bottle-732-549-feature-thumb-732x549.jpg',

    category: 'Dairy',

    description: 'Fresh and creamy milk, essential for a healthy diet.',

  },

  {

    id: 4,

    name: 'Bread',

    price: 120,

    image: 'https://www.foodandwine.com/thmb/Z2AE53BGYP2U-kXhtbVwXZQX8sc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Perfect-Sandwich-Bread-FT-RECIPE0723-dace53e15a304942acbc880b0ae34f5a.jpg',

    category: 'Bakery',

    description: 'Soft and delicious bread, perfect for sandwiches and toast.',

  },

  {

    id: 5,

    name: 'Eggs',

    price: 205,

    image: 'https://www.licious.in/blog/wp-content/uploads/2022/01/eggs-1-750x750.jpg',

    category: 'Dairy',

    description: 'Farm-fresh eggs, packed with protein and essential nutrients.',

  },

  {

    id: 6,

    name: 'Rice',

    price: 350,

    image: 'https://cdn.britannica.com/17/176517-050-6F2B774A/Pile-uncooked-rice-grains-Oryza-sativa.jpg',

    category: 'Grains',

    description: 'Premium quality rice, ideal for daily consumption.',

  },

  {

    id: 7,

    name: 'Tomatoes',

    price: 60,

    image: 'https://www.abcfruits.net/wp-content/uploads/2022/08/14.png',

    category: 'Vegetables',

    description: 'Juicy and flavorful tomatoes, perfect for salads and cooking.',

  },

  {

    id: 8,

    name: 'Potatoes',

    price: 40,

    image: 'https://m.media-amazon.com/images/I/313dtY-LOEL._AC_UF1000,1000_QL80_.jpg',

    category: 'Vegetables',

    description: 'Versatile and nutritious potatoes, suitable for various dishes.',

  },

  {

    id: 9,

    name: 'Onions',

    price: 35,

    image: 'https://m.media-amazon.com/images/I/71GUFttn0jL._AC_UF1000,1000_QL80_.jpg',

    category: 'Vegetables',

    description: 'Fresh and pungent onions, essential for cooking.',

  },

  {

    id: 10,

    name: 'Chicken',

    price: 250,

    image: 'https://www.bigbasket.com/media/uploads/p/l/800215585_1-imtiyaz-chiken-chicken-tandoori.jpg',

    category: 'Meat',

    description: 'Tender and succulent chicken, great for various recipes.',

  },

];
