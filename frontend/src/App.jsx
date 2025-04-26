
import './App.css'
import AdminPage from './pages/AdminPage'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { PrimeReactProvider } from 'primereact/api';

function App() {

  return (
    <>
            <PrimeReactProvider>

      <Header />
      <main className="p-6">
        <AdminPage />
      </main>
      <Footer />
      </PrimeReactProvider>
    </>

  )
}

export default App
