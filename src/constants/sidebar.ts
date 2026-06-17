import {
  Monitor,
  Users,
  MessageSquare,
  Newspaper,
  LayoutGrid,
  Box,
  Ticket,
  FileText,
  ZoomIn,
} from "lucide-react";

export const sidebarItems = [
  {
    label: "Static Content",
    icon: Monitor,
    path: "/static-content",
  },
  {
    label: "Accounts",
    icon: Users,
    path: "/accounts",
  },
  {
    label: "Article",
    icon: MessageSquare,
    path: "/article",
  },
  {
    label: "PD Session",
    icon: Newspaper,
    path: "/pd-session",
  },
  {
    label: "Category",
    icon: LayoutGrid,
    path: "/category",
  },
  {
    label: "Subscriptions",
    icon: Box,
    path: "/subscriptions",
  },
  {
    label: "Voucher",
    icon: Ticket,
    path: "/voucher",
  },
  {
    label: "Help Documents",
    icon: FileText,
    path: "/help-documents",
  },
  {
    label: "Search Settings",
    icon: ZoomIn,
    path: "/search-settings",
  },
];
