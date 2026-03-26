'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthFromWrapper from "@/app/components/AuthFormWrapper";
import SocialAuth from "@/app/components/SocialAuth";
import Link from "next/link";
import { toast } from "react-toastify";

// Definisi interface untuk tipe data form dan error
interface LoginFormData {
  email: string;
  password: string;
  captchaInput: string;
  rememberMe: boolean;
}

interface ErrorObject {
  email?: string;
  password?: string;
  captcha?: string;
}

const DEFAULT_CAPTCHA = "ABC12";

export default function LoginPage() {
  const router = useRouter();
  
  // State untuk menyimpan data input
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    captchaInput: "",
    rememberMe: false
  });

  // State untuk menyimpan pesan error
  const [errors, setErrors] = useState<ErrorObject>({});

  // Fungsi untuk menangani perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Hapus error saat user mulai mengetik lagi
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // Fungsi saat form dikirim (submit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: ErrorObject = {};

    // Validasi manual sesuai modul
    if (!formData.email.trim()) newErrors.email = "Email tidak boleh kosong";
    if (!formData.password.trim()) newErrors.password = "Password tidak boleh kosong";
    
    if (!formData.captchaInput.trim()) {
      newErrors.captcha = "Captcha belum diisi";
    } else if (formData.captchaInput !== DEFAULT_CAPTCHA) {
      newErrors.captcha = "Captcha salah";
    }

    // Jika ada error, tampilkan toast error
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Login Gagal", { theme: "dark", position: "top-right" });
    } else {
      // Jika berhasil, tampilkan sukses dan pindah halaman
      toast.success("Login Berhasil", { theme: "dark", position: "top-right" });
      router.push("/home");
    }
  };

  return (
    <AuthFromWrapper title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Input Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"}`}
            placeholder="Masukkan email"
          />
          {errors.email && <p className="text-red-600 text-xs italic mt-1">{errors.email}</p>}
        </div>

        {/* Input Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"}`}
            placeholder="Masukkan password"
          />
          {errors.password && <p className="text-red-600 text-xs italic mt-1">{errors.password}</p>}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
              className="mr-2 h-4 w-4 rounded border-gray-300"
            />
            Ingat Saya
          </label>
          <Link href="/auth/forgot-password" title="Coming Soon" className="text-blue-600 hover:text-blue-800 font-semibold">
            Forgot Password?
          </Link>
        </div>

        {/* Captcha Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">Captcha:</span>
            <span className="font-mono text-lg font-bold bg-gray-100 px-3 py-1.5 rounded text-gray-900">
              {DEFAULT_CAPTCHA}
            </span>
          </div>
          <input
            name="captchaInput"
            type="text"
            value={formData.captchaInput}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.captcha ? "border-red-500" : "border-gray-300"}`}
            placeholder="Masukkan captcha"
          />
          {errors.captcha && <p className="text-red-600 text-xs italic mt-1">{errors.captcha}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
        >
          Sign In
        </button>

        {/* Social Login Component */}
        <SocialAuth />

        <p className="mt-6 text-center text-sm text-gray-600">
          Tidak punya akun?
          <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 font-semibold ml-1">
            Daftar
          </Link>
        </p>
      </form>
    </AuthFromWrapper>
  );
}