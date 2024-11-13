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

import './App.css';

function App() 
{
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/editing" element={<BooksEditingPage />} />
            <Route path="/books/editing/:bookId" element={<BooksEditingPage />} />
            <Route path="/books/search" element={<SearchBooks />} />
            <Route path="/readers" element={<ReadersPage />} />
            <Route path="/readers/editing" element={<ReadersEditingPage />} />
            <Route path="/readers/editing/:readerId" element={<ReadersEditingPage />} />

            <Route path="/loans" element={<LoansPage />} />
            <Route path="/loans/editing" element={<LoansEditingPage />} />
            <Route path="/loans/editing/:loanId" element={<LoansEditingPage />} />

            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/authors/editing" element={<AuthorsEditingPage />} />
            <Route path="/authors/editing/:authorId" element={<AuthorsEditingPage />} />

            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/payments/editing" element={<PaymentsEditingPage />} />
            <Route path="/payments/editing/:paymentId" element={<PaymentsEditingPage />} />

            <Route path="/genres" element={<GenresPage />} />
            <Route path="/genres/editing" element={<GenresEditingPage />} />
            <Route path="/genres/editing/:genreId" element={<GenresEditingPage />} />

            <Route path="/advanced-search" element={<AdvancedSearch />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
