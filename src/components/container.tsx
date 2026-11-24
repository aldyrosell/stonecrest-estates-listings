import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-5 min-[600px]:px-8 min-[900px]:px-14",
        className,
      )}
    >
      {children}
    </div>
  );
}
