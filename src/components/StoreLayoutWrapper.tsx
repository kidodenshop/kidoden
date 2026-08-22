"use client";

import { usePathname } from "next/navigation";

interface StoreLayoutWrapperProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  cartDrawer: React.ReactNode;
  whatsappButton: React.ReactNode;
}

export default function StoreLayoutWrapper({
  children,
  header,
  footer,
  cartDrawer,
  whatsappButton,
}: StoreLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      {children}
      {footer}
      {cartDrawer}
      {whatsappButton}
    </>
  );
}
