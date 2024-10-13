import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoute from './route/AppRoute';
import { PaginationProvider } from './context/PaginationContext';

const queryClient = new QueryClient();

function App() {

  const basename = import.meta.env.VITE_APP_BASENAME || '';

  return (
    <QueryClientProvider client={queryClient}>
      <PaginationProvider>
        <BrowserRouter basename={basename}>
          <AppRoute />
        </BrowserRouter>
      </PaginationProvider>
    </QueryClientProvider>
  )
}

export default App
