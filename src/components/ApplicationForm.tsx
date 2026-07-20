"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface ApplicationFormProps {
  jobId?: string;
  careerId?: number;
  jobTitle?: string;
}

export default function ApplicationForm({ jobId, careerId, jobTitle }: ApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: jobTitle || "",
    experience: "",
    resumeFile: null as File | null,
    coverLetter: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resumeFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();

      let resumeUrl = "";
      if (formData.resumeFile) {
        const fileExt = formData.resumeFile.name.split(".").pop();
        const fileName = `${Date.now()}-${formData.fullName.replace(/\s/g, "_")}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(fileName, formData.resumeFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("resumes")
          .getPublicUrl(fileName);

        resumeUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase.from("applications").insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position || jobTitle || "General Application",
        experience: formData.experience,
        resume_url: resumeUrl,
        cover_letter: formData.coverLetter,
        job_id: jobId || null,
        career_id: careerId || null,
      });

      if (error) throw error;

      alert("Application submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: jobTitle || "",
        experience: "",
        resumeFile: null,
        coverLetter: "",
      });
    } catch (err: any) {
      alert("Error submitting application: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Position Applying For</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="e.g., Software Engineer"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="e.g., 3-5 years"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Resume / CV *</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-[#b00226]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us why you'd be a great fit..."
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent hover:bg-[#b00226] text-white font-semibold py-3 px-6 rounded-xl transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
