import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BooksPage from './pages/BooksPage';
import ReadersPage from './pages/ReadersPage';
import LoansPage from './pages/LoansPage';
import AuthorsPage from './pages/AuthorsPage';
import PaymentsPage from './pages/PaymentsPage';
import GenresPage from './pages/GenresPage';
import BooksEditingPage from './pages/BooksEditingPage';
import ReadersEditingPage from './pages/ReadersEditingPage';
import LoansEditingPage from './pages/LoansEditingPage';
import AuthorsEditingPage from './pages/AuthorsEditingPage';
import PaymentsEditingPage from './pages/PaymentsEditingPage';
import GenresEditingPage from './pages/GenresEditingPage';
import HomePage from './pages/HomePage';
import SearchBooks from './pages/SearchBooksPage';
import AdvancedSearch from './components/AdvancedSearch'; 
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage'; 

import './App.css';

function App() {
  return (
    <Router>
      <div className="page">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/search" element={<SearchBooks />} />

            {/* Защищенные маршруты для редактирования */}
            <Route path="/books/editing" element={
              <ProtectedRoute allowedRole="admin">
                <BooksEditingPage />
              </ProtectedRoute>
            } />
            <Route path="/books/editing/:bookId" element={
              <ProtectedRoute allowedRole="admin">
                <BooksEditingPage />
              </ProtectedRoute>
            } />

            <Route path="/readers" element={<ReadersPage />} />
            <Route path="/readers/editing" element={
              <ProtectedRoute allowedRole="admin">
                <ReadersEditingPage />
              </ProtectedRoute>
            } />
            <Route path="/readers/editing/:readerId" element={
              <ProtectedRoute allowedRole="admin">
                <ReadersEditingPage />
              </ProtectedRoute>
            } />

            <Route path="/loans" element={<LoansPage />} />
            <Route path="/loans/editing" element={
              <ProtectedRoute allowedRole="admin">
                <LoansEditingPage />
              </ProtectedRoute>
            } />
            <Route path="/loans/editing/:loanId" element={
              <ProtectedRoute allowedRole="admin">
                <LoansEditingPage />
              </ProtectedRoute>
            } />

            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/authors/editing" element={
              <ProtectedRoute allowedRole="admin">
                <AuthorsEditingPage />
              </ProtectedRoute>
            } />
            <Route path="/authors/editing/:authorId" element={
              <ProtectedRoute allowedRole="admin">
                <AuthorsEditingPage />
              </ProtectedRoute>
            } />

            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/payments/editing" element={
              <ProtectedRoute allowedRole="admin">
                <PaymentsEditingPage />
              </ProtectedRoute>
            } />
            <Route path="/payments/editing/:paymentId" element={
              <ProtectedRoute allowedRole="admin">
                <PaymentsEditingPage />
              </ProtectedRoute>
            } />

            <Route path="/genres" element={<GenresPage />} />
            <Route path="/genres/editing" element={
              <ProtectedRoute allowedRole="admin">
                <GenresEditingPage />
              </ProtectedRoute>
            } />
            <Route path="/genres/editing/:genreId" element={
              <ProtectedRoute allowedRole="admin">
                <GenresEditingPage />
              </ProtectedRoute>
            } />

            <Route path="/advanced-search" element={<AdvancedSearch />} />

            <Route path="/admin" element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
