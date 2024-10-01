import {
    useDashboardManager,
    Course,
    Account,
} from "@/components/admin/hooks/use-dashboard-manager";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CourseList from "@/components/admin/content-validation/course-list";
import AccountList from "@/components/admin/content-validation/account-list"; // Pastikan diimpor dengan benar
import ValidateDialog from "@/components/admin/validate-dialog";

export default function Dashboard() {
    const {
        currentAccountData,
        currentCourseData,
        accountPage,
        setAccountPage,
        totalAccountPages,
        coursePage,
        setCoursePage,
        totalCoursePages,
        handleAccept,
        handleDeny,
        isValidateDialogOpen,
        selectedItem,
        selectedType,
        handleValidateDialogOpen,
        handleValidateDialogClose,
    } = useDashboardManager();

    return (
        <div>
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">Accounts</TabsTrigger>
                    <TabsTrigger value="course">Courses</TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                    <h2>Account List</h2>
                    <AccountList
                        accounts={currentAccountData} // Harus berupa Account[]
                        itemsPerPage={4} // Sesuaikan dengan jumlah item per halaman
                        onAccept={(id) => handleAccept(id, "account")} // Menangani penerimaan
                        onDeny={(id) => handleDeny(id, "account")} // Menangani penolakan
                    />
                    <div className="pagination">
                        <Button
                            onClick={() => setAccountPage(accountPage - 1)}
                            disabled={accountPage === 1}
                        >
                            Previous
                        </Button>
                        <span>
                            {accountPage} / {totalAccountPages}
                        </span>
                        <Button
                            onClick={() => setAccountPage(accountPage + 1)}
                            disabled={accountPage === totalAccountPages}
                        >
                            Next
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="course">
                    <h2>Course List</h2>
                    <CourseList
                        courses={currentCourseData} // Harus berupa Course[]
                        itemsPerPage={3} // Sesuaikan dengan jumlah item per halaman
                        onValidate={(course) =>
                            handleValidateDialogOpen(course, "course")
                        } // Menangani validasi
                    />
                    <div className="pagination">
                        <Button
                            onClick={() => setCoursePage(coursePage - 1)}
                            disabled={coursePage === 1}
                        >
                            Previous
                        </Button>
                        <span>
                            {coursePage} / {totalCoursePages}
                        </span>
                        <Button
                            onClick={() => setCoursePage(coursePage + 1)}
                            disabled={coursePage === totalCoursePages}
                        >
                            Next
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>

            {isValidateDialogOpen && selectedItem && (
                <ValidateDialog
                    isOpen={isValidateDialogOpen}
                    onClose={handleValidateDialogClose}
                    onAccept={() => handleAccept(selectedItem.id, selectedType)} // Menggunakan selectedType
                    onDeny={() => handleDeny(selectedItem.id, selectedType)} // Menggunakan selectedType
                    name={
                        selectedType === "course"
                            ? (selectedItem as Account)?.name
                            : (selectedItem as Course)?.title
                    }
                    type={selectedType}
                />
            )}
        </div>
    );
}
