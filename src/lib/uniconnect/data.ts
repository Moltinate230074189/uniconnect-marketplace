export type CategoryId =
  | "books"
  | "electronics"
  | "fashion"
  | "sports"
  | "lab";

export type Condition = "New" | "Like New" | "Good" | "Fair";
export type ListingStatus = "Active" | "Sold" | "Pending";

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  specs: { label: string; value: string }[];
  price: number;
  category: CategoryId;
  condition: Condition;
  campus: string;
  seller: string;
  contact: string;
  createdAt: string;
  popularity: number;
  status: ListingStatus;
  ownerId: string;
  rating: number;
  image?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  verified: boolean;
  rating: number;
  text: string;
}

export const CATEGORIES: {
  id: CategoryId;
  name: string;
  icon: string;
  blurb: string;
}[] = [
  { id: "books", name: "Books & Stationery", icon: "BookOpen", blurb: "Textbooks, notes, pens" },
  { id: "electronics", name: "Electronics & Gadgets", icon: "Laptop", blurb: "Calculators, audio, power" },
  { id: "fashion", name: "Fashion & Accessories", icon: "Shirt", blurb: "Hoodies, sneakers, bags" },
  { id: "sports", name: "Sports & Fitness", icon: "Dumbbell", blurb: "Boots, gym gear, kit" },
  { id: "lab", name: "Project & Lab Equipment", icon: "FlaskConical", blurb: "Lab coats, kits, tools" },
];

export const categoryName = (id: CategoryId) =>
  CATEGORIES.find((c) => c.id === id)?.name ?? "Other";

const day = 86400000;
const ago = (d: number) => new Date(Date.now() - d * day).toISOString();

