import Link from "next/link";
import AdminLayout from "../page";

export default function CategoriesPage() {
    return (
      <AdminLayout>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Categories</h1>
            <Link
              href="/admin/categories/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create New Category
            </Link>
          </div>
  
          {/* Categories List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Sample category card */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">Relocately</h3>
                  <p className="text-sm text-gray-500">12 posts</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }
  