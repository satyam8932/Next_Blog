'use client';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface FormData {
  moveReason: string[];
  otherMoveReason?: string;
  familyStatus: string;
  budget: string;
  timeline: string;
  languages: string;
  otherLanguage?: string;
  preferredCity: string;
  specificCity?: string;
  knowledgeLevel: string;
  housingPreference: string;
  needAssistance: string;
  countryOfOrigin: string;
}

interface ActionPlan {
  id: string;
  email: string;
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
  pdfUrl?: string;
  error?: string;
  startedAt: string;
  completedAt?: string;
  data?: FormData; // Add the form data field
}

interface DashboardStats {
  totalPlans: number;
  completedPlans: number;
  failedPlans: number;
  processingPlans: number;
  recentPlans: ActionPlan[];
  dailyStats: {
    date: string;
    count: number;
  }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<ActionPlan | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderJsonData = (data: FormData) => {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-700">Complete Form Data</h4>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(JSON.stringify(data, null, 2));
            }}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Copy JSON</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Move Reason */}
          <div>
            <p className="text-sm font-medium text-gray-500">Move Reason</p>
            <p className="text-sm text-gray-900">
              {data.moveReason.join(', ')}
              {data.otherMoveReason && ` (Other: ${data.otherMoveReason})`}
            </p>
          </div>

          {/* Family Status */}
          <div>
            <p className="text-sm font-medium text-gray-500">Family Status</p>
            <p className="text-sm text-gray-900">{data.familyStatus}</p>
          </div>

          {/* Budget */}
          <div>
            <p className="text-sm font-medium text-gray-500">Budget</p>
            <p className="text-sm text-gray-900">{data.budget}</p>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-sm font-medium text-gray-500">Timeline</p>
            <p className="text-sm text-gray-900">{data.timeline}</p>
          </div>

          {/* Language */}
          <div>
            <p className="text-sm font-medium text-gray-500">Language</p>
            <p className="text-sm text-gray-900">
              {data.languages}
              {data.otherLanguage && ` (${data.otherLanguage})`}
            </p>
          </div>

          {/* City Preference */}
          <div>
            <p className="text-sm font-medium text-gray-500">City Preference</p>
            <p className="text-sm text-gray-900">
              {data.preferredCity === 'specific' ? data.specificCity : 'Needs recommendation'}
            </p>
          </div>

          {/* Knowledge Level */}
          <div>
            <p className="text-sm font-medium text-gray-500">Knowledge Level</p>
            <p className="text-sm text-gray-900">{data.knowledgeLevel}</p>
          </div>

          {/* Housing Preference */}
          <div>
            <p className="text-sm font-medium text-gray-500">Housing Preference</p>
            <p className="text-sm text-gray-900">{data.housingPreference}</p>
          </div>

          {/* Need Assistance */}
          <div>
            <p className="text-sm font-medium text-gray-500">Need Assistance</p>
            <p className="text-sm text-gray-900">{data.needAssistance}</p>
          </div>

          {/* Country of Origin */}
          <div>
            <p className="text-sm font-medium text-gray-500">Country of Origin</p>
            <p className="text-sm text-gray-900">{data.countryOfOrigin}</p>
          </div>
        </div>

        {/* Raw JSON Data */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500 mb-2">Raw JSON Data</p>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
              {JSON.stringify(data, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    );
  };


  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: stats?.dailyStats.map(stat => format(new Date(stat.date), 'MMM d')) || [],
    datasets: [
      {
        label: 'Action Plans Generated',
        data: stats?.dailyStats.map(stat => stat.count) || [],
        fill: false,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Action Plans Generated',
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Plans</h3>
          <p className="text-2xl font-semibold text-gray-900">{stats?.totalPlans}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="text-2xl font-semibold text-green-600">{stats?.completedPlans}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500">Failed</h3>
          <p className="text-2xl font-semibold text-red-600">{stats?.failedPlans}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500">Processing</h3>
          <p className="text-2xl font-semibold text-blue-600">{stats?.processingPlans}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Recent Action Plans Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Action Plans</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Started</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats?.recentPlans.map((plan) => (
                <React.Fragment key={plan.id}>
                  <tr
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedPlan(selectedPlan?.id === plan.id ? null : plan)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${plan.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          plan.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'}`}>
                        {plan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(plan.startedAt), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {plan.completedAt ? format(new Date(plan.completedAt), 'MMM d, yyyy HH:mm') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {plan.pdfUrl && (
                        <a
                          href={plan.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View PDF
                        </a>
                      )}
                    </td>
                  </tr>
                  {selectedPlan?.id === plan.id && plan.data && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4">
                        {renderJsonData(plan.data)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}