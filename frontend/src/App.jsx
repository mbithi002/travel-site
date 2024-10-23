import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Home from './pages/home/home';

function App() {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/authUser");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });
  return (
    <>
      <Home />
      <Toaster />
    </>
  )
}

export default App
