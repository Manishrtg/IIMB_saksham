import { useState } from 'react';
import { Heart, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function PartnerCSRPage() {
  const [formData, setFormData] = useState({
    company_name: '',
    csr_registration_number: '',
    contact_person: '',
    email: '',
    phone: '',
    preferred_states: [] as string[],
    budget_range: '',
    receive_proposals: true,
  });
  const [stateInput, setStateInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const budgetRanges = [
    '₹1-5 Lakhs',
    '₹5-10 Lakhs',
    '₹10-25 Lakhs',
    '₹25-50 Lakhs',
    '₹50 Lakhs - 1 Crore',
    '₹1 Crore+',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('csr_partners').insert([formData]);

      if (error) throw error;

      setShowSuccess(true);
      setFormData({
        company_name: '',
        csr_registration_number: '',
        contact_person: '',
        email: '',
        phone: '',
        preferred_states: [],
        budget_range: '',
        receive_proposals: true,
      });

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const addState = () => {
    if (stateInput.trim() && !formData.preferred_states.includes(stateInput.trim())) {
      setFormData({
        ...formData,
        preferred_states: [...formData.preferred_states, stateInput.trim()],
      });
      setStateInput('');
    }
  };

  const removeState = (state: string) => {
    setFormData({
      ...formData,
      preferred_states: formData.preferred_states.filter((s) => s !== state),
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heart size={64} className="mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Register as CSR / Donor Partner</h1>
          <p className="text-xl text-orange-50 max-w-3xl">
            Partner with us to create lasting impact through strategic CSR investments in education
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-8">
            <h3 className="font-bold text-orange-900 mb-2">Why Partner with Saksham?</h3>
            <ul className="space-y-2 text-sm text-orange-900">
              <li>✓ 100% transparency with detailed project reports and live tracking</li>
              <li>✓ IIM Bangalore credibility and professional management</li>
              <li>✓ Measurable impact with before-after documentation</li>
              <li>✓ Tax benefits under Section 80G (for eligible donations)</li>
              <li>✓ Brand visibility and CSR reporting support</li>
            </ul>
          </div>

          {showSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-600" size={24} />
                <div>
                  <h3 className="text-green-900 font-bold">Registration Submitted!</h3>
                  <p className="text-green-700 text-sm">
                    Thank you for your interest. Our team will contact you with project proposals within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">CSR Partner Registration Form</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CSR Registration Number
                </label>
                <input
                  type="text"
                  name="csr_registration_number"
                  value={formData.csr_registration_number}
                  onChange={handleChange}
                  placeholder="If applicable"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred States / Districts
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={stateInput}
                    onChange={(e) => setStateInput(e.target.value)}
                    placeholder="e.g., Karnataka, Tamil Nadu"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={addState}
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.preferred_states.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.preferred_states.map((state) => (
                      <span
                        key={state}
                        className="bg-orange-100 text-orange-900 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                      >
                        <span>{state}</span>
                        <button
                          type="button"
                          onClick={() => removeState(state)}
                          className="text-orange-900 hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual CSR Budget Range *
                </label>
                <select
                  name="budget_range"
                  value={formData.budget_range}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select budget range...</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="receive_proposals"
                  name="receive_proposals"
                  checked={formData.receive_proposals}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="receive_proposals" className="text-sm text-gray-700">
                  I wish to receive school project proposals via email
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>

              <p className="text-sm text-gray-600 text-center">
                Our team will share detailed project proposals matching your preferences and budget.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-blue-900 text-center mb-8">
            CSR Partnership Benefits
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-gray-900 mb-2">Detailed Reporting</h3>
              <p className="text-sm text-gray-600">
                Quarterly reports with photos, financials, and impact metrics for your CSR documentation
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-gray-900 mb-2">Site Visits</h3>
              <p className="text-sm text-gray-600">
                Organized field visits to project schools for your team and stakeholders
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-gray-900 mb-2">Brand Recognition</h3>
              <p className="text-sm text-gray-600">
                Signage at schools, mentions in reports, and social media acknowledgment
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-gray-900 mb-2">Impact Measurement</h3>
              <p className="text-sm text-gray-600">
                Before-after analysis, student feedback, and long-term outcome tracking
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
