import { cn } from "@/lib/utils";
import {
  IconDownload,
  IconMaximize,
  IconPencilPlus,
} from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

function ExampleWrapper({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="example-wrapper"
      className={cn(
        "mx-auto flex flex-1 w-full overflow-hidden min-w-0 content-center items-start gap-8 px-4 sm:gap-12 sm:px-6 md:grid-cols-2 md:gap-8 lg:px-12 lg:pb-12",

        className,
      )}
      {...props}
    />
  );
}

function Example({
  title,
  children,
  className,
  containerClassName,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  containerClassName?: string;
}) {
  return (
    <div
      data-slot="example"
      className={cn(
        "mx-auto flex w-full flex-1 min-w-0 flex-col gap-1 self-stretch",
        containerClassName,
      )}
      {...props}
    >
      <div className="text-muted-foreground flex items-center gap-2 px-1.5 py-2 text-xs font-medium">
        {title}

        <div className="flex gap-1.5 w-fit rounded-2xl">
          <Separator orientation="vertical" />
          <Button variant="ghost">
            <IconPencilPlus className="size-4" />
            Create request
          </Button>
          <Button variant="ghost">
            <IconDownload className="size-4" />
            Download request
          </Button>
          <Separator orientation="vertical" />
          <Button variant="ghost">
            <IconMaximize className="size-4" />
            Maximize
          </Button>
        </div>
      </div>
      <div
        data-slot="example-content"
        className={cn(
          "bg-background text-foreground flex min-w-0 flex-1 overflow-hidden flex-col items-start gap-6 border border-dashed p-4 sm:p-6 *:[div:not([class*='w-'])]:w-full",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export { ExampleWrapper, Example };
