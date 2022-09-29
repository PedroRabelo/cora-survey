import Image from "next/image";

export default function FormHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Image
                className="h-8 w-auto sm:h-10"
                src="/assets/img/logo-cora.svg"
                width={220}
                height={50}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
