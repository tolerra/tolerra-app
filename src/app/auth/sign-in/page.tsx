import SignInForm from "@/components/auth/signin-form";

export default async function SignIn() {
    return (
        <div className="flex-grow flex items-center justify-center px-4 py-12">
            <SignInForm />
        </div>
    );
}
