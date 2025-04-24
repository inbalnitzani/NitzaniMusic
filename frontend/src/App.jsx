
import './App.css'
import AdminPage from './pages/AdminPage'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
function App() {

  return (
    <>
      <Header />
      <main className="p-6">
        <AdminPage />
      </main>
      <Footer />
    </>

  )
}

export default App
