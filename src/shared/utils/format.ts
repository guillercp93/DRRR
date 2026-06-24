export const todayKey = (): string => {
  return new Date().toISOString().split('T')[0];
};
