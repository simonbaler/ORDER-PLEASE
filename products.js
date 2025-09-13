// Product dataset for ORDER PLEASE
const products = [
  // Groceries
  {
    id: 101,
    name: "Fresh Bananas",
    category: "Groceries",
    subcategory: "Fruits",
    price: 1.99,
    currency: "INR",
    description: "Fresh, organic bananas delivered to your door.",
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e8e9?w=400",
    model: "https://models.babylonjs.com/Banana.glb",
    stock: 120,
    rating: 4.7,
    reviews: 320,
    specs: ["Organic", "500g pack"],
    images: [
      "https://images.unsplash.com/photo-1574226516831-e1dff420e8e9?w=400",
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400"
    ],
    trending: 200,
    keywords: ["banana","fruit","organic","grocery"]
  },
  {
    id: 102,
    name: "Amul Milk 1L",
    category: "Groceries",
    subcategory: "Dairy",
    price: 0.99,
    currency: "INR",
    description: "Pure and fresh Amul milk, 1L tetra pack.",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400",
    model: "https://models.babylonjs.com/Milk.glb",
    stock: 80,
    rating: 4.5,
    reviews: 210,
    specs: ["1L pack", "Tetra pack"],
    images: [
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400"
    ],
    trending: 150,
    keywords: ["milk","amul","dairy","grocery"]
  },
  {
    id: 103,
    name: "Aashirvaad Atta 5kg",
    category: "Groceries",
    subcategory: "Staples",
    price: 3.99,
    currency: "INR",
    description: "High-quality whole wheat flour for soft rotis.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    model: "https://models.babylonjs.com/Flour.glb",
    stock: 60,
    rating: 4.6,
    reviews: 180,
    specs: ["5kg pack", "Whole wheat"],
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
    ],
    trending: 120,
    keywords: ["atta","flour","wheat","staples"]
  },
  // Electronics
  {
    id: 201,
    name: "iPhone 15 Pro Max",
    category: "Electronics",
    subcategory: "Mobiles",
    price: 1199,
    currency: "INR",
    description: "The latest iPhone with advanced 3D camera and A17 chip. Stunning design and performance.",
    image: "https://images.unsplash.com/photo-1592899677977-9c8c0c63ef10?w=400",
    model: "https://models.babylonjs.com/iPhone.glb",
    stock: 10,
    rating: 4.8,
    reviews: 1247,
    specs: ["6.7-inch display","A17 Bionic","Triple Camera"],
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c8c0c63ef10?w=400",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
    ],
    trending: 80,
    keywords: ["iphone","apple","smartphone","mobile","iOS"]
  },
  {
    id: 202,
    name: "Samsung Galaxy S24",
    category: "Electronics",
    subcategory: "Mobiles",
    price: 899,
    currency: "INR",
    description: "Flagship Samsung phone with stunning display and camera.",
    image: "https://images.unsplash.com/photo-1511707171631-9e0d3173ef25?w=400",
    model: "https://models.babylonjs.com/Samsung.glb",
    stock: 15,
    rating: 4.7,
    reviews: 743,
    specs: ["6.8-inch AMOLED","Snapdragon 8 Gen 3","Quad Camera"],
    images: [
      "https://images.unsplash.com/photo-1511707171631-9e0d3173ef25?w=400"
    ],
    trending: 60,
    keywords: ["samsung","android","galaxy","mobile"]
  },
  // Fashion
  {
    id: 301,
    name: "Nike Air Max 270",
    category: "Fashion",
    subcategory: "Shoes",
    price: 150,
    currency: "INR",
    description: "Experience comfort and style with Nike's Air Max 270. Perfect for running and casual wear.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    model: "https://models.babylonjs.com/Shoe.glb",
    stock: 20,
    rating: 4.6,
    reviews: 892,
    specs: ["Breathable mesh","Air Max sole"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400"
    ],
    trending: 110,
    keywords: ["nike","shoes","sneakers","air max"]
  },
  // Skincare
  {
    id: 401,
    name: "Cetaphil Cleanser",
    category: "Skincare",
    subcategory: "Face Wash",
    price: 18,
    currency: "INR",
    description: "Gentle skin cleanser for all skin types. Dermatologist recommended.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400",
    model: "https://models.babylonjs.com/Cleanser.glb",
    stock: 30,
    rating: 4.5,
    reviews: 321,
    specs: ["250ml","For all skin types"],
    images: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400"
    ],
    trending: 90,
    keywords: ["cleanser","face wash","skincare","cetaphil"]
  },
  // Healthcare
  {
    id: 501,
    name: "Digital Thermometer",
    category: "Healthcare",
    subcategory: "Thermometer",
    price: 8,
    currency: "INR",
    description: "Accurate and fast digital thermometer for home use.",
    image: "https://images.unsplash.com/photo-1511707171631-9e0d3173ef25?w=400",
    model: "https://models.babylonjs.com/Thermometer.glb",
    stock: 100,
    rating: 4.3,
    reviews: 210,
    specs: ["Fast reading","Battery included"],
    images: [
      "https://images.unsplash.com/photo-1511707171631-9e0d3173ef25?w=400"
    ],
    trending: 70,
    keywords: ["thermometer","health","device"]
  }
  // Add more base items as needed for demo
];

// Programmatically expand catalog to 100+ items (synthetic variants)
(function ensureHundred(){
  const base = [...products];
  const models = [
    "https://models.babylonjs.com/Avocado.glb",
    "https://models.babylonjs.com/WaterBottle.glb",
    "https://models.babylonjs.com/BoomBox.glb",
    "https://models.babylonjs.com/Duck.glb"
  ];
  const cats = [
    {c:"Groceries", s:["Fruits","Vegetables","Snacks","Beverages"]},
    {c:"Electronics", s:["Mobiles","Laptops","Accessories"]},
    {c:"Fashion", s:["Shoes","T-Shirts","Watches"]},
    {c:"Skincare", s:["Face Wash","Moisturizer","Serum"]},
    {c:"Healthcare", s:["Supplements","Devices"]}
  ];
  let id = 6000;
  while (products.length < 110){
    const cat = cats[Math.floor(Math.random()*cats.length)];
    const sub = cat.s[Math.floor(Math.random()*cat.s.length)];
    const baseItem = base[Math.floor(Math.random()*base.length)];
    const price = Math.max(2, Math.round((Math.random()*200+5)*100)/100);
    const stock = Math.floor(Math.random()*200)+5;
    const rating = Math.round((Math.random()*2+3)*10)/10; // 3.0 - 5.0
    const reviews = Math.floor(Math.random()*2000)+10;
    const trend = Math.floor(Math.random()*300)+10;
    const name = `${baseItem.name.split(' ')[0]} ${sub} ${Math.floor(Math.random()*900)+100}`;
    const model = models[Math.floor(Math.random()*models.length)];
    const img = baseItem.image;
    const keywords = [name.split(' ')[0].toLowerCase(), cat.c.toLowerCase(), sub.toLowerCase(), 'deal','trending'];
    products.push({ id: id++, name, category: cat.c, subcategory: sub, price, currency:"INR", description: baseItem.description, image: img, model, stock, rating, reviews, specs: baseItem.specs||[], images: [img], trending: trend, keywords });
  }
})();
