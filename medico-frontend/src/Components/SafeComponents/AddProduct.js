import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProductInformation from "../ProductComponents/CaseOne/ProductInfo";
import ManufacturerInformation from "../ProductComponents/CaseOne/ManufacturerInfo";
import PricingInformation from "../ProductComponents/CaseOne/PricingInfo";
import SelectExistingGroup from "../ProductComponents/CaseTwo/SelectGroup";
import Occupation from "../ProductComponents/CaseFour/Occupation";
import SelectLocation from "../ProductComponents/CaseThree/SelectLocation";
import { decodeToken, isCompanySelf } from "../../Services/auth";
import { addProduct } from "../../Services/product";
import { addGroup, addProductToGroup, getGroupById, getGroups } from "../../Services/group";
import { addBuyerGroup, addBuyers, filterBuyrs } from "../../Services/buyer";
import { Toaster, toast } from "sonner";
import Loader from "../../Loader";
import ShowBuyer from "../ProductComponents/CaseFive/ShowBuyer";
import AddPricing from "../ProductComponents/CaseSix/AddPricing";
import { getDivisions } from "../../Services/division";
import { Sidebar } from "../Admin/Sidebar";
import { signOut } from "../../Services/auth";

function AddProduct() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [currentProdId, setCurrentProdId] = React.useState(null);
  const [currentGroupId, setCurrentGroupId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [divisions, setDivisions] = React.useState([]);

  const [isRed, setIsRed] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const location = useLocation()

  useEffect(() => {
    if(location.state){
      setCurrentProdId(location.state.pid);
      setCurrentStep(location.state.step);
      setSp(location.state.sp)
      setIsAdmin(true)
    }
  
  }, [])

  const showToast = (message, isRed) => {
    setIsRed(isRed);
    if (isRed) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  const [buyers, setBuyers] = useState([]);

  const [groups, setGroups] = useState([]);

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  // console.log("Selected Rows", rowSelectionModel);
  const [updatedBuyer, setUpdatedBuyer] = useState([]);

  const [psdata, setData] = useState([]);
  const [cols, setCols] = useState([]);
  // console.log("buyer", buyers);

  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getGroups(email)
      .then((res) => {
        setGroups(res);
      })
      .catch((err) => console.log(err));
    // console.log(rowSelectionModel);

    getDivisions()
      .then((resp) => {
        setDivisions(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    data.talukaIds = sTaluka;
    data.updatedBuyer = updatedBuyer;

    if (currentStep < 6) {
      if (currentStep === 1) {
        // console.log("yele", data);
        AddProductData(data);
      }

      if (currentStep === 3) {
        AddGroup(data);
      }

      if (currentStep === 4) {
        FilterGroup(data);
      }

      if (currentStep === 5) {
        AddBuyers();
        const selectedBuyers = buyers.filter((b) =>
          rowSelectionModel.includes(b.id)
        );
        const formattedBuyers = selectedBuyers.map((buyer) => ({
          id: buyer.id,
          name: `${buyer.firstName} ${buyer.lastName}`,
          occupation: buyer.occupation,
          degree: buyer.degree || "NA",
          price: sp,
        }));
        setData(formattedBuyers);
        if (formattedBuyers.length > 0) {
          setCols(Object.keys(formattedBuyers[0]));
        }
      }

      if (currentStep === 2) {
        if (data.existingGroupNo) {
          console.log(data.existingGroupNo);
          getGroupById(data.existingGroupNo)
            .then((g) => {

              const addData = {
                groupId:g.id,
                productIds:[currentProdId]
              }

              addProductToGroup(addData)
              .then(r=>{
                console.log('group added to this product');
                console.log(r);
              })
              .catch(err=>{
                console.log(err);
              })
              // console.log("ss");
              // console.log(g);
              // setBuyers(g.buyers);
              // console.log(buyers);
              const formattedBuyers = g.buyers.map((buyer) => ({
                id: buyer.id,
                name: `${buyer.firstName} ${buyer.lastName}`,
                occupation: buyer.occupation,
                degree: buyer.degree || "NA",
                price: sp,
              }));
              setData(formattedBuyers);
              if (formattedBuyers.length > 0) {
                setCols(Object.keys(formattedBuyers[0]));
              }
              setCurrentStep(6);
            })
            .catch((err) => {
              console.log(err);
              toast.error(err.response.title);
            });
        } else {
          console.log("3 pe jaa");
          setCurrentStep(currentStep + 1);
        }
      } else {
        // setCurrentStep(currentStep + 1);
      }
    } else {
      console.log("final maal", psdata);
      // console.log(currentProdId);

      const buyerProd = psdata.map((ps) => {
        return {
          buyerId: ps.id,
          productId: currentProdId,
          price: Number(ps.price),
        };
      });

      AddBuyerProduct(buyerProd);
    }
  };

  const AddProductData = (rawData) => {
    setLoading(true);
    // console.log(rawData);
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    const {
      productName,
      brandName,
      productType,
      division,
      prescription,
      sizeX,
      sizeY,
      contains,
      manufacturerName,
      manufacturerLicenseNumber,
      allowExchange,
      allowReturn,
      mrp,
      retailPrice,
      pricingMethod,
      discountOnMRP,
      marginOnRetail,
      returnDays,
      productImage,
      letterPadDocument,
    } = rawData;

    let formattedApiInput = {
      companyEmail: email,
      type: Number(productType),
      brandName: brandName,
      drugName: productName,
      manufacturingName: manufacturerName,
      division,
      prescription: Number(prescription),
      licenseNo: manufacturerLicenseNumber,
      photoUrl: productImage,
      manufacturerName: manufacturerName,
      contents: contains,
      mrp: Number(mrp),
      retailPrice: Number(retailPrice),
      packSize: {
        x: Number(sizeX),
        y: Number(sizeY),
      },
      returnPolicy: {
        allowReturn: JSON.parse(allowReturn),
        // returnDays: isNaN(Number(returnDays)) ? 0 : Number(returnDays),
        allowExchange: JSON.parse(allowExchange),
      },
    };
    if (pricingMethod === "0") {
      formattedApiInput.sellingPrice = Math.round(
        Number(Number(mrp) * (1 - Number(discountOnMRP) / 100))
      );
      formattedApiInput.value = Number(discountOnMRP);
      formattedApiInput.effectivePriceCalculationType = 0;
    } else if (pricingMethod === "1") {
      formattedApiInput.sellingPrice = Math.round(
        Number(Number(retailPrice) * (1 + Number(marginOnRetail) / 100))
      );
      formattedApiInput.value = Number(marginOnRetail);
      formattedApiInput.effectivePriceCalculationType = 1;
    }

    if (formattedApiInput.returnPolicy.allowReturn) {
      formattedApiInput.returnPolicy.returnDays = Number(returnDays);
    }
    if (formattedApiInput.prescription === 1) {
      formattedApiInput.letterPadDocumentLink = letterPadDocument;
    }
    console.log(letterPadDocument);
    console.log(formattedApiInput);

    addProduct(formattedApiInput)
      .then((response) => {
        console.log(response);
        setCurrentProdId(response.id);
        showToast("Product Added  Successfully", false);
        if(isAdmin){
          navigate("/admin/Product");
          
        }
        else if (!isCompanySelf()) {
          navigate("/Product");
        }
        setCurrentStep(currentStep + 1);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error in adding product : ", error);
        showToast(error.response.data.title, true);
        setLoading(false);
      });
  };

  const AddGroup = (rawData) => {
    setLoading(true);
    console.log(rawData);
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    const { groupName, groupDescription, talukaIds } = rawData;

    let formattedApiInput = {
      email: email,
      name: groupName,
      description: groupDescription,
      buyerIds: [],
      talukaIds,
      productIds: [currentProdId],
    };

    console.log(formattedApiInput);
    addGroup(formattedApiInput)
      .then((resp) => {
        console.log(resp);
        setCurrentGroupId(resp.id);
        setLoading(false);
        showToast("Group Created Successfully", false);
        setCurrentStep(currentStep + 1);
      })
      .catch((err) => {
        console.log(err);
        showToast(err.response.data.title, true);
        setLoading(false);
      });
  };

  const FilterGroup = (rawData) => {
    setLoading(true);
    const { occupation, degree } = rawData;

    let formattedApiInput = {
      id: currentGroupId,
      occupations: occupation ?? [],
      degrees: degree ?? [],
    };

    filterBuyrs(formattedApiInput)
      .then((resp) => {
        console.log(resp);
        setBuyers(resp);
        setLoading(false);
        setCurrentStep(currentStep + 1);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const AddBuyers = () => {
    // setLoading(true)
    // setLoading(true)
    const postData = {
      groupId: currentGroupId,
      buyerIds: rowSelectionModel ?? [],
    };
    addBuyers(postData)
      .then((res) => {
        console.log(res);
        showToast("Buyers added successfully", false);
        setLoading(false);
        setCurrentStep(currentStep + 1);
      })
      .catch((err) => {
        console.log(err);
        showToast(err.response.data.title, true);
        setLoading(false);
      });
  };

  const AddBuyerProduct = (buyProd) => {
    console.log("yy");
    setLoading(true);
    addBuyerGroup(buyProd)
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        setIsRed(false);
        toast.success("Added Successfully!");
        setTimeout(() => {
          if(isAdmin){
            navigate("/admin/Product");
          }else{
            navigate("/Product");

          }
          setIsRed(true);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setIsRed(true);
        toast.success("Something Went Wrong");
        setTimeout(() => {
          navigate("/Product");
          setIsRed(true);
        }, 3000);
      });
  };

  const productName = watch("productName");
  const brandName = watch("brandName");
  const productImage = watch("productImage");
  const productType = watch("productType");
  const division = watch("division");
  const sizeX = watch("sizeX");
  const sizeY = watch("sizeY");
  const contains = watch("contains");
  const letterPadDocument = watch("letterPadDocument");
  const manufacturerName = watch("manufacturerName");
  const manufacturerLicenseNumber = watch("manufacturerLicenseNumber");
  const allowExchange = watch("allowExchange");
  const returnDays = watch("returnDays");

  const existingGroupNo = watch("existingGroupNo");

  const occupation = watch("occupation");
  const degree = watch("degree");

  const sellingPrice = watch("sellingPrice");

  const [sTaluka, setsTaluka] = useState([]);

  const groupName = watch("groupName");
  const groupDescription = watch("groupDescription");

  const prescription = watch("prescription");
  const allowReturn = watch("allowReturn");
  const pricingMethod = watch("pricingMethod");
  const retailPrice = watch("retailPrice");
  const margin = watch("marginOnRetail");
  const mrp = watch("mrp");
  const discount = watch("discountOnMRP");

  const [sp, setSp] = useState(0);

  // console.log(existingGroupNo);
  const validateRetailPrice = (value) => {
    return (
      Number(value) <= Number(mrp) ||
      "Retail price must be less than or equal to MRP"
    );
  };

  const [errSix, setErSix] = useState(false);

  const calculateSellingPrice = () => {
    if (pricingMethod === "0" && mrp && discount) {
      const sp = (mrp - (mrp * discount) / 100).toFixed(2);
      // setValue('sellingPrice', sp);
      setSp(sp);
      return sp;
    } else if (pricingMethod === "1" && retailPrice && margin) {
      // console.log(retailPrice, margin);
      const sp = (retailPrice * (1 + margin * 0.01)).toFixed(2);
      setSp(sp);
      // setValue('sellingPrice', sp);
      return sp;
    }
    return 0;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex justify-center items-center min-h-screen bg-cyan-900 ps-16">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className=" text-4xl text-white">Product</h1>
              <ProductInformation
                register={register}
                watch={watch}
                errors={errors}
                prescription={prescription}
                divisions={divisions}
                setValue={setValue}
              />
              <ManufacturerInformation
                register={register}
                errors={errors}
                allowReturn={allowReturn}
              />
              <PricingInformation
                register={register}
                watch={watch}
                errors={errors}
                calculateSellingPrice={calculateSellingPrice}
                validateRetailPrice={validateRetailPrice}
                pricingMethod={pricingMethod}
              />

              <div className=" p-2 flex justify-end">
                <button
                  type="submit"
                  className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
                >
                  {loading ? <Loader /> : "Next"}
                </button>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="flex justify-start items-top min-h-screen  bg-cyan-900 ps-44">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-4xl text-white mt-2">
                Select Existing Group
              </h1>
              <div className="p-2 flex items-center my-3">
                <SelectExistingGroup
                  register={register}
                  errors={errors}
                  groups={groups}
                  currentGroup={existingGroupNo}
                />
                <button
                  type="submit"
                  className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
                >
                  {loading ? <Loader /> : "Next"}
                </button>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="flex justify-center items-top min-h-screen  bg-cyan-900">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-4xl text-white mt-2">Select Location</h1>
              <div className="p-2 flex items-center justify-center mt-3 my-3">
                <SelectLocation
                  register={register}
                  errors={errors}
                  setsTaluka={setsTaluka}
                  // talukaArray={SelectedTalukaArray}
                />
              </div>
              <button
                disabled={sTaluka.length === 0}
                type="submit"
                className={`cursor-pointer bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-auto text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
              >
                {loading ? <Loader /> : "Next"}
              </button>
            </form>
          </div>
        );
      case 4:
        return (
          <div className="flex justify-start items-top min-h-screen  bg-cyan-900 ps-44">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <h1 className="text-4xl text-white mt-2">Occupation</h1>
              <div className="p-2 flex items-start flex-col my-3">
                <Occupation
                  register={register}
                  errors={errors}
                  occupation={occupation}
                />
                <div className="mt-4">
                  <button
                    type="submit"
                    className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
                  >
                    {loading ? <Loader /> : "Next"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        );
      case 5:
        return (
          <div className="p-10 ms-8  bg-cyan-900">
            <form onSubmit={handleSubmit(onSubmit)}>
              <ShowBuyer
                setValue={setValue}
                setRowSelectionModel={setRowSelectionModel}
                rowSelectionModel={rowSelectionModel}
                buyers={buyers}
              />
              <div className="flex mt-4 flex-row-reverse">
                <button
                  type="submit"
                  className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
                >
                  {loading ? <Loader /> : "Next"}
                </button>
              </div>
            </form>
          </div>
        );
      case 6:
        return (
          <div className="p-10 ms-8  bg-cyan-900">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AddPricing
                updatedBuyer={updatedBuyer}
                setUpdatedBuyer={setUpdatedBuyer}
                data={psdata}
                cols={cols}
                setData={setData}
                defaultPrice={sp}
                setErSix={setErSix}
              />
              <div className="flex mt-4 flex-row-reverse">
                <button
                  type="submit"
                  disabled={errSix}
                  className={`cursor-pointer bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
                >
                  {loading ? <Loader /> : "Submit"}
                  {console.log(errSix)}
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  const onlogout = () => {
    signOut();
    navigate("/admin");
  };

  return (
    <>
      <div className=" w-full">
        <Toaster
          position="top-center"
          toastOptions={{
            style: { color: `${isRed ? "red" : "green"}` },
            // style: { color: `red` },
          }}
        />
        <Sidebar changeLogin={onlogout} />
        {renderStep()}
        {/* {console.log(currentProdId)} */}
      </div>
    </>
  );
}

export default AddProduct;
