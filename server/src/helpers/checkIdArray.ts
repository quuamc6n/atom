// Generic just to run helper function on any object with id
type T = {
  id: number;
};
export const checkIdArray = (theseIds: T[], ids: number[]) => {
  return ids.filter((id) => !theseIds.some((user) => user.id === id));
};
