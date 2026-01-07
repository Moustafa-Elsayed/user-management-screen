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
      icon: "https://cdn.monday.com/images/logos/monday_logo_icon.png",
    },
    document: {
      name: "brown-james.pdf",
      size: "2.1 MB",
    },
    status: "active" as const,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
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
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    },
    document: {
      name: "williams-sophia.pdf",
      size: "2.4 MB",
    },
    status: "active" as const,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
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
      icon: "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png",
    },
    document: {
      name: "taylor-arthur.pdf",
      size: "2.4 MB",
    },
    status: "absent" as const,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
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
      icon: "https://formcarry.com/assets/img/formcarry-logo.svg",
    },
    document: {
      name: "wright-emma.pdf",
      size: "1.9 MB",
    },
    status: "active" as const,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
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
      icon: "https://cdn.worldvectorlogo.com/logos/loom-icon.svg",
    },
    document: {
      name: "johnson-matthew.pdf",
      size: "2.9 MB",
    },
    status: "absent" as const,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
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
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Tidal_Logo.svg",
    },
    document: {
      name: "perez-laura.pdf",
      size: "2.5 MB",
    },
    status: "absent" as const,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
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
      icon: "https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_blue_m1.svg",
    },
    document: {
      name: "chen-wei.pdf",
      size: "2.6 MB",
    },
    status: "active" as const,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
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
