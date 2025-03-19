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
          { path: "/admin/homeAdmin", type: "link", title: "Dashboard Admin" },
        ],
      },
      {
        title: "Utilisateurs",
        id: 2,
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {path: "/general/users/", type: "link", title: "Liste" },
        ]
      },
    ],
    requiredRoles: ['admin']
  },
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
          { path: "/explorator/homeExplorator", type: "link", title: "Dashboard Explorateur" },
        ],
      },
    ],
    requiredRoles: ['explorator']
  },
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
          { path: "/cartograph/homeCartograph", type: "link", title: "Dashboard Cartograph" },
        ],
      },
    ],
    requiredRoles: ['cartograph']
  },
  {
    title: "Cartographie",
    lanClass: "lan-8",
    menucontent: "Cartographie",
    Items: [
      {
        title: "Appels",
        id: 1,
        icon: "contact",
        type: "sub",
        active: false,
        children: [
          {path: "/admin/call", type: "link", title: "Liste" },
        ]

      },
    ],
    requiredRoles: ['cartograph']
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
        type: "sub",
        active: false,
        children: [
          {path: "/admin/call", type: "link", title: "Liste" },
        ]

      },
      {
        title: "Rôles",
        id: 2,
        icon: "others",
        type: "sub",
        active: false,
        children: [
            {path: "/admin/role", type: "link", title: "Liste" },
        ]
      },
      {
        title: "Organisations",
        id: 3,
        icon: "learning",
        type: "sub",
        active: false,
        children: [
            {path: "/admin/organizations", type: "link", title: "Liste" },
        ]
      },
      {
        title: "Partenaires",
        id: 4,
        icon: "",
        type: "sub",
        active: false,
        children: [
          {path: "/admin/partners", type: "link", title: "Liste" },
        ]
      }
    ],
    requiredRoles: ['admin']
  }
];
