import type { ReactNode } from "react";

interface ContentWrapperProps {
    children: ReactNode;
    className?: string;
}

export default function ContentWrapper({ children, className = "" }: ContentWrapperProps) {
    return (
        <div className={`p-6 w-full max-w-full bg-white border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden ${className} dark:bg-gray-800 dark:border-gray-700`}>
            {children}
        </div>
    );
}