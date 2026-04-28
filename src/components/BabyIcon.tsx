export default function BabyIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`inline-block ${className}`} 
      viewBox="0 0 24 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Heart */}
      <path d="M12 2C10.5 0 8 0 7 1.5C6 3 7 5 12 8C17 5 18 3 17 1.5C16 0 13.5 0 12 2Z" fill="#f0959f"/>
      {/* Face */}
      <circle cx="12" cy="15" r="6" fill="#fdece0"/>
      {/* Eyes */}
      <circle cx="10" cy="14" r="1" fill="#4a3b32"/>
      <circle cx="14" cy="14" r="1" fill="#4a3b32"/>
      {/* Smile */}
      <path d="M10.5 16.5C11 17 13 17 13.5 16.5" stroke="#4a3b32" strokeWidth="1" strokeLinecap="round"/>
      {/* Little hair */}
      <path d="M12 9C11 10 11 11 12 11.5" stroke="#4a3b32" strokeWidth="1" strokeLinecap="round"/>
      {/* Details (cheeks) */}
      <circle cx="9" cy="15.5" r="1" fill="#f0959f" opacity="0.5"/>
      <circle cx="15" cy="15.5" r="1" fill="#f0959f" opacity="0.5"/>
      {/* Swaddle */}
      <path d="M12 29C17 29 17 22 17 20C17 18.5 12 19 12 19C12 19 7 18.5 7 20C7 22 7 29 12 29Z" fill="#8bcbc8"/>
    </svg>
  );
}
