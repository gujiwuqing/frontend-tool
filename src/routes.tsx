import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        lazy: async () => {
          const { ToolList } = await import('./pages/ToolList');
          return { Component: ToolList };
        },
      },
      {
        path: '/tool/:id',
        lazy: async () => {
          const { ToolDetail } = await import('./pages/ToolDetail');
          return { Component: ToolDetail };
        },
      },
    ],
  },
], {
  basename: '/frontend-tool'
});

export default router;