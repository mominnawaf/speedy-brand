import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { useContext, lazy, Suspense } from 'react';
import UserContext from './context/UserContext';
const LazyLoadedLogin = lazy(() => import('./components/Login/Login'));
const LazyLoadedDashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const LazyLoadedWriteUp = lazy(() => import('./components/WriteUp/WriteUp'));

const PrivateRoute: React.FC<{ component: React.FC }> = ({
  component: Component,
}) => {
  const { user } = useContext(UserContext);
  return user ? <Component /> : <Navigate to="/login" />;
};


declare global {
  interface Window {
    global: any;
  }
}

if (typeof window !== "undefined") {
  window.global = window;
}

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/login" element={<LazyLoadedLogin />} />
          <Route path="/dashboard" element={<PrivateRoute component={LazyLoadedDashboard} />} />
          <Route path='/write-up/:id' element={<PrivateRoute component={LazyLoadedWriteUp} />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;