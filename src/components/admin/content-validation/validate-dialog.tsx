import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface ValidateDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: (id: number, type: "account" | "course") => void;
    onDeny: (id: number, type: "account" | "course") => void;
    name: string | null;
    type: "account" | "course";
}

export default function ValidateDialog({
    isOpen,
    onClose,
    onAccept,
    onDeny,
    name,
    type,
}: ValidateDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="flex justify-center items-center">
                    <Image
                        src="/assets/admin/header-valid.svg"
                        alt="Logo"
                        width={137}
                        height={166}
                    />
                </DialogHeader>
                <p className="text-center">
                    Are you sure you want to validate the{" "}
                    {type === "account" ? "account" : "course"} &quot;{name}
                    &quot; ?
                </p>
                <DialogFooter className="sm:justify-center">
                    <div className="flex justify-center space-x-2 w-full">
                        <Button
                            variant="destructive"
                            onClick={() => onDeny(Number(name), type)}
                        >
                            Reject
                        </Button>
                        <Button onClick={() => onAccept(Number(name), type)}>
                            Accept
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
