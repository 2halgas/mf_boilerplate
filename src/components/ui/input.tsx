import * as React from "react";
import { cn } from "../../../src/lib/utils";
import { Eye, EyeOff, Search, X } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Button } from "./button";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasClean?: boolean;
  onClean?: () => void;
  errorMsg?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, hasClean, onClean, errorMsg, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [switchType, setSwitchType] = React.useState("password");

    const handleEyeClick = () => {
      if (switchType === "password") {
        setSwitchType("text");
        setShowPassword(!showPassword);
      } else if (switchType === "text") {
        setSwitchType("password");
        setShowPassword(!showPassword);
      }
    };

    return (
      <>
        {label && (
          <div className="flex items-center">
            <Label htmlFor={label}>{label}</Label>
          </div>
        )}

        <div
          className={cn(
            "flex w-full items-center gap-1 rounded-lg border border-border bg-white px-4 py-1.5 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:border-none focus-visible:ring-muted-foreground",
            type === "file" && "hidden",
            errorMsg && "border-error",
          )}
        >
          {type === "search" && (
            <span>
              <Search className="h-6 w-6" />
            </span>
          )}
          <input
            id={label || props.id}
            type={type === "password" ? switchType : type}
            className={cn(
              "flex w-full rounded-lg  bg-white text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none focus-visible:ring-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50",
              className,
              errorMsg && "border-error",
            )}
            ref={ref}
            {...props}
          />
          {(type === "password" || switchType === "text") && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleEyeClick}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          )}

          {hasClean && props.value && (
            <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={onClean}>
              <X className="h-6 w-6" />
            </Button>
          )}
        </div>
        {errorMsg && (
          <div className="flex items-center mt-1">
            <p className="text-error text-xs">{errorMsg}</p>
          </div>
        )}
      </>
    );
  },
);
Input.displayName = "Input";

export { Input };
