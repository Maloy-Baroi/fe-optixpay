import {
  DollarOutlined,
  DownloadOutlined,
  HomeOutlined,
  LeftOutlined, LinuxOutlined,
  PlusSquareOutlined,
  RightOutlined,
  UploadOutlined, UsergroupAddOutlined,
} from "@ant-design/icons";

export const menuItems = [
  {
    group: "Dashboard",
    items: [
      {
        label: "Dashboard",
        icon: HomeOutlined,
        path: "/",
        permission: "admin",
      },
    ],
  },
  {
    group: "Transactions",
    items: [
      {
        label: "Pay In",
        icon: DownloadOutlined,
        path: "/pay-in",
        permission: "canViewPayIn",
      },
      {
        label: "Pay In Approval",
        icon: DownloadOutlined,
        path: "/pay-in-approval",
        permission: "admin",
      },
      {
        label: "Pay Out",
        icon: UploadOutlined,
        path: "/pay-out",
        permission: "canViewPayOut",
      },
      {
        label: "Pay Out Approval",
        icon: UploadOutlined,
        path: "/pay-out-approval",
        permission: "canApprovePayOut",
      },
    ],
  },
  {
    group: "Prepayment",
    items: [
      {
        label: "Prepayment Requests",
        icon: RightOutlined,
        path: "/prepayment-requests",
        permission: "canViewPrepayment",
      },
      {
        label: "Prepayment History",
        icon: LeftOutlined,
        path: "/prepayment-history",
        permission: "canViewPrepayment",
      },
    ],
  },
  {
    group: "Balances",
    items: [
      {
        label: "Balances",
        icon: DollarOutlined,
        path: "/balances",
        permission: "canViewBalances",
      },
    ],
  },
  {
    group: "Settings",
    items: [
      {
        label: "Add Bank Account",
        icon: PlusSquareOutlined,
        path: "/add-bank-account",
        permission: "canAddBankAccount",
      },
      {
        label: "Add Merchant",
        icon: LinuxOutlined,
        path: "/create-merchant",
        permission: "admin",
      },
      {
        label: "Add Agent",
        icon: UsergroupAddOutlined,
        path: "/create-agent",
        permission: "admin",
      },
      //   {
      //     label: "Sub User",
      //     icon: UserOutlined,
      //     path: "/sub-users",
      //     permission: "canManageSubUsers",
      //   },
      //   {
      //     label: "2FA",
      //     icon: PhoneOutlined,
      //     path: "/2fa",
      //     permission: "canManage2FA",
      //   },
    ],
  },
  //   {
  //     group: "Info",
  //     items: [
  //       {
  //         label: "Applied Commission",
  //         icon: TeamOutlined,
  //         path: "/commission",
  //         permission: "canViewAppliedCommission",
  //       },
  //       {
  //         label: "FAQ",
  //         icon: QuestionCircleOutlined,
  //         path: "/faq",
  //         permission: "canViewFAQ",
  //       },
  //     ],
  //   },
];
