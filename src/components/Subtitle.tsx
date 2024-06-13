function Subtitle({ text }: { text: string }) {
  return (
    <div>
      <h2 className="pt-4 pb-1 text-2xl text-center font-semibold md:pt-8 lg:text-3xl lg:pt-10 xl:text-4xl xl:pt-[50px]">
        {text}
      </h2>
      <div className="flex justify-center items-center pb-[54px]">
        <hr className="border-[#09B0B3] border-2 rounded-full w-[85px]" />
        <div className="bg-[#09B0B3] w-2.5 h-2.5 rotate-45" />
        <hr className="border-[#09B0B3] border-2 rounded-full w-[85px]" />
      </div>
    </div>
  );
}

export default Subtitle;
