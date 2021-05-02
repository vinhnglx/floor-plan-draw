const tables = [
  {
    x: 76,
    y: 36,
    width: 60,
    height: 60,
    shape: 'square',
    label: 'table1',
    id: 1,
  },
  {
    x: 173,
    y: 36,
    width: 60,
    height: 60,
    shape: 'square',
    label: 'table2',
    id: 2,
  },
  {
    x: 278,
    y: 36,
    width: 300,
    height: 60,
    shape: 'rectangle',
    label: 'table3',
    id: 3,
  },
  {
    x: 82,
    y: 210,
    width: 60,
    height: 60,
    shape: 'circle',
    label: 'table4',
    id: 4,
  },
  {
    x: 180,
    y: 210,
    width: 60,
    height: 60,
    shape: 'circle',
    label: 'table5',
    id: 5,
  },
  {
    x: 353,
    y: 190,
    width: 200,
    height: 100,
    shape: 'circle',
    label: 'table6',
    id: 6,
  },
];
const lines = [
  { id: 1, x: 144, y: 139, width: 300, height: 2, shape: 'horizontal' },
  { id: 2, x: 295, y: 194, width: 2, height: 100, shape: 'vertical' },
];
const restaurantData = {
  tables,
  lines,
};

export default restaurantData;
