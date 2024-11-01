import {
  BankOutlined,
  HistoryOutlined,
  HomeOutlined,
  PlusSquareOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
  SafetyOutlined,
   UserAddOutlined, UsergroupAddOutlined,
} from "@ant-design/icons";

export const menuItems = [
  {
    // group: "Dashboard",
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
    // group: "Transactions",
    items: [
      {
        label: "Deposit",
        icon: SafetyCertificateOutlined  ,
        path: "/pay-in",
        permission: "admin",
      },
      {
        label: "Withdraw",
        icon:  SafetyOutlined,
        path: "/pay-out",
        permission: "admin",
      },
      // {
      //   label: "Pay Out Approval",
      //   icon: UploadOutlined,
      //   path: "/pay-out-approval",
      //   permission: "canApprovePayOut",
      // },
    ],
  },
  {
    // group: "Prepayment",
    items: [
      {
        label: "Prepayment Requests",
        icon: RightOutlined,
        path: "/prepayment-requests",
        permission: "canViewPrepayment",
      },
      {
        label: "Prepayment History",
        icon: HistoryOutlined ,
        path: "/prepayment-history",
        permission: "admin",
      },
    ],
  },
  {
    // group: "Balances",
    items: [
      {
        label: "Bank",
        icon:  BankOutlined  ,
        path: "/balances",
        permission: "admin",
      },
      {
        label: "Balance History",
        icon:  HistoryOutlined,
        path: "/pay-in-approval",
        permission: "admin",
      },
    ],
  },
  {
    // group: "Settings",
    items: [
      {
        label: "Add Bank Account",
        icon: PlusSquareOutlined,
        path: "/add-bank-account",
        permission: "canAddBankAccount",
      },
      {
        label: "Merchant Details",
        icon: UserAddOutlined,
        path: "/create-merchant",
        permission: "admin",
      },
      {
        label: "Agent Details",
        icon: UsergroupAddOutlined ,
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
