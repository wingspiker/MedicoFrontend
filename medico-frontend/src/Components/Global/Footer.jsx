const Footer = () => {
  return (
    <footer className="py-12  text-blue-900 px-32  rounded-2xl bg-gradient-to-b from-cyan-200 to-cyan-50 shadow-[inset_-12px_-8px_40px_#46464620]">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between ">
        <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">{"Medico"}</h2>
          <p className="text-sm">Building a Sustainable Future</p>
        </div>

        <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
          <h3 className="text-lg font-bold text-blue-900 mb-3">Contact Us</h3>
          <p className="text-sm">+91 9876543210</p>
          <p className="text-sm">{"Medico@gmail.com"}</p>
        </div>

        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-lg font-bold text-blue-900 mb-3">Quick Links</h3>
          <a href="/about" className="text-sm hover:text-brand-secondary mb-2">
            About Us
          </a>
          <a href="/services" className="text-sm hover:text-brand-primary mb-2">
            Our Services
          </a>
          <a href="/projects" className="text-sm hover:text-brand-primary mb-2">
            Projects
          </a>
          {/* Add more links as needed */}
        </div>

        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            Connect With Us
          </h3>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-900 hover:text-brand-primary">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-blue-900 hover:text-brand-primary">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-blue-900 hover:text-brand-primary">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-blue-900">
        &copy; {new Date().getFullYear()} {"Medico"}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
