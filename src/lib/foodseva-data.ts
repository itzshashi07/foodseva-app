export const LOCATIONS = [
  "Dangwar",
  "Koiridih",
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

  // ✅ NEW
  phone: string;
  address: string;
  whatsapp: string;

  menu: MenuItem[];
}

const img = (q: string) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=800&q=80`;

export const RESTAURANTS: Restaurant[] = [

  // 🔴 DANGWAR
  {
    id: "akansha-hotel",
    name: "Akansha Hotel & Restaurant",
    tagline: "Fast food & Chinese special",

    image: img("1601050690597-df0568f70950"),

    rating: 4.2,
    deliveryTime: "20-30 min",
    cuisine: "Fast Food",

    locations: ["Dangwar"],

    // ✅ NEW
    phone: "+91 9876543210",
    whatsapp: "919876543210",
    address: "Dangwar Main Road, Near Bus Stand",

    menu: [
      {
        id: "a1",
        name: "Manchurian",
        price: 100,
        desc: "Spicy manchurian balls",
        veg: true,
        image: img("1631452180775-a4e3d1739a93"),
      },

      {
        id: "a2",
        name: "Burger",
        price: 50,
        desc: "Classic veg burger",
        veg: true,
        image: img("1550547660-d9450f859349"),
      },

      {
        id: "a3",
        name: "Chowmein",
        price: 40,
        desc: "Desi style noodles",
        veg: true,
        image: img("1612929633738-8fe44f7ec841"),
      },
    ],
  },

  {
    id: "amit-hotel",
    name: "Amit Hotel",
    tagline: "Tasty & affordable food",

    image: img("1567337710282-00832b415979"),

    rating: 4.3,
    deliveryTime: "20-30 min",
    cuisine: "Fast Food",

    locations: ["Dangwar"],

    phone: "+91 9123456780",
    whatsapp: "919123456780",
    address: "Dangwar Chowk, Near Petrol Pump",

    menu: [
      {
        id: "am1",
        name: "Chilli Paneer",
        price: 100,
        desc: "Spicy paneer dish",
        veg: true,
        image: img("1631452180775-a4e3d1739a93"),
      },

      {
        id: "am2",
        name: "Burger",
        price: 50,
        desc: "Veg burger",
        veg: true,
        image: img("1550547660-d9450f859349"),
      },
    ],
  },

  // 🔵 NAWADIH
  {
    id: "hasanpur-roll",
    name: "Hasanpur Roll Corner",
    tagline: "Simple & tasty rolls",

    image: img("1601050690597-df0568f70950"),

    rating: 4.1,
    deliveryTime: "20-25 min",
    cuisine: "Rolls",

    locations: ["Nawadih"],

    phone: "+91 9988776655",
    whatsapp: "919988776655",
    address: "Nawadih Market Road",

    menu: [
      {
        id: "h1",
        name: "Egg Roll",
        price: 40,
        desc: "Egg roll",
        veg: false,
        image: img("1601050690597-df0568f70950"),
      },
    ],
  },

  // 🟢 KOIRIDIH
  {
    id: "mehta-hotel",
    name: "Mehta Hotel",
    tagline: "Ghar jaisa swad",

    image: img("1567337710282-00832b415979"),

    rating: 4.2,
    deliveryTime: "25-30 min",
    cuisine: "Indian",

    locations: ["Koiridih"],

    phone: "+91 9090909090",
    whatsapp: "919090909090",
    address: "Koiridih Main Market",

    menu: [
      {
        id: "m1",
        name: "Veg Biryani",
        price: 50,
        desc: "Simple veg biryani",
        veg: true,
        image: img("1596797038530-2c107229654b"),
      },

      {
        id: "m2",
        name: "Veg Thali",
        price: 70,
        desc: "Complete meal",
        veg: true,
        image: img("1567337710282-00832b415979"),
      },
    ],
  },
];

export function getRestaurantsByLocation(
  loc: Location
): Restaurant[] {
  return RESTAURANTS.filter((r) =>
    r.locations.includes(loc)
  );
}

export function getRestaurantById(
  id: string
): Restaurant | undefined {
  return RESTAURANTS.find((r) => r.id === id);
}