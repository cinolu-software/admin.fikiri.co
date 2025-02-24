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
        title: "Utilisateurs",
        id: 2,
        icon: "user",
        type: "sub",
        active: false,
        children: [
          {path: "/general/users/", type: "link", title: "Liste" },
        ]
      },
      // {
      //   title: "Administrateurs",
      //   id: 3,
      //   icon: "editors",
      //   type: "sub",
      //   active: false,
      //   children: [
      //     {path: "/admin/administrateurs", type: "link", title: "Liste" },
      //   ]
      // },
      {
        title: "Solutions",
        id: 4,
        icon: "file",
        type: "sub",
        active: false,
        children: [
          {path: "/admin/solutions", type: "link", title: "Solutions" },
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
      }
    ]
  }
];
