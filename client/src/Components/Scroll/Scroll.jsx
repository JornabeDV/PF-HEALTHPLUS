const Scroll = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex space-x-2" style={{ fontFamily: "Rubik, sans-serif" }}>
      <button
        className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  text-sm font-medium"
        onClick={() => {
          scrollToSection("about");
        }}
      >
        ABOUT
      </button>
      <button
        className=" text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  text-sm font-medium"
        onClick={() => {
          scrollToSection("doctors");
        }}
      >
        SERVICES
      </button>
      <button
        className=" text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  text-sm font-medium"
        onClick={() => {
          scrollToSection("services");
        }}
      >
        PROFESSIONALS
      </button>
      <button
        className=" text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2  text-sm font-medium"
        onClick={() => {
          scrollToSection("locations");
        }}
      >
        LOCATIONS
      </button>
    </div>
  );
};

export default Scroll;
