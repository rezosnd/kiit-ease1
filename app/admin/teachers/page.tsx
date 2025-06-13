import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminTeachersList from "@/components/admin/admin-teachers-list"
import AddTeacherForm from "@/components/admin/add-teacher-form"

export const metadata = {
  title: "Teacher Management | KIITease Admin",
  description: "Manage teachers in the KIITease platform",
}

export default function TeachersManagementPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Teacher Management</h1>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="list">Teachers List</TabsTrigger>
          <TabsTrigger value="add">Add Teacher</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <AdminTeachersList />
        </TabsContent>

        <TabsContent value="add">
          <AddTeacherForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
