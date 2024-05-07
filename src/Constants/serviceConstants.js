export const ServiceTypeCode = {
  PAINTING: "PA",
  PLUMBING: "PL",
  HAVAC: "HA",
  ELECTRICAL: "EL",
  GENERAL: "GE",
  CARPENTERY: "CR",
  HOME_CLEANING: "HC",
  PEST_CONTROL: "PC",
  LANDSCAPING_LAWN: "LL",
  APPLIANCE_REPAIR: "AR",
};

export const services = [
  {
    id: 1,
    name: "Painting",
    uid: "painting",
    code: ServiceTypeCode.PAINTING,
    subServices: [
      {
        id: 1,
        name: "Interior Home Painting",
      },
      {
        id: 2,
        name: "Exterior Home Painting",
      },
      {
        id: 3,
        name: "Door Painting",
      },
      {
        id: 4,
        name: "Cabinet Painting or Refinishing",
      },
      {
        id: 5,
        name: "Fence Painting",
      },
      {
        id: 6,
        name: "Pressure Washing",
      },
    ],
  },
  {
    id: 10,
    name: "Plumbing",
    code: ServiceTypeCode.PLUMBING,
    uid: "plumbing",
    subServices: [
      {
        id: 1,
        name: "Fixing Leaks (pipe repairs)",
      },
      {
        id: 2,
        name: "Clearing Clogged Drains",
      },
      {
        id: 3,
        name: "Installing or Repairing Faucets, Toilets, Water Heaters",
      },
      {
        id: 4,
        name: "Others",
      },
    ],
  },
  {
    id: 2,
    name: "HVAC",
    uid: "hvac",
    code: ServiceTypeCode.HAVAC,
    subServices: [
      {
        id: 1,
        name: "Regular Maintenance of Heating and Cooling Systems",
      },
      {
        id: 2,
        name: "Repairing or Replacing HVAC Units",
      },
      {
        id: 3,
        name: "Cleaning and Servicing Air Ducts",
      },
    ],
  },
  {
    id: 3,
    name: "Electrical Service",
    code: ServiceTypeCode.ELECTRICAL,
    uid: "electrical",
    subServices: [
      {
        id: 1,
        name: "Fixing General Electrical Issues",
      },
      {
        id: 2,
        name: "Installing or Repairing Light Fixtures and Ceiling Fans",
      },
      {
        id: 3,
        name: "Upgrading Electrical Panels",
      },
      {
        id: 4,
        name: "Mounting TVs and Home Theater Systems",
      },
      {
        id: 5,
        name: "Wiring for New Construction or Renovations",
      },
      {
        id: 6,
        name: "Electrical Troubleshooting",
      },
      {
        id: 7,
        name: "Others",
      },
    ],
  },
  {
    id: 4,
    name: "General Handyman Services",
    code: ServiceTypeCode.GENERAL,
    uid: "general_handyman_services",
    subServices: [
      {
        id: 1,
        name: "Miscellaneous Repairs and Maintenance Tasks",
      },
    ],
  },
  {
    id: 5,
    name: "Carpentry Services",
    code: ServiceTypeCode.CARPENTERY,
    uid: "carpentry_services",
    subServices: [
      {
        id: 1,
        name: "Installing Shelves, Cabinets or Built-in Furniture",
      },
      {
        id: 2,
        name: "Fixing Doors and Windows",
      },
      {
        id: 3,
        name: "Others",
      },
    ],
  },
  {
    id: 6,
    name: "Home Cleaning Services",
    code: ServiceTypeCode.HOME_CLEANING,
    uid: "home_cleaning_services",
    subServices: [
      {
        id: 1,
        name: "Regular Cleaning and Maintenance of the Home (area/hour)",
      },
      {
        id: 2,
        name: "Deep cleaning, Including Carpet Cleaning and Upholstery Cleaning",
      },
    ],
  },
  {
    id: 7,
    name: "Pest Control",
    code: ServiceTypeCode.PEST_CONTROL,
    uid: "pest_control",
    subServices: [
      {
        id: 1,
        name: "Exterminating Pests such as Termites, Ants or Rodents",
      },
      {
        id: 2,
        name: "Preventive Pest Control Measures",
      },
    ],
  },
  {
    id: 8,
    name: "Landscaping And Lawn Care",
    code: ServiceTypeCode.LANDSCAPING_LAWN,
    uid: "landscaping_and_lawn_care",
    subServices: [
      {
        id: 1,
        name: "Mowing the Lawn",
      },
      {
        id: 2,
        name: "Trimming Trees and Shrubs",
      },
      {
        id: 3,
        name: "Installing or Repairing Irrigation Systems",
      },
    ],
  },
  {
    id: 9,
    name: "Appliance Repairs",
    code: ServiceTypeCode.APPLIANCE_REPAIR,
    uid: "appliances_repairs",
    subServices: [
      {
        id: 1,
        name: "",
      },
    ],
  },
];

