import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const About = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-center font-medium text-2xl pt-6 pb-4 mt-2 text-black">
        <p>About Prescripto</p>
        <p className="text-xl mt-4 text-gray-600 max-w-3xl mx-auto">
          Revolutionizing healthcare access through technology, one appointment
          at a time!
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        {/* -----------------Image Section------------- */}
        <div className="flex-5">
          <img
            className="mx-0 px-0 h-[125vh] rounded-xl"
            src={assets.about_image}
            alt="abt-img"
          />
        </div>

        {/* --------------------About us details-------------------- */}
        <div className="space-y-8 flex-7 text-gray-700 leading-7">
          {/* ----------------- Paragraph 1: Introduction and Mission -------------------*/}
          <div className="border border-[#414aafff] bg-white rounded-lg p-6  shadow-2xl">
            <h2 className="text-center text-2xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-md">
              Prescripto was founded in 2025 with a singular mission: to make
              healthcare accessible, affordable, and convenient for everyone. In
              a world where booking doctor appointments often involves long
              waiting times, confusing processes, and limited availability,
              Prescripto emerges as a beacon of innovation. We believe that
              quality healthcare should be just a click away, and our platform
              is designed to bridge the gap between patients and healthcare
              providers.
            </p>
          </div>

          {/* -------------------- Paragraph 2: What We Do and How We Help --------------------- */}
          <div className="bg-white border border-[#414aafff] rounded-lg p-6 shadow-2xl">
            <h2 className="text-center text-2xl font-semibold text-gray-900 mb-4">
              Transforming Healthcare Access
            </h2>
            <p className="text-md">
              At Prescripto, we've built a comprehensive platform that serves
              both patients and doctors. For patients, we offer an intuitive
              interface to search for specialists, view detailed profiles, check
              real-time availability, and book appointments 24/7. To date,
              Prescripto has facilitated over 3 million successful appointments,
              connecting patients with a network of verified, experienced
              medical professionals across various specialties including General
              Physicians, Gynecologists, Dermatologists, Pediatricians, and many
              more.
            </p>
          </div>

          {/*---------------------- Paragraph 3: Vision and Future Goals ------------------------*/}
          <div className="bg-white border border-[#414aafff] rounded-lg p-6 shadow-2xl">
            <h2 className=" text-center text-2xl font-semibold text-gray-900 mb-4">
              Our Vision for the Future
            </h2>
            <p className="text-md">
              Looking ahead, Prescripto is committed to becoming the most
              trusted healthcare platform globally. We envision a future where
              geographical boundaries no longer limit access to quality medical
              care. At the heart of everything we do is our commitment to
              putting patients first, ensuring data privacy and security, and
              maintaining the highest standards of medical excellence. Join us
              in our journey to transform healthcare delivery and make quality
              medical care accessible to billions around the world.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <h3 className="text-3xl font-bold text-blue-600">3M+</h3>
          <p className="text-gray-600 mt-2">Appointments Booked</p>
        </div>
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <h3 className="text-3xl font-bold text-green-600">500+</h3>
          <p className="text-gray-600 mt-2">Verified Doctors</p>
        </div>
        <div className="text-center p-6 bg-purple-50 rounded-lg">
          <h3 className="text-3xl font-bold text-purple-600">24/7</h3>
          <p className="text-gray-600 mt-2">Service Availability</p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Why Choose Us!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Patient First</h3>
            <p className="text-gray-600">
              Every decision we make is centered around patient welfare and
              convenience.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Trust & Safety</h3>
            <p className="text-gray-600">
              We maintain the highest standards of data security and medical
              verification.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              Constantly evolving to bring the latest technology to healthcare.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p className="text-gray-600">
              Making quality healthcare available to everyone, everywhere.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">
          Join the Prescripto Family Today
        </h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Experience the future of healthcare booking. Whether you're a patient
          seeking quality care or a doctor looking to grow your practice,
          Prescripto is here for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              navigate("/doctors");
              scrollTo(0, 0);
            }}
            className="cursor-pointer bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Book Your First Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
