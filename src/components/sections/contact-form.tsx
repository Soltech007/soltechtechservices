'use client';

import { useState, useEffect } from 'react';
import { submitContactForm } from '@/lib/api/contact';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        project_type: '',
        message: '',
        budget: '',
        timeline: '',
        how_found: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Auto-hide success message after 5 seconds
    useEffect(() => {
        if (submitStatus === 'success') {
            const timer = setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [submitStatus]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const result = await submitContactForm(formData);

            if (result.success) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    project_type: '',
                    message: '',
                    budget: '',
                    timeline: '',
                    how_found: ''
                });
            } else {
                setSubmitStatus('error');
                setErrorMessage(result.error || 'Failed to submit form. Please try again.');
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('An unexpected error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative font-apfel2">
            {/* Floating Status Messages */}
            {submitStatus !== 'idle' && (
                <div className={`fixed top-20 right-4 z-50 transition-all duration-500 ${submitStatus === 'success' ? 'translate-x-0' : submitStatus === 'error' ? 'translate-x-0' : 'translate-x-[400px]'
                    }`}>
                    {submitStatus === 'success' && (
                        <div className="bg-white rounded-lg shadow-2xl p-6 min-w-[350px] border-l-4 border-green-500 animate-slide-in">
                            <div className="flex items-start">
                                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                                <div className="ml-3">
                                    <p className="text-lg font-semibold text-gray-900">Success!</p>
                                    <p className="text-gray-600 mt-1">We've received your inquiry and will get back to you shortly.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="bg-white rounded-lg shadow-2xl p-6 min-w-[350px] border-l-4 border-red-500 animate-slide-in">
                            <div className="flex items-start">
                                <XCircle className="h-6 w-6 text-blue-700 flex-shrink-0 mt-0.5" />
                                <div className="ml-3">
                                    <p className="text-lg font-semibold text-gray-900">Error</p>
                                    <p className="text-gray-600 mt-1">{errorMessage}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name <span className="text-blue-700">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address <span className="text-blue-700">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all"
                            placeholder="john@example.com"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all"
                            placeholder="+91 98765 43210"
                        />
                    </div>

                    {/* Company */}
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                            Company/Organization
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all"
                            placeholder="ABC Infrastructure Ltd."
                        />
                    </div>

                    {/* Project Type */}
                    <div>
                        <label htmlFor="project_type" className="block text-sm font-medium text-gray-700 mb-2">
                            Project Type
                        </label>
                        <select
                            id="project_type"
                            name="project_type"
                            value={formData.project_type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all appearance-none bg-white"
                        >
                            <option value="">Select a project type</option>
                            <option value="Border Infrastructure">Border Infrastructure</option>
                            <option value="Road Construction">Road Construction</option>
                            <option value="Civil Contracts">Civil Contracts</option>
                            <option value="Renewable Energy">Renewable Energy</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Budget */}
                    <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                            Estimated Budget
                        </label>
                        <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all appearance-none bg-white"
                        >
                            <option value="">Select budget range</option>
                            <option value="Under ₹10 Lakhs">Under ₹10 Lakhs</option>
                            <option value="₹10 Lakhs - ₹50 Lakhs">₹10 Lakhs - ₹50 Lakhs</option>
                            <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                            <option value="₹1 Crore - ₹5 Crore">₹1 Crore - ₹5 Crore</option>
                            <option value="₹5 Crore - ₹10 Crore">₹5 Crore - ₹10 Crore</option>
                            <option value="Above ₹10 Crore">Above ₹10 Crore</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Project Details <span className="text-blue-700">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all resize-none"
                            placeholder="Please describe your project requirements, location, and any specific details..."
                        ></textarea>
                    </div>
                </div>
                <div className="mt-8 sm:mt-10 md:mt-12 md:-ml-8">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                    // className="w-full md:w-auto px-10 py-4 bg-blue-800 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >

                        <div
                            className={cn(
                                'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
                                'px-4 sm:px-5 md:px-6 py-2 sm:py-2.5',
                                'text-sm sm:text-base font-semibold text-blue-800',
                                'transition-all duration-500 ease-out',
                                'min-h-[44px] sm:min-h-[48px]',
                                'w-full sm:w-auto max-w-xs sm:max-w-none mx-auto md:mx-0'
                            )}
                        >
                            <span className="absolute inset-0 rounded-full bg-blue-800 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out" />
                            <span className="relative z-10 flex items-center justify-center md:justify-start">
                                <span className="flex items-center justify-center rounded-full bg-blue-800 text-white transition-all duration-500 group-hover:w-0 group-hover:opacity-0 group-hover:scale-0 mr-2 sm:mr-3 group-hover:mr-0 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                </span>
                                <span className="whitespace-nowrap transition-colors duration-500 group-hover:text-white font-neuhas text-[15px] sm:text-[16px] md:text-[20px] leading-[48`px]">
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Inquiry'
                                    )}
                                </span>
                                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 opacity-0 transition-all duration-500 group-hover:w-4 sm:group-hover:w-5 group-hover:opacity-100 group-hover:text-white group-hover:ml-2 sm:group-hover:ml-3" />
                            </span>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
}