interface Task {
    id: number;
    title: string;
    completed: boolean;
  }

export type RootStackParamList = {
    Tasks: {screen: 'All' | 'Completed' | 'Incomplete'; params?: {newTask?: Task}} | undefined;
    TaskDetails: { task: Task };
    All: {newTask?: Task} | undefined;
    Completed: undefined;
    Incomplete: undefined;
    AddTask: undefined;
};
