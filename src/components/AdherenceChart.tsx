// src/components/AdherenceChart.tsx
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../index.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface AdherenceChartProps {
  size?: string; // e.g., "200px" for half of 400px
}

const AdherenceChart: React.FC<AdherenceChartProps> = ({ size = '400px' }) => {
  const data = {
    labels: ['Taken', 'Missed'],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ['#1976d2', '#d32f2f'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="chart-container" style={{ width: size, height: size }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default AdherenceChart;