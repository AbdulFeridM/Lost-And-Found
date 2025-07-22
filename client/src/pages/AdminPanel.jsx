import React, { useEffect } from 'react';
import MetricsCard from './_components/metrics-card';
import MetricsChart from './_components/status-charts';
import LatestItemsTable from './_components/latest-item-table';
import { useStats } from '../contexts/statsContext';
import { useItems } from '../contexts/ItemsContext';
import UsersTable from './_components/users-table';
import { useUsers } from '../contexts/usersContext';
import Spinner from '../components/spinner';

const Dashboard = () => {
  const { stats, loadingStats, fetchAdminStats } = useStats();
  const { loading, getMyItems, myItems, getLatestItems, latestItems } = useItems();
  const { deleteUser, fetchUsers, users, loading: loadingUsers } = useUsers();

  useEffect(() => {
    fetchAdminStats();
    fetchUsers();
    if (!loading && myItems.length === 0) {
      getMyItems();
      getLatestItems();
    }
  }, []);

  if (loadingStats || loading || loadingUsers) return <Spinner />;

  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-6 space-y-6 overflow-x-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <MetricsCard
            key={index}
            type={stat.type}
            count={stat.count}
            label={stat.label}
          />
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full xl:w-2/3 hidden lg:block">
          <MetricsChart data={stats} />
        </div>
        <div className="w-full xl:w-1/3 ">
          <LatestItemsTable latestItems={latestItems?.slice(0, 3)} />
        </div>
      </div>

      <UsersTable users={users} deleteUser={deleteUser} />
    </div>
  );
};

export default Dashboard;
