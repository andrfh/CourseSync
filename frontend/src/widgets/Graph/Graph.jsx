import { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const Graph = ({ rawData }) => {

  const processedData = useMemo(() => {
    const converted = rawData.map(item => ({
      ...item,
      numericValue: parseFloat(item.value.replace(',', '.'))
    }));
    const maxPoints = 20;
    if (converted.length <= maxPoints) return converted;
    const step = (converted.length - 1) / (maxPoints - 1);
    const result = [];
    for (let i = 0; i < maxPoints; i++) {
      result.push(converted[Math.round(i * step)]);
    }
    return result;
  }, [rawData]);

  return (
    <div style={{ width: '100%', height: 300, background: '#fff' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={processedData} 
          margin={{ top: 10, right: 10, left: 15, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#efefef" />
          
          <XAxis 
            dataKey="date" 
            axisLine={{ stroke: '#E0E0E0' }}
            tickLine={false}
            tick={{ fontSize: 14, fill: '#666', fontWeight: 400 }}
            dy={10} 
            tickFormatter={(val) => val.split('.').slice(0, 2).join('.')}
            minTickGap={5}
          />
          
          <YAxis 
            domain={['dataMin - 0.2', 'dataMax + 0.2']}
            axisLine={false}
            tickLine={false}
            width={25}
            tick={{ fontSize: 14, fill: '#666' }}
            tickFormatter={(val) => val.toFixed(1).replace('.', ',')}
          />
          
          <Tooltip 
            formatter={(val) => [val.toString().replace('.', ','), "Цена"]}
            contentStyle={{ borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px' }}
          />
          
          <Line 
            type="monotone" 
            dataKey="numericValue" 
            stroke="#2563eb" 
            strokeWidth={3} 
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
