import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Datasets",
    path: "/datasets",
  },
  {
    label: "Analytics",
    path: "/analytics",
  },
  {
    label: "Reports",
    path: "/reports",
  },
  {
    label: "Users & Teams",
    path: "/users",
  },
  {
    label: "Settings",
    path: "/settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Nexora
        </h1>
      </div>

      <nav className="p-4">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `mb-1 block rounded-lg px-4 py-3 text-sm font-medium ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;