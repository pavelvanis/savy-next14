import React from "react";
import { PlusIcon, WalletIcon } from "lucide-react";
import { AccountSkeleton } from "@/components/layout/skeletons";
import {
  Page,
  PageNavbar,
  PageNavbarProps,
} from "@/components/layout/page-components";

const LoadingAccountsPage = () => {
  const accountNavbarProps: PageNavbarProps = {
    title: {
      children: "Accounts",
      icon: WalletIcon,
    },
    button: {
      children: "Add Account",
      icon: PlusIcon,
      link: null,
    },
  };

  return (
    <Page>
      <PageNavbar {...accountNavbarProps} />
      <section className="page-body list-col">
        <AccountSkeleton />
        <AccountSkeleton />
        <AccountSkeleton />
      </section>
    </Page>
  );
};

export default LoadingAccountsPage;
