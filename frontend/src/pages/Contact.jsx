import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center font-semibold text-xl sm:text-2xl pt-6 sm:pt-10 px-4 sm:px-0 text-gray-700">
        <p>Contact Us</p>
      </div>

      {/* Main Content */}
      <div className="my-6 sm:my-10 flex flex-col items-center lg:flex-row lg:justify-center gap-6 sm:gap-10 mb-20 sm:mb-28 px-4 sm:px-6 lg:px-8">
        {/* Image Section */}
        <div className="w-full max-w-md lg:max-w-[360px]">
          <img
            className="w-full h-auto rounded-lg shadow-md"
            src={assets.contact_image}
            alt="contact-us"
          />
        </div>

        {/* Contact Information */}
        <div className="flex flex-col justify-center items-start gap-4 sm:gap-6 w-full max-w-md lg:max-w-lg">
          <p className="font-semibold text-base sm:text-lg text-gray-800">
            Our Office
          </p>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Bengaluru Office - <br />
            Prescripto Technologies Pvt. Ltd. 10th Block, 9087 cross,
            <br />
            VikasPuram, Kormangala, Bengaluru, Karnataka, 560034, India
          </p>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Telephone Number: 0595-2345091 <br />
            Email Address: patient_support@prescripto.com
          </p>

          <p className="font-semibold text-base sm:text-lg text-gray-800">
            Careers @Prescripto
          </p>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Learn more about our teams & current job openings.
          </p>

          <button
            onClick={() => {
              navigate("/");
              scrollTo(0, 0);
            }}
            className="w-full sm:w-auto border border-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-sm hover:bg-black hover:text-white font-medium transition-all duration-500"
          >
            Explore more!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
