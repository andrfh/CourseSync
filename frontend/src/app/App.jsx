import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Home from '../pages/home/home';
import Currency from '../pages/currency/currency';

const queryClient = new QueryClient()

function App() {
  return (
    <Routes>
      <Route path="/" element={<QueryClientProvider client={queryClient}><Home updated_at='13.01.2026, 13:50:19'/></QueryClientProvider>} />
      <Route path="/currency/:id" element={<Currency />} />
    </Routes>
  )
}

export default App
