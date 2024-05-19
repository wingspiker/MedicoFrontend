import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { decodeToken, signOut } from '../../Services/auth';
import { AdminSidebar } from './AdminSidebar';
import { getUserByEmail } from '../../Services/user';
import { subscriptionTypeEnum } from '../../Models/enums.model';

export default function AdminSettings(props) {
  const { changeLogin } = props;
  const logout = () => {
    signOut();
    changeLogin(false);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    // console.log(user);
    getUserByEmail(email)
      .then(resp => {
        // console.log(resp);
        setUser(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);



  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <AdminSidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className="p-2 flex justify-between gap-4 h-20">
            <h1 className="text-3xl font-semibold text-white my-4">Settings</h1>
            {console.log(user)}
            {/* <button
              className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2"
            >
              Tempp
            </button> */}
          </div>
          <hr />
          {/* <div className="p-8">
            {user && (
              <div className="bg-cyan-700 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">User Details</h2>
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <p className="font-semibold">Email Address:</p>
                    <p>{user.emailAddress}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone Number:</p>
                    <p>{user.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email Verified:</p>
                    <p>{user.isEmailVerified ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone Verified:</p>
                    <p>{user.isPhoneVerified ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Company Name:</p>
                    <p>{user.company.name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Company Email:</p>
                    <p>{user.company.companyEmail}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Company Type:</p>
                    <p>{user.company.companyType}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Charges:</p>
                    <p>{user.company.charges}</p>
                  </div>
                  { user.company.charges==='Subscription' && <div>
                    <p className="font-semibold">Subscription:</p>
                    <p>{subscriptionTypeEnum[Object.keys(subscriptionTypeEnum)[user.company.subscription]]}</p>
                  </div>}
                </div>
                <button
                  className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => console.log("Reset Password Clicked")}
                >
                  Reset Password
                </button>
              </div>
            )}
          </div> */}
          <div className="p-8">
      {user && (
        <div className="bg-cyan-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Admin User Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Email Address:</p>
              <p>{user.emailAddress}</p>
            </div>
            <div>
              <p className="font-semibold">Phone Number:</p>
              <p>{user.phoneNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Email Verified:</p>
              <p>{user.isEmailVerified ? "Yes" : "No"}</p>
            </div>
            <div>
              <p className="font-semibold">Phone Verified:</p>
              <p>{user.isPhoneVerified ? "Yes" : "No"}</p>
            </div>
            {user.company && (
              <>
                <div>
                  <p className="font-semibold">Company Name:</p>
                  <p>{user.company.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Company Email:</p>
                  <p>{user.company.companyEmail}</p>
                </div>
                <div>
                  <p className="font-semibold">Company Type:</p>
                  <p>{user.company.companyType}</p>
                </div>
                <div>
                  <p className="font-semibold">Charges:</p>
                  <p>{user.company.charges}</p>
                </div>
                {user.company.charges === 'Subscription' && (
                  <div>
                    <p className="font-semibold">Subscription:</p>
                    <p>{subscriptionTypeEnum[user.company.subscription]}</p>
                  </div>
                )}
              </>
            )}
          </div>
          <button
            className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => console.log("Reset Password Clicked")}
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
        </div>
      </div>
    </div>
  );
}
