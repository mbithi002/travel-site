import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useNavigate } from 'react-router';
import './App.css';
import Footer from './components/Footer';
import AboutUs from './pages/about/AboutUs';
import Admin from './pages/admin/Admin';
import BookingPage from './pages/booking/BookingPage';
import BookingsInfoPage from './pages/bookingInfo/BookingsInfoPage';
import Destinations from './pages/destinations/Destinations';
import Header from './pages/home/Header';
import Home from './pages/home/home';

function App() {
  const navigate = useNavigate()
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
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/destinations' element={<Destinations />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/admin' element={authUser?.role === 'admin' ? <Admin /> : navigate('/')} />
        <Route path='/booking/:slug' element={<BookingPage />} />
        <Route path='/bookings' element={authUser ? <BookingsInfoPage /> : <Home />} />
      </Routes>
      <Toaster />
      <Footer />
    </>
  )
}

export default App
