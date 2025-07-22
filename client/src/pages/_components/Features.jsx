import React from 'react';

const Features = ({ features }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 my-6 rounded-2xl">
      <h2 className="text-center text-4xl font-bold text-blue-900 mb-12 tracking-tight">
        Key Features
      </h2>

      <section
        id="features"
        className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-5">
            <div className="p-3 rounded-full bg-blue-100 text-blue-700">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Features;
