import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-content1 border-t border-divider py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            MediQueue
          </Link>
          <p className="mt-4 text-default-500 text-sm">
              Empowering patients and clinics with real-time, smart medical queue management.          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-default-500 text-sm">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
            <li><Link href="/signin" className="hover:text-primary transition-colors">Login</Link></li>
            <li><Link href="/signup" className="hover:text-primary transition-colors">Register</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Legal</h3>
          <ul className="space-y-2 text-default-500 text-sm">
            <li><Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
          <div className="flex gap-4">
            <Link href="#" className="text-default-500 hover:text-primary transition-colors text-xl"><FaFacebook /></Link>
            <Link href="#" className="text-default-500 hover:text-primary transition-colors text-xl"><FaTwitter /></Link>
            <Link href="#" className="text-default-500 hover:text-primary transition-colors text-xl"><FaInstagram /></Link>
            <Link href="#" className="text-default-500 hover:text-primary transition-colors text-xl"><FaLinkedin /></Link>
          </div>
          <p className="mt-4 text-default-500 text-sm">
            contact@mediqueue.com
<br />
            +1 (555) 123-4567
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-divider text-center text-default-500 text-sm">
        &copy; {new Date().getFullYear()} MediQueue. All rights reserved.
      </div>
    </footer>
  );
}
