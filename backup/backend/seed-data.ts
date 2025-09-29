export const users = [
  { id: 1, name: "Adam" },
  { id: 2, name: "Chris" },
  { id: 3, name: "Marc" }
];

export const epics = [
  { id: 1, title: "Migrate to PlanetScale" },
  { id: 2, title: "Learn TypeScript" },
  { id: 3, title: "Implement New Authentication" },
  { id: 4, title: "Learn Java" },
  { id: 5, title: "Dummy Epic 1" },
  { id: 6, title: "Dummy Epic 2" },
  { id: 7, title: "Dummy Epic 3" },
  { id: 8, title: "Dummy Epic 4" },
  { id: 9, title: "Dummy Epic 5" },
  { id: 10, title: "Dummy Epic 6" },
  { id: 11, title: "Dummy Epic 7" },
  { id: 12, title: "Dummy Epic 8" }
];

export const milestones = [
  { id: 1, epicId: 1, name: "PlanetScale is setup" },
  { id: 2, epicId: 1, name: "PlanetScale sdk working" },
  { id: 3, epicId: 1, name: "Ready for testing" },
  { id: 4, epicId: 2, name: "TypeScript tooling setup" },
  { id: 5, epicId: 2, name: "Static typing basics" },
  { id: 6, epicId: 2, name: "Advanced typing concepts" },
  { id: 7, epicId: 3, name: "Authentication sdk setup" },
  { id: 8, epicId: 3, name: "Auth accounts moved over" },
  { id: 9, epicId: 4, name: "Set up Java sdk" },
  { id: 10, epicId: 4, name: "Learn basics" },
  { id: 11, epicId: 4, name: "Learn async" }
];

export const tasks = [
  // Epic 1 - Migrate to PlanetScale
  { name: "Set up PlanetScale account", epicId: 1, userId: 1 },
  { name: "Add connection credentials", epicId: 1, userId: 1 },
  { name: "Implement transaction helper utilities", epicId: 1, userId: 1 },
  { name: "Migrate data", epicId: 1, userId: 2 },
  { name: "Convert stored procedures to application-code transactions", epicId: 1, userId: 2 },
  { name: "Convert functions to application-code transactions", epicId: 1, userId: 3 },

  // Epic 2 - Learn TypeScript
  { name: "Structural typing", epicId: 2, userId: 2 },
  { name: "Inferred typing", epicId: 2, userId: 2 },
  { name: "Functions", epicId: 2, userId: 2 },
  { name: "Classes", epicId: 2, userId: 2 },
  { name: "Unions", epicId: 2, userId: 2 },
  { name: "Narrowing", epicId: 2, userId: 2 },
  { name: "Discriminated unions", epicId: 2, userId: 2 },
  { name: "TypeScript helpers", epicId: 2, userId: 2 },

  // Epic 3 - Implement New Authentication
  { name: "Set up new auth provider", epicId: 3, userId: 3 },
  { name: "Integrate with session", epicId: 3, userId: 3 },
  { name: "Add Google provider", epicId: 3, userId: 3 },
  { name: "Add GitHub provider", epicId: 3, userId: 3 },
  { name: "Add Facebook provider", epicId: 3, userId: 3 },
  { name: "Update client-side logoug", epicId: 3, userId: 1 },

  // Epic 4 - Learn Java
  { name: "Set up dev environment", epicId: 4, userId: 1 },
  { name: "Review classic Java", epicId: 4, userId: 1 },
  { name: "Asynchrony with Futures", epicId: 4, userId: 1 },
  { name: "Data processing with Streams", epicId: 4, userId: 1 },
  { name: "Data transfer with Records", epicId: 4, userId: 1 }
];
