import Link from 'next/link';

export default function Header() {
  return (
    <nav
      role="navigation"
      className="block w-full mx-auto bg-white shadow-md md:px-6 lg:px-4"
    >
      <div className="container flex items-center justify-between mx-auto bg-white border-b border-gray-200 md:items-stretch">
        <div className="flex flex-col items-center flex-1 h-full md:flex-row">
          <Link href="/">
            <div className="flex items-center py-6 pl-4 pr-8 space-x-3 lg:pl-7 sm:pl-6">
              <h1 className="text-2xl font-normal leading-6 text-gray-800">
                NoRamp Solana Demo
              </h1>
            </div>
          </Link>
          <ul className="flex flex-wrap items-center justify-center w-full h-full gap-2 md:pr-12 md:w-auto">
            <li className="p-1">
              <Link
                href="/"
                className="flex items-center h-full text-sm font-medium tracking-normal text-gray-800 border-b-2 border-transparent border-white cursor-pointer focus:outline-none hover:text-purple-700"
              >
                Transfer SOL
              </Link>
            </li>
            <li className="p-1">
              <Link
                href="/mint-spl-token"
                className="flex items-center h-full text-sm font-medium tracking-normal text-gray-800 border-b-2 border-transparent cursor-pointer focus:outline-none hover:text-purple-700"
              >
                Mint SPL-Token
              </Link>
            </li>

            <li className="p-1">
              <Link
                href="/transfer-spl-token"
                className="flex items-center h-full text-sm font-medium tracking-normal text-gray-800 border-b-2 border-transparent cursor-pointer focus:outline-none hover:text-purple-700"
              >
                Transfer SPL-Token
              </Link>
            </li>

            <li className="p-1">
              <Link
                href="/compressed/mint"
                className="flex items-center h-full text-sm font-medium tracking-normal text-gray-800 border-b-2 border-transparent cursor-pointer focus:outline-none hover:text-purple-700"
              >
                Mint Compressed
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
