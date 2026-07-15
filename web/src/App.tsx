import { useEffect, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/network/queryClient';
import { LocalStore } from '@/storage/LocalStore';
import { useAuthStore } from '@/stores/hooks/useAuthStore';
import Login from '@/screens/Login';
import TaskList from '@/screens/TaskList';
import LoadingView from '@/components/common/LoadingView';

function AppContent() {
  const [checked, setChecked] = useState(false);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const storedToken = LocalStore.getToken();
    const storedUser = LocalStore.getUser();
    if (storedToken && storedUser) {
      useAuthStore.getState().setAuth(storedUser, storedToken);
    }
    setChecked(true);
  }, []);

  if (!checked) {
    return <LoadingView />;
  }

  return token ? <TaskList /> : <Login />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
