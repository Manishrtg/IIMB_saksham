import { useEffect, useState } from 'react';
import { TrendingUp, Heart, MapPin, Clock } from 'lucide-react';
import { School as SchoolIcon } from 'lucide-react';     // ← renamed!
import { supabase } from '../lib/supabase';
import type { School, Donation } from '../lib/supabase';



export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalSchools: 0,
    completed: 0,
    ongoing: 0,
    pipeline: 0,
    totalRaised: 0,
    totalTarget: 0,
  });
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(() => {
      loadDashboardData();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const [schoolsRes, donationsRes, recentDonationsRes] = await Promise.all([
        supabase.from('schools').select('*'),
        supabase.from('donations').select('amount'),
        supabase
          .from('donations')
          .select('*')
          .order('donation_date', { ascending: false })
          .limit(10),
      ]);

      if (schoolsRes.data) {
        const completed = schoolsRes.data.filter((s) => s.status === 'completed').length;
        const ongoing = schoolsRes.data.filter((s) => s.status === 'ongoing').length;
        const pipeline = schoolsRes.data.filter((s) => s.status === 'pipeline').length;
        const totalTarget = schoolsRes.data.reduce((sum, s) => sum + Number(s.total_cost), 0);

        setStats((prev) => ({
          ...prev,
          totalSchools: schoolsRes.data.length,
          completed,
          ongoing,
          pipeline,
          totalTarget,
        }));
      }

      if (donationsRes.data) {
        const totalRaised = donationsRes.data.reduce((sum, d) => sum + Number(d.amount), 0);
        setStats((prev) => ({ ...prev, totalRaised }));
      }

      if (recentDonationsRes.data) {
        setRecentDonations(recentDonationsRes.data);
      }

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressPercentage = () => {
    if (stats.totalTarget === 0) return 0;
    return Math.round((stats.totalRaised / stats.totalTarget) * 100);
  };

  const getTimeSinceUpdate = () => {
    const seconds = Math.floor((new Date().getTime() - lastUpdated.getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Live Project Dashboard</h1>
              <p className="text-xl text-gray-200">
                Real-time tracking of all Saksham projects and funding
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-gray-300">
              <Clock size={16} />
              <span>Last updated: {getTimeSinceUpdate()}</span>
            </div>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Overall Progress</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <SchoolIcon className="text-blue-900" size={24} />
                    <span className="text-xs font-semibold text-gray-500">TOTAL</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-900">{stats.totalSchools}</div>
                  <div className="text-sm text-gray-600">Total Schools</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs font-semibold text-gray-500">COMPLETED</span>
                  </div>
                  <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
                  <div className="text-sm text-gray-600">Completed Projects</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-xs font-semibold text-gray-500">ONGOING</span>
                  </div>
                  <div className="text-3xl font-bold text-orange-500">{stats.ongoing}</div>
                  <div className="text-sm text-gray-600">Ongoing Projects</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="text-xs font-semibold text-gray-500">PIPELINE</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-600">{stats.pipeline}</div>
                  <div className="text-sm text-gray-600">Pipeline Projects</div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-blue-900 mb-6">Funding Progress</h3>

                <div className="flex items-center justify-center mb-8">
                  <div className="relative w-64 h-64">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="128"
                        cy="128"
                        r="100"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="20"
                      />
                      <circle
                        cx="128"
                        cy="128"
                        r="100"
                        fill="none"
                        stroke="#FF6B35"
                        strokeWidth="20"
                        strokeDasharray={`${2 * Math.PI * 100}`}
                        strokeDashoffset={`${2 * Math.PI * 100 * (1 - getProgressPercentage() / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-4xl font-bold text-orange-500">
                        {getProgressPercentage()}%
                      </div>
                      <div className="text-sm text-gray-600">Funded</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <Heart className="text-green-600 mx-auto mb-2" size={32} />
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {formatCurrency(stats.totalRaised)}
                    </div>
                    <div className="text-sm text-gray-600">Total Amount Raised</div>
                  </div>

                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <TrendingUp className="text-blue-900 mx-auto mb-2" size={32} />
                    <div className="text-2xl font-bold text-blue-900 mb-1">
                      {formatCurrency(stats.totalTarget)}
                    </div>
                    <div className="text-sm text-gray-600">Total Target Amount</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Recent Donations</h2>

              {recentDonations.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-12 text-center">
                  <Heart size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No donations recorded yet</p>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            Donor
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            Amount
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            Type
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recentDonations.map((donation) => (
                          <tr key={donation.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {donation.is_anonymous
                                ? 'Anonymous Donor'
                                : donation.donor_name || 'Anonymous'}
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-green-600">
                              {formatCurrency(Number(donation.amount))}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                              {donation.donation_type.replace('_', ' ')}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {new Date(donation.donation_date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Project Status Map</h2>

              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg">
                  <div className="text-center">
                    <MapPin size={80} className="text-blue-900 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Map</h3>
                    <p className="text-gray-600 mb-4">Visualize all projects across Karnataka</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-700">Completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-gray-700">Ongoing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                    <span className="text-sm text-gray-700">Pipeline</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
