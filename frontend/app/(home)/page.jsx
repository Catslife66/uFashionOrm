import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white items-center mx-auto max-w-screen-xl">
      <section>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
              Up to 20%
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              From checkout to global sales tax compliance, companies around the
              world use Flowbite to simplify their payment stack.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Shop Now
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=2283&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="fashion"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold mb-8">Shop by Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/products/search?query=dresses"
              className="bg-white p-4 rounded-lg shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=2283&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Casual Wear"
                className="rounded-lg"
              />
              <h3 className="text-xl font-bold mt-4">Dresses</h3>
            </Link>
            <Link
              href="/products/search?query=tops"
              className="bg-white p-4 rounded-lg shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=2283&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Western Wear"
                className="rounded-lg"
              />
              <h3 className="text-xl font-bold mt-4">Tops</h3>
            </Link>
            <Link
              href="/products/search?query=shoes"
              className="bg-white p-4 rounded-lg shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=2283&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Ethnic Wear"
                className="rounded-lg"
              />
              <h3 className="text-xl font-bold mt-4">Shoes</h3>
            </Link>
            <Link
              href="/products/search?query=jackets"
              className="bg-white p-4 rounded-lg shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=2283&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Kids Wear"
                className="rounded-lg"
              />
              <h3 className="text-xl font-bold mt-4">Jackets</h3>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
