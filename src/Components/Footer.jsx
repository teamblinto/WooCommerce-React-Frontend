import React from "react";

function Footer() {
  return (
    <div className="bg-red-900 text-white py-6">
      <div className="max-w-screen-xl mx-auto text-center">
        <p className="text-lg">© 2025 Your Company. All rights reserved.</p>
        <div className="mt-2">
          <a
            href="#"
            className="text-gray-200 hover:underline underline-offset-2 mx-2"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-200 hover:underline underline-offset-2 mx-2"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-200 hover:underline underline-offset-2 mx-2"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
