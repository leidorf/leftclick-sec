import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {AppRouter.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            >
              {route.children && route.children.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  index={childRoute.index}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;