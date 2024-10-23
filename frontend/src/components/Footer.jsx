import React from "react";

const Footer = () => {
    return (
        <footer className="bg-base-100 border border-black text-neutral py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-around mb-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
                            <li><a href="/privacy" className="hover:text-gray-400">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-gray-400">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <ul className="space-y-2">
                            <li><a href="https://facebook.com" className="hover:text-gray-400">Facebook</a></li>
                            <li><a href="https://twitter.com" className="hover:text-gray-400">Twitter</a></li>
                            <li><a href="https://instagram.com" className="hover:text-gray-400">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-4 text-center">
                    <p className="text-sm text-white">
                        &copy; {new Date().getFullYear()} TravelMate. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
