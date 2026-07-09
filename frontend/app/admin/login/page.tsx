"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para a página de login unificada
    router.push("/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecionando para login...</p>
    </div>
  );
}
