export type ToastState = {
  isOpen: boolean,
  message: string | null,
  severity: string,
};

export type Filters = {
  account: string,
  category: string,
  date: {
    month: number,
    year: number,
  },
};

export type ChartData = {
  datasets: {
    data: any[],
    label: string | null | undefined,
  }[],
  labels: string[],
};
