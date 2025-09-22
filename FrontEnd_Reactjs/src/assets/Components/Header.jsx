import { Bell, Menu, User } from "lucide-react";


export default function Header({ title }) {

  return (
    <header className="flex items-center justify-between bg-white shadow px-4 py-2">
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-3">

        <h1 className="text-xl font-bold text-gray-700">{title}</h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 inline-flex h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-lg px-3 py-2">
          <User className="w-6 h-6 text-gray-600" />
          <span className="text-gray-700 font-medium hidden sm:inline">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
