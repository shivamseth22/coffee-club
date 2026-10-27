export const stats = [
  { label: "Revenue", value: "₹4,86,640", change: "+8.2%", up: true },
  { label: "Orders", value: "1,326", change: "+4.1%", up: true },
  { label: "Avg. order", value: "₹367", change: "+3.9%", up: true },
  { label: "Refunds", value: "12", change: "-2.0%", up: false },
];

export const weeklyRevenue = [
  { day: "Mon", amount: 55400 },
  { day: "Tue", amount: 62800 },
  { day: "Wed", amount: 59700 },
  { day: "Thu", amount: 73700 },
  { day: "Fri", amount: 87400 },
  { day: "Sat", amount: 94000 },
  { day: "Sun", amount: 53640 },
];

export const topProducts = [
  { name: "Latte", sold: 412 },
  { name: "Cappuccino", sold: 318 },
  { name: "Cold Brew", sold: 254 },
  { name: "Espresso", sold: 197 },
  { name: "Mocha", sold: 145 },
];

export const recentOrders = [
  { id: "#1042", customer: "Aarav", item: "Latte", total: "₹250", status: "Paid" },
  { id: "#1041", customer: "Priya", item: "Cold Brew x2", total: "₹520", status: "Paid" },
  { id: "#1040", customer: "Rohan", item: "Mocha", total: "₹290", status: "Pending" },
  { id: "#1039", customer: "Meera", item: "Espresso", total: "₹180", status: "Paid" },
  { id: "#1038", customer: "Kabir", item: "Cappuccino", total: "₹260", status: "Refunded" },
] as const;
