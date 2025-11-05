"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/lib/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";

export default function Footer() {
  const theme = useSelector((state: RootState) => state.persisted.ui.theme);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-column">
            <div className="flex items-center justify-left">
              <Image
                src={theme == "light" ? IMAGES.LOGO.BLACK : IMAGES.LOGO.WHITE}
                alt="logo"
                className="w-12 h-12"
                width={30}
                height={30}
              />
              <h1 className="text-lg font-bold text-center">simesta</h1>
            </div>
            <p>
              Create AI-generated courses with beautiful illustrations in
              minutes. Our platform uses advanced AI to transform your content
              into engaging learning experiences.
            </p>
            <div className="footer-social mt-4">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Github">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Product</h4>
            <Link href="/features" className="footer-link">
              Features
            </Link>
            <Link href="/pricing" className="footer-link">
              Pricing
            </Link>
            <Link href="/blog" className="footer-link">
              Blog
            </Link>
            <Link href="/roadmap" className="footer-link">
              Roadmap
            </Link>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Company</h4>
            <Link href="/about" className="footer-link">
              About Us
            </Link>
            <Link href="/careers" className="footer-link">
              Careers
            </Link>
            <Link href="/contact" className="footer-link">
              Contact
            </Link>
            <Link href="/press" className="footer-link">
              Press Kit
            </Link>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Support</h4>
            <Link href="/help" className="footer-link">
              Help Center
            </Link>
            <Link href="/community" className="footer-link">
              Community
            </Link>
            <Link href="/status" className="footer-link">
              Status Page
            </Link>
            <div className="flex items-center gap-2 mt-4">
              <Mail size={16} className="text-text-secondary" />
              <a href="mailto:support@simesta.ai" className="footer-link">
                support@simesta.ai
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Simesta AI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="footer-link text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-link text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="footer-link text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
