import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Index from "./pages/Index"
import EditFile from "./pages/EditFile"
import ChoicePage from "./pages/ChoicePage";
import EditMenu from "./pages/EditMenu";
import Layout from "./components/general/Layout";

import React, { useState, useRef, useEffect } from 'react';

interface test {
    children: any,
}

const DraggableScroll: React.FC<test> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
  
    useEffect(() => {
      const container = containerRef.current;
  
      if (!container) return;
  
      const handleMouseDown = (e: MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - container.offsetLeft);
        setScrollLeft(container.scrollLeft);
      };
  
      const handleMouseLeave = () => {
        setIsDragging(false);
      };
  
      const handleMouseUp = () => {
        setIsDragging(false);
      };
  
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 3; // скорость скролла
        container.scrollLeft = scrollLeft - walk;
      };
  
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mousemove', handleMouseMove);
  
      return () => {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }, [isDragging, startX, scrollLeft]);
  
    return (
      <div
        ref={containerRef}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          overflow: 'auto',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        {children}
      </div>
    );
  };


const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Index />, 
            },

            {
                path: 'edit_menu',
                element: <EditMenu />, 
            },

            {
                path: 'edit_page',
                element: <ChoicePage />, 
            },

            {
                path: 'edit/:file_name',
                element: <EditFile />, 
            }
        ],
    },

    
]


const router = createBrowserRouter(routes)
const AppRouter = () => {
    return (
        <RouterProvider router={router} />
    )
}


export default AppRouter;