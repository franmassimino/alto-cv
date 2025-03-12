import React from 'react'
import SignIn from './sign-in'

const Login = () => {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Inicia sesión en tu cuenta</h1>
                        <p className="text-sm text-muted-foreground">Usa Google para continuar</p>
                    </div>
                    <SignIn />
                </div>
            </div>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <div className="flex items-center font-bold text-xl">
                        <span className="text-primary">ALTO</span>
                        <span>CV</span>
                    </div>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            <b>El 98% de las empresas usan sistemas ATS para filtrar CVs.</b> <br /> Asegúrate de que el tuyo esté optimizado con nuestra herramienta.
                        </p>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default Login
