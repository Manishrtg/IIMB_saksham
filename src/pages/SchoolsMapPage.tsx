import { useEffect, useState } from 'react';
import { MapPin, Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { School } from '../lib/supabase';
import { useRouter } from '../utils/router';

export default function SchoolsMapPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedState, setSelectedState] = useState<string>('Karnataka');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = useRouter();

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('district', { ascending: true });

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

  const states = [...new Set(schools.map((s) => s.state))];
  const stateSchools = schools.filter((s) => s.state === selectedState);
  const districts = [...new Set(stateSchools.map((s) => s.district))];
  const filteredSchools =
    selectedDistrict === 'all'
      ? stateSchools
      : stateSchools.filter((s) => s.district === selectedDistrict);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'ongoing':
        return 'bg-orange-500';
      case 'pipeline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusCount = (status: string) => {
    return filteredSchools.filter((s) => s.status === status).length;
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Interactive School Map</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Explore our schools by state and district to see the impact of Saksham
          </p>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select State</label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict('all');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Districts</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${getStatusColor('completed')}`}></div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{getStatusCount('completed')}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${getStatusColor('ongoing')}`}></div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{getStatusCount('ongoing')}</div>
                <div className="text-sm text-gray-600">Ongoing</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              <div className={`w-4 h-4 rounded-full ${getStatusColor('pipeline')}`}></div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{getStatusCount('pipeline')}</div>
                <div className="text-sm text-gray-600">Pipeline</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading schools...</p>
            </div>
          ) : filteredSchools.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl">
              <MapPin size={64} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No schools found in this area.</p>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 mb-8 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={80} className="text-blue-900 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedDistrict === 'all' ? selectedState : selectedDistrict}
                  </h3>
                  <p className="text-gray-600">
                    Showing {filteredSchools.length} schools in this region
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {districts.map((district) => {
                  const districtSchools =
                    selectedDistrict === 'all'
                      ? stateSchools.filter((s) => s.district === district)
                      : filteredSchools;

                  if (districtSchools.length === 0) return null;

                  return (
                    <div key={district} className="bg-white rounded-xl shadow-md p-6">
                      <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center space-x-2">
                        <MapPin size={20} />
                        <span>{district} District</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {districtSchools.map((school) => (
                          <div
                            key={school.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => navigate(`/school/${school.project_code}`)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <Building2 size={24} className="text-gray-400 flex-shrink-0" />
                              <div className={`w-3 h-3 rounded-full ${getStatusColor(school.status)}`}></div>
                            </div>

                            <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">
                              {school.name}
                            </h4>

                            <p className="text-sm text-gray-600 mb-2">{school.taluk}</p>

                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Students: {school.student_count}</span>
                              <span className="capitalize">{school.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
