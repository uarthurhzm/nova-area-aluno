import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { useState } from "react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    placeholder?: string;
}

export default function PasswordInput({ label, placeholder, ...props }: PasswordInputProps) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <Label>{label}</Label>
            <div className="flex">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="rounded-r-none"
                    minLength={5}
                    maxLength={10}
                    {...props}
                />
                <Button
                    type="button"
                    className="rounded-l-none"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                </Button>
            </div>
        </div>
    )
}