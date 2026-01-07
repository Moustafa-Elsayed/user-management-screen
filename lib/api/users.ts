import {
  ApiResponse,
  User,
  UpdateUserPayload,
  DeleteUsersPayload,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export const usersApi = {
  async getUsers(): Promise<ApiResponse<User[]>> {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  },

  async updateUser(payload: UpdateUserPayload): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users/${payload.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Failed to update user");
    return response.json();
  },

  async deleteUsers(payload: DeleteUsersPayload): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_BASE_URL}/users/bulk-delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Failed to delete users");
    return response.json();
  },
};
