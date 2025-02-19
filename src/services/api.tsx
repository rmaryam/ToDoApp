export const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = async () => {
    try {
        const response = await fetch(`${API_URL}?_limit=20`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const updateTask = async (taskId: number, title: any, completed: any) => {
    try {
      await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed }),
      });
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  export const deleteTask = async (taskId: number) => {
    try {
      await fetch(`${API_URL}/${taskId}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  export const addTask = async (title: string) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
      });
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };
