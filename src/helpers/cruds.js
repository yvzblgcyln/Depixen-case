export const deleteArrayItem = (items, id) => {
  return items.filter((item) => item.id !== id);
};

export const updateArray = (items, id, updatedData) => {
  return items.map((item) => {
    if (item.id === id) {
      return { ...item, ...updatedData };
    } else {
      return item;
    }
  });
};
