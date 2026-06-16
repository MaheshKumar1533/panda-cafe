"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import { Autoplay, EffectCards, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ArrowUpRight,
  Bean,
  ChevronDown,
  ChevronRight,
  Coffee,
  Globe,
  Menu,
  MoonStar,
  Play,
  Quote,
  Sparkles,
  Star,
  SunMedium,
  MessageCircle,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/free-mode";

type MenuCategory = {
  key: string;
  label: string;
  items: Array<{
    name: string;
    description: string;
    price: string;
    tone: string;
    image: string;
  }>;
};

const menuCategories: MenuCategory[] = [
  {
    key: "tea-coffee",
    label: "Tea & Coffee",
    items: [
      { name: "Bellam Tea", description: "Traditional hot tea sweetened with premium organic jaggery.", price: "₹15.00", tone: "from-amber-300 via-amber-500 to-rose-300", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60" },
      { name: "Thati Bellam Tea", description: "Aromatic black tea infused with natural palm jaggery.", price: "₹20.00", tone: "from-stone-200 via-amber-200 to-amber-400", image: "https://images.unsplash.com/photo-1563887530-623de4f5a478?w=500&auto=format&fit=crop&q=60" },
      { name: "Thati Bellam Coffee", description: "Rich brewed coffee sweetened with organic palm jaggery.", price: "₹20.00", tone: "from-orange-200 via-amber-300 to-yellow-200", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60" },
      { name: "Coffee", description: "Classic hot brewed coffee, strong and aromatic.", price: "₹10.00", tone: "from-stone-300 via-orange-300 to-amber-500", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60" },
      { name: "Boost", description: "Delicious malted chocolate hot energy drink.", price: "₹15.00", tone: "from-rose-200 via-amber-200 to-stone-200", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=60" },
      { name: "Horlicks", description: "Warm, nutritious malted milk beverage.", price: "₹15.00", tone: "from-yellow-100 via-amber-200 to-orange-200", image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=60" },
      { name: "Lemon Tea", description: "Light and refreshing black tea infused with fresh lemon.", price: "₹15.00", tone: "from-lime-100 via-emerald-200 to-teal-200", image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=500&auto=format&fit=crop&q=60" },
      { name: "Green Tea", description: "Healthy, antioxidant-rich steamed green tea leaves.", price: "₹15.00", tone: "from-emerald-200 via-teal-300 to-cyan-200", image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&auto=format&fit=crop&q=60" },
      { name: "Ginger Tea", description: "Spiced hot tea brewed with fresh crushed ginger root.", price: "₹15.00", tone: "from-amber-100 via-stone-200 to-emerald-200", image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500&auto=format&fit=crop&q=60" },
      { name: "Badam Milk", description: "Warm milk flavored with ground almonds, saffron, and cardamom.", price: "₹15.00", tone: "from-yellow-200 via-orange-300 to-amber-400", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=60" },
      { name: "Black Tea", description: "Bold, unsweetened classic hot black tea brew.", price: "₹15.00", tone: "from-slate-200 via-stone-300 to-amber-200", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&auto=format&fit=crop&q=60" },
      { name: "Black Coffee", description: "Strong, dark, freshly brewed hot black coffee.", price: "₹15.00", tone: "from-stone-400 via-zinc-500 to-stone-300", image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=500&auto=format&fit=crop&q=60" },
      { name: "Ragi Malt", description: "Healthy, traditional finger millet malt breakfast drink.", price: "₹15.00", tone: "from-orange-200 via-amber-200 to-stone-300", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=60" },
      { name: "Marathi Tea", description: "Traditional special spiced tea blend from Maharashtra.", price: "₹15.00", tone: "from-rose-200 via-amber-200 to-orange-300", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60" },
      { name: "Cold Coffee", description: "Chilled milk blended with rich espresso and sweetness.", price: "₹80.00", tone: "from-amber-200 via-orange-200 to-rose-200", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=60" },
      { name: "Cold Coffee with Ice Cream", description: "Creamy cold coffee topped with a scoop of vanilla ice cream.", price: "₹120.00", tone: "from-amber-300 via-amber-500 to-orange-400", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop&q=60" },
    ],
  },
  {
    key: "fresh-juices",
    label: "Fresh Juices",
    items: [
      { name: "Apple", description: "Freshly pressed sweet red apple juice.", price: "₹49.00", tone: "from-rose-300 via-rose-500 to-amber-200", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&auto=format&fit=crop&q=60" },
      { name: "Mosambi", description: "Tangy and refreshing sweet lime juice.", price: "₹49.00", tone: "from-lime-200 via-emerald-300 to-yellow-200", image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=500&auto=format&fit=crop&q=60" },
      { name: "Orange", description: "Freshly squeezed citrusy orange juice.", price: "₹49.00", tone: "from-orange-300 via-amber-400 to-yellow-300", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=60" },
      { name: "Sapota", description: "Creamy and rich sweet sapodilla fruit blend.", price: "₹59.00", tone: "from-stone-300 via-amber-400 to-stone-200", image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=60" },
      { name: "Pineapple", description: "Zesty and sweet tropical pineapple juice.", price: "₹49.00", tone: "from-yellow-200 via-amber-300 to-lime-200", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60" },
      { name: "Pomegranate", description: "Antioxidant-rich fresh red pomegranate juice.", price: "₹59.00", tone: "from-red-300 via-rose-500 to-orange-300", image: "https://images.unsplash.com/photo-1620219409890-a5482390a3c9?w=500&auto=format&fit=crop&q=60" },
      { name: "Papaya", description: "Thick and healthy fresh papaya fruit juice.", price: "₹59.00", tone: "from-orange-200 via-amber-300 to-yellow-200", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&auto=format&fit=crop&q=60" },
      { name: "ABC with Honey", description: "Nutritious Apple, Beetroot, and Carrot blend sweetened with honey.", price: "₹79.00", tone: "from-rose-400 via-rose-600 to-amber-300", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60" },
      { name: "Grape", description: "Chilled sweet black grape juice.", price: "₹49.00", tone: "from-purple-200 via-fuchsia-300 to-rose-200", image: "https://images.unsplash.com/photo-1606771131713-39d73d6dc20d?w=500&auto=format&fit=crop&q=60" },
      { name: "Banana", description: "Sweet and energizing fresh banana blend.", price: "₹49.00", tone: "from-yellow-100 via-amber-200 to-stone-200", image: "https://images.unsplash.com/photo-1505252585461-04db1ebb846d?w=500&auto=format&fit=crop&q=60" },
      { name: "Carrot", description: "Healthy, beta-carotene-rich fresh carrot juice.", price: "₹49.00", tone: "from-orange-300 via-amber-400 to-yellow-200", image: "https://images.unsplash.com/photo-1484156818044-c040038b0719?w=500&auto=format&fit=crop&q=60" },
      { name: "Beetroot", description: "Vibrant, earthy and healthy fresh beetroot juice.", price: "₹59.00", tone: "from-rose-500 via-purple-600 to-pink-300", image: "https://images.unsplash.com/photo-1628556264700-fd824c6ff2eb?w=500&auto=format&fit=crop&q=60" },
      { name: "Lemon Juice", description: "Classic sweet and tangy freshly squeezed lemonade.", price: "₹29.00", tone: "from-yellow-200 via-lime-300 to-emerald-200", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
    ],
  },
  {
    key: "mocktails",
    label: "Mocktails",
    items: [
      { name: "Virgin Mojito", description: "Classic cooling blend of fresh mint, lime, sugar, and club soda.", price: "₹79.00", tone: "from-lime-200 via-emerald-300 to-teal-200", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
      { name: "Green Apple Mojito", description: "Refreshing mint and lime mojito with a sweet green apple twist.", price: "₹79.00", tone: "from-lime-100 via-emerald-200 to-cyan-200", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500&auto=format&fit=crop&q=60" },
      { name: "Ocean Color Mojito", description: "Vibrant blue curaçao paired with fresh mint, lime, and soda.", price: "₹79.00", tone: "from-sky-200 via-blue-400 to-indigo-300", image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=500&auto=format&fit=crop&q=60" },
      { name: "Russian Mojito", description: "Intense and exotic blend of fresh citrus, mint, and secret spices.", price: "₹109.00", tone: "from-amber-200 via-orange-400 to-rose-300", image: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=500&auto=format&fit=crop&q=60" },
      { name: "Strawberry Mojito", description: "Sweet strawberry puree muddled with fresh mint and lime.", price: "₹79.00", tone: "from-rose-200 via-pink-400 to-rose-400", image: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=500&auto=format&fit=crop&q=60" },
      { name: "Watermelon Mojito", description: "Refreshing fresh watermelon juice shaken with mint and lime.", price: "₹79.00", tone: "from-rose-300 via-red-400 to-orange-200", image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=500&auto=format&fit=crop&q=60" },
    ],
  },
  {
    key: "lassi",
    label: "Lassi",
    items: [
      { name: "Sweet Lassi", description: "Creamy, chilled yogurt drink traditional sweetened with sugar.", price: "₹69.00", tone: "from-stone-100 via-orange-100 to-amber-200", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=60" },
      { name: "Special Lassi", description: "Premium rich lassi topped with malai and mixed chopped nuts.", price: "₹109.00", tone: "from-amber-200 via-yellow-300 to-orange-300", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=60" },
      { name: "Pista Lassi", description: "Chilled yogurt blend flavored with premium aromatic pistachios.", price: "₹69.00", tone: "from-lime-100 via-emerald-200 to-amber-200", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&auto=format&fit=crop&q=60" },
      { name: "Butter Milk", description: "Chilled, spiced buttermilk with fresh coriander, ginger, and cumin.", price: "₹29.00", tone: "from-stone-200 via-stone-300 to-emerald-100", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&auto=format&fit=crop&q=60" },
    ],
  },
  {
    key: "milk-shakes",
    label: "Milk Shakes",
    items: [
      { name: "Chocolate", description: "Creamy, rich milkshake blended with premium chocolate sauce.", price: "₹69.00", tone: "from-stone-500 via-amber-850 to-stone-700", image: "https://images.unsplash.com/photo-1572490088994-d1300aa2fc3c?w=500&auto=format&fit=crop&q=60" },
      { name: "Vanilla", description: "Classic smooth milkshake flavored with natural vanilla extract.", price: "₹69.00", tone: "from-orange-100 via-yellow-100 to-stone-200", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&auto=format&fit=crop&q=60" },
      { name: "Strawberry", description: "Creamy milkshake blended with sweet red strawberry fruit syrup.", price: "₹69.00", tone: "from-rose-200 via-pink-300 to-rose-300", image: "https://images.unsplash.com/photo-1553787499-6f9133860242?w=500&auto=format&fit=crop&q=60" },
      { name: "Butter Scotch", description: "Indulgent milkshake with rich, buttery caramel butterscotch crunch.", price: "₹69.00", tone: "from-amber-200 via-orange-300 to-yellow-200", image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=500&auto=format&fit=crop&q=60" },
      { name: "Blackcurrant", description: "Vibrant milkshake with sweet and tangy blackcurrant fruit flavor.", price: "₹69.00", tone: "from-purple-200 via-fuchsia-300 to-indigo-200", image: "https://images.unsplash.com/photo-1626803775151-61d756612f97?w=500&auto=format&fit=crop&q=60" },
      { name: "Dry Fruit", description: "Premium milkshake packed with a healthy blend of premium dry fruits.", price: "₹89.00", tone: "from-stone-300 via-amber-200 to-orange-200", image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=60" },
    ],
  },
  {
    key: "fruit-milk-shakes",
    label: "Fruit Milk Shakes",
    items: [
      { name: "Banana Milk Shake", description: "Chilled milk blended with fresh, sweet, energy-packed bananas.", price: "₹69.00", tone: "from-yellow-100 via-amber-200 to-stone-200", image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=60" },
      { name: "Pineapple Milk Shake", description: "Tropical creamy shake blended with fresh pineapple chunks.", price: "₹69.00", tone: "from-yellow-200 via-lime-200 to-amber-300", image: "https://images.unsplash.com/photo-1525385133772-289520883902?w=500&auto=format&fit=crop&q=60" },
      { name: "Apple Milk Shake", description: "Deliciously smooth milkshake blended with sweet red apples.", price: "₹69.00", tone: "from-rose-200 via-rose-300 to-stone-200", image: "https://images.unsplash.com/photo-1610970881699-44a5587caa9a?w=500&auto=format&fit=crop&q=60" },
      { name: "Grapes Milk Shake", description: "Sweet and creamy milkshake blended with fresh grapes.", price: "₹69.00", tone: "from-purple-200 via-rose-200 to-stone-200", image: "https://images.unsplash.com/photo-1634863378546-f94d93f773ab?w=500&auto=format&fit=crop&q=60" },
      { name: "Musk Melon Milk Shake", description: "Cool and refreshing milkshake made with fresh musk melon.", price: "₹69.00", tone: "from-orange-200 via-yellow-200 to-stone-200", image: "https://images.unsplash.com/photo-1623065422902-30a2ad4dc9b0?w=500&auto=format&fit=crop&q=60" },
      { name: "Papaya Milk Shake", description: "Thick, nutritious milkshake made with sweet ripe papaya.", price: "₹69.00", tone: "from-orange-300 via-amber-300 to-yellow-200", image: "https://images.unsplash.com/photo-1505252585461-04db1ebb846d?w=500&auto=format&fit=crop&q=60" },
    ],
  },
  {
    key: "snacks",
    label: "Snacks",
    items: [
      { name: "Pizza", description: "Delectable personal-sized pizza topped with cheese and fresh veggies.", price: "₹120.00", tone: "from-orange-300 via-red-400 to-yellow-200", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60" },
      { name: "Burger", description: "Classic veggie burger with a crispy patty, fresh lettuce, and sauce.", price: "₹80.00", tone: "from-amber-200 via-orange-300 to-stone-300", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
      { name: "Sandwich", description: "Golden toasted sandwich stuffed with spiced vegetables and cheese.", price: "₹80.00", tone: "from-stone-200 via-amber-200 to-emerald-200", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60" },
      { name: "French Fries", description: "Crispy, golden-fried potato fingers lightly salted and served with dip.", price: "₹80.00", tone: "from-yellow-200 via-amber-300 to-orange-200", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=60" },
      { name: "Samosa", description: "Crispy pastry pockets filled with spiced potato and pea stuffing.", price: "₹10.00", tone: "from-amber-300 via-orange-400 to-stone-300", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60" },
      { name: "Bonda", description: "Traditional deep-fried savory potato dumplings in chickpea batter.", price: "₹10.00", tone: "from-amber-200 via-yellow-300 to-stone-200", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&auto=format&fit=crop&q=60" },
      { name: "Mirchi Bajji", description: "Spicy green chili fritters fried golden brown, served with onions.", price: "₹10.00", tone: "from-orange-300 via-red-500 to-amber-200", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60" },
    ],
  },
];

const drinks = [
  {
    name: "Thati Bellam Coffee",
    note: "Rich brewed coffee sweetened with premium organic palm jaggery.",
    accent: "from-stone-900 via-amber-950 to-rose-950",
    coverImage: "/images/menu/tea-coffee_thati_bellam_coffee.jpg",
  },
  {
    name: "Cold Coffee with Ice Cream",
    note: "Chilled coffee topped with a creamy scoop of vanilla ice cream.",
    accent: "from-amber-200 via-orange-300 to-stone-400",
    coverImage: "/images/menu/tea-coffee_cold_coffee_with_ice_cream.jpg",
  },
  {
    name: "Ocean Color Mojito",
    note: "Vibrant blue curaçao paired with fresh mint, lime, and soda.",
    accent: "from-sky-200 via-cyan-300 to-emerald-200",
    coverImage: "/images/menu/mocktails_ocean_color_mojito.jpg"
  },
  {
    name: "Special Lassi",
    note: "Premium rich yogurt shake topped with malai and mixed chopped nuts.",
    accent: "from-rose-200 via-amber-200 to-orange-300",
    coverImage: "/images/menu/lassi_special_lassi.jpg",
  },
];

const testimonials = [
  {
    name: "Amara Chen",
    role: "Weekend regular",
    text: "Every detail feels thoughtful — from the first sip to the final sparkle of the room.",
    rating: 5,
  },
  {
    name: "Ethan Brooks",
    role: "Design director",
    text: "A luxurious café experience with a calm, premium rhythm that still feels welcoming.",
    rating: 5,
  },
  {
    name: "Noor Patel",
    role: "Frequent guest",
    text: "The drinks are beautiful, the atmosphere is soft, and the service feels personal.",
    rating: 5,
  },
];

const galleryItems = [
  { title: "Barista Ritual", tall: "h-56", tone: "from-amber-300 via-stone-200 to-rose-200" },
  { title: "Sunlit Corner", tall: "h-72", tone: "from-stone-200 via-amber-100 to-amber-300" },
  { title: "Espresso Pour", tall: "h-64", tone: "from-rose-200 via-amber-200 to-orange-300" },
  { title: "Cozy Tables", tall: "h-52", tone: "from-orange-200 via-yellow-100 to-stone-200" },
  { title: "Steam Detail", tall: "h-80", tone: "from-slate-200 via-stone-200 to-amber-200" },
  { title: "Dessert Glow", tall: "h-60", tone: "from-amber-200 via-rose-100 to-stone-200" },
];

const stats = [
  { label: "Cups Served", value: 120000, suffix: "+", icon: Coffee },
  { label: "Happy Customers", value: 42000, suffix: "+", icon: Users },
  { label: "Years of Service", value: 12, suffix: "+", icon: Sparkles },
  { label: "Menu Items", value: 58, suffix: "+", icon: UtensilsCrossed },
];

const socials = [
  { label: "Website", icon: Globe },
  { label: "Chat", icon: MessageCircle },
];

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const duration = 1200;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-amber-100/80 backdrop-blur">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl md:text-5xl dark:text-stone-50">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-700 sm:text-base dark:text-stone-300">
        {description}
      </p>
    </div>
  );
}

function StatCard({ label, value, suffix, icon: Icon }: (typeof stats)[number]) {
  const count = useCountUp(value, true);

  return (
    <CardShell>
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-amber-500" />
        <div className="h-1.5 w-24 rounded-full bg-black/5 dark:bg-white/10">
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-amber-300 to-orange-500"
            initial={{ width: "20%" }}
            whileInView={{ width: label === "Cups Served" ? "92%" : label === "Happy Customers" ? "86%" : label === "Years of Service" ? "78%" : "82%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
      <p className="mt-5 text-4xl font-semibold text-stone-950 dark:text-stone-50">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">{label}</p>
    </CardShell>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/70 p-5 shadow-[0_20px_80px_rgba(122,74,28,0.12)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:bg-[#1d1410]/70">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-amber-200/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].key);
  const [showTop, setShowTop] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const prefersReducedMotion = useReducedMotion();
  const steamRefs = useRef<HTMLSpanElement[]>([]);
  const particleRefs = useRef<HTMLSpanElement[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroProgress = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("panda-cafe-theme") as "light" | "dark" | null;
    const preferred = savedTheme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferred);
    document.documentElement.dataset.theme = preferred;
    setReady(true);

    if (prefersReducedMotion) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, lerp: 0.08 });
    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!ready || prefersReducedMotion) return;

    gsap.fromTo(
      steamRefs.current,
      { y: 20, opacity: 0.15, scaleY: 0.85 },
      { y: -18, opacity: 0.55, scaleY: 1.05, duration: 2.6, repeat: -1, yoyo: true, stagger: 0.25, ease: "sine.inOut" }
    );

    gsap.fromTo(
      particleRefs.current,
      { y: 0, opacity: 0.1 },
      { y: -28, opacity: 0.7, duration: 4, repeat: -1, yoyo: true, stagger: 0.15, ease: "sine.inOut" }
    );
  }, [prefersReducedMotion, ready]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [prefersReducedMotion]);

  const activeMenu = useMemo(
    () => menuCategories.find((entry) => entry.key === activeCategory) ?? menuCategories[0],
    [activeCategory]
  );

  const handleThemeToggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("panda-cafe-theme", nextTheme);
  };



  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,237,213,0.96),rgba(251,247,241,1)_30%,rgba(244,235,226,1)_70%,rgba(33,20,11,1)_140%)] text-stone-900 dark:bg-[radial-gradient(circle_at_top,rgba(78,47,29,0.9),rgba(23,14,10,1)_45%,rgba(8,7,6,1)_100%)] dark:text-stone-50">
      <motion.div className="fixed left-0 top-0 z-50 h-1 origin-left bg-linear-to-r from-amber-300 via-orange-400 to-rose-400" style={{ scaleX: heroProgress }} />

      <AnimatePresence>
        {!ready && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-[#140d09]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-amber-200/20 bg-white/5 shadow-[0_0_80px_rgba(217,119,6,0.25)]">
              <motion.div
                className="absolute h-20 w-20 rounded-full border border-amber-200/30"
                animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <Coffee className="h-8 w-8 text-amber-200" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!prefersReducedMotion && (
        <div className="pointer-events-none fixed left-0 top-0 z-40 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/40 bg-amber-200/10 backdrop-blur md:block" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%)` }} />
      )}

      <header className="sticky top-0 z-30 border-b border-white/10 bg-white/50 backdrop-blur-xl dark:bg-black/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#hero" className="flex items-center gap-3">
            <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-amber-300 via-orange-400 to-stone-700 text-lg font-bold text-white shadow-lg shadow-amber-900/20">
              PC
              <span className="absolute inset-0 rounded-2xl border border-white/30" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Panda Cafe</span>
              <span className="block text-sm font-medium text-stone-900 dark:text-stone-50">Brewing calm luxury</span>
            </span>
          </a>

          <div className="hidden items-center gap-2 md:flex">
            {[
              ["About", "#about"],
              ["Menu", "#menu"],
              ["Gallery", "#gallery"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="rounded-full px-4 py-2 text-sm text-stone-600 transition hover:bg-black/5 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-white/5 dark:hover:text-white">
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleThemeToggle}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/70 text-stone-800 shadow-sm transition hover:-translate-y-0.5 dark:bg-white/10 dark:text-stone-50"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-stone-950 px-4 text-sm font-medium text-white shadow-lg shadow-stone-950/20 transition hover:-translate-y-0.5 dark:bg-amber-200 dark:text-stone-950 md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="border-t border-white/10 bg-white/90 px-4 py-4 backdrop-blur-xl dark:bg-[#120d0a]/95 md:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <div className="grid gap-2">
                {[
                  ["About", "#about"],
                  ["Menu", "#menu"],
                  ["Gallery", "#gallery"],
                  ["Reviews", "#reviews"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-white/10 bg-stone-950/5 px-4 py-3 text-sm font-medium text-stone-900 dark:bg-white/5 dark:text-stone-50"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="hero" className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.35em] text-stone-600 shadow-sm backdrop-blur dark:bg-white/10 dark:text-stone-300">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Luxury café experience
          </div>

          <div className="relative mb-6 h-12 overflow-hidden">
            <div className="absolute left-0 top-1/2 h-px w-28 bg-linear-to-r from-amber-200 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative text-sm font-medium uppercase tracking-[0.5em] text-stone-700 dark:text-stone-300"
            >
              Panda Cafe
              <span className="absolute -top-7 left-28 flex items-end gap-1 text-amber-300">
                <span ref={(el) => { if (el) steamRefs.current[0] = el; }} className="h-8 w-1 rounded-full bg-current blur-[1px]" />
                <span ref={(el) => { if (el) steamRefs.current[1] = el; }} className="h-10 w-1 rounded-full bg-current blur-[1px]" />
                <span ref={(el) => { if (el) steamRefs.current[2] = el; }} className="h-7 w-1 rounded-full bg-current blur-[1px]" />
              </span>
            </motion.div>
          </div>

          <motion.h1
            className="max-w-xl text-5xl font-semibold tracking-tight text-stone-950 sm:text-6xl md:text-7xl dark:text-stone-50"
            initial="hidden"
            animate={ready ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {"Brewing Moments, One Cup at a Time".split(" ").map((word) => (
              <motion.span
                key={word}
                className="mr-3 inline-block"
                variants={{ hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-base leading-8 text-stone-700 sm:text-lg dark:text-stone-300"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            A warm, cinematic café destination crafted for slow mornings, polished evenings, and every beautiful pause between.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <a href="#menu" className="group inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-4 text-sm font-medium text-white shadow-xl shadow-stone-950/20 transition hover:-translate-y-1 dark:bg-amber-200 dark:text-stone-950">
              View Menu <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              "Single-origin beans",
              "Delectable café snacks",
              "Cozy luxury interiors",
            ].map((text, index) => (
              <motion.div
                key={text}
                className="rounded-2xl border border-white/10 bg-white/70 px-4 py-3 text-sm text-stone-700 shadow-sm backdrop-blur dark:bg-white/10 dark:text-stone-300"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
                transition={{ delay: 0.7 + index * 0.08, duration: 0.55 }}
              >
                {text}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.92, y: 32 }}
          animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.92, y: ready ? 0 : 32 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        >
          <div className="absolute -left-4 top-8 h-24 w-24 rounded-full bg-amber-300/30 blur-3xl" />
          <div className="absolute -right-4 bottom-12 h-28 w-28 rounded-full bg-orange-300/25 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/20 bg-stone-950 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.25)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_38%)]" />
            <div className="relative grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="overflow-hidden rounded-3xl bg-linear-to-br from-amber-100 via-orange-200 to-stone-300 p-4">
                <motion.div
                  className="relative aspect-4/5 overflow-hidden rounded-[1.3rem] bg-[linear-gradient(180deg,rgba(94,53,36,0.2),rgba(35,20,12,0.72)),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.55),transparent_25%),linear-gradient(135deg,#f4e2cb,#b16f3c_45%,#2b1710)]"
                  initial={{ scale: 1.16, x: -12 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.18)_34%,transparent_50%)] opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-black/20 p-4 text-white backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">Signature ambience</p>
                    <p className="mt-1 text-lg font-semibold">Soft light, artisan brewing, slow luxury</p>
                  </div>
                  <motion.span
                    className="absolute left-8 top-10 rounded-full border border-white/20 bg-white/20 px-3 py-1 text-xs text-white backdrop-blur"
                    animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
                    transition={{ duration: 3.4, repeat: Infinity }}
                  >
                    Freshly poured
                  </motion.span>
                </motion.div>
              </div>

              <div className="grid gap-4">
                <CardShell>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">Today's blend</span>
                    <Bean className="h-4 w-4 text-amber-500" />
                  </div>
                  <p className="mt-4 text-2xl font-semibold text-stone-950 dark:text-stone-50">Thati Bellam Coffee</p>
                  <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">Rich brewed coffee sweetened with traditional organic palm jaggery.</p>
                  <div className="mt-5 flex items-center gap-2">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-2 text-xs uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">Top rated</span>
                  </div>
                </CardShell>

                <CardShell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-amber-300 to-orange-500 text-stone-950 shadow-lg shadow-amber-800/20">
                      <Play className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-stone-950 dark:text-stone-50">Cinematic roasting ritual</p>
                      <p className="text-sm text-stone-600 dark:text-stone-300">Hover, tap, and scroll for subtle motion.</p>
                    </div>
                  </div>
                </CardShell>
              </div>
            </div>

            <div className="relative mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.span
                  key={index}
                  ref={(el: HTMLSpanElement | null) => {
                    if (el) particleRefs.current[index] = el;
                  }}
                  className={`h-2 rounded-full ${index % 3 === 0 ? "bg-amber-300/70" : index % 3 === 1 ? "bg-orange-300/70" : "bg-white/40"}`}
                  style={{ width: `${14 + index * 5}px` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section id="about" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="About the café"
            title="A thoughtfully designed space for exceptional coffee moments."
            description="Panda Cafe blends artisanal brewing, warm hospitality, and an elevated visual identity into a calm, premium destination built for modern routines."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <motion.div
              className="overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-amber-200 via-orange-200 to-stone-400 p-6 shadow-[0_24px_80px_rgba(122,74,28,0.15)]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-4/3 rounded-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.8),transparent_30%),linear-gradient(135deg,#f7e1c6,#c98650_42%,#4e2d1d)] shadow-inner" />
            </motion.div>

            <div className="grid gap-5">
              <CardShell>
                <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Our story</p>
                <p className="mt-4 text-lg leading-8 text-stone-700 dark:text-stone-300">Born from a love of slow mornings and beautifully crafted cups, the café was imagined as a place where textures, aromas, and soft light do as much storytelling as the menu itself.</p>
              </CardShell>
              <CardShell>
                <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Founder’s message</p>
                <p className="mt-4 text-lg leading-8 text-stone-700 dark:text-stone-300">We wanted every visit to feel intimate, polished, and effortless — like stepping into a scene that already understands your favorite drink.</p>
              </CardShell>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured menu"
            title="A curated selection of signature drinks and seasonal bites."
            description="Switch between café categories with smooth transitions and refined card motion that feels natural on touch devices."
          />

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {menuCategories.map((category) => (
              <button
                key={category.key}
                type="button"
                onClick={() => setActiveCategory(category.key)}
                className={`rounded-full px-4 py-3 text-sm font-medium transition ${activeCategory === category.key ? "bg-stone-950 text-white dark:bg-amber-200 dark:text-stone-950" : "bg-white/70 text-stone-700 dark:bg-white/10 dark:text-stone-300"}`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {activeMenu.items.map((item, index) => (
                <motion.article
                  key={item.name}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/70 p-4 shadow-[0_16px_60px_rgba(122,74,28,0.12)] backdrop-blur-xl dark:bg-white/10"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  whileHover={prefersReducedMotion ? {} : { y: -8, rotate: -0.2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-[1.4rem] group">
                    {/* Background gradient border effect */}
                    <div className={`absolute inset-0 bg-linear-to-br ${item.tone} opacity-80`} />
                    {/* The menu item image */}
                    <img
                      src={`/images/menu/${activeCategory}_${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.jpg`}
                      alt={item.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Dark gradient overlay to ensure text/label is legible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute bottom-4 left-4 flex items-end">
                      <div className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md border border-white/10">
                        {activeMenu.label}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-stone-950 dark:text-stone-50">{item.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">{item.description}</p>
                    </div>
                    <div className="rounded-full bg-stone-950 px-3 py-2 text-sm font-medium text-white dark:bg-amber-200 dark:text-stone-950">{item.price}</div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Signature showcase"
            title="A horizontal carousel designed for swipe-first discovery."
            description="Large cards, 3D depth, and momentum scrolling create a tactile premium browsing experience."
          />

          <div className="mt-10">
            <Swiper
              modules={[EffectCards, Autoplay, FreeMode]}
              effect="cards"
              grabCursor
              loop
              autoplay={prefersReducedMotion ? false : { delay: 2800, disableOnInteraction: false }}
              cardsEffect={{ perSlideOffset: 10, perSlideRotate: 4, slideShadows: true }}
              className="overflow-visible! px-2 pb-8"
            >
              {drinks.map((drink) => (
                <SwiperSlide key={drink.name} className="h-auto!">
                  <div className={`relative overflow-hidden rounded-[2.2rem] bg-linear-to-br ${drink.accent} p-5 shadow-[0_25px_100px_rgba(0,0,0,0.14)]`}>
                    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                      <div className="relative flex flex-col justify-end overflow-hidden rounded-[1.7rem] p-6 text-stone-950 h-80">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.65),transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.2),rgba(0,0,0,0.2))]" />
                        <div className={`${drink.name === "Thati Bellam Coffee" ? "text-stone-50" : "text-stone-950"} relative z-10`}>
                          <p className={`text-xs uppercase tracking-[0.35em] font-semibold drop-shadow-md ${drink.name === "Thati Bellam Coffee" ? "text-stone-50" : "text-stone-800/70"}`}>Signature drink</p>
                          <h3 className="mt-4 text-3xl font-bold drop-shadow-lg">{drink.name}</h3>
                          <p className="mt-3 max-w-sm text-sm leading-7 font-medium drop-shadow-md">{drink.note}</p>
                          <div className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-lg ${drink.name === "Thati Bellam Coffee" ? "text-stone-50 bg-black/80" : "text-stone-800/70 bg-white/80"}`}>
                            Swipe to explore <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      <div className="relative flex flex-col justify-end overflow-hidden rounded-[1.7rem] p-6 text-stone-950">
                        <img src={drink.coverImage} alt={`${drink.name} cover`} className="absolute inset-0 h-full w-full object-cover" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* <section id="gallery" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Gallery"
            title="A Pinterest-style mosaic with slow reveal motion."
            description="This layout uses layered cards and lazy-style reveal patterns to keep the browsing experience airy and elegant on mobile."
          />

          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.title}
                className={`mb-4 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br ${item.tone} p-4 shadow-[0_16px_60px_rgba(122,74,28,0.12)] ${item.tall}`}
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              >
                <div className="flex h-full flex-col justify-between rounded-[1.4rem] border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(0,0,0,0.08))] p-4 text-white backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.25em]">#{index + 1}</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold">{item.title}</p>
                    <p className="mt-2 max-w-xs text-sm leading-7 text-white/85">Premium moments captured with warm light and tactile detail.</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      <section id="reviews" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Customer reviews"
            title="Smooth testimonials that feel alive without being distracting."
            description="A soft auto-sliding carousel with touch support and floating card depth."
          />

          <div className="mt-10 rounded-4xl border border-white/10 bg-white/55 p-4 shadow-[0_16px_60px_rgba(122,74,28,0.12)] backdrop-blur-xl dark:bg-white/10">
            <Swiper
              modules={[Autoplay, FreeMode]}
              spaceBetween={16}
              slidesPerView={1.05}
              freeMode={{ enabled: true, sticky: true }}
              autoplay={prefersReducedMotion ? false : { delay: 3200, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 2.1 },
                1200: { slidesPerView: 3 },
              }}
              className="overflow-visible!"
            >
              {testimonials.map((review) => (
                <SwiperSlide key={review.name}>
                  <CardShell>
                    <Quote className="h-6 w-6 text-amber-500" />
                    <p className="mt-4 text-base leading-8 text-stone-700 dark:text-stone-300">{review.text}</p>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-stone-950 dark:text-stone-50">{review.name}</p>
                        <p className="text-sm text-stone-500 dark:text-stone-400">{review.role}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: review.rating }).map((_, index) => (
                          <Star key={index} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardShell>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section id="stats" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Statistics"
            title="Animated numbers that confirm the café’s momentum."
            description="Counters activate on scroll and resolve smoothly to keep the motion elegant and responsive."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <footer ref={footerRef} className="border-t border-white/10 px-4 pb-28 pt-16 sm:px-6 lg:px-8 md:pb-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-amber-300 via-orange-400 to-stone-700 text-lg font-bold text-white">PC</span>
              <div>
                <p className="text-lg font-semibold text-stone-950 dark:text-stone-50">Panda Cafe</p>
                <p className="text-sm text-stone-600 dark:text-stone-400">Premium warmth, crafted for modern rituals.</p>
              </div>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-7 text-stone-700 dark:text-stone-300">A calm, luxurious café brand experience tuned for mobile-first storytelling, performance, and meaningful motion.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ label, icon: Icon }) => (
                <a key={label} href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/70 text-stone-800 transition hover:-translate-y-0.5 dark:bg-white/10 dark:text-stone-50" aria-label={label}>
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <CardShell>
              <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Navigation</p>
              <div className="mt-4 grid gap-2 text-sm text-stone-700 dark:text-stone-300">
                {[
                  ["Hero", "#hero"],
                  ["About", "#about"],
                  ["Menu", "#menu"],
                  ["Gallery", "#gallery"],
                ].map(([label, href]) => (
                  <a key={label} href={href} className="hover:text-stone-950 dark:hover:text-white">{label}</a>
                ))}
              </div>
            </CardShell>
            <CardShell>
              <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">Newsletter</p>
              <p className="mt-4 text-sm leading-7 text-stone-700 dark:text-stone-300">Receive seasonal menu highlights and updates.</p>
              <div className="mt-4 flex gap-2">
                <input type="email" placeholder="Email address" className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/80 px-4 py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400 dark:bg-black/20 dark:text-white" />
                <button type="button" className="inline-flex items-center justify-center rounded-full bg-stone-950 px-4 py-3 text-sm font-medium text-white dark:bg-amber-200 dark:text-stone-950">
                  Join
                </button>
              </div>
            </CardShell>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 left-1/2 z-30 w-[min(92vw,20rem)] -translate-x-1/2 md:hidden">
        <div className="rounded-full border border-white/10 bg-white/80 p-2 shadow-2xl backdrop-blur-xl dark:bg-[#140d09]/90">
          <a href="#menu" className="flex items-center justify-center rounded-full bg-stone-950 px-4 py-3 text-sm font-medium text-white dark:bg-amber-200 dark:text-stone-950">
            View Menu
          </a>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#hero"
            className="fixed bottom-24 right-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-stone-950 text-white shadow-xl shadow-stone-950/20 dark:bg-amber-200 dark:text-stone-950 md:bottom-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            aria-label="Back to top"
          >
            <ChevronDown className="h-4 w-4 rotate-180" />
          </motion.a>
        )}
      </AnimatePresence>
    </main>
  );
}
