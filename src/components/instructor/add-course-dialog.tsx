"use client";
import { FormEvent, useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export interface CourseDialog {
    id: number;
    title: string;
    description: string;
    difficulty?: string;
    syllabus?: string;
    image?: string;
}

export interface CourseDialogProps {
    isOpen: boolean;
    onClose: () => void;
    course: CourseDialog | null;
    onAddCourse: (course: Omit<CourseDialog, "id">) => void;
    onEditCourse: (editedCourse: CourseDialog) => void;
    onDeleteCourse: (courseId: number) => void;
}

type AddCourseDialogProps = Pick<
    CourseDialogProps,
    "isOpen" | "onClose" | "course" | "onAddCourse"
>;

export default function AddCourseDialog({
    isOpen,
    onClose,
    course,
    onAddCourse,
}: AddCourseDialogProps) {
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("beginner");
    const [syllabus, setSyllabus] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (course) {
            setTitle(course.title);
            setDifficulty(course.difficulty || "beginner");
            setSyllabus(course.syllabus || "");
            setDescription(course.description);
            setImage(course.image || "");
        } else {
            resetForm();
        }
    }, [course]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCourse: Omit<CourseDialog, "id"> = {
            title,
            difficulty,
            syllabus,
            description,
            image: image || "/path-to-default-image.jpg",
        };
        onAddCourse(newCourse);
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setTitle("");
        setDifficulty("beginner");
        setSyllabus("");
        setDescription("");
        setImage("");
    };

    const [fileName, setFileName] = useState("No file selected");
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("No file selected");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {course ? "Edit Course" : "Add New Course"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Course Name</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label>Difficulty levels</Label>
                        <RadioGroup
                            value={difficulty}
                            onValueChange={setDifficulty}
                        >
                            <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="Beginner"
                                        id="Beginner"
                                    />
                                    <Label htmlFor="Beginner">Beginner</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="Intermediate"
                                        id="Intermediate"
                                    />
                                    <Label htmlFor="Intermediate">
                                        Intermediate
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="Advanced"
                                        id="Advanced"
                                    />
                                    <Label htmlFor="Advanced">Advanced</Label>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <Label htmlFor="syllabus">Syllabus</Label>
                        <Input
                            id="syllabus"
                            value={syllabus}
                            onChange={(e) => setSyllabus(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="image">Add Image</Label>
                        <div className="flex border border-gray-300 rounded-md overflow-hidden">
                            <input
                                type="text"
                                readOnly
                                value={fileName}
                                className="w-full px-3 py-2 placeholder-gray-400 bg-gray-100 text-gray-400 focus-visible:outline-none"
                                placeholder="No file selected"
                            />
                            <Label
                                htmlFor="image"
                                className="px-3 bg-white text-sm border-l border-gray-300 text-black cursor-pointer whitespace-nowrap flex justify-center items-center"
                            >
                                Upload Image
                            </Label>
                            <Input
                                id="image"
                                type="file"
                                className="hidden"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        {course ? "Update Course" : "Add Course"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
