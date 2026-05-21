export const LOCATIONS = [
  "Dangwar",
  "Japla",
  "Koiridih",
  "Nabinagar",
  "Nawadih",
] as const;

export type Location = (typeof LOCATIONS)[number];

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
  veg: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
  locations: Location[];
  menu: MenuItem[];
}

const img = (q: string) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=800&q=80`;

export const RESTAURANTS: Restaurant[] = [
  {
    id: "sharma-bhojnalaya",
    name: "Sharma Bhojnalaya",
    tagline: "Ghar jaisa swad, har thali mein",
    image: img("1567337710282-00832b415979"),
    rating: 4.6,
    deliveryTime: "25-35 min",
    cuisine: "North Indian • Thali",
    locations: ["Dangwar", "Japla", "Koiridih"],
    menu: [
      { id: "s1", name: "Special Veg Thali", price: 120, desc: "4 sabzi, dal, roti, rice, salad, sweet", veg: true, image: img("1567337710282-00832b415979") },
      { id: "s2", name: "Paneer Butter Masala", price: 180, desc: "Creamy tomato gravy with soft paneer cubes", veg: true, image: img("1631452180519-c014fe946bc7") },
      { id: "s3", name: "Dal Makhani", price: 130, desc: "Slow cooked black dal with butter & cream", veg: true, image: img("1626500155188-9f8d5e0fcd0d") },
      { id: "s4", name: "Tandoori Roti (4 pc)", price: 40, desc: "Hot from tandoor with desi ghee", veg: true, image: img("1565557623262-b51c2513a641") },
      { id: "s5", name: "Jeera Rice", price: 90, desc: "Fragrant basmati tempered with jeera", veg: true, image: img("1596797038530-2c107229654b") },
      { id: "s6", name: "Gulab Jamun (2 pc)", price: 50, desc: "Warm, syrup-soaked, melt in mouth", veg: true, image: img("1601303516534-bf088636d9bb") },
    ],
  },
  {
    id: "tandoori-junction",
    name: "Tandoori Junction",
    tagline: "Smoky, spicy, straight from the coals",
    image: img("1599487488170-d11ec9c172f0"),
    rating: 4.7,
    deliveryTime: "30-40 min",
    cuisine: "Tandoor • Mughlai",
    locations: ["Japla", "Nabinagar", "Nawadih"],
    menu: [
      { id: "t1", name: "Tandoori Chicken (Half)", price: 220, desc: "Marinated overnight, charcoal grilled", veg: false, image: img("1599487488170-d11ec9c172f0") },
      { id: "t2", name: "Chicken Tikka Masala", price: 240, desc: "Smoky tikka in rich makhani gravy", veg: false, image: img("1603894584373-5ac82b2ae398") },
      { id: "t3", name: "Mutton Biryani", price: 280, desc: "Dum cooked with kachi gosht & saffron", veg: false, image: img("1633945274405-b6c8069047b0") },
      { id: "t4", name: "Seekh Kebab (6 pc)", price: 200, desc: "Spiced minced meat skewers", veg: false, image: img("1599487488170-d11ec9c172f0") },
      { id: "t5", name: "Butter Naan (2 pc)", price: 60, desc: "Soft, buttery, fresh from tandoor", veg: true, image: img("1565557623262-b51c2513a641") },
      { id: "t6", name: "Paneer Tikka", price: 190, desc: "Smoky paneer cubes with bell pepper", veg: true, image: img("1631452180775-a4e3d1739a93") },
    ],
  },
  {
    id: "desi-tadka",
    name: "Desi Tadka",
    tagline: "Street food ka asli maza",
    image: img("1606491956689-2ea866880c84"),
    rating: 4.5,
    deliveryTime: "20-30 min",
    cuisine: "Chaat • Street Food",
    locations: ["Dangwar", "Koiridih", "Nawadih"],
    menu: [
      { id: "d1", name: "Pani Puri (8 pc)", price: 50, desc: "Crispy puris with tangy pudina water", veg: true, image: img("1606491956689-2ea866880c84") },
      { id: "d2", name: "Aloo Tikki Chaat", price: 70, desc: "Crispy tikkis with chutneys & curd", veg: true, image: img("1606491956689-2ea866880c84") },
      { id: "d3", name: "Pav Bhaji", price: 110, desc: "Buttery bhaji with toasted pav", veg: true, image: img("1606491956689-2ea866880c84") },
      { id: "d4", name: "Samosa (2 pc)", price: 30, desc: "Crispy, spicy potato filling", veg: true, image: img("1601050690597-df0568f70950") },
      { id: "d5", name: "Masala Dosa", price: 130, desc: "Crispy dosa with aloo masala & chutney", veg: true, image: img("1668236543090-82eba5ee5976") },
      { id: "d6", name: "Veg Chowmein", price: 100, desc: "Wok tossed noodles desi style", veg: true, image: img("1612929633738-8fe44f7ec841") },
    ],
  },
  {
    id: "biryani-house",
    name: "Lazeez Biryani House",
    tagline: "Har dana, alag kahani",
    image: img("1633945274405-b6c8069047b0"),
    rating: 4.8,
    deliveryTime: "35-45 min",
    cuisine: "Biryani • Awadhi",
    locations: ["Japla", "Nabinagar", "Dangwar"],
    menu: [
      { id: "b1", name: "Hyderabadi Chicken Biryani", price: 240, desc: "Aromatic long grain rice with chicken dum", veg: false, image: img("1633945274405-b6c8069047b0") },
      { id: "b2", name: "Veg Dum Biryani", price: 180, desc: "Slow cooked with veggies & whole spices", veg: true, image: img("1596797038530-2c107229654b") },
      { id: "b3", name: "Mutton Rogan Josh", price: 290, desc: "Kashmiri style slow cooked mutton", veg: false, image: img("1603894584373-5ac82b2ae398") },
      { id: "b4", name: "Chicken Korma", price: 220, desc: "Mild creamy gravy with cashew paste", veg: false, image: img("1631452180519-c014fe946bc7") },
      { id: "b5", name: "Raita & Salan", price: 50, desc: "Cooling raita + spicy mirchi ka salan", veg: true, image: img("1626500155188-9f8d5e0fcd0d") },
      { id: "b6", name: "Phirni", price: 70, desc: "Chilled rice pudding with cardamom", veg: true, image: img("1601303516534-bf088636d9bb") },
    ],
  },
  {
    id: "chai-cafe",
    name: "Chai Sutta Cafe",
    tagline: "Garam chai aur garmagaram snacks",
    image: img("1571805341302-f857805175d9"),
    rating: 4.4,
    deliveryTime: "15-25 min",
    cuisine: "Cafe • Snacks",
    locations: ["Koiridih", "Nawadih", "Japla"],
    menu: [
      { id: "c1", name: "Kulhad Masala Chai", price: 25, desc: "Traditional clay cup chai with spices", veg: true, image: img("1571805341302-f857805175d9") },
      { id: "c2", name: "Maggi Masala", price: 60, desc: "Hot maggi with veggies & masala", veg: true, image: img("1612929633738-8fe44f7ec841") },
      { id: "c3", name: "Veg Sandwich", price: 70, desc: "Grilled with cheese & chutney", veg: true, image: img("1539252554453-80ab65ce3586") },
      { id: "c4", name: "Bread Pakora", price: 40, desc: "Crispy stuffed bread fritters", veg: true, image: img("1601050690597-df0568f70950") },
      { id: "c5", name: "Cold Coffee", price: 90, desc: "Chilled, frothy, with ice cream", veg: true, image: img("1461023058943-07fcbe16d735") },
      { id: "c6", name: "Aloo Paratha + Curd", price: 90, desc: "Stuffed paratha with white butter", veg: true, image: img("1565557623262-b51c2513a641") },
    ],
  },
];

export function getRestaurantsByLocation(loc: Location): Restaurant[] {
  return RESTAURANTS.filter((r) => r.locations.includes(loc));
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return RESTAURANTS.find((r) => r.id === id);
}
