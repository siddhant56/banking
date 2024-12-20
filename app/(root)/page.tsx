import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    redirect("/sign-in");
  }

  const accounts = await getAccounts({ userId: loggedIn.$id });

  const currentPage = Number(page as string) || 1;

  if (!accounts) {
    return;
  }

  const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteId;

  const account = await getAccount({ appwriteItemId });

  const accountsData = accounts?.data;

  // console.log("logged in user logger ", loggedIn);

  // const loggedIn = {
  //   firstName: "Siddhant",
  //   lastName: "Trivedi",
  //   email: "contact@sid",
  // };
  console.log("accounts logger ", accountsData);
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access And Manage Your Account And Transactions Efficiently"
          />
          <TotalBalanceBox
            accounts={accounts?.data}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      <RightSidebar
        user={loggedIn || "Guest"}
        transactions={accounts?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
