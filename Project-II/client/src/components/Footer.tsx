import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="">One Life, One Future EduCenter</h3>
                    <p className="">
                        Empowering students to master foreign languages through innovative Online and Offline learning methods.
                    </p>
                </div>
                <div>
                    <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
                    <p className="text-sm mb-2">Hotline: 1900-1555</p>
                    <p className="text-sm mb-2">Email: admin@educenter.com</p>
                    <p className="text-sm">Address: 1 Dai Co Viet, Hanoi City</p>
                </div>
                <div>
                    <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
                    <ul className="text-sm space-y-2">
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-center text-xs">
                © 2025 One Life, One Future EduCenter. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;