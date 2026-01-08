import { User } from "@/types";

const mockUserData = [
  {
    id: 1,
    name: "James Brown",
    email: "james@alignui.com",
    title: "Marketing Manager",
    startDate: "Aug, 2021",
    project: {
      name: "Monday.com",
      description: "Campaign Strategy Brainstor...",
      icon: "/icons/Monday.com.png",
    },
    document: {
      name: "brown-james.pdf",
      size: "2.1 MB",
    },
    status: "active" as const,
    avatar: "/icons/image1.png",
  },
  {
    id: 2,
    name: "Sophia Williams",
    email: "sophia@alignui.com",
    title: "HR Assistant",
    startDate: "Aug, 2021",
    project: {
      name: "Notion",
      description: "Employee Engagement Survey",
      icon: "/icons/Notion.png",
    },
    document: {
      name: "williams-sophia.pdf",
      size: "2.4 MB",
    },
    status: "active" as const,
    avatar: "/icons/image2.png",
  },
  {
    id: 3,
    name: "Arthur Taylor",
    email: "arthur@alignui.com",
    title: "Entrepreneur / CEO",
    startDate: "Aug, 2021",
    project: {
      name: "Spotify",
      description: "Vision and Goal Setting Session",
      icon: "/icons/Spotify.png",
    },
    document: {
      name: "taylor-arthur.pdf",
      size: "2.4 MB",
    },
    status: "absent" as const,
    avatar: "/icons/image3.png",
  },
  {
    id: 4,
    name: "Emma Wright",
    email: "emma@alignui.com",
    title: "Front-end Developer",
    startDate: "Sep, 2022",
    project: {
      name: "Formcarry",
      description: "User Feedback Analysis",
      icon: "/icons/Formcarry.png",
    },
    document: {
      name: "wright-emma.pdf",
      size: "1.9 MB",
    },
    status: "active" as const,
    avatar: "/icons/image4.png",
  },
  {
    id: 5,
    name: "Matthew Johnson",
    email: "matthew@alignui.com",
    title: "Data Software Engineer",
    startDate: "Feb, 2022",
    project: {
      name: "Loom",
      description: "Data Analysis Methodology Di...",
      icon: "/icons/Loom.png",
    },
    document: {
      name: "johnson-matthew.pdf",
      size: "2.9 MB",
    },
    status: "absent" as const,
    avatar: "/icons/image7.png",
  },
  {
    id: 6,
    name: "Laura Perez",
    email: "laura@alignui.com",
    title: "Fashion Designer",
    startDate: "Mar, 2022",
    project: {
      name: "Tidal",
      description: "Design Trends and Inspiration...",
      icon: "/icons/Tidal.png",
    },
    document: {
      name: "perez-laura.pdf",
      size: "2.5 MB",
    },
    status: "absent" as const,
    avatar: "/icons/image1.png",
  },
  {
    id: 7,
    name: "Wei Chen",
    email: "wei@alignui.com",
    title: "Operations Manager",
    startDate: "July, 2021",
    project: {
      name: "Dropbox",
      description: "Process Optimization Brainstor...",
      icon: "/icons/Dropbox.png",
    },
    document: {
      name: "chen-wei.pdf",
      size: "2.6 MB",
    },
    status: "active" as const,
    avatar: "/icons/image2.png",
  },
];

let mockUsersData: User[] = [...mockUserData];

export const mockApi = {
  async getUsers(page = 1, pageSize = 10) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = mockUsersData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      pagination: {
        page,
        pageSize,
        total: mockUsersData.length,
        totalPages: Math.ceil(mockUsersData.length / pageSize),
      },
      success: true,
    };
  },

  async updateUser(id: number, updates: Partial<User>) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const userIndex = mockUsersData.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    mockUsersData[userIndex] = {
      ...mockUsersData[userIndex],
      ...updates,
    };

    return { data: mockUsersData[userIndex], success: true };
  },

  async deleteUsers(userIds: number[]) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    mockUsersData = mockUsersData.filter((user) => !userIds.includes(user.id));

    return { data: undefined, success: true };
  },
};
