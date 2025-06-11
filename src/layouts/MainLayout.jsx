import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 2000,
          style: {
            background: '#2C1810',
            color: '#F5F5DC',
            border: '2px solid #DAA520',
            fontFamily: 'Cinzel, serif',
            padding: '16px',
            fontSize: '1rem',
          },
          success: {
            iconTheme: {
              primary: '#DAA520',
              secondary: '#2C1810',
            },
          },
          error: {
            style: {
              background: '#2C1810',
              color: '#F5F5DC',
              border: '2px solid #8B4513',
            },
            iconTheme: {
              primary: '#8B4513',
              secondary: '#F5F5DC',
            },
          },
        }}
      />
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
