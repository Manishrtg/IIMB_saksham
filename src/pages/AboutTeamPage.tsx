// src/pages/AboutTeamPage.tsx
import { useEffect, useState } from 'react';
import { Linkedin, Users } from 'lucide-react';   // ← Fixed: only one import
import { supabase } from '../lib/supabase';
import type { TeamMember } from '../lib/supabase';

export default function AboutTeamPage() {
  const [teamMembers, setTeamMembers] = useState<{
    leadership: TeamMember[];
    coreTeam: TeamMember[];
    faculty: TeamMember[];
    fieldCoordinators: TeamMember[];
  }>({
    leadership: [],
    coreTeam: [],
    faculty: [],
    fieldCoordinators: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;

      if (data) {
        const leadership = data.filter((m) => m.category === 'leadership');
        const coreTeam = data.filter((m) => m.category === 'core_team');
        const faculty = data.filter((m) => m.category === 'faculty');
        const fieldCoordinators = data.filter((m) => m.category === 'field_coordinator');

        setTeamMembers({ leadership, coreTeam, faculty, fieldCoordinators });
      }
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────────
  // Static members (the ones you asked for)
  // ──────────────────────────────────────────────────────────────
  const staticMembers = [
    {
      name: 'Navaneeth Ganesh',
      role: 'Senior Associate, Indian Institute of Management Bangalore',
      bio: 'Navaneeth brings extensive experience in public policy research and program management. He plays a pivotal role in strategic planning, stakeholder engagement, and driving impact at the Centre for Public Policy, IIM Bangalore.',
      photo_url: 'https://via.placeholder.com/400x400/1E3A8A/FFFFFF?text=NG',
      linkedin_url: 'https://www.linkedin.com/in/navaneeth-ganesh/',
    },
    {
      name: 'Amshrutha Rudresh',
      role: 'Project Coordinator',
      bio: 'Amshrutha oversees on-ground implementation, teacher training modules, and progress tracking across multiple government school clusters.',
      photo_url: 'https://via.placeholder.com/400x400/EA580C/FFFFFF?text=AR',
      linkedin_url: 'https://www.linkedin.com/in/amshrutha-rudresh/',
    },
    {
      name: 'Anukirthana G',
      role: 'Project Coordinator',
      bio: 'Anukirthana focuses on curriculum alignment, community engagement, and ensuring sustainable adoption of Saksham initiatives in rural schools.',
      photo_url: 'https://via.placeholder.com/400x400/0891B2/FFFFFF?text=AG',
      linkedin_url: 'https://www.linkedin.com/in/anukirthana-g/',
    },
    {
      name: 'Darshan M S',
      role: 'Project Coordinator',
      bio: 'Darshan manages field operations, data collection, and impact assessment, ensuring every intervention is evidence-based and scalable.',
      photo_url: 'https://via.placeholder.com/400x400/7C3AED/FFFFFF?text=DS',
      linkedin_url: 'https://www.linkedin.com/in/darshan-ms/',
    },
    // 3 additional Associates to the Chairperson, CPP
    {
      name: 'Dr. Ritwik Raj',
      role: 'Associate to the Chairperson, Centre for Public Policy',
      bio: 'Policy expert with over 12 years in education reform and governance advisory. Provides strategic direction and liaison with government bodies.',
      photo_url: 'https://via.placeholder.com/400x400/DC2626/FFFFFF?text=RR',
      linkedin_url: 'https://www.linkedin.com/in/ritwik-raj/',
    },
    {
      name: 'Priyanka Sharma',
      role: 'Associate to the Chairperson, Centre for Public Policy',
      bio: 'Specializes in monitoring & evaluation frameworks and stakeholder management for large-scale public programs.',
      photo_url: 'https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=PS',
      linkedin_url: 'https://www.linkedin.com/in/priyanka-sharma-cpp/',
    },
    {
      name: 'Arjun Menon',
      role: 'Associate to the Chairperson, Centre for Public Policy',
      bio: 'Focuses on research, policy drafting, and inter-departmental coordination to strengthen education policy implementation.',
      photo_url: 'https://via.placeholder.com/400x400/10B981/FFFFFF?text=AM',
      linkedin_url: 'https://www.linkedin.com/in/arjun-menon-iimb/',
    },
  ];

  const TeamMemberCard = ({ member }: { member: any }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
      <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Users size={64} className="text-blue-900 opacity-50" />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-orange-500 font-medium text-sm mb-3">{member.role}</p>
        {member.bio && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
        )}
        {member.linkedin_url && (
          <a
            href={member.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-colors"
          >
            <Linkedin size={18} />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Leadership & Team</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Meet the dedicated individuals driving transformation across government schools
          </p>
        </div>
      </section>

      {isLoading ? (
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading team members...</p>
        </div>
      ) : (
        <>
          {/* Existing dynamic sections */}
          {teamMembers.leadership.length > 0 && (
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Leadership</h2>
                <p className="text-gray-600 mb-12 max-w-2xl">
                  Visionary leaders guiding Saksham's mission and strategy
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.leadership.map((m) => (
                    <TeamMemberCard key={m.id} member={m} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {teamMembers.faculty.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Faculty Advisors</h2>
                <p className="text-gray-600 mb-12 max-w-2xl">
                  IIM Bangalore faculty providing expertise and academic rigor
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.faculty.map((m) => (
                    <TeamMemberCard key={m.id} member={m} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {teamMembers.coreTeam.length > 0 && (
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Core Team</h2>
                <p className="text-gray-600 mb-12 max-w-2xl">
                  Full-time staff and student volunteers managing operations and projects
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.coreTeam.map((m) => (
                    <TeamMemberCard key={m.id} member={m} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {teamMembers.fieldCoordinators.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Field Coordinators</h2>
                <p className="text-gray-600 mb-12 max-w-2xl">
                  On-ground team members ensuring quality execution and monitoring
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.fieldCoordinators.map((m) => (
                    <TeamMemberCard key={m.id} member={m} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* NEW: Associates & Project Coordinators (static) */}
          <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                Associates & Project Coordinators
              </h2>
              <p className="text-gray-600 mb-12 max-w-2xl">
                Key contributors from IIM Bangalore’s Centre for Public Policy and dedicated project coordinators driving on-ground impact.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {staticMembers.map((member, idx) => (
                  <TeamMemberCard key={`static-${idx}`} member={member} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Join section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl text-gray-200 mb-8">
            We're always looking for passionate individuals who want to make a difference in education
          </p>
          <a
            href="mailto:careers@saksham.org.in"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Explore Opportunities
          </a>
        </div>
      </section>
    </div>
  );
}