// constants copy from Step2.jsx
export const ApplianceRepairJobNames = {
  FIXING: "Fixing or Servicing Household Appliances",
};

export const ApplianceRepairJobCode = {
  FIXING: "AF",
};

export const ApplianceRepairJob = {
  id: 1,
  name: ApplianceRepairJobNames.FIXING,
  code: ApplianceRepairJobCode.FIXING,
};

export const CarpentryJobNames = {
  FURNITURE_ASSEMBLY: "Furniture Assembly",
  REPAIRING_REPLACE: "Repairing or replacing damaged woodwork",
  DOOR_REPAIR: "Door Installation and Repairs",
  WINDOW_REPAIR: "Window Repairs and Installation",
  CABINET_REPAIR: "Cabinet Repairs",
  CUSTOM: "Custom Carpentry",
  OTHERS: "Others",
};

export const CarpentryJobCodes = {
  FURNITURE_ASSEMBLY: "FA",
  REPAIRING_REPLACE: "RR",
  DOOR_REPAIR: "DR",
  WINDOW_REPAIR: "WR",
  CABINET_REPAIR: "CR",
  CUSTOM: "CC",
  OTHERS: "OO",
};

export const CarpentryJobs = [
  {
    id: 1,
    name: CarpentryJobNames.FURNITURE_ASSEMBLY,
    code: CarpentryJobCodes.FURNITURE_ASSEMBLY,
  },
  {
    id: 2,
    name: CarpentryJobNames.REPAIRING_REPLACE,
    code: CarpentryJobCodes.REPAIRING_REPLACE,
  },
  {
    id: 3,
    name: CarpentryJobNames.DOOR_REPAIR,
    code: CarpentryJobCodes.DOOR_REPAIR,
  },
  {
    id: 4,
    name: CarpentryJobNames.WINDOW_REPAIR,
    code: CarpentryJobCodes.WINDOW_REPAIR,
  },
  {
    id: 5,
    name: CarpentryJobNames.CABINET_REPAIR,
    code: CarpentryJobCodes.CABINET_REPAIR,
  },
  { id: 6, name: CarpentryJobNames.CUSTOM, code: CarpentryJobCodes.CUSTOM },
  { id: 7, name: CarpentryJobNames.OTHERS, code: CarpentryJobCodes.OTHERS },
];

export const ElectricalJobNames = {
  GENERAL:
    "Fixing general electrical issues, such as faulty wiring ,fixing loose wiring or securing electrical boxes",
  LIGHT_FAN: "Installing or repairing light fixtures and ceiling fans",
  UPGRADE_PANEL: "Upgrading electrical panels.",
  TV_HOME_THETER: "Mounting TVs and Home Theater Systems",
  NEW_CONSTRUCTION: "Wiring for New Construction or Renovations",
  ELECTRICAL_TROUBLESHOOT: "Electrical Troubleshooting",
  OTHERS: "Others",
};

export const ElectricalJobCodes = {
  GENERAL: "GE",
  LIGHT_FAN: "LF",
  UPGRADE_PANEL: "UP",
  TV_HOME_THETER: "TH",
  NEW_CONSTRUCTION: "NC",
  ELECTRICAL_TROUBLESHOOT: "ET",
  OTHERS: "OO",
};

