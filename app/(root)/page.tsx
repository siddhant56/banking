import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  // console.log("logged in user logger ", loggedIn);

  if (!loggedIn) {
    redirect("/sign-in");
  }

  // const loggedIn = {
  //   firstName: "Siddhant",
  //   lastName: "Trivedi",
  //   email: "contact@sid",
  // };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access And Manage Your Account And Transactions Efficiently"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar
        user={loggedIn || "Guest"}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }]}
      />
    </section>
  );
};

export default Home;
