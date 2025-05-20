import React from "react";

function Footer() {
  return (
    <footer className="border-t border-gray-400 p-5 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} eBook. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