export const ElectricalJobs = [
  {
    id: 1,
    name: ElectricalJobNames.GENERAL,
    code: ElectricalJobCodes.GENERAL,
  },
  {
    id: 2,
    name: ElectricalJobNames.LIGHT_FAN,
    code: ElectricalJobCodes.LIGHT_FAN,
  },
  {
    id: 3,
    name: ElectricalJobNames.UPGRADE_PANEL,
    code: ElectricalJobCodes.UPGRADE_PANEL,
  },
  {
    id: 4,
    name: ElectricalJobNames.TV_HOME_THETER,
    code: ElectricalJobCodes.TV_HOME_THETER,
  },
  {
    id: 5,
    name: ElectricalJobNames.NEW_CONSTRUCTION,
    code: ElectricalJobCodes.NEW_CONSTRUCTION,
  },
  {
    id: 6,
    name: ElectricalJobNames.ELECTRICAL_TROUBLESHOOT,
    code: ElectricalJobCodes.ELECTRICAL_TROUBLESHOOT,
  },
  { id: 7, name: ElectricalJobNames.OTHERS, code: ElectricalJobCodes.OTHERS },
];

export const GeneralJobNames = {
  MISCELLANEOUS: "Miscellaneous repairs and maintenance tasks",
};

export const GeneralJobCodes = {
  MISCELLANEOUS: "ML",
};

export const GeneralJobs = [
  {
    id: 1,
    name: GeneralJobNames.MISCELLANEOUS,
    code: GeneralJobCodes.MISCELLANEOUS,
  },
];

export const HvacJobNames = {
  REGULAR_MAINTAINANCE: "Regular maintenance of heating and cooling systems",
  REPAIRING_REPLACE: "Repairing or replacing HVAC units.",
  CLEANING_SERVICE: "Cleaning and servicing air ducts",
};

export const HvacJobCodes = {
  REGULAR_MAINTAINANCE: "RM",
  REPAIRING_REPLACE: "RR",
  CLEANING_SERVICE: "CS",
};

export const HvacJobs = [
  {
    id: 1,
    name: HvacJobNames.REGULAR_MAINTAINANCE,
    code: HvacJobCodes.REGULAR_MAINTAINANCE,
  },
  {
    id: 2,
    name: HvacJobNames.REPAIRING_REPLACE,
    code: HvacJobCodes.REPAIRING_REPLACE,
  },
  {
    id: 3,
    name: HvacJobNames.CLEANING_SERVICE,
    code: HvacJobCodes.CLEANING_SERVICE,
  },
];

export const HomeCleaningJobNames = {
  REGULAR:
    "Regular cleaning and maintenance of the home. ( by hour or number of cleaner)",
  MAINTAINANCE: "Regular cleaning and maintenance of the home. ( by area)",
  DEEP_CLEANING:
    "Deep cleaning, including carpet cleaning and upholstery cleaning",
};

export const HomeCleaningJobCode = {
  REGULAR: "RC",
  MAINTAINANCE: "RM",
  DEEP_CLEANING: "DC",
};

export const HomeCleaningJobs = [
  {
    id: 1,
    name: HomeCleaningJobNames.REGULAR,
    code: HomeCleaningJobCode.REGULAR,
  },
  {
    id: 2,
    name: HomeCleaningJobNames.MAINTAINANCE,
    code: HomeCleaningJobCode.MAINTAINANCE,
  },
  {
    id: 3,
    name: HomeCleaningJobNames.DEEP_CLEANING,
    code: HomeCleaningJobCode.DEEP_CLEANING,
  },
];

export const LawnCareJobNames = {
  MOVING: "Mowing the lawn",
  TRIMMING: "Trimming trees and shrubs.",
  IRRIGATION: "Installing or repairing irrigation systems",
};

export const LawnCareJobCode = {
  MOVING: "LM",
  TRIMMING: "LT",
  IRRIGATION: "LI",
};

export const LawnCareJobs = [
  { id: 1, name: LawnCareJobNames.MOVING, code: LawnCareJobCode.MOVING },
  { id: 2, name: LawnCareJobNames.TRIMMING, code: LawnCareJobCode.TRIMMING },
  {
    id: 3,
    name: LawnCareJobNames.IRRIGATION,
    code: LawnCareJobCode.IRRIGATION,
  },
];

