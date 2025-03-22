// src/components/ReminderPopup.tsx
import { useEffect } from 'react';
// import { toast } from 'react-toastify';
import { toast } from 'react-toastify'

interface ReminderProps {
  medication: { name: string; time: string };
}

const ReminderPopup: React.FC<ReminderProps> = ({ medication }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast(
        <div>
          <p>Time to take {medication.name}!</p>
          <button onClick={() => alert('Marked as Taken')}>Take</button>
          <button onClick={() => toast.dismiss()}>Snooze</button>
        </div>,
        { autoClose: false }
      );
    }, 9000); // Simulate 2-second delay

    return () => clearTimeout(timer);
  }, [medication]);

  return null;
};

export default ReminderPopup;