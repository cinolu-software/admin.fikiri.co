import { MenuItem } from "@/Types/LayoutTypes";

export const MenuList: MenuItem[] = [
  {
    title: "General",
    lanClass: "lan-8",
    menucontent: "General",
    Items: [
      {
        title: "Accueil",
        id: 1,
        icon: "home",
        type: "sub",
        active: false,
        children: [
          { path: "/general/home", type: "link", title: "Statistiques" },
        ],
      },
      {
        title: "Innovateurs",
        id: 2,
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {path: "/general/innovators/", type: "link", title: "Liste" },
        ]
      },
      {
        title: "Administrateurs",
        id: 3,
        icon: "editors",
        type: "sub",
        active: false,
        children: [
          {path: "/admin/administrateurs", type: "link", title: "Liste" },
        ]
      }
    ]
  },
  {
    title: "Administration",
    lanClass: "lan-8",
    menucontent: "Administration",
    Items: [
      {
        title: "Appels",
        id: 1,
        icon: "contact",
        type: "link",
        path: "/admin/call",
      },
    ]
  }
];
