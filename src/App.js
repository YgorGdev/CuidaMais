import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">
                  Bem-vindo ao CuidaMais
                </h1>
                <p className="text-center text-gray-600">
                  Sistema de Gerenciamento de Asilos
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
