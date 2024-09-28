import { useQuery } from "@tanstack/react-query";

export const getTodayDiaryQuery = () => {
  return useQuery({ queryKey: ["diary"] });
};
