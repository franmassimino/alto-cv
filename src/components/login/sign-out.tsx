"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { handleSignOut } from "@/lib/auth/sign-out";

export default function SignOut() {
    const [isPending, startTransition] = useTransition();

    return (
        <form
            action={() => startTransition(handleSignOut)}
            className="flex items-center justify-center"
        >
            <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : "Cerrar sesión"}
            </Button>
        </form>
    );
}
