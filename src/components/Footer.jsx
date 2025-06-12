import React from "react";

const Footer = () => {
  return (
    <div className="pt-10">
      <div className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 w-full">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Team
            3 - <span className="font-bold"> Continental</span>
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Footer;
