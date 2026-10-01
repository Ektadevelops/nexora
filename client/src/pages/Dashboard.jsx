import { useGetMeQuery } from "../store/api/nexoraApi";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (isError) {
    return <div className="p-6">Unable to load user information.</div>;
  }

  const user = data?.user;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-1 text-slate-500">Welcome back, {user?.name}.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-500">Total Datasets</p>

          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-500">Total Reports</p>

          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-500">Total Users</p>

          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-slate-500">Analytics</p>

          <p className="mt-2 text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
