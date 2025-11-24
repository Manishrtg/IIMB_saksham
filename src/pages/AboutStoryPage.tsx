import { Target, Heart, Users, Award } from 'lucide-react';

export default function AboutStoryPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story & Vision</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Transforming the future of education, one government school at a time
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">The Beginning</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              Saksham was born from a simple observation and a profound commitment. During field visits across Karnataka, Prof. Gopal Naik and his team from IIM Bangalore witnessed the stark reality of government schools: crumbling infrastructure, inadequate sanitation facilities, and learning environments that failed our children.
            </p>
            <p>
              While these schools served millions of children from underprivileged backgrounds, they lacked the most basic facilities—proper classrooms, clean toilets, functional furniture, and adequate lighting. Yet, these were the very institutions responsible for shaping the future of rural India.
            </p>
            <p>
              In 2020, Saksham was launched as an IIM Bangalore-backed initiative with a clear mission: to systematically renovate and revitalize government schools across Karnataka, bringing them up to standards that every child deserves.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Meet Prof. Gopal Naik
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 flex items-center justify-center">
              <div className="w-64 h-64 bg-blue-200 rounded-full flex items-center justify-center">
                <Users size={100} className="text-blue-900" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Founder & Visionary Leader
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Prof. Gopal Naik is a distinguished faculty member at the Indian Institute of Management Bangalore, with over two decades of experience in rural development, agricultural economics, and social entrepreneurship.
                </p>
                <p>
                  His research and work have consistently focused on bridging gaps in rural infrastructure and creating sustainable models for social impact. Prof. Naik's vision for Saksham stems from his deep understanding that quality education infrastructure is not a luxury—it's a fundamental right.
                </p>
                <p>
                  Under his leadership, Saksham has developed a professional, transparent, and scalable model for school transformation that combines academic rigor with practical implementation.
                </p>
                <div className="pt-4">
                  <div className="font-semibold text-gray-900">Academic Background:</div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
                    <li>PhD in Agricultural Economics</li>
                    <li>Professor, IIM Bangalore</li>
                    <li>25+ years in rural development research</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-4">
            IIM Bangalore Partnership
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Institutional backing that ensures credibility, transparency, and excellence
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why IIM Bangalore Matters
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <Award className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                    <span>
                      <strong>Credibility:</strong> Association with India's premier management institution
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Award className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                    <span>
                      <strong>Expertise:</strong> Access to faculty, research, and best practices in social impact
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Award className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                    <span>
                      <strong>Talent:</strong> Student volunteers and alumni contributing skills and time
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Award className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                    <span>
                      <strong>Network:</strong> Connections to corporate partners and funding sources
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Our Support Structure
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    IIM Bangalore provides institutional support through faculty advisors, student research teams, and access to the institute's extensive network of alumni and corporate partners.
                  </p>
                  <p>
                    This backing ensures that Saksham operates with the highest standards of professionalism, transparency, and impact measurement—bringing management excellence to social transformation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">Our Vision & Mission</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Target className="text-orange-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To create a future where every government school in India provides a safe, dignified, and inspiring learning environment—where infrastructure never stands as a barrier to a child's education and dreams.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Heart className="text-blue-900" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To systematically identify, fund, and renovate government schools across Karnataka and beyond, bringing quality infrastructure through transparent partnerships, professional management, and measurable impact.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Values</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Transparency</h4>
                <p className="text-sm text-gray-600">
                  Complete visibility into projects, funding, and outcomes
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Professionalism</h4>
                <p className="text-sm text-gray-600">
                  IIM-backed standards in planning and execution
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Impact</h4>
                <p className="text-sm text-gray-600">
                  Data-driven decisions and measurable outcomes
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Ownership</h4>
                <p className="text-sm text-gray-600">
                  Complete accountability for every commitment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Long-Term Vision</h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              <strong className="text-gray-900">Phase 1 (2020-2025):</strong> Establish a proven model in Karnataka, renovating 100+ schools and demonstrating measurable impact on student outcomes and community engagement.
            </p>
            <p>
              <strong className="text-gray-900">Phase 2 (2025-2030):</strong> Scale across Karnataka, partnering with state government and expanding our network of NGO partners and corporate donors to reach 1,000+ schools.
            </p>
            <p>
              <strong className="text-gray-900">Phase 3 (2030+):</strong> Pan-India expansion, replicating the Saksham model across multiple states, influencing policy, and creating a national movement for government school transformation.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mt-8">
              <p className="text-gray-800 italic">
                "Our goal is not just to renovate buildings, but to restore dignity, hope, and opportunity for millions of children who deserve nothing less than excellence in their learning environments."
              </p>
              <p className="text-right text-gray-700 font-semibold mt-2">— Prof. Gopal Naik</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