export const PaintingJobCode = {
  INTERIOR: "IP",
  EXTERIOR: "EP",
  DOOR: "DP",
  CABINET: "CP",
  FENCE: "FP",
  WASHING: "PW",
};

export const PaintingJobNames = {
  INTERIOR: "Interior Home Painting",
  EXTERIOR: "Exterior Home Painting",
  DOOR: "Door Painting",
  CABINET: "Cabinet Painting Or Refinishing",
  FENCE: "Fence Painting",
  WASHING: "Pressure Washing",
};

export const PaintingJobs = [
  { id: 1, name: PaintingJobNames.INTERIOR, code: PaintingJobCode.INTERIOR },
  { id: 2, name: PaintingJobNames.EXTERIOR, code: PaintingJobCode.EXTERIOR },
  { id: 3, name: PaintingJobNames.DOOR, code: PaintingJobCode.DOOR },
  {
    id: 4,
    name: PaintingJobNames.CABINET,
    code: PaintingJobCode.CABINET,
  },
  { id: 5, name: PaintingJobNames.FENCE, code: PaintingJobCode.FENCE },
  { id: 6, name: PaintingJobNames.WASHING, code: PaintingJobCode.WASHING },
];

export const PlumbingServiceNames = {
  LEAKED: "Fixing Leaks (pipe repairs)",
  DRAINS: "Clearing Clogged Drains",
  REPAIRING: "Installing or Repairing Faucets, Toilets, Water Heaters",
  OTHERS: "Others",
};

export const PlumbingServiceCode = {
  LEAKED: "PL",
  DRAINS: "PD",
  REPAIRING: "PR",
  OTHERS: "OO",
};

export const PLumbingServices = [
  {
    id: 1,
    name: PlumbingServiceNames.LEAKED,
    code: PlumbingServiceCode.LEAKED,
  },
  {
    id: 2,
    name: PlumbingServiceNames.DRAINS,
    code: PlumbingServiceCode.DRAINS,
  },
  {
    id: 3,
    name: PlumbingServiceNames.REPAIRING,
    code: PlumbingServiceCode.REPAIRING,
  },
  {
    id: 4,
    name: PlumbingServiceNames.OTHERS,
    code: PlumbingServiceCode.OTHERS,
  },
];

export const PestControlJobNames = {
  ANT: "Ant Control",
  COCKROACH: "Cockroach Control",
  FLIES: "Flies & Moquito Control",
  BUG: "Bed Bug Control",
  RODENT: "Rodent Control",
};

export const PestControlJobCode = {
  ANT: "AC",
  COCKROACH: "CA",
  FLIES: "FL",
  BUG: "BG",
  RODENT: "RO",
};

export const PestControlJobs = [
  { id: 1, name: PestControlJobNames.ANT, code: PestControlJobCode.ANT },
  {
    id: 2,
    name: PestControlJobNames.COCKROACH,
    code: PestControlJobCode.COCKROACH,
  },
  { id: 3, name: PestControlJobNames.FLIES, code: PestControlJobCode.FLIES },
  { id: 4, name: PestControlJobNames.BUG, code: PestControlJobCode.BUG },
  { id: 5, name: PestControlJobNames.RODENT, code: PaintingJobCode.RODENT },
];

export const Rooms = [
  { room: "1" },
  { room: "2" },
  { room: "3" },
  { room: "4" },
  { room: "5" },
  { room: "6" },
  { room: "7+" },
];

export const AreaType = [
  { area: "Studio Cleaning" },
  { area: "1 Bedroom Home Cleaning" },
  { area: "2 Bedroom Home Cleaning" },
  { area: "3 Bedroom Home Cleaning" },
  { area: "Kitchen Cleaning" },
  { area: "Bathroom Cleaning" },
  { area: "Balcony Cleaning" },
  { area: "Living Room Cleaning" },
  { area: "Wardrobe Cleaning" },
  { area: "Fridge Inside-Out Cleaning" },
  { area: "Wardrobe Cleaning" },
];

export const Colors = [
  { color: "#00D1FF" },
  { color: "#262B2F" },
  { color: "#8E45FB" },
  { color: "#FFDC00" },
  { color: "#3EB1FF" },
  { color: "#FF0000" },
  { color: "#F4F3F3" },
];
