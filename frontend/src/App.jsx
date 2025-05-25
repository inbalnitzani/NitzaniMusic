import './App.css'
import AdminPage from './pages/AdminPage'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { PrimeReactProvider } from 'primereact/api';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <PrimeReactProvider>
        <Header />
        <main className="layout-content">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </PrimeReactProvider>
    </BrowserRouter>
  );
}

export default App;
