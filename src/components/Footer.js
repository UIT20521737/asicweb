import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About ASIC LAB</h3>
            <p className="text-sm">
              ASIC LAB is dedicated to research and innovation in chip design,
              digital systems, and hardware acceleration for AI and IoT.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/activities" className="hover:text-white">Activities</Link></li>
              <li><Link href="/team" className="hover:text-white">Team</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <p className="text-sm">📍 123 Innovation Street, Ho Chi Minh City, Vietnam</p>
            <p className="text-sm">📧 contact@asiclab.org</p>
            <p className="text-sm">📞 +84 123 456 789</p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ASIC LAB. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;