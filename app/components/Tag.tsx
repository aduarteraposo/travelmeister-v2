import { ReactNode } from "react";

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-black py-1 px-4 text-sm font-medium">
      {children}
    </li>
  );
}
