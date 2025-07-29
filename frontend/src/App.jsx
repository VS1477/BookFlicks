import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Theaters from './pages/Theaters'
import Releases from './pages/Releases';
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import { useAppContext } from './context/AppContext'
import { SignIn } from '@clerk/clerk-react'
import Loading from './components/Loading'

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin')
  const { user } = useAppContext()
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    setFadeKey(prev => prev + 1);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Toaster />
      {!isAdminRoute && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/movies/:id' element={<MovieDetails/>} />
        <Route path='/movies/:id/:date' element={<SeatLayout/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />
        <Route path='/loading/:nextUrl' element={<Loading/>} />
          <Route path='/theaters' element={<Theaters/>} />
        <Route path='/favorite' element={<Favorite/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/privacy' element={<Privacy/>} />
          <Route path='/releases' element={<Releases/>} />
        <Route path='/admin/*' element={user ? <Layout/> : (
          <div className='min-h-screen flex justify-center items-center'>
            <SignIn fallbackRedirectUrl={'/admin'} />
          </div>
        )}>
          <Route index element={<Dashboard/>}/>
          <Route path="add-shows" element={<AddShows/>}/>
          <Route path="list-shows" element={<ListShows/>}/>
          <Route path="list-bookings" element={<ListBookings/>}/>
        </Route>
      </Routes>
       {!isAdminRoute && <Footer />}
      <style>{`
        .animate-fade-in {
          animation: fadeInPage 0.6s forwards;
        }
        @keyframes fadeInPage {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  )
}

export default App
