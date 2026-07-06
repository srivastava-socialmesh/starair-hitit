import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CharterPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-2">Let the Beginning Be Special.</h1>
        <p className="text-center text-rose-400 text-lg font-semibold mb-8">Our Charters Are at Your Service.</p>

        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">Tell Us Your Requirements</h2>
          <p className="text-slate-300 mb-6">
            Be it for business or for leisure, StarAir’s charter service can accommodate flights for as few as 5 and as many as 212 passengers. Enjoy the safety, security and flexibility of a chartered flight today. Fill the form below to let us know your requirements and we will take it from there.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Passenger Charter</label>
                <input type="text" placeholder="Origin" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">&nbsp;</label>
                <input type="text" placeholder="Destination" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Date</label>
                <input type="date" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white [color-scheme:dark] focus:border-rose-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Return Date</label>
                <input type="date" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white [color-scheme:dark] focus:border-rose-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">No. of Passengers</label>
                <input type="number" min="1" placeholder="1" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
                <input type="email" placeholder="Email ID" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
                <input type="tel" placeholder="Mobile No." className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
                <input type="text" placeholder="City" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold mb-4">For Travel Agents Only</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Travel Agent Name" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
                <input type="text" placeholder="Location" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Additional Remarks (If Any)</label>
              <textarea rows={4} className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" placeholder="Type your remarks here..."></textarea>
            </div>

            <button type="submit" className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-xl shadow-2xl shadow-rose-500/30 transition">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
