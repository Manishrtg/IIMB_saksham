import { useEffect, useState } from 'react';
import { MapPin, Users, Calendar, Download, Building2, ArrowLeft, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { School, CostItem, SchoolPhoto } from '../lib/supabase';
import { useRouter } from '../utils/router';

export default function SchoolDetailPage() {
  const [school, setSchool] = useState<School | null>(null);
  const [costItems, setCostItems] = useState<CostItem[]>([]);
  const [photos, setPhotos] = useState<{
    before: SchoolPhoto[];
    during: SchoolPhoto[];
    after: SchoolPhoto[];
  }>({ before: [], during: [], after: [] });
  const [isLoading, setIsLoading] = useState(true);
  const { navigate, currentPath } = useRouter();

  const projectCode = currentPath.split('/').pop();

  useEffect(() => {
    if (projectCode) {
      loadSchoolDetails();
    }
  }, [projectCode]);

  const loadSchoolDetails = async () => {
    try {
      const { data: schoolData, error: schoolError } = await supabase
        .from('schools')
        .select('*')
        .eq('project_code', projectCode)
        .maybeSingle();

      if (schoolError) throw schoolError;

      if (schoolData) {
        setSchool(schoolData);

        const [costRes, photosRes] = await Promise.all([
          supabase.from('cost_items').select('*').eq('school_id', schoolData.id),
          supabase.from('school_photos').select('*').eq('school_id', schoolData.id),
        ]);

        if (costRes.data) {
          setCostItems(costRes.data);
        }

        if (photosRes.data) {
          const before = photosRes.data.filter((p) => p.photo_type === 'before');
          const during = photosRes.data.filter((p) => p.photo_type === 'during');
          const after = photosRes.data.filter((p) => p.photo_type === 'after');
          setPhotos({ before, during, after });
        }
      }
    } catch (error) {
      console.error('Error loading school details:', error);
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
    if (!school || Number(school.total_cost) === 0) return 0;
    return Math.round((Number(school.amount_raised) / Number(school.total_cost)) * 100);
  };

  const getStatusBadge = () => {
    if (!school) return null;

    switch (school.status) {
      case 'completed':
        return (
          <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full">
            ✓ COMPLETED
          </span>
        );
      case 'ongoing':
        return (
          <span className="inline-block bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full">
            ⚡ ONGOING
          </span>
        );
      case 'pipeline':
        return (
          <span className="inline-block bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full">
            📋 PIPELINE
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading school details...</p>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 size={64} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">School not found</p>
          <button
            onClick={() => navigate('/schools/completed')}
            className="text-blue-900 hover:text-blue-700 font-semibold"
          >
            Back to Schools
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(`/schools/${school.status}`)}
            className="flex items-center space-x-2 text-gray-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to {school.status} projects</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="mb-4">{getStatusBadge()}</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{school.name}</h1>
              <div className="flex items-center space-x-2 text-gray-200 mb-2">
                <MapPin size={18} />
                <span>{school.address}</span>
              </div>
              <p className="text-gray-300">
                {school.taluk}, {school.district}, {school.state}
              </p>
              <p className="text-sm text-gray-400 mt-2">Project Code: {school.project_code}</p>
            </div>

            {school.status !== 'completed' && (
              <button
                onClick={() => navigate('/donate')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg whitespace-nowrap"
              >
                Donate to This School
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Users className="text-blue-900 mb-2" size={24} />
              <div className="text-3xl font-bold text-blue-900">{school.student_count}</div>
              <div className="text-sm text-gray-600">Students</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <Users className="text-orange-500 mb-2" size={24} />
              <div className="text-3xl font-bold text-orange-500">{school.teacher_count}</div>
              <div className="text-sm text-gray-600">Teachers</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <Calendar className="text-green-600 mb-2" size={24} />
              <div className="text-xl font-bold text-green-600">
                {school.work_start_date
                  ? new Date(school.work_start_date).toLocaleDateString('en-IN', {
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Not Started'}
              </div>
              <div className="text-sm text-gray-600">Start Date</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <Calendar className="text-purple-600 mb-2" size={24} />
              <div className="text-xl font-bold text-purple-600">
                {school.expected_completion_date
                  ? new Date(school.expected_completion_date).toLocaleDateString('en-IN', {
                      month: 'short',
                      year: 'numeric',
                    })
                  : school.actual_completion_date
                  ? new Date(school.actual_completion_date).toLocaleDateString('en-IN', {
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'TBD'}
              </div>
              <div className="text-sm text-gray-600">
                {school.status === 'completed' ? 'Completed' : 'Expected Completion'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {school.need_assessment && (
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-2xl font-bold text-blue-900 mb-4">Need Assessment</h2>
                  <p className="text-gray-700 leading-relaxed">{school.need_assessment}</p>
                </div>
              )}

              {costItems.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-2xl font-bold text-blue-900 mb-4">Cost Breakdown</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                            Category
                          </th>
                          <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                            Description
                          </th>
                          <th className="text-right py-3 px-4 text-gray-700 font-semibold">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {costItems.map((item) => (
                          <tr key={item.id} className="border-b border-gray-100">
                            <td className="py-3 px-4 font-medium text-gray-900">
                              {item.category}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {item.description || '-'}
                            </td>
                            <td className="py-3 px-4 text-right font-semibold text-gray-900">
                              {formatCurrency(Number(item.amount))}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50 font-bold">
                          <td className="py-3 px-4" colSpan={2}>
                            Total Project Cost
                          </td>
                          <td className="py-3 px-4 text-right text-blue-900">
                            {formatCurrency(Number(school.total_cost))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {school.principal_quote && (
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Principal's Message</h3>
                  <p className="text-gray-700 italic leading-relaxed">"{school.principal_quote}"</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Funding Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Amount Raised</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(Number(school.amount_raised))}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Target</span>
                      <span className="font-semibold text-blue-900">
                        {formatCurrency(Number(school.total_cost))}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-orange-500 h-4 rounded-full transition-all flex items-center justify-center text-xs text-white font-semibold"
                        style={{ width: `${Math.min(getProgressPercentage(), 100)}%` }}
                      >
                        {getProgressPercentage() > 10 && `${getProgressPercentage()}%`}
                      </div>
                    </div>
                    {getProgressPercentage() <= 10 && (
                      <p className="text-xs text-center mt-1 text-gray-600">
                        {getProgressPercentage()}% funded
                      </p>
                    )}
                  </div>

                  {school.status !== 'completed' && (
                    <button
                      onClick={() => navigate('/donate')}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Contribute Now
                    </button>
                  )}
                </div>
              </div>

              {(school.latitude && school.longitude) && (
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Location</h3>
                  <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center mb-4">
                    <MapPin size={48} className="text-gray-400" />
                  </div>
                  <a
                    href={`https://www.google.com/maps?q=${school.latitude},${school.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 text-blue-900 hover:text-blue-700 font-semibold"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}

              <div className="bg-white p-6 rounded-xl shadow-md">
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-900 py-3 rounded-lg font-semibold transition-colors">
                  <Download size={18} />
                  <span>Download PDF Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {(photos.before.length > 0 || photos.during.length > 0 || photos.after.length > 0) && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-8">Photo Gallery</h2>

            {photos.before.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Before Renovation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {photos.before.map((photo) => (
                    <div key={photo.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <Building2 size={48} className="text-gray-400" />
                      </div>
                      {photo.caption && (
                        <div className="p-3 text-sm text-gray-600">{photo.caption}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {photos.during.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Work in Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {photos.during.map((photo) => (
                    <div key={photo.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="h-64 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                        <Building2 size={48} className="text-orange-600" />
                      </div>
                      {photo.caption && (
                        <div className="p-3 text-sm text-gray-600">{photo.caption}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {photos.after.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">After Renovation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {photos.after.map((photo) => (
                    <div key={photo.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="h-64 bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
                        <Building2 size={48} className="text-green-600" />
                      </div>
                      {photo.caption && (
                        <div className="p-3 text-sm text-gray-600">{photo.caption}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
