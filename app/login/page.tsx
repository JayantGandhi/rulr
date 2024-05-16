
  import { getProviders } from "next-auth/react"
  import { getServerAuthSession } from "@/lib/auth"
  import { redirect } from "next/navigation"
  import ProviderButtons from "./ProviderButtons"
  
export default async function SignIn() {
    const providers = await getProviders()
    const session = await getServerAuthSession();

    if (session) {
        redirect("/")
    }

    return (
        <div className="max-w-[400px] mx-auto mt-12">

            <ProviderButtons providers={providers} />
        </div>
    )
}
  