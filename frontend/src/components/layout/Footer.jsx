import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 px-6 mt-10 border-t">
      <div className="container mx-auto text-center text-sm">
      © {new Date().getFullYear()} Nitzani Music 2004 LTD. All rights reserved.
      </div>
    </footer>
  );
}
