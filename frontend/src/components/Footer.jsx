import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="">
      <hr className="mt-5 w-full" />
      <div className="flex flex-col sm:grid grid-cols-[2.5fr_1.25fr_1.25fr] gap-14 my-10 mt-5 text-sm">
        {/* -------Left Section---------- */}
        <div>
          <img className="mb-5 w-40 " src={assets.logo} alt="logo_image" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Prescripto was launched in 2025 with the purpose of making the
            process of getting doctors appointment hassle free. Till date, we
            have helped around 3+ million patients worldwide. For any queries
            you can write to us on : <b>patient_support@prescripto.com</b>{" "}
          </p>
        </div>

        {/* -------------Center Section-------------- */}
        <div>
          <p className="text-xl font-medim mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-800">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* -------------Right Section-------------- */}
        <div>
          <p className="text-xl font-medim mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-800">
            <li>+911-9999999999</li>
            <li>mohdwasiqkhan123@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* --------------Copyright section------------ */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright Prescripto @2025. All rights are reserved!
        </p>
      </div>
    </div>
  );
};

export default Footer;
