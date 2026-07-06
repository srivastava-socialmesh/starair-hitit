import Link from "next/link";

export default function Loyalty() {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              <span className="text-rose-500">StarAir</span> Loyalty Program
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join StarAir’s frequent flyer program and unlock a world of rewards,
              added comforts and exclusive privileges.
            </p>
            <Link
              href="/loyalty"
              className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-rose-500/30 transition"
            >
              Know More
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="bg-white/80 border border-gray-200 rounded-2xl p-4 text-center shadow-sm">
                <div className="text-3xl mb-2">✈️</div>
                <h4 className="font-bold text-gray-800">Free Flight Vouchers</h4>
              </div>
              <div className="bg-white/80 border border-gray-200 rounded-2xl p-4 text-center shadow-sm">
                <div className="text-3xl mb-2">⭐</div>
                <h4 className="font-bold text-gray-800">Earn Star Points</h4>
              </div>
              <div className="bg-white/80 border border-gray-200 rounded-2xl p-4 text-center shadow-sm">
                <div className="text-3xl mb-2">🎁</div>
                <h4 className="font-bold text-gray-800">Complimentary Upgrades</h4>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-lg text-center">
            <div className="text-6xl">🏅</div>
            <h3 className="text-2xl font-bold text-gray-900">Join StarAir</h3>
            <p className="text-gray-500 text-sm">Start earning rewards today.</p>
            <Link
              href="/loyalty"
              className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3 px-6 rounded-xl transition shadow-lg shadow-rose-500/30"
            >
              Join Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
