import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Hero from './components/Hero';
import AboutAndServices from './components/AboutAndServices';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

const HomePage: React.FC = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      // Check session storage to prevent duplicate counts on refresh
      const hasVisited = sessionStorage.getItem('innc_visited');
      
      if (!hasVisited) {
        try {
          const statsRef = doc(db, "stats", "general");
          const statsSnap = await getDoc(statsRef);

          if (statsSnap.exists()) {
            // Increment existing count
            await updateDoc(statsRef, {
              totalVisitors: increment(1)
            });
          } else {
            // Initialize count starting at 1520 + 1 (current visitor)
            await setDoc(statsRef, {
              totalVisitors: 1521
            });
          }
          
          // Mark as visited in this session
          sessionStorage.setItem('innc_visited', 'true');
        } catch (error) {
          console.error("Error updating visitor count:", error);
        }
      }
    };

    trackVisitor();
  }, []);

  return (
    <>
      <Hero />
      <AboutAndServices />
      <Portfolio />
      <Contact />
    </>
  );
};

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;