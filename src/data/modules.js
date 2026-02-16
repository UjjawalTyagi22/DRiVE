export const modules = [
  {
    id: 1,
    title: "Earthquake Safety",
    level: "intermediate",
    description: "Learn drop, cover, and hold techniques, building evacuation, and post-earthquake safety measures.",
    duration: "2 hours",
    baseEnrolled: 12300,
    progress: 0,
    image: "https://images.unsplash.com/photo-1510146754054-9721adcc29c5?auto=format&fit=crop&q=80&w=800",
    color: "from-orange-400 to-red-500",
    category: "Natural Disasters",
    nextLesson: "Initial Assessment",
    timeRemaining: "2 hours",
    lessons: [
      {
        id: 101,
        title: "Introduction to Earthquakes",
        content: [
          { type: "text", text: "Understand the science behind earthquakes and why preparedness is vital." },
          { type: "text", text: "Earthquakes are sudden shakings of the ground caused by the movement of tectonic plates. They can strike without warning at any time of day or night." },
          { type: "list", items: ["Tectonic plate movements", "Volcanic activity", "Human-induced (fracking, mining)"] }
        ]
      },
      {
        id: 102,
        title: "Drop, Cover, and Hold On",
        content: [
          { type: "text", text: "The gold standard for staying safe during the shaking." },
          { type: "text", text: "When you feel the ground shake, immediately drop to your hands and knees. Cover your head and neck with your arms. Hold on to your shelter until shaking stops." },
          { type: "image", url: "https://images.unsplash.com/photo-1590103512980-141bc259e883?auto=format&fit=crop&q=80&w=800", caption: "Illustration of Drop, Cover, and Hold On" }
        ]
      },
      {
        id: 103,
        title: "Post-Quake Evacuation",
        content: [
          { type: "text", text: "What to do once the shaking stops." },
          { type: "text", text: "Check yourself for injuries. If the building is damaged, evacuate carefully. Beware of aftershocks." }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Flood Response",
    level: "beginner",
    description: "Understanding flood warnings, evacuation routes, and water safety protocols for different scenarios.",
    duration: "1 hours",
    baseEnrolled: 8700,
    progress: 0,
    image: "https://images.unsplash.com/photo-1547683908-21aa53d93a04?auto=format&fit=crop&q=80&w=800",
    color: "from-blue-400 to-cyan-500",
    category: "Natural Disasters",
    nextLesson: "Introduction to Floods",
    timeRemaining: "1 hour",
    lessons: [
      {
        id: 201,
        title: "Understanding Flood Alerts",
        content: [
          { type: "text", text: "Learn the difference between watches, warnings, and advisories." },
          { type: "text", text: "A flood watch means flooding is possible. A flood warning means flooding is happening or will happen soon—take action immediately." }
        ]
      },
      {
        id: 202,
        title: "Water Safety & Sanitation",
        content: [
          { type: "text", text: "Staying healthy during and after a flood." },
          { type: "text", text: "Never walk or drive through flood waters. Just 6 inches of moving water can knock you down, and 2 feet can sweep away most vehicles." }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Fire Safety",
    level: "advanced",
    description: "Fire extinguisher usage, evacuation procedures, and smoke safety in buildings.",
    duration: "3 hours",
    baseEnrolled: 15100,
    progress: 0,
    image: "https://images.unsplash.com/photo-1516533037048-ad541e84f995?auto=format&fit=crop&q=80&w=800",
    color: "from-red-400 to-orange-500",
    category: "Emergency Response",
    nextLesson: "Basics of Fire Combustion",
    timeRemaining: "3 hours",
    lessons: [
      {
        id: 301,
        title: "The Fire Triangle",
        content: [
          { type: "text", text: "Fuel, Heat, and Oxygen—the components of fire." },
          { type: "text", text: "Fire requires three elements: heat, fuel, and an oxidizing agent (usually oxygen). Removing any one of these will extinguish the fire." }
        ]
      },
      {
        id: 302,
        title: "Fire Extinguisher P.A.S.S.",
        content: [
          { type: "text", text: "Learn how to operate a fire extinguisher correctly." },
          { type: "list", items: ["Pull the pin", "Aim at the base of fire", "Squeeze the level", "Sweep from side to side"] }
        ]
      }
    ]
  }
];
