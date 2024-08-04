import React from "react";
import { cn } from "../../lib";
import Navbar from "./Navbar";

export default function BuyerAboutPage() {
  const data = [
    {
      title: "Integrity",
      description:
        "We uphold the highest standards of integrity in all our actions. By being honest and transparent, we build trust and foster strong, enduring relationships with our clients and candidates.",
      img: "https://images.pexels.com/photos/7544486/pexels-photo-7544486.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our work. Our commitment to quality ensures that we deliver outstanding results, exceeding expectations and setting new benchmarks in the recruitment industry.",
      img: "https://images.pexels.com/photos/2098604/pexels-photo-2098604.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Innovation",
      description:
        "Innovation drives us to continually improve and adapt in a rapidly changing world. We embrace new technologies and creative solutions to stay ahead of industry trends, ensuring our clients benefit from the most advanced recruitment strategies",
      img: "https://images.pexels.com/photos/1314410/pexels-photo-1314410.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Client Focus",
      description:
        "Our clients are at the heart of everything we do. We listen to their needs, understand their goals, and tailor our services to meet their unique requirements, delivering customized solutions that drive their success.",
      img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Collaboration",
      description:
        "Collaboration is key to our success. We work closely with our clients, candidates, and team members to foster a collaborative environment where ideas are shared, and collective goals are achieved, ensuring mutual growth and success.",
      img: "https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <>
      <Navbar />
      <Wrapper className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-0">
        <div className="w-full flex   justify-center items-center">
          <H3 className="md:text-2xl p-10">
            Future Globe Business Solutions was established with the vision of
            transforming the recruitment landscape. With a dedicated team of
            seasoned professionals, we bring a wealth of experience and
            innovative strategies to ensure exceptional outcomes tailored to
            your needs. We pride ourselves on building lasting partnerships by
            aligning our services with your unique business objectives, helping
            you achieve sustainable growth and success.
          </H3>
        </div>
        <div className="w-full flex justify-center items-center">
          <img
            src="https://placehold.co/600x400"
            width={400}
            height={400}
            alt=""
          />
        </div>
      </Wrapper>

      <Wrapper className="flex flex-col md:flex-row  justify-center items-center my-16 gap-10 md:gap-0">
        <div className="w-full flex justify-center items-center">
          <img
            src="https://placehold.co/600x400"
            width={400}
            height={400}
            alt=""
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <H3 className="md:text-2xl">
            Our mission is to deliver exceptional recruitment services that
            connect your business with top talent, fostering sustained growth
            and mutual success. We are committed to understanding your unique
            needs and providing tailored solutions that drive your organization
            forward.
          </H3>
        </div>
      </Wrapper>

      <Wrapper>
        <SectionTitle>OUR core values</SectionTitle>
        <div className="grid md:grid-cols-3 my-10 gap-6">
          {data.map((item, index) => (
            <div key={index} className="flex">
              <SimpleCard_V1 data={item} className="flex-1 flex flex-col" />
            </div>
          ))}
        </div>
      </Wrapper>
    </>
  );
}

function Wrapper({ children, className }) {
  return (
    <div className={cn(" md:py-10 md:px-32 px-10 py-5", className)}>
      {children}
    </div>
  );
}

const SimpleCard_V1 = ({ data, className }) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 p-1",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      <div className="relative z-10 bg-white dark:bg-gray-900 p-6 rounded-xl h-full flex flex-col transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={data.img}
            width={600}
            height={400}
            alt={data.title}
            className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          {data.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
          {data.description}
        </p>
      </div>
    </div>
  );
};

function H3({ children, className }) {
  return (
    <h3
      className={`text-lg font-semibold text-gray-800 dark:text-gray-100 ${className}`}
    >
      {children}
    </h3>
  );
}

function SectionTitle({ children, className }) {
  return (
    <Wrapper
      className={cn("py-12 flex justify-center items-center", className)}
    >
      <div className="relative group">
        <H2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 uppercase relative z-10">
          {children}
        </H2>
        <div
          className={cn(
            "absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300 origin-left"
          )}
        ></div>
      </div>
    </Wrapper>
  );
}

function H2({ children, className }) {
  return (
    <h2 className={cn("md:text-3xl text-xl font-medium", className)}>
      {children}
    </h2>
  );
}
