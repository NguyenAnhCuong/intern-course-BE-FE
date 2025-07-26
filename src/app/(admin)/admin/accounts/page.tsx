import ManageAccounts from "@/components/admin/manage.accounts";

const AccountPage = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  return <ManageAccounts rows={data} />;
};

export default AccountPage;
