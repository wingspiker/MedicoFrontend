import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminSidebar } from "../AdminSidebar";
import { signOut } from "../../../Services/auth";
import DocumentViewer from "./DocumentViewer";

export default function BuyerDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const buyer = location?.state?.buyer;

  const [selectedDocument, setSelectedDocument] = useState(null);

  const onLogout = () => {
    signOut();
    navigate("/admin");
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleDocumentClick = (doc) => {
    setSelectedDocument(doc);
  };

  const handleCloseViewer = () => {
    setSelectedDocument(null);
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="ms-16 p-2 pb-3 text-3xl font-semibold text-white flex items-center">
          Buyer Details
        </h1>
      </div>
      <hr />
      <div className="p-2 ps-16">
        <button
          onClick={goBack}
          className="p-2 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
        <div className="p-5 h-[88vh] overflow-auto no-scrollbar rounded shadow-lg bg-dark-700">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            General Information
          </h2>
          <div className="space-y-2">
            <div className="flex items-center text-white">
              <span className="text-gray-400 mr-2">Name:</span>
              <span className="text-white font-bold">
                {buyer.firstName} {buyer.lastName}
              </span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-gray-400 mr-2">Email:</span>
              <span className="text-white font-bold">{buyer.email}</span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-gray-400 mr-2">Occupation:</span>
              <span className="text-white font-bold">{buyer.occupation}</span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-gray-400 mr-2">Degree:</span>
              <span className="text-white font-bold">
                {buyer.degree || "N/A"}
              </span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-gray-400 mr-2">Address:</span>
              <span className="text-white font-bold">
                {buyer.address || "N/A"}
              </span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-gray-400 mr-2">Taluka:</span>
              <span className="text-white font-bold">
                {buyer.taluka || "N/A"}
              </span>
            </div>
            <div className="flex flex-col text-white">
              <span className="text-gray-400 mr-2 mb-3">Document Links:</span>
              <div className="text-white font-bold space-y-2">
                {buyer.documentLinks ? (
                  buyer.documentLinks.map((doc) => (
                    <div key={doc.id}>
                      <button
                        onClick={() => handleDocumentClick(doc)}
                        className="p-2 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        View {doc.name}
                      </button>
                    </div>
                  ))
                ) : (
                  <span>None</span>
                )}
              </div>
            </div>
            {/* Example of listing buyer offers and orders, which are arrays */}
            <div className="flex items-center text-white">
              <span className="text-gray-400 mr-2">Buyer Offers:</span>
              <span className="text-white font-bold">
                {buyer.buyerOffers.length > 0 ? "Available" : "None"}
              </span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-gray-400 mr-2">Orders:</span>
              <span className="text-white font-bold">
                {buyer.orders.length > 0 ? "Available" : "None"}
              </span>
            </div>
            <div className="flex items-center text-white">
              <span className="text-gray-400 mr-2">Order Addresses:</span>
              <span className="text-white font-bold">
                {buyer.orderAddresses.length > 0 ? "Available" : "None"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <AdminSidebar changeLogin={onLogout} />
      {selectedDocument && (
        <DocumentViewer
          open={Boolean(selectedDocument)}
          onClose={handleCloseViewer}
          file={selectedDocument}
        />
      )}
    </>
  );
}
