import { Toaster } from 'react-hot-toast';

export default function AppToaster() {
  return <Toaster position="top-right" toastOptions={{
    style: { fontSize: '1rem', borderRadius: '0.75rem', background: '#fff', color: '#3730a3' },
    success: { style: { background: '#d1fae5', color: '#047857' } },
    error: { style: { background: '#fee2e2', color: '#b91c1c' } },
  }} />;
}
