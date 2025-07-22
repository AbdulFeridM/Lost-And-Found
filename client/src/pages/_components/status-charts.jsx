import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from 'recharts';
import { MoreVertical } from 'lucide-react';

const colors = [
  'rgba(59, 130, 246, 1)',
  'rgba(34,197,94, 1)',
  'rgba(168,85,247, 1)',
  'rgba(234,179,8, 1)',
  'rgba(239,68,68, 1)',
  'rgba(14,165,233, 1)',
  'rgba(192,132,252, 1)',
];

const MetricsChart = ({ data }) => {
  const legendPayload = data.map((item, index) => ({
    value: item.label,
    type: 'square',
    color: colors[index % colors.length],
  }));

  
  const getBarSize = () => {
    if (window.innerWidth < 480) return 40;
    if (window.innerWidth < 768) return 60;
    return 80;
  };

  const [barSize, setBarSize] = React.useState(getBarSize());

  React.useEffect(() => {
    const handleResize = () => setBarSize(getBarSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full mx-auto bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-2xl p-4 sm:p-6 text-center h-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 w-full gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Lost And Found Metrics</h2>
        <MoreVertical className="w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-700" />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ left: 0, right: 0 }}>
          <XAxis
            dataKey="label"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            minTickGap={10}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Legend
            payload={legendPayload}
            wrapperStyle={{ paddingTop: 10, flexWrap: 'wrap', justifyContent: 'center' }}
            layout="horizontal"
            verticalAlign="bottom"
          />
          <Bar dataKey="count" barSize={barSize} radius={[8, 8, 0, 0]} cursor="default">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsChart;
