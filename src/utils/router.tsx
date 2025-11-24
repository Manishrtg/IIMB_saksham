import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type RouterContextType = {
  currentPath: string;
  navigate: (path: string) => void;
};

const RouterContext = createContext<RouterContextType | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within RouterProvider');
  }
  return context;
}

type RouteProps = {
  path: string;
  component: ReactNode;
};

export function Route({ path, component }: RouteProps) {
  const { currentPath } = useRouter();

  if (path === currentPath) {
    return <>{component}</>;
  }

  if (path.includes(':') && currentPath.startsWith(path.split(':')[0])) {
    return <>{component}</>;
  }

  return null;
}
