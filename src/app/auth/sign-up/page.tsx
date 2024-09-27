import SignUpForm from "@/components/auth/signup-form";

export default async function SignUp() {
    return (
        <div className="flex-grow flex items-center justify-center px-4 py-12">
            <SignUpForm />
        </div>
    );
}
