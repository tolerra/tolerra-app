"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AccountValidation from "@/components/admin/content-validation/account-list";
import CourseValidation from "@/components/admin/content-validation/course-list";

export default function DashboardTabs() {
    const [activeTab, setActiveTab] = useState("account");

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex justify-center space-x-4 mb-6 flex-wrap">
                    <TabsList className="flex justify-center space-x-2">
                        <TabsTrigger
                            value="account"
                            className={`text-base md:text-xl font-semibold whitespace-nowrap ${
                                activeTab === "account"
                                    ? "text-black border-b-2 border-black"
                                    : "text-gray-400"
                            }`}
                        >
                            Account Validation
                        </TabsTrigger>
                        <TabsTrigger
                            value="course"
                            className={`text-base md:text-xl font-semibold whitespace-nowrap ${
                                activeTab === "course"
                                    ? "text-black border-b-2 border-black"
                                    : "text-gray-400"
                            }`}
                        >
                            Course Validation
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="mt-6">
                    <TabsContent value="account">
                        <AccountValidation />
                    </TabsContent>

                    <TabsContent value="course">
                        <CourseValidation />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
