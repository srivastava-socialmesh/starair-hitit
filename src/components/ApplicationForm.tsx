"use client";
import { useState, useRef } from "react";

interface ApplicationFormProps {
  jobId: string;
  careerId: number;
}

export default function ApplicationForm({ jobId, careerId }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setMessage({ type: "error", text: "Please upload your resume." });
      return;
    }

    setLoading(true);
    setMessage(null);

    const data = new FormData();
    data.append("jobId", jobId);
    data.append("careerId", String(careerId));
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("coverLetter", formData.coverLetter);
    data.append("resume", resume);

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Application submitted successfully!" });
        setFormData({ fullName: "", email: "", phone: "", coverLetter: "" });
        setResume(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setMessage({ type: "error", text: result.error || "Something went wrong." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name *</label>
        <input
          type="text"
          name="fullName"
          required
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 focus:border-accent outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email *</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 focus:border-accent outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 focus:border-accent outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
        <textarea
          name="coverLetter"
          rows={4}
          value={formData.coverLetter}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 focus:border-accent outline-none transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Resume (PDF, DOC, DOCX) *</label>
        <input
          type="file"
          ref={fileInputRef}
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-[#b00226] transition"
        />
      </div>
      {message && (
        <div className={`p-3 rounded-xl text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.text}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent hover:bg-[#b00226] text-white font-bold py-3 rounded-xl shadow-md transition disabled:opacity-70"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
