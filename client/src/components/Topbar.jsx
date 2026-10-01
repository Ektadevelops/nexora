const Topbar = () => {
  return (
    <header className="fixed left-64 right-0 top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Business Intelligence
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          Admin User
        </span>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          AU
        </div>
      </div>
    </header>
  );
};

export default Topbar;