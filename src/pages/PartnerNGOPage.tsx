import { useState } from 'react';
import { Building2, CheckCircle, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function PartnerNGOPage() {
  const [formData, setFormData] = useState({
    name: '',
    registration_number: '',
    pan: '',
    areas_of_operation: [] as string[],
    contact_person: '',
    email: '',
    phone: '',
  });
  const [areaInput, setAreaInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('ngo_partners').insert([formData]);

      if (error) throw error;

      setShowSuccess(true);
      setFormData({
        name: '',
        registration_number: '',
        pan: '',
        areas_of_operation: [],
        contact_person: '',
        email: '',
        phone: '',
      });

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addArea = () => {
    if (areaInput.trim() && !formData.areas_of_operation.includes(areaInput.trim())) {
      setFormData({
        ...formData,
        areas_of_operation: [...formData.areas_of_operation, areaInput.trim()],
      });
      setAreaInput('');
    }
  };

  const removeArea = (area: string) => {
    setFormData({
      ...formData,
      areas_of_operation: formData.areas_of_operation.filter((a) => a !== area),
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Building2 size={64} className="mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Register as NGO Partner</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Join our network of verified implementation partners and help transform government schools
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-xl mb-8">
            <h3 className="font-bold text-blue-900 mb-2">Why Partner with Saksham?</h3>
            <ul className="space-y-2 text-sm text-blue-900">
              <li>• Access to vetted school renovation projects across Karnataka</li>
              <li>• Professional project management and transparent funding</li>
              <li>• Opportunity to work with IIM Bangalore-backed initiative</li>
              <li>• Build credibility through verified, documented work</li>
            </ul>
          </div>

          {showSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-600" size={24} />
                <div>
                  <h3 className="text-green-900 font-bold">Registration Submitted!</h3>
                  <p className="text-green-700 text-sm">
                    Our team will review your application and contact you within 5-7 business days.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">NGO Registration Form</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NGO Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Number *
                  </label>
                  <input
                    type="text"
                    name="registration_number"
                    value={formData.registration_number}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number *
                  </label>
                  <input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas of Operation
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={areaInput}
                    onChange={(e) => setAreaInput(e.target.value)}
                    placeholder="e.g., Bangalore Urban, Mysore"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addArea}
                    className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.areas_of_operation.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.areas_of_operation.map((area) => (
                      <span
                        key={area}
                        className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                      >
                        <span>{area}</span>
                        <button
                          type="button"
                          onClick={() => removeArea(area)}
                          className="text-blue-900 hover:text-red-600"
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
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Upload className="text-gray-600" size={24} />
                  <h3 className="font-semibold text-gray-900">Document Upload</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Please have the following documents ready. Our team will contact you for document submission:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 80G / 12A Certificate (if applicable)</li>
                  <li>• Registration Certificate</li>
                  <li>• PAN Card</li>
                  <li>• Photos of past work (optional)</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>

              <p className="text-sm text-gray-600 text-center">
                By submitting this form, you agree to our verification process and partnership terms.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
