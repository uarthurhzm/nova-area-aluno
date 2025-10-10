import clsx from "clsx";

type ColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ColumnProps {
    size?: ColumnSize;
}


export default function Column({
    children,
    className = "",
    size,
}: ColumnProps & { children: React.ReactNode; className?: string }) {
    const sizeClass = size ? `md:w-${size}/12` : "";

    return (
        <div className={clsx("w-full", sizeClass, className)}>
            {children}
        </div>
    );
}
