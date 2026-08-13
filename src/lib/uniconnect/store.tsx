import * as React from "react";
import {
  SEED_PRODUCTS,
  type Condition,
  type ListingStatus,
  type Product,
} from "./data";

export interface User {
  name: string;
  email: string;
  school: string;
  phone: string;
  avatar?: string;
}

export interface CartLine {
  productId: string;
  qty: number;
}

export interface Order {
  id: string;
  date: string;
  items: { productId: string; name: string; qty: number; price: number }[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  method: "Delivery" | "Pickup";
  status: "Processing" | "Ready for Pickup" | "Out for Delivery" | "Completed" | "Cancelled";
  address: string;
}

export interface Notification {
  id: string;
  kind: "order" | "sale" | "message" | "pickup";
  text: string;
  time: string;
  read: boolean;
}

export interface Message {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  name: string;
  about: string;
  messages: Message[];
}

interface State {
  user: User | null;
  products: Product[];
  cart: CartLine[];
  orders: Order[];
  notifications: Notification[];
  conversations: Conversation[];
}

const now = () => new Date().toISOString();

const initialState: State = {
  user: null,
  products: SEED_PRODUCTS,
  cart: [],
  orders: [
    {
      id: "UC-10231",
      date: new Date(Date.now() - 6 * 86400000).toISOString(),
      items: [{ productId: "p1", name: "Scientific Calculator", qty: 1, price: 400 }],
      subtotal: 400,
      shipping: 35,
      discount: 0,
      total: 435,
      method: "Delivery",
      status: "Completed",
      address: "Res 1, Main Campus",
    },
    {
      id: "UC-10247",
      date: new Date(Date.now() - 2 * 86400000).toISOString(),
      items: [{ productId: "p8", name: "Campus Hoodie", qty: 1, price: 280 }],
      subtotal: 280,
      shipping: 0,
      discount: 28,
      total: 252,
      method: "Pickup",
      status: "Ready for Pickup",
      address: "Student Centre pickup point",
    },
  ],
  notifications: [
    { id: "n1", kind: "order", text: "Your order UC-10247 has been confirmed.", time: new Date(Date.now() - 3600000).toISOString(), read: false },
    { id: "n2", kind: "sale", text: "Your item “Laptop Stand” has been sold.", time: new Date(Date.now() - 8 * 3600000).toISOString(), read: false },
    { id: "n3", kind: "message", text: "Your listing has received a new message.", time: new Date(Date.now() - 26 * 3600000).toISOString(), read: true },
    { id: "n4", kind: "pickup", text: "Your order is ready for pickup at the Student Centre.", time: new Date(Date.now() - 50 * 3600000).toISOString(), read: true },
  ],
  conversations: [
    {
      id: "c1",
      name: "Thabo M.",
      about: "Scientific Calculator",
      messages: [
        { id: "m1", from: "me", text: "Hi, is the calculator still available?", time: new Date(Date.now() - 7200000).toISOString() },
        { id: "m2", from: "them", text: "Yes, it is available.", time: new Date(Date.now() - 7000000).toISOString() },
      ],
    },
    {
      id: "c2",
      name: "Zanele B.",
      about: "Campus Hoodie",
      messages: [
        { id: "m3", from: "them", text: "Hey! I can meet at the library at 14:00.", time: new Date(Date.now() - 90000000).toISOString() },
      ],
    },
  ],
};

type Ctx = State & {
  hydrated: boolean;
  login: (email: string, name?: string) => void;
  signup: (email: string, school: string) => void;
  logout: () => void;
  updateProfile: (patch: Partial<User>) => void;
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  addProduct: (p: Omit<Product, "id" | "createdAt" | "popularity" | "status" | "ownerId" | "rating">) => Product;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setListingStatus: (id: string, status: ListingStatus) => void;
  placeOrder: (o: Omit<Order, "id" | "date" | "status">) => Order;
  markNotificationsRead: () => void;
  sendMessage: (conversationId: string, text: string) => void;
};

const StoreContext = React.createContext<Ctx | null>(null);
const KEY = "uniconnect:v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<State>(initialState);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<State>;
        setState((s) => ({ ...s, ...parsed }));
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage full / unavailable */
    }
  }, [state, hydrated]);

  const value = React.useMemo<Ctx>(() => {
    const patch = (fn: (s: State) => State) => setState(fn);
    const notify = (s: State, kind: Notification["kind"], text: string): State => ({
      ...s,
      notifications: [{ id: `n${Date.now()}`, kind, text, time: now(), read: false }, ...s.notifications],
    });

    return {
      ...state,
      hydrated,
      login: (email, name) =>
        patch((s) => ({
          ...s,
          user: s.user ?? {
            name: name ?? email.split("@")[0] ?? "Student",
            email,
            school: "University of Campus",
            phone: "",
          },
        })),
      signup: (email, school) =>
        patch((s) => ({
          ...s,
          user: { name: email.split("@")[0] ?? "Student", email, school, phone: "" },
        })),
      logout: () => patch((s) => ({ ...s, user: null, cart: [] })),
      updateProfile: (p) => patch((s) => (s.user ? { ...s, user: { ...s.user, ...p } } : s)),
      addToCart: (productId, qty = 1) =>
        patch((s) => {
          const exists = s.cart.find((l) => l.productId === productId);
          return {
            ...s,
            cart: exists
              ? s.cart.map((l) => (l.productId === productId ? { ...l, qty: l.qty + qty } : l))
              : [...s.cart, { productId, qty }],
          };
        }),
      removeFromCart: (productId) =>
        patch((s) => ({ ...s, cart: s.cart.filter((l) => l.productId !== productId) })),
      setQty: (productId, qty) =>
        patch((s) => ({
          ...s,
          cart:
            qty <= 0
              ? s.cart.filter((l) => l.productId !== productId)
              : s.cart.map((l) => (l.productId === productId ? { ...l, qty } : l)),
        })),
      clearCart: () => patch((s) => ({ ...s, cart: [] })),
      addProduct: (p) => {
        const product: Product = {
          ...p,
          id: `u${Date.now()}`,
          createdAt: now(),
          popularity: 0,
          status: "Active",
          ownerId: "me",
          rating: 0,
        };
        patch((s) => notify({ ...s, products: [product, ...s.products] }, "sale", `Your listing “${product.name}” is now live.`));
        return product;
      },
      updateProduct: (id, p) =>
        patch((s) => ({ ...s, products: s.products.map((x) => (x.id === id ? { ...x, ...p } : x)) })),
      deleteProduct: (id) => patch((s) => ({ ...s, products: s.products.filter((x) => x.id !== id) })),
      setListingStatus: (id, status) =>
        patch((s) => ({ ...s, products: s.products.map((x) => (x.id === id ? { ...x, status } : x)) })),
      placeOrder: (o) => {
        const order: Order = {
          ...o,
          id: `UC-${Math.floor(10000 + Math.random() * 89999)}`,
          date: now(),
          status: o.method === "Pickup" ? "Ready for Pickup" : "Processing",
        };
        patch((s) =>
          notify({ ...s, orders: [order, ...s.orders], cart: [] }, "order", `Your order ${order.id} has been confirmed.`),
        );
        return order;
      },
      markNotificationsRead: () =>
        patch((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
      sendMessage: (conversationId, text) =>
        patch((s) => ({
          ...s,
          conversations: s.conversations.map((c) =>
            c.id === conversationId
              ? { ...c, messages: [...c.messages, { id: `m${Date.now()}`, from: "me", text, time: now() }] }
              : c,
          ),
        })),
    };
  }, [state, hydrated]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export const rands = (n: number) =>
  `R${n.toLocaleString("en-ZA", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

export type { Condition, Product, ListingStatus };
