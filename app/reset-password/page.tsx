import { ResetPasswordForm } from "@/components/forms/reset-pasword-form";
import { Suspense } from "react";

// Force dynamic rendering to avoid static generation issues with useSearchParams
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
