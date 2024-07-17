"use client"
import { trpc } from '@/server/client';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { useClerk } from '@clerk/nextjs';

interface User {
  id: string;
  email: string;
  role: string;
}

const AdminPanel = () => {
  const { user } = useClerk();
  const userId = user?.id;
  const [users, setUsers] = useState<User[]>([]);
  const { mutate: updateUserRoleApi } = trpc.user.updateUserRole.useMutation();
  const {mutateAsync: getUser} = trpc.user.getUser.useMutation();
  const { data: usersFromServer, isLoading } = trpc.user.getAllUsers.useQuery();

  useEffect(() => {
    const fetchData = async () => {
      if (usersFromServer) {
        const user = await getUser({ id: userId });
        if (user && user.role === 'admin') {
          setUsers(usersFromServer);
        }
      }
    };
    fetchData();
  }, [usersFromServer]);

  const updateUserRole = async (id: string, role: string) => {
    updateUserRoleApi({ id, role });
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === id ? { ...user, role } : user
    ));
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mx-auto p-4">
      <Label>Admin Panel</Label>
      <Table>
        <TableCaption>A list of all users and their roles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users && users.map(user => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Select value={user.role} onValueChange={(value) => updateUserRole(user.id, value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total Users: {users ? users.length : 0}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default AdminPanel;