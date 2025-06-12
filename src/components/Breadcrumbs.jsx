import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumbs text-sm mt-2 mb-2">
      <ul className="text-xl">
        <li>
          <Link to="/dashboard">TemuCS</Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label = name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toLowerCase());

          return (
            <li key={name} className="text-[#FF800A]">
              {isLast ? (
                <span>{label}</span>
              ) : (
                <Link to={routeTo}>{label}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
