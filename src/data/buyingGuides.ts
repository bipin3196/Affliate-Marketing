import { BuyingGuide } from "@/types";

export const BUYING_GUIDES: BuyingGuide[] = [
  {
    id: "guide-gaming-pc-under-75000",
    title: "Best Gaming PC Under ₹75,000 (2026 Buying Guide & Part List)",
    slug: "best-gaming-pc-under-75000",
    subtitle: "How to maximize every rupee for 1080p Ultra and 1440p high-refresh gaming on the modern AM5 platform.",
    category: "computers",
    author: "Arjun Verma, Hardware Lab Lead",
    publishedDate: "November 2, 2026",
    readTime: "8 min read",
    heroImage: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200&auto=format&fit=crop&q=80",
    summary: "At ₹75,000, you no longer have to compromise on dead-end motherboard sockets or sluggish mechanical hard drives. By combining the AMD Ryzen 5 7600 with an RX 7800 XT or RTX 4060 Ti, you secure phenomenal frame rates and a clear upgrade path.",
    topPickId: "amd-ryzen-5-7600",
    bestValueId: "gigabyte-b650m-gaming-wifi",
    premiumPickId: "nvidia-geforce-rtx-4070-super",
    productIds: [
      "amd-ryzen-5-7600",
      "gigabyte-b650m-gaming-wifi",
      "corsair-vengeance-rgb-32gb-ddr5-6000",
      "samsung-990-pro-2tb",
      "corsair-rm850x-850w-gold",
      "deepcool-ak620-digital"
    ],
    faqs: [
      {
        question: "Is ₹75,000 enough for a smooth 1440p gaming PC in India?",
        answer: "Yes! At ₹75,000 to ₹80,000, choosing an AMD Ryzen 5 processor paired with 32GB DDR5 and a high-efficiency GPU provides over 80+ FPS at 1440p in demanding titles like Cyberpunk 2077."
      },
      {
        question: "Should I buy offline at Nehru Place / Lamington Road or order online?",
        answer: "Online retailers like MDComputers, PrimeABGB, and Amazon India now match or beat physical market rates with official brand warranties and door-to-door transit insurance."
      }
    ],
    contentSections: [
      {
        title: "1. The CPU: Why AMD AM5 Wins at this Budget",
        body: "While Intel LGA1700 offers budget chips like the 13400F, the platform has reached its end of life. AMD's AM5 socket will receive brand-new processor architectures through 2027 and beyond. Choosing the Ryzen 5 7600 gives you 6 Zen 4 cores, PCIe 5.0 readiness, and included cooling.",
        tips: [
          "Enable AMD EXPO in BIOS with one click for full 6000MHz memory bandwidth.",
          "Set AMD Precision Boost Overdrive (PBO) Curve Optimizer to -20mV for cooler temps."
        ]
      },
      {
        title: "2. Memory Sweet Spot: 32GB DDR5-6000 CL30",
        body: "Modern games like Hogwarts Legacy, Star Wars Jedi: Survivor, and Cities: Skylines II routinely allocate 18GB to 22GB of system RAM. 16GB is no longer comfortable for multitasking and background discord streaming.",
        tips: [
          "Always buy a dual-channel kit (2x16GB) rather than a single 32GB stick to double memory bandwidth."
        ]
      },
      {
        title: "3. Power Supply: Never Skimp on the Heart of the Rig",
        body: "Invest in at least an 80+ Gold certified unit from reliable OEMs. A good 750W-850W power supply will outlive three GPU upgrades and shields your sensitive components from voltage spikes.",
        tips: [
          "Ensure ATX 3.0 or 3.1 compliance if you plan to upgrade to modern NVIDIA 16-pin power cards."
        ]
      }
    ]
  },
  {
    id: "guide-best-gaming-laptops",
    title: "Best Gaming Laptops for Every Budget (2026 Tested Guide)",
    slug: "best-gaming-laptops",
    subtitle: "We tested 34 gaming laptops across thermal throttling, screen response times, battery endurance, and TGP wattage.",
    category: "computers",
    author: "Elena Rostova, Senior Editor",
    publishedDate: "October 28, 2026",
    readTime: "11 min read",
    heroImage: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&auto=format&fit=crop&q=80",
    summary: "Today's top gaming laptops are no longer 5kg noisy bricks with 40-minute batteries. With OLED panels running at 240Hz, ultra-dense vapor chambers, and advanced MUX switches with NVIDIA Advanced Optimus, portable gaming has never been better.",
    topPickId: "asus-rog-zephyrus-g16-oled",
    bestValueId: "lenovo-legion-pro-5-gen9",
    premiumPickId: "asus-rog-zephyrus-g16-oled",
    productIds: [
      "asus-rog-zephyrus-g16-oled",
      "lenovo-legion-pro-5-gen9",
      "apple-macbook-pro-14-m4-pro"
    ],
    faqs: [
      {
        question: "Does GPU TGP (wattage) matter more than the GPU name?",
        answer: "Absolutely! A full 140W RTX 4070 will frequently outperform a thermally throttled 75W RTX 4080 laptop. Always verify total graphics power before buying."
      }
    ],
    contentSections: [
      {
        title: "The OLED Revolution in Laptops",
        body: "QD-OLED and WOLED panels have transitioned from high-end desktop monitors into premium thin-and-light gaming laptops. With 0.2ms gray-to-gray response times, motion blur is non-existent.",
        tips: [
          "Ensure your OLED laptop has an automatic pixel refresh cycle and taskbar auto-hide enabled."
        ]
      }
    ]
  },
  {
    id: "guide-best-docking-station",
    title: "Best Docking Station for Dual Monitors & Workstations",
    slug: "best-docking-station",
    subtitle: "Consolidate cables and supercharge your home office with Thunderbolt 4 and high-power USB-C docks.",
    category: "peripherals",
    author: "Liam O'Connor, Connectivity Specialist",
    publishedDate: "November 1, 2026",
    readTime: "7 min read",
    heroImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80",
    summary: "Whether you use an Apple MacBook Pro with dual 4K displays or a Windows gaming laptop requiring 100W Power Delivery and high-speed SD card transfers, a dedicated Thunderbolt dock transforms your desk setup.",
    topPickId: "caldigit-ts4-thunderbolt-4-dock",
    bestValueId: "caldigit-ts4-thunderbolt-4-dock",
    premiumPickId: "caldigit-ts4-thunderbolt-4-dock",
    productIds: [
      "caldigit-ts4-thunderbolt-4-dock",
      "logitech-mx-master-3s",
      "asus-rog-swift-oled-pg32ucdm"
    ],
    faqs: [
      {
        question: "Can standard MacBooks run dual monitors through one cable?",
        answer: "Standard base M1/M2/M3 chips only natively support one external display unless using DisplayLink software. Pro and Max chips (M2 Pro, M3 Pro, M4 Pro) natively support multiple external monitors through Thunderbolt."
      }
    ],
    contentSections: [
      {
        title: "Thunderbolt 4 vs USB-C: What You Must Know",
        body: "Standard USB-C docks share 10Gbps bandwidth between video, USB devices, and Ethernet, leading to display flicker or lower refresh rates. Thunderbolt 4 provides a massive 40Gbps bidirectional pipe with dedicated display lanes.",
        tips: [
          "Check that your host laptop port has the lightning bolt icon indicating Thunderbolt certification."
        ]
      }
    ]
  },
  {
    id: "guide-best-nas-device",
    title: "Best NAS Device for Automated Home Backup & Media Streaming",
    slug: "best-nas-device",
    subtitle: "Ditch expensive Google Drive and iCloud monthly bills with your own private 4-bay cloud storage.",
    category: "storage",
    author: "Vikram Sengupta, Network Architect",
    publishedDate: "October 20, 2026",
    readTime: "9 min read",
    heroImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80",
    summary: "A Network Attached Storage (NAS) appliance gives you total sovereignty over your photos, 4K home videos, and system images. We evaluate drive rebuild times, snapshot replication, and Plex media streaming.",
    topPickId: "synology-diskstation-ds923plus",
    bestValueId: "synology-diskstation-ds923plus",
    premiumPickId: "synology-diskstation-ds923plus",
    productIds: [
      "synology-diskstation-ds923plus",
      "samsung-990-pro-2tb"
    ],
    faqs: [
      {
        question: "What RAID level should I choose for 4 hard drives?",
        answer: "Synology Hybrid RAID (SHR) or RAID 5 is the optimal choice. It allows one full hard drive to fail without losing a single byte of your data."
      }
    ],
    contentSections: [
      {
        title: "Why Synology DSM Leads the Pack",
        body: "Hardware specs only tell half the story. The software experience makes or breaks a NAS. Synology DSM offers zero-config mobile photo sync, versioned file history, and AES-256 encrypted off-site cloud backups.",
        tips: [
          "Install NVMe M.2 SSDs in the bottom caching bays to speed up indexing of large photo libraries."
        ]
      }
    ]
  }
];
