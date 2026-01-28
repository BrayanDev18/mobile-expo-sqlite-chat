export const isSameDay = (a: number | string, b: number | string) => {
  const dateA = new Date(Number(a));
  const dateB = new Date(Number(b));

  return (
    dateA.getDate() === dateB.getDate() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  );
};
