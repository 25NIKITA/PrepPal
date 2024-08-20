import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-gray-800 overflow-hidden">
      {/* Hero Section with Background Image */}
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-200">
        <div className="absolute inset-0 z-0">
          <Image
            src="/preppal-logo.png" // Replace with a stunning hero image
            alt="PrepPal Logo"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="opacity-50"
          />
        </div>
        <div className="relative z-10 text-center p-8">
          <h1 className="text-6xl font-extrabold text-green-800 mb-6">
            Welcome to PrepPal
          </h1>
          <p className="text-2xl text-green-700 mb-8 max-w-2xl mx-auto">
            The ultimate platform to find your perfect study partner and excel in your exams.
          </p>
          <div className="space-x-4">
            <a
              href="#signup"
              className="px-8 py-4 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-8 py-4 text-green-800 border border-green-600 rounded-lg shadow-lg hover:bg-green-50 transition transform hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-12">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-lg">
            <Image src="/feature1.png" alt="Seamless Video Calling" width={100} height={100} />
            <h3 className="text-2xl font-semibold mt-6 text-green-700">Seamless Video Calling</h3>
            <p className="text-lg text-gray-600 mt-4">
              Connect face-to-face with your study partners instantly for interactive learning.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-lg">
            <Image src="/feature2.png" alt="Smart Matching" width={100} height={100} />
            <h3 className="text-2xl font-semibold mt-6 text-green-700">Smart Matching</h3>
            <p className="text-lg text-gray-600 mt-4">
              Our algorithm connects you with like-minded individuals for a personalized study experience.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-lg">
            <Image src="/feature3.png" alt="Instant Chat & Connect" width={100} height={100} />
            <h3 className="text-2xl font-semibold mt-6 text-green-700">Instant Chat & Connect</h3>
            <p className="text-lg text-gray-600 mt-4">
              Chat with study partners anytime, anywhere, and stay connected on the go.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-green-100">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-12">What Our Users Say</h2>
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-xl text-green-800 italic mb-8">
            "PrepPal completely transformed the way I study. I found the perfect study partner, and our video sessions are super effective!"
          </blockquote>
          <p className="text-lg text-gray-600">- Jane Doe, Medical Student</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="signup" className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-6">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Sign up now and start your journey with PrepPal today!
        </p>
        <a
          href="/signup"
          className="px-8 py-4 bg-green-600 text-white rounded-lg shadow-lg font-semibold hover:bg-green-700 transition transform hover:scale-105"
        >
          Sign Up Now
        </a>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-green-200">
        <p className="text-gray-700">&copy; 2024 PrepPal. All rights reserved.</p>
      </footer>
    </main>
  );
}
