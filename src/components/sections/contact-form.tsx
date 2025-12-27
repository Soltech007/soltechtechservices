// components/ContactForm.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Building2, 
  Users, 
  MapPin, 
  Briefcase,
  Loader2,
  CheckCircle,
  AlertCircle,
  Send
} from "lucide-react";
import { indianStates, citiesByState, employeeRanges, industries } from "@/lib/indianLocations";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
  state: string;
  city: string;
  organizationName: string;
  noOfEmployees: string;
  industry: string;
  message: string;
}

interface ContactFormProps {
  source?: string;
  className?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm({ source = "Contact Page", className = "" }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    state: "",
    city: "",
    organizationName: "",
    noOfEmployees: "",
    industry: "",
    message: "",
  });

  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Update cities when state changes
  useEffect(() => {
    if (formData.state) {
      setAvailableCities(citiesByState[formData.state] || []);
      setFormData(prev => ({ ...prev, city: "" }));
    } else {
      setAvailableCities([]);
    }
  }, [formData.state]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.phone && !/^[+]?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (formData.website && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.website)) {
      newErrors.website = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: source,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          website: "",
          state: "",
          city: "",
          organizationName: "",
          noOfEmployees: "",
          industry: "",
          message: "",
        });

        // Reset status after 5 seconds
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit. Please try again.");
        
        setTimeout(() => {
          setStatus("idle");
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
      
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  // Input field component
  const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    icon: Icon,
  }: {
    label: string;
    name: keyof FormData;
    type?: string;
    placeholder: string;
    required?: boolean;
    icon: any;
  }) => (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 font-neuhas">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className={`block w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-neuhas ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  // Select field component
  const SelectField = ({
    label,
    name,
    options,
    placeholder,
    required = false,
    icon: Icon,
    disabled = false,
  }: {
    label: string;
    name: keyof FormData;
    options: string[];
    placeholder: string;
    required?: boolean;
    icon: any;
    disabled?: boolean;
  }) => (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 font-neuhas">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          className={`block w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-neuhas appearance-none cursor-pointer ${
            errors[name] ? "border-red-500" : "border-gray-300"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${
            !formData[name] ? "text-gray-400" : ""
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-gray-900">
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-apfel2">
          Get in Touch
        </h2>
        <p className="text-gray-600 mt-2 font-neuhas">
          Fill out the form below and we'll get back to you shortly.
        </p>
      </div>

      {/* Success Message */}
      {status === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-semibold font-neuhas">Thank you for contacting us!</p>
            <p className="text-green-600 text-sm font-neuhas">We'll get back to you within 24 hours.</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {status === "error" && errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-semibold font-neuhas">Submission Failed</p>
            <p className="text-red-600 text-sm font-neuhas">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-apfel2 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="firstName"
              placeholder="John"
              required
              icon={User}
            />
            <InputField
              label="Last Name"
              name="lastName"
              placeholder="Doe"
              icon={User}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-apfel2 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              icon={Mail}
            />
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              placeholder="+91 97237 23322"
              icon={Phone}
            />
            <div className="md:col-span-2">
              <InputField
                label="Website (Optional)"
                name="website"
                type="url"
                placeholder="https://yourwebsite.com"
                icon={Globe}
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-apfel2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Location Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="State"
              name="state"
              options={indianStates}
              placeholder="Select State"
              icon={MapPin}
            />
            <SelectField
              label="City"
              name="city"
              options={availableCities}
              placeholder={formData.state ? "Select City" : "Select State First"}
              icon={MapPin}
              disabled={!formData.state}
            />
          </div>
        </div>

        {/* Organization Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-apfel2 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Organization Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Organization Name"
              name="organizationName"
              placeholder="Your Company Name"
              icon={Building2}
            />
            <SelectField
              label="No. of Employees"
              name="noOfEmployees"
              options={employeeRanges}
              placeholder="Select Range"
              icon={Users}
            />
            <div className="md:col-span-2">
              <SelectField
                label="Industry"
                name="industry"
                options={industries}
                placeholder="Select Industry"
                icon={Briefcase}
              />
            </div>
          </div>
        </div>

        {/* Message (Optional) */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 font-neuhas mb-1.5">
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your requirements..."
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-neuhas resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all font-neuhas ${
            status === "success"
              ? "bg-green-600 cursor-default"
              : status === "loading"
              ? "bg-blue-400 cursor-wait"
              : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
          } disabled:opacity-70`}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Submitted Successfully!
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Inquiry
            </>
          )}
        </button>

        {/* Privacy Note */}
        <p className="text-xs text-gray-500 text-center font-neuhas">
          By submitting this form, you agree to our{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms-of-use" className="text-blue-600 hover:underline">
            Terms of Service
          </a>
          .
        </p>
      </form>
    </div>
  );
}