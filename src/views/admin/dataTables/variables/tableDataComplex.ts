type RowObj = {
  name: string;
  status: string;
  date: string;
  progress: number;
};

const tableDataComplex: RowObj[] = [
  {
    name: "Course 1",
    progress: 0.0,
    status: "Published",
    date: "12 Sept 2023",
  },
  {
    name: "Course 2",
    progress: 0.0,
    status: "Draft",
    date: "13 Sept 2023",
  },
];
export default tableDataComplex;
