export type ToastState = {
  isOpen: boolean;
  message: string | null;
  severity: 'success' | 'info' | 'warning' | 'error';
};

export type Filters = {
  account: string;
  category: string;
  date: {
    month: number;
    year: number;
  };
};

export type BarChartData = {
  datasets: {
    data: number[];
    backgroundColor: string[];
    maxBarThickness: number;
  }[];
  labels: string[];
};

export type LineChartData = {
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    fill: boolean;
  }[];
  labels: string[];
};

export type PieChartData = {
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
  labels: string[];
};