export const SEED_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Scientific Calculator",
    brand: "Casio FX-991EX",
    description:
      "Classic exam-approved scientific calculator. Barely used, comes with the original slide cover and manual.",
    specs: [
      { label: "Material", value: "ABS" },
      { label: "Colour", value: "Grey" },
      { label: "Functions", value: "552" },
    ],
    price: 400,
    category: "electronics",
    condition: "Like New",
    campus: "Main Campus",
    seller: "Thabo M.",
    contact: "thabo@campus.ac.za",
    createdAt: ago(1),
    popularity: 94,
    status: "Active",
    ownerId: "seed",
    rating: 4.8,
  },
  {
    id: "p2",
    name: "Wireless Headphones",
    brand: "JBL WH-991EX",
    description:
      "Over-ear wireless headphones with deep bass and 30 hours of battery. Perfect for late-night library sessions.",
    specs: [
      { label: "Material", value: "ABS" },
      { label: "Colour", value: "Black" },
      { label: "Size", value: "One-size" },
    ],
    price: 500,
    category: "electronics",
    condition: "Good",
    campus: "Main Campus",
    seller: "Sino K.",
    contact: "sinokeben@gmail.com",
    createdAt: ago(2),
    popularity: 88,
    status: "Active",
    ownerId: "seed",
    rating: 4.6,
  },
  {
    id: "p3",
    name: "MI Power Bank",
    brand: "10 000mAh · Black",
    description:
      "Fast-charging power bank with dual USB output. Keeps your phone and earbuds alive through a full campus day.",
    specs: [
      { label: "Capacity", value: "10 000mAh" },
      { label: "Colour", value: "Black" },
      { label: "Ports", value: "2 × USB-A" },
    ],
    price: 500,
    category: "electronics",
    condition: "Good",
    campus: "Res 3",
    seller: "Lerato N.",
    contact: "lerato@campus.ac.za",
    createdAt: ago(3),
    popularity: 76,
    status: "Active",
    ownerId: "seed",
    rating: 4.4,
  },
  {
    id: "p4",
    name: "Beribes Bluetooth Headphones",
    brand: "Over-Ear Headphone with Microphone",
    description:
      "Comfortable over-ear Bluetooth headphones with a built-in microphone for online lectures and group calls.",
    specs: [
      { label: "Material", value: "ABS" },
      { label: "Colour", value: "Black" },
      { label: "Size", value: "One-size" },
      { label: "Battery", value: "65 hours" },
      { label: "Connection", value: "Bluetooth 5.3" },
      { label: "Weight", value: "220 g" },
    ],
    price: 600,
    category: "electronics",
    condition: "New",
    campus: "Main Campus",
    seller: "Sino K.",
    contact: "sinokeben@gmail.com",
    createdAt: ago(4),
    popularity: 99,
    status: "Active",
    ownerId: "seed",
    rating: 4.9,
  },
  {
    id: "p5",
    name: "Accounting Textbook",
    brand: "Financial Accounting 12th Ed.",
    description: "First-year accounting prescribed textbook. Light highlighting, no missing pages.",
    specs: [
      { label: "Edition", value: "12th" },
      { label: "Language", value: "English" },
    ],
    price: 250,
    category: "books",
    condition: "Good",
    campus: "Commerce Building",
    seller: "Aphiwe D.",
    contact: "aphiwe@campus.ac.za",
    createdAt: ago(5),
    popularity: 71,
    status: "Active",
    ownerId: "seed",
    rating: 4.3,
  },
  {
    id: "p6",
    name: "Laptop Stand",
    brand: "Aluminium adjustable",
    description: "Ergonomic aluminium laptop stand, folds flat and fits in a backpack.",
    specs: [
      { label: "Material", value: "Aluminium" },
      { label: "Colour", value: "Silver" },
    ],
    price: 350,
    category: "electronics",
    condition: "Like New",
    campus: "Res 1",
    seller: "Kabelo S.",
    contact: "kabelo@campus.ac.za",
    createdAt: ago(6),
    popularity: 62,
    status: "Active",
    ownerId: "seed",
    rating: 4.5,
  },
  {
    id: "p7",
    name: "Engineering Drawing Set",
    brand: "Rotring 12-piece",
    description: "Complete technical drawing set with compass, dividers and set squares in a metal case.",
    specs: [
      { label: "Pieces", value: "12" },
      { label: "Case", value: "Metal" },
    ],
    price: 300,
    category: "lab",
    condition: "Good",
    campus: "Engineering Block",
    seller: "Naledi P.",
    contact: "naledi@campus.ac.za",
    createdAt: ago(7),
    popularity: 58,
    status: "Active",
    ownerId: "seed",
    rating: 4.2,
  },
  {
    id: "p8",
    name: "Campus Hoodie",
    brand: "Unisex heavyweight fleece",
    description: "Warm fleece-lined hoodie in navy. Worn twice, still like new.",
    specs: [
      { label: "Size", value: "Large" },
      { label: "Colour", value: "Navy" },
    ],
    price: 280,
    category: "fashion",
    condition: "Like New",
    campus: "Res 2",
    seller: "Zanele B.",
    contact: "zanele@campus.ac.za",
    createdAt: ago(8),
    popularity: 67,
    status: "Active",
    ownerId: "seed",
    rating: 4.7,
  },
  {
    id: "p9",
    name: "Football Boots",
    brand: "Adidas Copa · Size 8",
    description: "Firm-ground football boots used for one intervarsity season. Studs still sharp.",
    specs: [
      { label: "Size", value: "UK 8" },
      { label: "Surface", value: "Firm ground" },
    ],
    price: 700,
    category: "sports",
    condition: "Good",
    campus: "Sports Grounds",
    seller: "Sipho T.",
    contact: "sipho@campus.ac.za",
    createdAt: ago(9),
    popularity: 55,
    status: "Active",
    ownerId: "seed",
    rating: 4.1,
  },
  {
    id: "p10",
    name: "Lab Coat",
    brand: "White cotton · Medium",
    description: "Standard laboratory coat, freshly laundered and stain-free.",
    specs: [
      { label: "Size", value: "Medium" },
      { label: "Material", value: "Cotton" },
    ],
    price: 200,
    category: "lab",
    condition: "Like New",
    campus: "Science Building",
    seller: "Mpho R.",
    contact: "mpho@campus.ac.za",
    createdAt: ago(10),
    popularity: 49,
    status: "Active",
    ownerId: "seed",
    rating: 4.0,
  },
  {
    id: "p11",
    name: "USB Flash Drive",
    brand: "SanDisk 64GB",
    description: "Reliable 64GB USB 3.0 flash drive for assignments and backups.",
    specs: [
      { label: "Capacity", value: "64GB" },
      { label: "Interface", value: "USB 3.0" },
    ],
    price: 150,
    category: "electronics",
    condition: "New",
    campus: "Main Campus",
    seller: "Thabo M.",
    contact: "thabo@campus.ac.za",
    createdAt: ago(11),
    popularity: 44,
    status: "Active",
    ownerId: "seed",
    rating: 4.6,
  },
  {
    id: "p12",
    name: "Gym Skipping Rope",
    brand: "Speed rope with bearings",
    description: "Adjustable speed rope, great for res-room cardio.",
    specs: [{ label: "Length", value: "3 m" }],
    price: 120,
    category: "sports",
    condition: "New",
    campus: "Res 3",
    seller: "Lerato N.",
    contact: "lerato@campus.ac.za",
    createdAt: ago(12),
    popularity: 38,
    status: "Active",
    ownerId: "seed",
    rating: 4.2,
  },
];

export const REVIEWS: Review[] = [
  { id: "r1", productId: "p4", author: "Sino K.", verified: true, rating: 5, text: "Very good product" },
  { id: "r2", productId: "p4", author: "Naledi P.", verified: true, rating: 4, text: "Sound is great, battery lasts forever. Delivery on campus was quick." },
  { id: "r3", productId: "p1", author: "Aphiwe D.", verified: true, rating: 5, text: "Exactly as described, saved me before exams." },
  { id: "r4", productId: "p2", author: "Kabelo S.", verified: true, rating: 4, text: "Good bass, comfortable for long study sessions." },
];

export const CONDITIONS: Condition[] = ["New", "Like New", "Good", "Fair"];
