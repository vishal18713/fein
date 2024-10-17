'use client'


export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#18181a] overflow-y-hidden text-white">
      <div className="w-full h-1/2 flex flex-col px-20 mt-8">
        <h1 className="text-2xl font-semibold">Featured</h1>
        <div className="w-full mt-8 px-4">
          <div className="w-80 h-72 rounded-lg bg-[#27282d]"></div>
        </div>
      </div>
      <div className="w-full h-1/2 flex flex-col px-20 mt-8">
        <h1 className="text-2xl font-semibold">Trending</h1>
        <div className="w-full flex items-center mt-6 gap-6 text-lg">
          <p className="border-[#5b5bd5] border-b-4">Collections</p>
          <p className="pb-2">Mints</p>
        </div>
      </div>
    </div>
  );
}
