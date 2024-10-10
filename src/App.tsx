import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoute from './route/AppRoute';
import { PaginationProvider } from './context/PaginationContext';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <PaginationProvider>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </PaginationProvider>
    </QueryClientProvider>
  )
}

export default App
