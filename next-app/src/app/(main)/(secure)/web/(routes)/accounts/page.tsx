import React from "react";
import { PlusIcon, WalletIcon } from "lucide-react";
import {
  PageNavbar,
  Page,
  PageNavbarProps,
  PageContentError,
} from "@/components/layout/page-components";
import { getAuthSession } from "@/lib/auth";
import { addCredentialsLink } from "@/lib/tink/link";
import AccountsList from "@/components/web/accounts/accounts";
import { getAccounts, generateAuthorizationCode } from "@/actions/server/data";

/**
 * Page to show all connected accounts and their details
 */
const AccountsPage = async () => {
  const { user } = await getAuthSession();

  const { data } = await generateAuthorizationCode(user.permanentUserId);

  const accounts = await getAccounts(user.permanentUserId);

  const accountNavbarProps: PageNavbarProps = {
    title: {
      children: "Accounts",
      icon: WalletIcon,
    },
    button: {
      children: "Add Account",
      icon: PlusIcon,
      link: data?.code
        ? addCredentialsLink(
            data.code,
            user.permanentUserId,
            "http://localhost:3000/api/callback/credentials"
          )
        : null,
    },
  };

  return (
    <Page>
      {/* Accounts header */}
      <PageNavbar {...accountNavbarProps} />
      {/* Content */}
      {accounts.data ? (
        <AccountsList className="page-body" {...accounts.data} />
      ) : (
        <PageContentError message={accounts.error.message} />
      )}
    </Page>
  );
};

export default AccountsPage;
