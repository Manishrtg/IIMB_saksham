import { useState, useEffect } from 'react';
import { Heart, Building2, Droplet, Monitor, Book, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { School } from '../lib/supabase';

export default function DonatePage() {
  const [donationType, setDonationType] = useState<'specific' | 'cause' | 'general'>('general');
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [selectedCause, setSelectedCause] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('id, name, district, project_code, status')
        .in('status', ['ongoing', 'pipeline'])
        .order('name', { ascending: true });

      if (error) throw error;
      if (data) setSchools(data);
    } catch (error) {
      console.error('Error loading schools:', error);
    }
  };

  const causes = [
    { id: 'wash', label: 'WASH (Water & Sanitation)', icon: Droplet },
    { id: 'digital', label: 'Digital Lab', icon: Monitor },
    { id: 'furniture', label: 'Furniture & Fixtures', icon: Building2 },
    { id: 'library', label: 'Library & Books', icon: Book },
  ];

  const predefinedAmounts = [1000, 5000, 10000, 25000, 50000, 100000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const donationData = {
        school_id: donationType === 'specific' ? selectedSchool : null,
        donor_name: isAnonymous ? null : donorName,
        is_anonymous: isAnonymous,
        amount: parseFloat(amount),
        donation_type: donationType === 'specific' ? 'specific_school' : donationType === 'cause' ? 'cause' : 'general',
        cause_category: donationType === 'cause' ? selectedCause : null,
      };

      const { error } = await supabase.from('donations').insert([donationData]);

      if (error) throw error;

      setShowSuccess(true);
      setAmount('');
      setDonorName('');
      setDonorEmail('');
      setSelectedSchool('');
      setSelectedCause('');
      setIsAnonymous(false);

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('There was an error processing your donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart size={64} className="mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Make a Difference Today</h1>
          <p className="text-xl text-orange-50 max-w-3xl mx-auto">
            Your contribution directly transforms government schools and changes the lives of hundreds of children
          </p>
        </div>
      </section>

      {showSuccess && (
        <div className="bg-green-50 border-l-4 border-green-500 p-6 mx-auto max-w-4xl mt-8">
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <h3 className="text-green-900 font-bold">Thank You for Your Generosity!</h3>
              <p className="text-green-700">
                Your donation has been recorded. Our team will contact you shortly with payment details.
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Choose Your Donation Type</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => setDonationType('specific')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  donationType === 'specific'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <Building2 className="mx-auto mb-3" size={32} />
                <h3 className="font-bold text-gray-900 mb-2">Specific School</h3>
                <p className="text-sm text-gray-600">Support a particular school project</p>
              </button>

              <button
                onClick={() => setDonationType('cause')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  donationType === 'cause'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <Droplet className="mx-auto mb-3" size={32} />
                <h3 className="font-bold text-gray-900 mb-2">Specific Cause</h3>
                <p className="text-sm text-gray-600">Fund a specific type of infrastructure</p>
              </button>

              <button
                onClick={() => setDonationType('general')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  donationType === 'general'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <Heart className="mx-auto mb-3" size={32} />
                <h3 className="font-bold text-gray-900 mb-2">General Fund</h3>
                <p className="text-sm text-gray-600">Let us use where needed most</p>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {donationType === 'specific' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select School *
                  </label>
                  <select
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Choose a school...</option>
                    {schools.map((school) => (
                      <option key={school.id} value={school.id}>
                        {school.name} - {school.district} ({school.status})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {donationType === 'cause' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Cause *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {causes.map((cause) => {
                      const Icon = cause.icon;
                      return (
                        <button
                          key={cause.id}
                          type="button"
                          onClick={() => setSelectedCause(cause.id)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedCause === cause.id
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-orange-300'
                          }`}
                        >
                          <Icon size={24} className="mb-2" />
                          <div className="font-semibold text-gray-900">{cause.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount (₹) *
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
                  {predefinedAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt.toString())}
                      className={`py-2 px-4 rounded-lg border-2 font-semibold transition-all ${
                        amount === amt.toString()
                          ? 'border-orange-500 bg-orange-500 text-white'
                          : 'border-gray-300 hover:border-orange-300'
                      }`}
                    >
                      ₹{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="100"
                  placeholder="Or enter custom amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  I wish to remain anonymous
                </label>
              </div>

              {!isAnonymous && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Proceed to Donate'}
              </button>

              <p className="text-sm text-gray-600 text-center">
                Our team will contact you with secure payment details and complete the donation process.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-blue-900 text-center mb-8">
            Your Impact
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-orange-500 mb-2">₹1,000</div>
              <p className="text-gray-700">
                Provides basic furniture for one classroom, helping 30-40 students learn comfortably
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-orange-500 mb-2">₹5,000</div>
              <p className="text-gray-700">
                Renovates one toilet facility, ensuring dignity and hygiene for 50+ students
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-orange-500 mb-2">₹25,000</div>
              <p className="text-gray-700">
                Sets up a complete digital learning lab with 5 computers and internet connectivity
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-orange-500 mb-2">₹1,00,000</div>
              <p className="text-gray-700">
                Transforms an entire small school with classrooms, toilets, and basic infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}