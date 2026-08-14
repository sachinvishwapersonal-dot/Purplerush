/*
 * Canonical BlooRush Service Catalog (Single Source of Truth)
 * Shared across Customer Booking, Field Partner App, and Operations Dispatch.
 */

const SERVICES = {
  utensils: {
    id: "utensils",
    name: "Utensils Cleaning",
    icon: "🍽️",
    desc: "Dishes, cookware, vessels & kitchen sink cleaning",
    tierCategory: "quick",
    tiers: [
      { label: "30 min (Light Load)", price: 89, minutes: 30 },
      { label: "45 min (Regular Daily)", price: 129, minutes: 45 },
      { label: "60 min (Family Load)", price: 179, minutes: 60 },
      { label: "90 min (Heavy / Party)", price: 239, minutes: 90 },
      { label: "120 min (Mega Load)", price: 299, minutes: 120 }
    ],
    inc: [
      "Wash daily-used utensils, plates, bowls, cutlery",
      "Cooking vessels & pans used for daily food prep",
      "Scrub and sanitize the kitchen sink and tap"
    ],
    exc: [
      "Deep appliance cleaning (oven/microwave interior)",
      "Silver/brass chemical polishing",
      "Removing heavily burnt carbon crusts"
    ]
  },
  mopsweep: {
    id: "mopsweep",
    name: "Mopping & Sweeping",
    icon: "🧹",
    desc: "Comprehensive sweeping and wet-mopping for full home floors",
    tierCategory: "standard",
    tiers: [
      { label: "1 BHK", price: 99, minutes: 20 },
      { label: "2 BHK", price: 119, minutes: 30 },
      { label: "3 BHK", price: 149, minutes: 45 },
      { label: "4 BHK", price: 189, minutes: 60 }
    ],
    inc: [
      "Thorough broom sweeping of all accessible rooms",
      "Disinfectant wet mopping with partner mop & solutions",
      "Dust disposal in home trash bins",
      "Under-furniture sweeping without shifting heavy units"
    ],
    exc: [
      "Moving heavy furniture/appliances (sofas, wardrobes)",
      "Acid wash or marble grinding",
      "Post-construction paint/cement scrapings"
    ]
  },
  dusting: {
    id: "dusting",
    name: "Surface Dusting",
    icon: "🪶",
    desc: "Dusting and wipe-down of surfaces, shelves, appliances & tables",
    tierCategory: "quick",
    tiers: [
      { label: "1 BHK", price: 99, minutes: 30 },
      { label: "2 BHK", price: 129, minutes: 40 },
      { label: "3 BHK", price: 179, minutes: 60 },
      { label: "4 BHK", price: 229, minutes: 80 }
    ],
    inc: [
      "Wipe open table surfaces, TV stands, showcases",
      "Accessible window ledges, photo frames & switchboards",
      "Microfiber dusting of electronics exterior"
    ],
    exc: [
      "Inside closed cupboards/wardrobes",
      "High ceiling fan dusting or heights needing ladders",
      "Antique fragile glass restoration"
    ]
  },
  toiletbath: {
    id: "toiletbath",
    name: "Toilet & Bathroom Cleaning",
    icon: "🚽",
    desc: "Disinfection, tile scrubbing, washbasin, taps & mirror shining",
    tierCategory: "standard",
    tiers: [
      { label: "1 Bathroom (Regular)", price: 99, minutes: 30 },
      { label: "1 Combined (Toilet + Bath)", price: 159, minutes: 35 },
      { label: "2 Bathrooms", price: 289, minutes: 60 },
      { label: "3 Bathrooms", price: 429, minutes: 90 }
    ],
    inc: [
      "Scrub toilet bowl inside, rim & base",
      "Washbasin, mirror, tap chrome polish",
      "Scrub bathroom floor tiles & drain rim",
      "Disinfectant germ-kill spray"
    ],
    exc: [
      "Severe hard water acid restoration (requires Deep Clean)",
      "Plumbing unclogging & drainage repairs",
      "Exhaust fan dismantling"
    ]
  },
  kitchen: {
    id: "kitchen",
    name: "Kitchen Deep Reset",
    icon: "🍳",
    desc: "Stovetop degreasing, countertops, exterior cabinets & sink",
    tierCategory: "premium",
    tiers: [
      { label: "Standard Kitchen", price: 399, minutes: 60 },
      { label: "Large / Modular Kitchen", price: 549, minutes: 90 }
    ],
    inc: [
      "Degrease gas stove burners & countertop",
      "Clean tile backsplash oil stains",
      "Exterior wipe of chimney and cabinet doors",
      "Scrub sink and mop kitchen floor"
    ],
    exc: [
      "Inside chimney motor dismantling",
      "Inside refrigerator / microwave interior",
      "Pest control"
    ]
  },
  deeptoilet: {
    id: "deeptoilet",
    name: "Deep Chemical Descaling (Washroom)",
    icon: "✨",
    desc: "Intensive chemical descaling for tough yellow hard-water stains",
    tierCategory: "premium",
    tiers: [
      { label: "1 Bathroom Deep Clean", price: 199, minutes: 40 },
      { label: "2 Bathrooms Deep Clean", price: 379, minutes: 75 }
    ],
    inc: [
      "Professional chemical descaling of hard water minerals",
      "High-power tile grout scrubbing",
      "Toilet bowl deep acid descaling & sanitization",
      "Mirror and metal fitting stain treatment"
    ],
    exc: [
      "Grout replacement or broken tile repairs",
      "Ceiling paint restoration"
    ]
  },
  ironing: {
    id: "ironing",
    name: "Ironing & Garment Pressing",
    icon: "👔",
    desc: "Steam/dry ironing, crease removal & neat stacking",
    tierCategory: "standard",
    tiers: [
      { label: "15–18 Clothes", price: 179, minutes: 60 },
      { label: "25–32 Clothes", price: 259, minutes: 90 },
      { label: "35–42 Clothes", price: 339, minutes: 120 }
    ],
    inc: [
      "Ironing shirts, t-shirts, trousers, kurtas, daily wear",
      "Precise folding and organized hanger/stack placement"
    ],
    exc: [
      "Washing / stain removal",
      "Delicate bridal lehengas or heavy embroidery"
    ]
  },
  balcony: {
    id: "balcony",
    name: "Balcony & Railing Cleaning",
    icon: "🪴",
    desc: "Floor sweeping, wet mopping & railing wipe-down",
    tierCategory: "standard",
    tiers: [
      { label: "1 Balcony", price: 99, minutes: 20 },
      { label: "2 Balconies", price: 179, minutes: 40 }
    ],
    inc: [
      "Sweep & mop balcony tiles",
      "Wipe steel/iron railings and parapet ledge",
      "Dust accessible balcony chairs/tables"
    ],
    exc: [
      "High-rise exterior glass leaning",
      "Plant repotting or gardening"
    ]
  },
  fan: {
    id: "fan",
    name: "Ceiling Fan Deep Wipe",
    icon: "🌀",
    desc: "Both sides blade cleaning and motor casing wipe",
    tierCategory: "quick",
    tiers: [
      { label: "1 Fan", price: 59, minutes: 15 },
      { label: "2 Fans", price: 109, minutes: 25 },
      { label: "3 Fans", price: 159, minutes: 40 }
    ],
    inc: ["Wipe reachable blades, top surface & motor housing"],
    exc: ["Electrical repairs or dismounting fan from ceiling"]
  }
};

const HUBS = [
  "Dharampeth Hub",
  "Sitabuldi Hub",
  "Sadar Hub",
  "Ramdaspeth Hub",
  "Wardha Road Hub",
  "Manewada Hub"
];

function getServiceList() {
  return Object.values(SERVICES);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SERVICES, HUBS, getServiceList };
}
