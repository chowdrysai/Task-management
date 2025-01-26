const calculateStatus = (task) => {
    const today = new Date();
    const dueDate = new Date(task.due_date);
  
    if (task.status === "Completed") return "Completed";
    if (dueDate < today) return "Overdue";
    if (dueDate.toDateString() === today.toDateString()) return "Due Today";
    return "Pending";
  };
  
  module.exports = { calculateStatus };
  