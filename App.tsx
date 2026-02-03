import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Hero from './components/Hero';
import AboutAndServices from './components/AboutAndServices';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';

const HomePage: React.FC = () => {
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