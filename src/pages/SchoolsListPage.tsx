import { useEffect, useState } from 'react';
import { Building2, MapPin, Users, Calendar, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { School } from '../lib/supabase';
import { useRouter } from '../utils/router';

type SchoolsListPageProps = {
  status: 'completed' | 'ongoing' | 'pipeline';
};

export default function SchoolsListPage({ status }: SchoolsListPageProps) {
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const { navigate } = useRouter();

  useEffect(() => {
    loadSchools();
  }, [status]);

  const loadSchools = async () => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setSchools(data);
      }
    } catch (error) {
      console.error('Error loading schools:', error);
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

  const getStatusBadge = () => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            COMPLETED
          </span>
        );
      case 'ongoing':
        return (
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
            ONGOING
          </span>
        );
      case 'pipeline':
        return (
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
            PIPELINE
          </span>
        );
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'completed':
        return 'Completed Projects';
      case 'ongoing':
        return 'Ongoing Projects';
      case 'pipeline':
        return 'Pipeline Projects';
    }
  };

  const getDescription = () => {
    switch (status) {
      case 'completed':
        return 'Schools we have successfully transformed with complete renovations';
      case 'ongoing':
        return 'Projects currently under execution with active renovation work';
      case 'pipeline':
        return 'Schools identified and assessed, awaiting funding and project initiation';
    }
  };

  const districts = ['all', ...new Set(schools.map((s) => s.district))];
  const filteredSchools =
    selectedDistrict === 'all'
      ? schools
      : schools.filter((s) => s.district === selectedDistrict);

  const getProgressPercentage = (school: School) => {
    if (Number(school.total_cost) === 0) return 0;
    return Math.round((Number(school.amount_raised) / Number(school.total_cost)) * 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{getTitle()}</h1>
          <p className="text-xl text-gray-200 max-w-3xl">{getDescription()}</p>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Filter by District:</span>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district === 'all' ? 'All Districts' : district}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredSchools.length}</span>{' '}
              {filteredSchools.length === 1 ? 'school' : 'schools'}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading schools...</p>
            </div>
          ) : filteredSchools.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl">
              <Building2 size={64} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No schools found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSchools.map((school) => (
                <div
                  key={school.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform border border-gray-100"
                  onClick={() => navigate(`/school/${school.project_code}`)}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Building2 size={64} className="text-blue-900 opacity-50" />
                  </div>

                  <div className="p-6">
                    <div className="mb-3">{getStatusBadge()}</div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {school.name}
                    </h3>

                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                      <MapPin size={14} />
                      <span>
                        {school.district}, {school.state}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 flex items-center space-x-1">
                          <Users size={14} />
                          <span>Students:</span>
                        </span>
                        <span className="font-semibold text-gray-900">
                          {school.student_count}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Project Cost:</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(Number(school.total_cost))}
                        </span>
                      </div>

                      {status !== 'completed' && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount Raised:</span>
                            <span className="font-semibold text-green-600">
                              {formatCurrency(Number(school.amount_raised))}
                            </span>
                          </div>

                          <div className="pt-2">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{getProgressPercentage(school)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full transition-all"
                                style={{ width: `${getProgressPercentage(school)}%` }}
                              ></div>
                            </div>
                          </div>
                        </>
                      )}

                      {school.work_start_date && (
                        <div className="flex justify-between pt-2">
                          <span className="text-gray-600 flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>Started:</span>
                          </span>
                          <span className="font-medium text-gray-900">
                            {new Date(school.work_start_date).toLocaleDateString('en-IN', {
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t">
                      <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-900 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                        <span>View Details</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {filteredSchools.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Support a School Today</h2>
            <p className="text-xl mb-8 text-orange-50">
              Your contribution can help transform these schools and change lives
            </p>
            <button
              onClick={() => navigate('/donate')}
              className="bg-white text-orange-500 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Donate Now
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
