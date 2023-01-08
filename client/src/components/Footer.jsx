import React, { useEffect, useState } from "react";

const Footer = () => {
  const [Year, setYear] = useState();
  useEffect(() => {
    const getYear = () => setYear(new Date().getFullYear());
    getYear();
  }, []);
  return (
    <>
      <footer className="bg-theme pt-7 pb-5">
        <div className="nike-container text-slate-200">
          <p className="text-center text-sm">
            <span className="font-semibold">Nike Store {Year}</span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
