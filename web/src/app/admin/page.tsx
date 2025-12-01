import AdminHeader from "./components/AdminHeader";
import OrdersTable from "./components/OrdersTable";
import UsersList from "./components/UsersList";


export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <AdminHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UsersList />
        <OrdersTable />
      </div>
    </div>
  );
}
