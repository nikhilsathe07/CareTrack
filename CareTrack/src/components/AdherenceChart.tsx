// src/components/AdherenceChart.tsx
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useQuery } from '@tanstack/react-query';
import { fetchMedications } from '../services/api';
import '../index.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdherenceChart: React.FC = () => {
  const { data: medications } = useQuery({
    queryKey: ['medications'],
    queryFn: fetchMedications,
  });

  const adherenceData = medications
    ? medications.map((med) => Math.min(Math.max(med.refillsLeft * 20, 0), 100))
    : [0];

  const data = {
    labels: medications ? medications.map((med) => med.name) : ['No Data'],
    datasets: [
      {
        label: 'Adherence (%)',
        data: adherenceData,
        backgroundColor: [
          '#1976d2',
          '#2e7d32',
          '#f57c00',
          '#d32f2f',
          '#7b1fa2',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Medication Adherence' },
    },
  };

  return (
    <div className="chart-container">
      <Pie data={data} options={options} />
    </div>
  );
};

export default AdherenceChart;