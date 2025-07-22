import React, { useEffect } from 'react';
import MetricsCard from './_components/metrics-card';
import MetricsChart from './_components/status-charts';
import LatestItemsTable from './_components/latest-item-table';
import LatestReportTable from './_components/latest-report-table';
import { useStats } from '../contexts/statsContext';
import { useItems } from '../contexts/ItemsContext';
import Spinner from '../components/spinner';

const Dashboard = () => {
  const { stats, loadingStats, fetchStats } = useStats();
  const { loading, getMyItems, myItems, getLatestItems, latestItems } = useItems();

  useEffect(() => {
    fetchStats();
    if (!loading && myItems.length === 0) {
      getMyItems();
      getLatestItems();
    }
  }, []);

  if (loadingStats && loading) return <Spinner />;

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 md:px-8 py-6 flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <MetricsCard
            key={index}
            type={stat.type}
            count={stat.count}
            label={stat.label}
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 min-h-[300px] hidden  md:block">
          <MetricsChart data={stats} />
        </div>
        <div className="w-full lg:w-1/2">
          <LatestItemsTable latestItems={latestItems?.slice(0, 3)} />
        </div>
      </div>

      <LatestReportTable myItems={myItems?.slice(0, 5)} />
    </div>
  );
};

export default Dashboard;
