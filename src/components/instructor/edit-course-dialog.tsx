"use client";
import React, { useState, useEffect, FormEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    CourseDialogProps,
    CourseDialog,
} from "@/app/instructor/dashboard/course/[id]/page";

type EditCourseDialogProps = Pick<
    CourseDialogProps,
    "isOpen" | "onClose" | "course" | "onEditCourse"
>;

export default function EditCourseDialog({
    isOpen,
    onClose,
    course,
    onEditCourse,
}: EditCourseDialogProps) {
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
        }
    }, [course]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (course) {
            const editedCourse: CourseDialog = {
                ...course,
                title,
                difficulty,
                syllabus,
                description,
                image,
            };
            onEditCourse(editedCourse);
            onClose();
        }
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
                    <DialogTitle>Edit Course: {course?.title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="courseName">Course Name</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Difficulty Levels</Label>
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
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setSyllabus(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                            ) => setDescription(e.target.value)}
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
                        Update Course
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
