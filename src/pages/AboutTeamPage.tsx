import { useEffect, useState } from 'react';
import { Linkedin, Users } from 'lucide-react';
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

  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
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
          {teamMembers.leadership.length > 0 && (
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Leadership</h2>
                <p className="text-gray-600 mb-12 max-w-2xl">
                  Visionary leaders guiding Saksham's mission and strategy
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.leadership.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
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
                  {teamMembers.faculty.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
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
                  {teamMembers.coreTeam.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
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
                  {teamMembers.fieldCoordinators.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {teamMembers.leadership.length === 0 &&
            teamMembers.coreTeam.length === 0 &&
            teamMembers.faculty.length === 0 &&
            teamMembers.fieldCoordinators.length === 0 && (
              <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <Users size={64} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">
                    Team information will be available soon.
                  </p>
                </div>
              </section>
            )}
        </>
      )}

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
