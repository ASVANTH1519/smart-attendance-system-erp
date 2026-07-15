import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { KpiCard } from '../components/KpiCard';
import { ChartCard } from '../components/ChartCard';
import { AttendanceTable } from '../components/AttendanceTable';
import sampleLineData from '../data/attendance-line-sample';

export default function DashboardPage() {
  const navItems = [
    { key: 'dashboard', label: 'Dashboard', href: '/', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" stroke="currentColor" strokeWidth="1.2"/></svg> }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="flex">
        <Sidebar items={navItems} />
        <div className="flex-1">
          <TopNav />
          <main className="p-6">
            <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              <KpiCard title="Total Students" value={2438} delta={2.1} />
              <KpiCard title="Present Today" value={1992} delta={-0.4} />
              <KpiCard title="Absent" value={312} delta={0.2} />
              <KpiCard title="Attendance %" value={'81.7%'} delta={1.2} />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ChartCard title="Attendance Trends" data={sampleLineData} />
              <div className="lg:col-span-2">
                <AttendanceTable data={[
                  { id: '1', student: 'A. Kumar', class: 'CS-102', status: 'present', time: '09:12' },
                  { id: '2', student: 'S. Rao', class: 'EE-301', status: 'late', time: '09:32' }
                ]}/>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
