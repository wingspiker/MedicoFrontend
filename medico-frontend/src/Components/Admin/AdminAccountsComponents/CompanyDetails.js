import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../AdminSidebar';
import { signOut } from '../../../Services/auth';
import DocumentViewer from './DocumentViewer';

export default function CompanyDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const company = location?.state?.company;
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
        {/* {console.log(company)} */}
            <div className=" flex justify-between">
                <h1 className="p-2 pb-3 ms-16  text-3xl font-semibold text-white flex items-center">
                    Company Details
                </h1>
            </div>
            <hr />
            <div className="p-2 ps-16">
            <button onClick={goBack} className="p-2 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
               Back 
            </button>
                <div className="p-5 h-[88vh] overflow-auto no-scrollbar rounded shadow-lg">
                    <h2 className="text-2xl font-semibold text-orange-500 mb-4">
                        General Information
                    </h2>
                    <div className="space-y-2">
                        <div className="flex items-center text-white">
                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <span className="text-gray-400">Name:</span> <span className="text-white font-bold ml-1">{company.displayName}</span>
                        </div>
                        <div className="flex items-center text-white">
                            <svg className="h-5 w-5 text-green-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M19 11H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2zM5 13h14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2z" />
                            </svg>
                            <span className="text-gray-400">Email:</span> <span className="text-white font-bold ml-1">{company.companyEmail}</span>
                        </div>
                        <div className="flex items-center text-white">
                            <svg className="h-5 w-5 text-red-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M16 2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 2v16h8V2H8z" />
                            </svg>
                            <span className="text-gray-400">Type:</span> <span className="text-white font-bold ml-1">{company.companyType === 0 ? 'Admin Selling' : 'Self Selling'}</span>
                        </div>
                        <div className="flex items-center text-white">
                            <svg className="h-5 w-5 text-yellow-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M21 15.66V8.34C21 7.75 20.62 7.22 20.05 7.07l-7-2c-.38-.11-.78-.11-1.16 0l-7 2C3.38 7.22 3 7.75 3 8.34v7.32c0 .59.38 1.12.95 1.27l7 2c.18.05.37.08.55.08s.37-.03.55-.08l7-2c.57-.15.95-.68.95-1.27z" />
                            </svg>
                            <span className="text-gray-400">Charges Type:</span> <span className="text-white font-bold ml-1">{company.chargesType === 0 ? 'Subscription' : 'Percentage'}</span>
                        </div>
                        <div className="flex items-center text-white">
                            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <span className="text-gray-400">GST Number:</span> <span className="text-white font-bold ml-1">{company.gstNumber || 'N/A'}</span>
                        </div>
                        <div className="flex items-center text-white">
                            <svg className="h-5 w-5 text-green-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M19 11H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2zM5 13h14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2z" />
                            </svg>
                            <span className="text-gray-400">PAN Number:</span> <span className="text-white font-bold ml-1">{company.panNumber || 'N/A'}</span>
                        </div>
                        <div className="flex items-center text-white">
                            <svg className="h-5 w-5 text-red-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M16 2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 2v16h8V2H8z" />
                            </svg>
                            <span className="text-gray-400">Address:</span> <span className="text-white font-bold ml-1">{company.address1}, {company.address2}</span>
                        </div>

                        <div className="mt-4">
                        <h2 className="text-xl font-semibold text-orange-500 mb-4">
                            Documents
                        </h2>
                        <div className="space-y-2">
                            {company.documentLink.map((doc) => (
                                <div key={doc.id} className="flex items-center text-white">
                                    <button
                                        onClick={() => handleDocumentClick(doc)}
                                        className="p-2 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        View {doc.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                        
                    </div>
                </div>
            </div>
            <AdminSidebar changeLogin={onLogout} />
            {selectedDocument && (
                <DocumentViewer open={Boolean(selectedDocument)} onClose={handleCloseViewer} file={selectedDocument} />
            )}
        </>
    );
}
