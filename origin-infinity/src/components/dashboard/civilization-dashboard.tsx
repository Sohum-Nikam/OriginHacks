'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';

interface GlobalIndex {
  type: string;
  value: number;
  timestamp: Date;
}

const COLORS = ['#e6c78c', '#d4c8be', '#a89f91', '#8c7c66'];

export function CivilizationDashboard() {
  const [indices, setIndices] = useState<GlobalIndex[]>([
    { type: 'Climate Stability', value: 65, timestamp: new Date() },
    { type: 'Social Inequality', value: 42, timestamp: new Date() },
    { type: 'Global Empathy', value: 58, timestamp: new Date() },
    { type: 'Innovation Rate', value: 73, timestamp: new Date() },
  ]);

  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      setIndices(prev => prev.map(index => ({
        ...index,
        value: Math.max(0, Math.min(100, index.value + (Math.random() - 0.5) * 4)),
        timestamp: new Date()
      })));
    }, 3000);

    // Generate time series data
    const generateTimeSeries = () => {
      const data = [];
      for (let i = 24; i >= 0; i--) {
        const date = new Date();
        date.setHours(date.getHours() - i);
        data.push({
          time: date.toLocaleTimeString([], { hour: '2-digit' }),
          climate: 65 + Math.sin(i * 0.3) * 10 + Math.random() * 5,
          inequality: 42 + Math.cos(i * 0.2) * 8 + Math.random() * 6,
          empathy: 58 + Math.sin(i * 0.4) * 12 + Math.random() * 4,
          innovation: 73 + Math.cos(i * 0.35) * 9 + Math.random() * 7,
        });
      }
      setTimeSeriesData(data);
    };

    generateTimeSeries();
    return () => clearInterval(interval);
  }, []);

  const getIndicatorColor = (value: number) => {
    if (value >= 70) return 'text-green-600';
    if (value >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getIndicatorBg = (value: number) => {
    if (value >= 70) return 'bg-green-100 border-green-300';
    if (value >= 50) return 'bg-yellow-100 border-yellow-300';
    return 'bg-red-100 border-red-300';
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Civilization Dynamics</h1>
          <p className="text-xl text-[#d4c8be]">
            Real-time global indices monitoring human civilization health
          </p>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {indices.map((index, i) => (
            <motion.div
              key={index.type}
              className={`glass-card p-6 border-2 ${getIndicatorBg(index.value)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-[#0c0c0c]">{index.type}</h3>
                <div className={`text-2xl font-bold ${getIndicatorColor(index.value)}`}>
                  {Math.round(index.value)}%
                </div>
              </div>
              <div className="w-full bg-[#d4c8be] rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${getIndicatorColor(index.value).replace('text-', 'bg-').replace('-600', '-500')}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${index.value}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              </div>
              <p className="text-sm text-[#a89f91] mt-3">
                {index.type === 'Climate Stability' && 'Environmental health and sustainability'}
                {index.type === 'Social Inequality' && 'Economic and social disparity levels'}
                {index.type === 'Global Empathy' && 'Collective understanding and compassion'}
                {index.type === 'Innovation Rate' && 'Technological and social progress'}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Time Series Chart */}
          <div className="glass-card p-6">
            <h2 className="text-2xl font-bold text-[#0c0c0c] mb-6">24-Hour Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d4c8be" />
                  <XAxis dataKey="time" stroke="#a89f91" />
                  <YAxis stroke="#a89f91" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 240, 0.9)', 
                      border: '1px solid #d4c8be',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="climate" 
                    stroke="#e6c78c" 
                    strokeWidth={2}
                    dot={{ fill: '#e6c78c' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="inequality" 
                    stroke="#d4c8be" 
                    strokeWidth={2}
                    dot={{ fill: '#d4c8be' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="empathy" 
                    stroke="#a89f91" 
                    strokeWidth={2}
                    dot={{ fill: '#a89f91' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="innovation" 
                    stroke="#8c7c66" 
                    strokeWidth={2}
                    dot={{ fill: '#8c7c66' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribution Chart */}
          <div className="glass-card p-6">
            <h2 className="text-2xl font-bold text-[#0c0c0c] mb-6">Current Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={indices}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="type"
                    label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : '0'}%`}
                  >
                    {indices.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 240, 0.9)', 
                      border: '1px solid #d4c8be',
                      borderRadius: '8px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <motion.div
          className="glass-card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[#0c0c0c] mb-6">Global Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-[#fdf6e3] rounded-lg border border-[#e6c78c]">
              <h3 className="font-semibold text-[#0c0c0c] mb-2">🌱 Climate Action</h3>
              <p className="text-[#a89f91] text-sm">
                Current stability levels indicate {indices[0].value > 60 ? 'moderate' : 'concerning'} 
                environmental conditions. Collective action can improve this trajectory.
              </p>
            </div>
            <div className="p-4 bg-[#fdf6e3] rounded-lg border border-[#e6c78c]">
              <h3 className="font-semibold text-[#0c0c0c] mb-2">🤝 Social Cohesion</h3>
              <p className="text-[#a89f91] text-sm">
                Empathy levels show {indices[2].value > 60 ? 'promising' : 'room for'} 
                growth in global understanding and cooperation.
              </p>
            </div>
            <div className="p-4 bg-[#fdf6e3] rounded-lg border border-[#e6c78c]">
              <h3 className="font-semibold text-[#0c0c0c] mb-2">🚀 Innovation Outlook</h3>
              <p className="text-[#a89f91] text-sm">
                Innovation rates remain {indices[3].value > 70 ? 'strong' : 'steady'}, 
                suggesting positive momentum for solving global challenges.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}