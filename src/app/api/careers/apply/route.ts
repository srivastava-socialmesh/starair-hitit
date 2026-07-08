import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const jobId = formData.get("jobId") as string;
    const careerId = formData.get("careerId") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resumeFile = formData.get("resume") as File;

    if (!jobId || !careerId || !fullName || !email || !resumeFile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upload resume using admin client
    const fileExt = resumeFile.name.split('.').pop();
    const fileName = `${jobId}_${Date.now()}.${fileExt}`;
    const fileBuffer = await resumeFile.arrayBuffer();

    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from("resumes")
      .upload(fileName, fileBuffer, {
        contentType: resumeFile.type,
        cacheControl: "3600",
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload resume" }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from("resumes")
      .getPublicUrl(fileName);

    const resumeUrl = urlData.publicUrl;

    // Insert application using admin client
    const { data: application, error: dbError } = await supabaseAdmin
      .from("applications")
      .insert([{
        career_id: parseInt(careerId),
        job_id: jobId,
        full_name: fullName,
        email,
        phone,
        cover_letter: coverLetter || null,
        resume_url: resumeUrl,
        status: 'pending',
      }])
      .select()
      .single();

    if (dbError) {
      console.error("DB error:", dbError);
      return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
    }

    // Send email notification (if Resend is configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const hrEmail = process.env.HR_EMAIL || "hr@starair.in";

      await resend.emails.send({
        from: "StarAir Careers <careers@starair.in>",
        to: hrEmail,
        subject: `New Job Application: ${jobId} - ${fullName}`,
        html: `
          <h2>New Application Received</h2>
          <p><strong>Job ID:</strong> ${jobId}</p>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Resume:</strong> <a href="${resumeUrl}">Download</a></p>
          <p><strong>Cover Letter:</strong> ${coverLetter || "N/A"}</p>
          <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/applications">View all applications</a></p>
        `,
      });
    } else {
      console.warn("Resend API key not configured. Email not sent.");
    }

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error("Application error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
