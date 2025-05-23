// src/components/MainContent.jsx
import React from 'react';

function MainContent() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Browse Pets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example category cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Adopt a Dog</h3>
            <p className="text-gray-700">Find your new best friend.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Adopt a Cat</h3>
            <p className="text-gray-700">Bring home a feline companion.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Lost Pets</h3>
            <p className="text-gray-700">Report a lost or found pet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainContent;
