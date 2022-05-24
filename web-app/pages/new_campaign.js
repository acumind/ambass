import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../styles/Home.module.css";
const airdrop_options = [
  {
    label: "10",
    value: "5",
  },
  {
    label: "20",
    value: "20",
  },
  {
    label: "30",
    value: "30",
  },
  {
    label: "40",
    value: "40",
  },
  {
    label: "50",
    value: "50",
  },
];

export default function Campaign() {
  const [campaignStartDate, setCampaignStartDate] = useState(new Date());
  const [airdropDate, setAirdropDate] = useState(new Date());
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-ps">
            <div>
              <label htmlFor="campaign_name" className="">
                Title
              </label>

              <input
                type="text"
                id="campaign_name"
                name="campaign_name"
                placeholder="Campaing Title"
                required
                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="subtoken_name">SubToken Name</label>

              <input
                type="text"
                id="subtoken_name"
                name="subtoken_name"
                placeholder="e.g Liberty Token"
                required
                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="subtoken_ticker">SubToken Ticker</label>

              <input
                type="text"
                id="subtoken_ticker"
                name="subtoken_ticker"
                placeholder="e.g LBT"
                required
                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="subtoken_quantity">SubToken Amount </label>

              <input
                type="text"
                id="subtoken_quantity"
                name="subtoken_quantity"
                placeholder="Max supply of subtoken e.g 1000"
                required
                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="amb_allocation">AMB Allocation </label>

              <input
                type="text"
                id="amb_allocation"
                name="subtoken_ticker"
                placeholder="No of AMB token allocated for SubToken e.g 5 AMB "
                required
                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="amb_allocation">SubToken Rate</label>

              <p
                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                200 SubToken/AMB
              </p>
            </div>

            <div>
              <label htmlFor="subtoken_airdrop">Airdrop </label>
              <div>
                <select
                  className="mt-2 group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-gray-600"
                >
                  {airdrop_options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.grid}>
              <div className={styles.card}>
                <label htmlFor="campaign_start_date" className="">
                  Campaign Start Date
                </label>

                <Calendar
                  onChange={setCampaignStartDate}
                  value={campaignStartDate}
                />
              </div>
              <div className={styles.card}>
                <label htmlFor="airdropDate" className="">
                  Airdrop Date
                </label>

                <Calendar onChange={setAirdropDate} value={airdropDate} />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="mt-4 group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
