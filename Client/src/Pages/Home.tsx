import { IoMdPlanet } from 'react-icons/io';

export function Home() {
  return (
    <div className="flex items-center">
      <div className="flex flex-col justify-center items-center p-5 rounded-xl shadow-lg shadow-black/30 duration-75 bg-gray-100 hover:p-8">
        <p className="text-lg text-pastelGreen-500 font-bold">
          Here is our Home screen!
        </p>
        <IoMdPlanet className="text-orange-400 text-[70px]" />
      </div>
    </div>
  );
}
