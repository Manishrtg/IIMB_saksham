import { useEffect, useState } from 'react';
import { School, Users, Heart, TrendingUp, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ImpactPage() {
  const [stats, setStats] = useState({
    schoolsCompleted: 0,
    studentsImpacted: 0,
    fundsRaised: 0,
    partnersEngaged: 0,
  });
  const [yearlyProgress, setYearlyProgress] = useState<{ year: string; schools: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [schoolsRes, donationsRes, partnersRes] = await Promise.all([
        supabase.from('schools').select('*'),
        supabase.from('donations').select('amount'),
        supabase.from('ngo_partners').select('*').eq('is_verified', true),
      ]);

      if (schoolsRes.data) {
        const completed = schoolsRes.data.filter((s) => s.status === 'completed');
        const studentsTotal = completed.reduce((sum, s) => sum + s.student_count, 0);

        const yearMap = new Map<string, number>();
        completed.forEach((school) => {
          if (school.actual_completion_date) {
            const year = new Date(school.actual_completion_date).getFullYear().toString();
            yearMap.set(year, (yearMap.get(year) || 0) + 1);
          }
        });

        const yearlyData = Array.from(yearMap.entries())
          .map(([year, schools]) => ({ year, schools }))
          .sort((a, b) => a.year.localeCompare(b.year));

        setStats((prev) => ({
          ...prev,
          schoolsCompleted: completed.length,
          studentsImpacted: studentsTotal,
        }));
        setYearlyProgress(yearlyData);
      }

      if (donationsRes.data) {
        const total = donationsRes.data.reduce((sum, d) => sum + Number(d.amount), 0);
        setStats((prev) => ({ ...prev, fundsRaised: total }));
      }

      if (partnersRes.data) {
        setStats((prev) => ({ ...prev, partnersEngaged: partnersRes.data.length }));
      }
    } catch (error) {
      console.error('Error loading data:', error);
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

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Impact</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Measurable transformation in government schools across Karnataka
          </p>
        </div>
      </section>

      {isLoading ? (
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
        </div>
      ) : (
        <>
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">Impact by Numbers</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center transform hover:scale-105 transition-transform">
                  <School className="text-blue-900 mx-auto mb-4" size={48} />
                  <div className="text-5xl font-bold text-blue-900 mb-2">{stats.schoolsCompleted}</div>
                  <div className="text-gray-700 font-medium">Schools Transformed</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl text-center transform hover:scale-105 transition-transform">
                  <Users className="text-orange-500 mx-auto mb-4" size={48} />
                  <div className="text-5xl font-bold text-orange-500 mb-2">
                    {stats.studentsImpacted.toLocaleString()}
                  </div>
                  <div className="text-gray-700 font-medium">Students Impacted</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center transform hover:scale-105 transition-transform">
                  <Heart className="text-green-600 mx-auto mb-4" size={48} />
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    {formatCurrency(stats.fundsRaised).replace('₹', '₹ ')}
                  </div>
                  <div className="text-gray-700 font-medium">Funds Raised</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl text-center transform hover:scale-105 transition-transform">
                  <Award className="text-purple-600 mx-auto mb-4" size={48} />
                  <div className="text-5xl font-bold text-purple-600 mb-2">{stats.partnersEngaged}</div>
                  <div className="text-gray-700 font-medium">Partners Engaged</div>
                </div>
              </div>
            </div>
          </section>

          {yearlyProgress.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">Year-wise Progress</h2>

                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-end justify-around h-64">
                    {yearlyProgress.map((data) => {
                      const maxSchools = Math.max(...yearlyProgress.map((d) => d.schools));
                      const heightPercentage = (data.schools / maxSchools) * 100;

                      return (
                        <div key={data.year} className="flex flex-col items-center space-y-2">
                          <div className="text-2xl font-bold text-blue-900">{data.schools}</div>
                          <div
                            className="w-20 bg-gradient-to-t from-orange-500 to-orange-300 rounded-t-lg transition-all"
                            style={{ height: `${heightPercentage}%` }}
                          ></div>
                          <div className="text-sm font-semibold text-gray-700">{data.year}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
                What Changed in Our Schools
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-900">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🚽 Sanitation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Clean, functional toilets with running water, ensuring dignity and hygiene for all students, especially girls.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">💡 Infrastructure</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Renovated classrooms with proper flooring, ceilings, windows, and adequate lighting for conducive learning environments.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🪑 Furniture</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Comfortable desks and benches appropriate for student age groups, replacing broken or missing furniture.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-600">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">💻 Digital Learning</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Computer labs with internet connectivity, bridging the digital divide for rural students.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🎨 Paint & Aesthetics</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Bright, colorful walls with educational murals creating an inspiring atmosphere for learning.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">💧 Drinking Water</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Clean drinking water facilities with water purifiers ensuring safe hydration for all students.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-blue-900 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <TrendingUp size={64} className="mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Long-Term Impact</h2>
              <div className="space-y-6 text-lg text-gray-200">
                <p className="leading-relaxed">
                  Beyond infrastructure, our interventions have led to <strong className="text-white">increased student attendance</strong>,
                  improved <strong className="text-white">learning outcomes</strong>, and enhanced <strong className="text-white">community engagement</strong>
                  with government schools.
                </p>
                <p className="leading-relaxed">
                  Teachers report better classroom management, students show increased confidence, and parents express
                  renewed faith in public education.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
