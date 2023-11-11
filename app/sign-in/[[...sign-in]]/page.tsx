import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="container relative h-screen bg-white flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-green-600" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Greener Choice
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo; This goofy aah app is the best thing since sliced bread,
              it is the top of the line, the cream of the crop, the best of the
              best, the best thing since sliced bread. &rdquo;
            </p>
            <footer className="text-sm">Rosa Parks</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <SignIn
            appearance={{
              elements: { formButtonPrimary: "bg-green-600 hover:bg-green-500", footerActionLink: "text-green-600 hover-green-700"},
            }}
          />
        </div>
      </div>
    </main>
  );
}
