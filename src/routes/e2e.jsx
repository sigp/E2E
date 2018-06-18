// @material-ui/icons
import Message from '@material-ui/icons/Message'
import Forum from '@material-ui/icons/Forum'

// Views
import Messages from 'views/Messages.jsx'

const eToERoutes = [
  {
    path: "/send",
    sidebarName: "Send Message",
    navbarName: "Send Message",
    icon: Message,
    component: Messages,//TODO
  },
  {
    path: "/messages",
    sidebarName: "Messages",
    navbarName: "Messages",
    icon: Forum,
    component: Messages,
  },
//   {
//     path: "/dashboard",
//     sidebarName: "Dashboard",
//     navbarName: "Material Dashboard",
//     icon: Dashboard,
//     component: DashboardPage
//   },
//   {
//     path: "/user",
//     sidebarName: "User Profile",
//     navbarName: "Profile",
//     icon: Person,
//     component: UserProfile
//   },
//   {
//     path: "/table",
//     sidebarName: "Table List",
//     navbarName: "Table List",
//     icon: ContentPaste,
//     component: TableList
//   },
//   {
//     path: "/typography",
//     sidebarName: "Typography",
//     navbarName: "Typography",
//     icon: LibraryBooks,
//     component: Typography
//   },
//   {
//     path: "/icons",
//     sidebarName: "Icons",
//     navbarName: "Icons",
//     icon: BubbleChart,
//     component: Icons
//   },
//   {
//     path: "/maps",
//     sidebarName: "Maps",
//     navbarName: "Map",
//     icon: LocationOn,
//     component: Maps
//   },
//   {
//     path: "/notifications",
//     sidebarName: "Notifications",
//     navbarName: "Notifications",
//     icon: Notifications,
//     component: NotificationsPage
//   },
//   {
//     path: "/upgrade-to-pro",
//     sidebarName: "Upgrade To PRO",
//     navbarName: "Upgrade To PRO",
//     icon: Unarchive,
//     component: UpgradeToPro
//   },
  { redirect: true, path: "/", to: "/messages", navbarName: "Redirect" }
];

export default eToERoutes;
