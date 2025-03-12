import Image from "next/image";
import SignOut from "@/components/login/sign-out"

export default function Profile({ session }: any) {
  return (
    <div className="w-full p-8 max-w-[1600px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Perfil</h1>

      <div className="space-y-6">
        {/* Imagen del usuario */}
        <div className="flex flex-col items-center md:items-start">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="Foto de perfil"
              width={80}
              height={80}
              className="rounded-full border"
            />
          )}
        </div>

        {/* Información Personal */}
        <div className="max-w-lg">
          <h2 className="text-xl font-medium mb-4">Información Personal</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nombre</label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
                value={session?.user?.name || ""}
                disabled
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
                value={session?.user?.email || ""}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Botón de cerrar sesión */}
        <div className="flex justify-start">
          <SignOut />
        </div>
      </div>
    </div>
  );
}
