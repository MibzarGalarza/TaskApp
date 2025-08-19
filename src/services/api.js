import AsyncStorage from "@react-native-async-storage/async-storage";



export const getTasks = async () => {
  try {
    const tasks = await AsyncStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error getting tasks:", error);
    return [];
  }
};

export const createNewTask = async (task) => {
  try {
    const tasks = await getTasks();
    tasks.push(task);
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    return task;
  } catch (error) {
    console.error("Error creating new task:", error);
    return null;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return updatedTasks;
  } catch (error) {
    console.error("Error deleting task:", error);
    return null;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const tasks = await getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      return tasks[taskIndex];
    }
    return null;
  } catch (error) {
    console.error("Error updating task:", error);
    return null;
  }
};