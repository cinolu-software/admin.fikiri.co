import { MenuItem } from "@/Types/LayoutTypes";


export const MenuList: MenuItem[] = [


//curator

  {
    title: "Curation",
    lanClass: "lan-8",
    menucontent: "Curation",
    Items: [
      {
        title: "Révision",
        id: 1,
        icon: "edit",
        type: "link",
        active: false,
        children: [
          { path: "/review", type: "link", title: "Review" },
        ],
      },
    ],
    requiredRoles: [],
  },


//admin
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
          { path: "/admin/homeAdmin", type: "link", title: "Dashboard" },
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
        icon: "support-tickets",
        type: "sub",
        active: false,
        children: [
          {path: "/admin/partners", type: "link", title: "Liste" },
        ]
      }
    ],
    requiredRoles: ['admin']
  },

//cartographer

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
          { path: "/cartograph/homeCartograph", type: "link", title: "Dashboard" },
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
          {path: "/cartograph/volunteer", type: "link", title: "Volontaires" },
        ]
      },
    ],
    requiredRoles: ['cartograph']
  },

//explorator

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
          { path: "/explorator/homeExplorator", type: "link", title: "Dashboard" },
        ],
      },
    ],
    requiredRoles: ['explorator']
  },
  {
    title: "Exploration",
    lanClass: "lan-8",
    menucontent: "Exploration",
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
    requiredRoles: ['explorator']
  },


//experimentor
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
          { path: "/experimentor/homeExperimentor", type: "link", title: "Dashboard" },
        ],
      },
    ],
    requiredRoles: ['experimentor']
  },
  {
    title: "Experimentation",
    lanClass: "lan-8",
    menucontent: "Experimentation",
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
    requiredRoles: ['experimentor']
  },



//vulgarisation

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
          { path: "/cartographerAssistant/dashboard", type: "link", title: "Dashboard" },
        ],
      },
    ],
    requiredRoles: ['cartographer-assistant']
  },
  {
    title: "Vulgarisation",
    lanClass: "lan-8",
    menucontent: "vulgarisation",
    Items: [
      {
        title: "Vulgarisation",
        id: 1,
        icon: "file",
        type: "sub",
        active: false,
        children: [
          {path: "/cartographerAssistant/list", type: "link", title: "Liste" },
        ]
      },
    ],
    requiredRoles: ['cartographer-assistant', 'admin']
  },


//volunteer
  {
    title : "General",
    lanClass : "lan-8",
    menucontent : "General",
    Items : [
      {
        title : "Accueil",
        id: 1,
        icon: "home",
        type: "sub",
        active: false,
        children: [{ path: "/volunteer/homeVolunteer", type: "link", title: "Dashboard" }],
      },
    ],
    requiredRoles: ['volunteer']
  },
  {
    title : "Soumissions",
    lanClass : "lan-8",
    menucontent : "Espace des cartographes",
    Items : [
      {
        title : "Espace cartographes",
        id : 1,
        icon : "edit",
        type : "link",
        active : false,
        children : [
          { path : "/volunteer", type: "link", title: "Assigner" },
        ],
      },
    ],
    requiredRoles: ['volunteer'],
  },
];