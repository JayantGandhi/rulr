"use client";
import { signIn } from "next-auth/react"
import { LinkedInLoginButton } from "react-social-login-buttons";


export default function ProviderButtons({ providers }: { providers: any }) {
        console.log({providers})

        return (
                <>
            {Object.values(providers).map((provider: any) => {
                switch (provider.name) {
                    case "LinkedIn":
                        return (
                            <div key={provider.name}>
                                <LinkedInLoginButton onClick={() => signIn(provider.id, {callbackUrl: "/profile"})} />
                            </div>
                        )
                    case "Auth0":
                        return (
                            <div key={provider.name}>
                                <button  onClick={() => signIn(provider.id, {callbackUrl: "/profile"})}>
                                    Log in with Email or Google
                                </button>
                            </div>
                        )
                    default:
                        return (<div key={provider.name}>
                            <button onClick={() => signIn(provider.id, {callbackUrl: "/dashboard"})}>
                                Log in with {provider.name}
                            </button>
                        </div>)
                }
                })} 
        </>
        )
}