import {
  BrowserRouter as Router,
  useRoutes
} from 'react-router-dom';

import NotFound from './pages/NotFound';
import Main from './pages/Main';

const Routes = () => {
  return useRoutes([
    { path: "/", element: <Main /> },
    { path: "/*", element: <NotFound /> },
  ]);
};

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
