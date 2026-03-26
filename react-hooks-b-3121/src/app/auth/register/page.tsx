'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthFromWrapper from "@/app/components/AuthFormWrapper";
import SocialAuth from "@/app/components/SocialAuth";
import { toast } from "react-toastify";

const DEFAULT_CAPTCHA = "XYZ78";

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [captchaInput, setCaptchaInput] = useState("");

  const onSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Konfirmasi password tidak cocok");
      return;
    }
    if (captchaInput !== DEFAULT_CAPTCHA) {
      toast.error("Captcha salah");
      return;
    }
    toast.success("Register Berhasil", { theme: "dark" });
    router.push("/auth/login");
  };

  return (
    <AuthFromWrapper title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input {...register("username", { required: "Username wajib diisi" })} className="w-full p-2.5 rounded-lg border border-gray-300" placeholder="Username" />
          {errors.username && <p className="text-red-500 text-xs">{errors.username.message as string}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input type="email" {...register("email", { required: "Email wajib diisi" })} className="w-full p-2.5 rounded-lg border border-gray-300" placeholder="Email" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message as string}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input type="tel" {...register("nomortelp", { required: "Nomor wajib diisi" })} className="w-full p-2.5 rounded-lg border border-gray-300" placeholder="Nomor Telepon" />
          {errors.nomortelp && <p className="text-red-500 text-xs">{errors.nomortelp.message as string}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input type="password" {...register("password", { required: "Wajib" })} className="w-full p-2.5 rounded-lg border border-gray-300" placeholder="Password" />
          </div>
          <div>
            <input type="password" {...register("confirmPassword", { required: "Wajib" })} className="w-full p-2.5 rounded-lg border border-gray-300" placeholder="Ulangi Password" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">Captcha: </span>
            <span className="font-mono font-bold bg-gray-100 px-3 py-1.5 rounded">{DEFAULT_CAPTCHA}</span>
          </div>
          <input type="text" onChange={(e) => setCaptchaInput(e.target.value)} className="w-full p-2.5 rounded-lg border border-gray-300" placeholder="Masukkan Captcha" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700">Register</button>
        <SocialAuth />
        <p className="text-center text-sm text-gray-600">
          Sudah punya akun? <Link href="/auth/login" className="text-blue-600 font-semibold">Login</Link>
        </p>
      </form>
    </AuthFromWrapper>
  );
}