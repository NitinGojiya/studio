import React from "react";
import "./Service.css"; // Import styles (we'll create this file next)

const Service = () => {
  const services = [
    { title: "owner cost reduce", description: "Build Trust for customer" },
    { title: "Show Your Work", description: "Customer see Your Work" },
    { title: "City in best", description: "Customer Choose best in city" },
    { title: "Digital Marketing", description: "Promote your brand through various online channels." },
  ];

  return (
    <div className="service-page">
      <header className="header">
        <h1 className="font-bold text-3xl">Our Services</h1>
        <p>We provide high-quality services to help your business grow.</p>
      </header>

      <section className="services-list bg-slate-900">
        <h2>Our Expertise</h2>
        <div className="services">
          {services.map((service, index) => (
            <div key={index} className="service-item">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

    
    </div>
  );
};

export default Service;
