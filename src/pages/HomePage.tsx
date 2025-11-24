import { useEffect, useState } from 'react';
import { School, Building2, Heart, TrendingUp, ArrowRight, Users, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { School as SchoolType, Donation } from '../lib/supabase';
import { useRouter } from '../utils/router';

export default function HomePage() {
  const [stats, setStats] = useState({
    schoolsSupported: 0,
    fundsRaised: 0,
    childrenImpacted: 0,
    ongoingProjects: 0,
  });
  const [recentSchools, setRecentSchools] = useState<SchoolType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [schoolsRes, donationsRes, recentSchoolsRes] = await Promise.all([
        supabase.from('schools').select('*'),
        supabase.from('donations').select('amount'),
        supabase
          .from('schools')
          .select('*')
          .eq('status', 'completed')
          .order('actual_completion_date', { ascending: false })
          .limit(3),
      ]);

      if (schoolsRes.data) {
        const completed = schoolsRes.data.filter((s) => s.status === 'completed').length;
        const ongoing = schoolsRes.data.filter((s) => s.status === 'ongoing').length;
        const totalChildren = schoolsRes.data.reduce((sum, s) => sum + s.student_count, 0);

        setStats((prev) => ({
          ...prev,
          schoolsSupported: completed,
          ongoingProjects: ongoing,
          childrenImpacted: totalChildren,
        }));
      }

      if (donationsRes.data) {
        const total = donationsRes.data.reduce((sum, d) => sum + Number(d.amount), 0);
        setStats((prev) => ({ ...prev, fundsRaised: total }));
      }

      if (recentSchoolsRes.data) {
        setRecentSchools(recentSchoolsRes.data);
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
      <section className="relative h-[600px] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center mix-blend-overlay"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transforming Government Schools, One Classroom at a Time
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              An IIM Bangalore-backed initiative bringing quality infrastructure and hope to government schools across Karnataka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/donate')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Donate Now
              </button>
              <button
                onClick={() => navigate('/schools/completed')}
                className="bg-white hover:bg-gray-100 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <School className="text-blue-900" size={32} />
              </div>
              <div className="text-4xl font-bold text-blue-900 mb-2">
                {isLoading ? '-' : stats.schoolsSupported}
              </div>
              <div className="text-gray-600 font-medium">Schools Supported</div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Heart className="text-orange-500" size={32} />
              </div>
              <div className="text-4xl font-bold text-orange-500 mb-2">
                {isLoading ? '-' : formatCurrency(stats.fundsRaised).replace('₹', '₹ ')}
              </div>
              <div className="text-gray-600 font-medium">Funds Raised</div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Users className="text-green-600" size={32} />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {isLoading ? '-' : stats.childrenImpacted.toLocaleString()}
              </div>
              <div className="text-gray-600 font-medium">Children Impacted</div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <TrendingUp className="text-purple-600" size={32} />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {isLoading ? '-' : stats.ongoingProjects}
              </div>
              <div className="text-gray-600 font-medium">Ongoing Projects</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-4">How Saksham Works</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Our transparent, professional approach ensures every rupee creates maximum impact
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-900">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-900 text-white rounded-full font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Identify & Assess</h3>
                <p className="text-gray-600 leading-relaxed">
                  We conduct thorough assessments of government schools, identifying critical infrastructure needs and working with local authorities to prioritize interventions.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-orange-500">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500 text-white rounded-full font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fund & Execute</h3>
                <p className="text-gray-600 leading-relaxed">
                  We partner with verified NGOs and contractors, raise targeted funds from donors and CSR partners, and execute renovations with full transparency and accountability.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-green-600">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Track & Report</h3>
                <p className="text-gray-600 leading-relaxed">
                  Real-time project tracking, detailed expenditure reports, before-after documentation, and impact measurement ensure complete transparency for all stakeholders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-2">Recent Transformations</h2>
              <p className="text-gray-600">See the impact of our latest completed projects</p>
            </div>
            <button
              onClick={() => navigate('/schools/completed')}
              className="hidden md:flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-semibold"
            >
              <span>View All Projects</span>
              <ArrowRight size={20} />
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
            </div>
          ) : recentSchools.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600">No completed projects yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentSchools.map((school) => (
                <div
                  key={school.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
                  onClick={() => navigate(`/school/${school.project_code}`)}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Building2 size={64} className="text-blue-900 opacity-50" />
                  </div>
                  <div className="p-6">
                    <div className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      COMPLETED
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{school.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {school.district}, {school.state}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Students:</span>
                        <span className="font-semibold text-gray-900">{school.student_count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Project Cost:</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(Number(school.total_cost))}
                        </span>
                      </div>
                    </div>
                    <button className="mt-4 w-full bg-blue-50 hover:bg-blue-100 text-blue-900 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                      <span>View Details</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => navigate('/schools/completed')}
            className="md:hidden flex items-center justify-center space-x-2 text-orange-500 hover:text-orange-600 font-semibold mx-auto mt-8"
          >
            <span>View All Projects</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Backed by IIM Bangalore</h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Led by Prof. Gopal Naik and supported by IIMB's institutional expertise, Saksham combines academic rigor with on-ground impact to transform government schools across Karnataka.
            </p>
            <button
              onClick={() => navigate('/about/story')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
            >
              <span>Learn Our Story</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            What People Say About Saksham
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="text-orange-500 text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The transformation of our school has been remarkable. Our students now have clean toilets, bright classrooms, and proper furniture. This has significantly improved attendance and learning outcomes.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="font-bold text-blue-900">RP</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Rajesh Patel</div>
                  <div className="text-sm text-gray-600">School Principal, Belgaum</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="text-orange-500 text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Saksham's transparent approach and detailed reporting gave us confidence in our CSR investment. We can see exactly where every rupee is going and the tangible impact it creates.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="font-bold text-blue-900">SK</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sunita Krishnan</div>
                  <div className="text-sm text-gray-600">CSR Head, Tech Corp</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="text-orange-500 text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Saksham brings academic rigor and professional management to social impact. Their systematic approach to school transformation is a model that should be replicated across India.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="font-bold text-blue-900">GN</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Prof. Gopal Naik</div>
                  <div className="text-sm text-gray-600">Founder, IIM Bangalore</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-orange-50">
            Your contribution can transform a school and change hundreds of lives
          </p>
          <button
            onClick={() => navigate('/donate')}
            className="bg-white text-orange-500 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Donate Now
          </button>
        </div>
      </section>
    </div>
  );
}
