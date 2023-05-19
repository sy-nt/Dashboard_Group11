import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useRequireAuth(redirectUrl = "/login") {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      // do nothing while loading
      return;
    } else if (status === "authenticated") router.replace("/dashboard");
    if (!session) {
      router.replace(redirectUrl);
    }
  }, [session, status, router, redirectUrl]);

  return session;
}
