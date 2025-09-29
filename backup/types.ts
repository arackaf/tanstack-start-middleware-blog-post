export type Task = {
  id: string;
  title: string;
};

export type Epic = {
  id: string;
  name: string;
};

export type Milestone = {
  id: string;
  epicId: string;
  name: string;
};
