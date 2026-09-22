export default function TitleDivider({
  className = "mt-3 sm:mt-3.5",
}: {
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-2.5 ${className}`}>
      <span className="w-6 sm:w-8 h-[1.5px] bg-[#EBB4BC] rounded-full"></span>
      <svg
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#EA919E]"
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span className="w-6 sm:w-8 h-[1.5px] bg-[#EBB4BC] rounded-full"></span>
    </div>
  );
}
