import * as React from "react";
import { cn } from "../../utils/classNames";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  optional?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, optional, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
        {...props}
      >
        {children}
        {optional && (
          <span className="ml-1 text-gray-400 text-xs">(optional)</span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Label };
