const COLORS = ["#ff7b9c", "#2a9d8f", "#003566", "#e76f51", "#588157", "#9f86c0", "#633533", "#e9c46a"];

export const getColorByNumber = (number: number) => {
  return COLORS[number % COLORS.length];
};
