import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { CustomInput } from "./Input";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  Stepper,
  Step,
  StepLabel,
  Box,
  Tabs,
  Tab,
  Typography,
  Fab,
} from "@mui/material";
import ReactDatePicker from "react-datepicker";
import ProductCard from "./ProductCard";
import PreviewCard from "./PreviewCard";
import { toast, Toaster } from "sonner";
import ArticleCard from "./ArticleCard";
import ArticlePreviewCard from "./ArticlesPreviewCard";
import { handleImageUpload } from "../../Services/upload";
import { decodeToken } from "../../Services/auth";
import { getProducts } from "../../Services/product";
import {
  addDiscountBenefit,
  addFreeGoodsBenefit,
  addFreeProductsBenefit,
  addOffer,
} from "../../Services/offer";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { getArticles } from "../../Services/article";

const BenefitType = {
  DISCOUNT: "Discount Offer",
  FREE_GOODS: "Free Goods Offer",
  FREE_PRODUCTS: "Free Products Offer",
};

const DEMO_ARTICLES = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    articleName: "Article 1",
    articlePhoto: "https://via.placeholder.com/150",
    articleDescription: "Description of Article 1",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
    articleName: "Article 2",
    articlePhoto: "https://via.placeholder.com/150",
    articleDescription: "Description of Article 2",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa2",
    articleName: "Article 3",
    articlePhoto: "https://via.placeholder.com/150",
    articleDescription: "Description of Article 3",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
    articleName: "Article 4",
    articlePhoto: "https://via.placeholder.com/150",
    articleDescription: "Description of Article 4",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa4",
    articleName: "Article 5",
    articlePhoto: "https://via.placeholder.com/150",
    articleDescription: "Description of Article 5",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
    articleName: "Article 6",
    articlePhoto: "https://via.placeholder.com/150",
    articleDescription: "Description of Article 6",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
    articleName: "Article 7",
    articlePhoto: "https://via.placeholder.com/150",
    articleDescription: "Description of Article 7",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
    articleName: "Article 8",
    articlePhoto: "https://via.placeholder.com/150",
    articleDescription: "Description of Article 8",
  },
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function removeUndefinedEntries(array) {
  return array.filter((item) => item !== undefined && !!item);
}

function AddOffer() {
  const [currentStep, setCurrentStep] = React.useState(3);
  const [products, setProducts] = React.useState([]);
  const [articles, setArticles] = React.useState([]);
  const [offerId, setOfferId] = useState(
    "0105b3e8-6c02-460b-b76e-869151c9c5c4"
  );
  const email = useMemo(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    return user[keys.find((k) => k.endsWith("emailaddress"))];
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if ((currentStep === 2 || currentStep === 3) && !products.length) {
      getProducts(email)
        .then((res) => {
          setProducts(res);
        })
        .catch((err) => console.log(err));
    }
    if (currentStep === 3 && !articles.length) {
      getArticles(email)
        .then((res) => {
          setArticles(res);
        })
        .catch((err) => console.log(err));
    }
  }, [currentStep]);

  const sanitizeObject = useCallback((obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([key, value]) => value !== "" && value !== undefined
      )
    );
  }, []);

  const onSubmit = useCallback(
    (formData) => {
      console.log("Form Data:", formData);
      // const amt = formData.amount ?? 0;
      switch (currentStep) {
        case 1:
          if (formData.offerType === "Price Centric") {
            addOffer({
              ...formData,
              offerType: 0,
              companyEmail: email,
            })
              .then((res) => {
                setOfferId(res.id);
                setCurrentStep(3);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            setCurrentStep(currentStep + 1);
          }
          break;
        case 2:
          if (formData.offerType === "Product Centric") {
            addOffer(
              sanitizeObject({
                ...formData,
                offerType: 1,
                companyEmail: email,
                conditions: undefined,
                productCentricOffer: { conditions: formData.conditions },
              })
            )
              .then((res) => {
                setOfferId(res.id);
                setCurrentStep(currentStep + 1);
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (formData.offerType === "Box Base") {
            addOffer(
              sanitizeObject({
                ...formData,
                offerType: 2,
                companyEmail: email,
                conditions: undefined,
                boxBaseOffer: {
                  boxBaseOfferProducts: formData.boxBaseOfferProducts,
                },
                selectedProducts: undefined,
                boxBaseOfferProducts: undefined,
              })
            )
              .then((res) => {
                setOfferId(res.id);
                setCurrentStep(currentStep + 1);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          break;
        case 3:
          console.log("Final Submission", formData);
          if (formData.benefitType === BenefitType.DISCOUNT) {
            addDiscountBenefit(offerId, {
              discountPercentage: formData.discountPercentage,
              maximumDiscount: formData.maximumDiscount,
            })
              .then((res) => {
                toast.success("Offer created successfully");
                setOfferId(res.id);
                setCurrentStep(1);
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (formData.benefitType === BenefitType.FREE_GOODS) {
            addFreeGoodsBenefit(offerId, {
              articleOptions: formData.goodsBenefitConditions,
            })
              .then((res) => {
                toast.success("Offer created successfully");
                setOfferId(null);
                setCurrentStep(1);
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (formData.benefitType === BenefitType.FREE_PRODUCTS) {
            addFreeProductsBenefit(offerId, {
              productOptions: formData.productsBenefitConditions,
            })
              .then((res) => {
                toast.success("Offer created successfully");
                setOfferId(null);
                setCurrentStep(1);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          break;
        default:
          break;
      }
    },
    [email, offerId, currentStep]
  );

  const offerName = watch("offerName");
  const offerCode = watch("offerCode");
  const offerPhoto = watch("offerPhoto");
  const offerDescription = watch("offerDescription");
  const offerType = watch("offerType");
  const allowedUsers = watch("allowedUsers");
  const priceCentricOffer = watch("priceCentricOffer");
  const selectedProducts = watch("selectedProducts");
  const selectedArticles = watch("selectedArticles");
  const benefitType = watch("benefitType");
  const conditions = watch("conditions", []);
  const boxBaseOfferProducts = watch("boxBaseOfferProducts", []);
  const goodsBenefitConditions = watch("goodsBenefitConditions", []);
  const productsBenefitConditions = watch("productsBenefitConditions", []);

  const [values, setValues] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValues(newValue);
  };

  useEffect(() => {
    setValue("");
  }, [benefitType]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex justify-start">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <h1 className="text-2xl font-semibold mb-4">
                Step 1: Basic Details
              </h1>
              <div className="grid grid-cols-4">
                <CustomInput
                  label={"Offer Name"}
                  placeholder={"Enter offer name"}
                  inputProps={register("offerName", {
                    required: "Offer name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message:
                        "Offer name can only contain alphabets and spaces",
                    },
                  })}
                  error={errors?.offerName}
                />
                <CustomInput
                  label={"Offer Photo"}
                  placeholder={"Upload"}
                  inputProps={{
                    // value: offerPhoto,
                    type: "file",
                    accept: "image/*",
                    className: "py-2 text-xs",
                    onChange: async (e) => {
                      const res = await handleImageUpload(e);
                      if (res.status === 200) {
                        setValue("offerPhoto", res.data);
                        console.log(res.data);
                      }
                    },
                  }}
                  error={errors?.offerPhoto}
                />
                <CustomInput
                  label={"Offer Code"}
                  placeholder={"Enter offer code"}
                  inputProps={register("offerCode", {
                    required: "Offer code is required",
                  })}
                  error={errors?.offerCode}
                />
                <CustomInput
                  label={"Offer Description"}
                  placeholder={"Enter offer description"}
                  inputProps={register("offerDescription", {
                    required: "Offer description is required",
                  })}
                  error={errors?.offerDescription}
                />
              </div>

              <div className={"mt-5 grid grid-cols-4"}>
                <div className="flex flex-col">
                  <label className="text-black text-lg">Offer Type</label>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Radio checked={offerType === "Price Centric"} />
                      }
                      {...register("offerType", {
                        required: "Offer type is required",
                      })}
                      label="Price Centric"
                      value={"Price Centric"}
                    />
                    <FormControlLabel
                      control={
                        <Radio checked={offerType === "Product Centric"} />
                      }
                      {...register("offerType", {
                        required: "Offer type is required",
                      })}
                      label="Product Centric"
                      value={"Product Centric"}
                    />
                    <FormControlLabel
                      control={<Radio checked={offerType === "Box Base"} />}
                      {...register("offerType", {
                        required: "Offer type is required",
                      })}
                      label="Box Base"
                      value={"Box Base"}
                    />
                  </FormGroup>

                  {errors?.offerType && (
                    <span className="text-[red] mt-1">
                      {errors?.offerType?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-black text-lg">Expiry Date</label>
                  <Controller
                    name="expiryDate"
                    control={control}
                    rules={{ required: "Expiry date is required" }}
                    render={({ field }) => (
                      <ReactDatePicker
                        className="h-10 bg-white py-2 px-2 text-sm rounded-md outline-none border border-solid border-gray-900 text-black placeholder-gray-900 pl-2"
                        {...field}
                        autoComplete="off"
                        dateFormat="d MMM yyyy"
                        minDate={new Date()}
                        selected={field.value ? new Date(field.value) : null}
                        showTimeSelect={false}
                        dropdownMode="select"
                        placeholderText="Select expiry date"
                        shouldCloseOnSelect
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                  {errors?.expiryDate && (
                    <span className="text-[red] mt-1">
                      {errors?.expiryDate?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-black text-lg">Allowed User</label>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            allowedUsers && allowedUsers.includes("Buyer")
                          }
                        />
                      }
                      {...register("allowedUsers", {
                        required: "At least one user should be allowed",
                      })}
                      value={"Buyer"}
                      label="Buyer"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            allowedUsers && allowedUsers.includes("Salesman")
                          }
                        />
                      }
                      {...register("allowedUsers")}
                      value={"Salesman"}
                      label="Salesman"
                    />
                  </FormGroup>

                  {errors?.allowedUsers && (
                    <span className="text-[red] mt-1">
                      {errors?.allowedUsers?.message}
                    </span>
                  )}
                </div>
                {offerType === "Price Centric" && (
                  <div className="flex flex-col">
                    <label className="text-black text-lg">
                      Price Centric SubType
                    </label>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={
                              priceCentricOffer?.priceCentricOfferSubType == 0
                            }
                            onChange={() =>
                              setValue(
                                "priceCentricOffer.priceCentricOfferSubType",
                                0
                              )
                            }
                          />
                        }
                        label="Amount"
                        value={0}
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            checked={
                              priceCentricOffer?.priceCentricOfferSubType == 1
                            }
                            onChange={() =>
                              setValue(
                                "priceCentricOffer.priceCentricOfferSubType",
                                1
                              )
                            }
                          />
                        }
                        label="Order History"
                        value={1}
                      />
                    </FormGroup>

                    {errors?.priceCentricOffer?.priceCentricOfferSubType && (
                      <span className="text-[red] mt-1">
                        {
                          errors?.priceCentricOffer?.priceCentricOfferSubType
                            ?.message
                        }
                      </span>
                    )}
                  </div>
                )}
              </div>
              {(priceCentricOffer?.priceCentricOfferSubType == 0 ||
                priceCentricOffer?.priceCentricOfferSubType) && (
                <div className="mt-5 grid grid-cols-4">
                  {priceCentricOffer.priceCentricOfferSubType == 0 && (
                    <CustomInput
                      label={"Amount"}
                      placeholder={"Enter amount"}
                      inputProps={{
                        ...register("priceCentricOffer.amount", {
                          required: "Offer amount is required",
                          valueAsNumber: true,
                        }),
                        type: "number",
                      }}
                      error={errors?.amount}
                    />
                  )}
                  {priceCentricOffer.priceCentricOfferSubType == 1 && (
                    <>
                      <CustomInput
                        label={"Amount"}
                        placeholder={"Enter amount"}
                        inputProps={{
                          ...register("priceCentricOffer.orderHistory.amount", {
                            required: "Offer amount is required",
                            valueAsNumber: true,
                          }),
                          type: "number",
                        }}
                        error={errors?.priceCentricOffer?.orderHistory?.amount}
                      />
                      <CustomInput
                        label={"History Amoumt"}
                        placeholder={"Enter amount"}
                        inputProps={{
                          ...register(
                            "priceCentricOffer.orderHistory.historyAmount",
                            {
                              required: "Offer history amount is required",
                              valueAsNumber: true,
                            }
                          ),
                          type: "number",
                        }}
                        error={
                          errors?.priceCentricOffer?.orderHistory?.historyAmount
                        }
                      />
                      <div className="flex flex-col">
                        <label className="text-black text-lg">
                          Starting Date
                        </label>
                        <Controller
                          name="priceCentricOffer.orderHistory.startingDate"
                          control={control}
                          rules={{ required: "Starting date is required" }}
                          render={({ field }) => (
                            <ReactDatePicker
                              className="h-10 bg-white py-2 px-2 text-sm rounded-md outline-none border border-solid border-gray-900 text-black placeholder-gray-900 pl-2"
                              {...field}
                              dateFormat="d MMM yyyy"
                              minDate={new Date()}
                              selected={
                                field.value ? new Date(field.value) : null
                              }
                              autoComplete="off"
                              showTimeSelect={false}
                              dropdownMode="select"
                              placeholderText="Select expiry date"
                              shouldCloseOnSelect
                              onChange={(date) => field.onChange(date)}
                            />
                          )}
                        />
                        {errors?.priceCentricOffer?.orderHistory
                          ?.startingDate && (
                          <span className="text-[red] mt-1">
                            {
                              errors?.priceCentricOffer?.orderHistory
                                ?.startingDate?.message
                            }
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label className="text-black text-lg">Last Date</label>
                        <Controller
                          name="priceCentricOffer.orderHistory.lastDate"
                          control={control}
                          rules={{ required: "Last date is required" }}
                          render={({ field }) => (
                            <ReactDatePicker
                              className="h-10 bg-white py-2 px-2 text-sm rounded-md outline-none border border-solid border-gray-900 text-black placeholder-gray-900 pl-2"
                              {...field}
                              dateFormat="d MMM yyyy"
                              minDate={new Date()}
                              selected={
                                field.value ? new Date(field.value) : null
                              }
                              autoComplete="off"
                              showTimeSelect={false}
                              dropdownMode="select"
                              placeholderText="Select expiry date"
                              shouldCloseOnSelect
                              onChange={(date) => field.onChange(date)}
                            />
                          )}
                        />
                        {errors?.priceCentricOffer?.orderHistory?.lastDate && (
                          <span className="text-[red] mt-1">
                            {
                              errors?.priceCentricOffer?.orderHistory?.lastDate
                                ?.message
                            }
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className="w-full flex justify-center mt-24">
                <button
                  className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
                  type="submit"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <FormProvider
            register={register}
            handleSubmit={handleSubmit}
            watch={watch}
            control={control}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          >
            <div className="flex justify-start">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <h1 className="text-2xl font-semibold mb-4">
                  {offerType === "Product Centric"
                    ? "Step 2: Create product centrics"
                    : "Step 2: Create box basis"}
                </h1>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={values}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{
                      "& .MuiTabs-flexContainer": {
                        justifyContent: "space-between", // Align tabs evenly
                        // gap:"15"
                      },
                      "& .MuiTab-root": {
                        maxWidth: "unset", // Remove max width
                        flex: 1, // Allow tabs to grow equally
                        color: "white",
                      },
                      "& .Mui-selected": {
                        // Styles for the active tab
                        color: "primary.main", // Change text color
                        borderBottom: "2px solid primary.main", // Add bottom border
                        background: "white",
                      },
                    }}
                  >
                    <Tab
                      label="Group"
                      {...a11yProps(0)}
                      style={{ maxWidth: "unset", flex: 1 }}
                    />
                    <Tab
                      label="Preview"
                      {...a11yProps(1)}
                      style={{ maxWidth: "unset", flex: 1 }}
                    />
                  </Tabs>
                </Box>
                <CustomTabPanel value={values} index={0}>
                  {offerType === "Product Centric" && (
                    <div className="flex gap-2 flex-wrap">
                      {products.map((product) => (
                        <ProductCard product={product} />
                      ))}
                    </div>
                  )}
                  {offerType === "Box Base" && (
                    <div className="flex gap-2 flex-wrap">
                      {products.map((product) => (
                        <ProductCard product={product} boxBase={true} />
                      ))}
                    </div>
                  )}

                  <Box sx={{ "& > :not(style)": { m: 1 } }}>
                    <Fab
                      variant="extended"
                      style={{
                        margin: 0,
                        top: "auto",
                        right: 40,
                        bottom: 30,
                        left: "auto",
                        position: "fixed",
                      }}
                      disabled={
                        !selectedProducts ||
                        !removeUndefinedEntries(selectedProducts).length
                      }
                      onClick={async () => {
                        await trigger();
                        if (Object.keys(errors).length === 0) {
                          if (offerType === "Product Centric") {
                            toast.success("Group created");
                            setValue("conditions", [
                              ...conditions,
                              {
                                // id: Math.random(),
                                productOffers:
                                  removeUndefinedEntries(selectedProducts),
                              },
                            ]);
                          } else {
                            toast.success("Product added");
                            setValue("boxBaseOfferProducts", [
                              ...boxBaseOfferProducts,
                              {
                                ...selectedProducts[0],
                                quantity: undefined,
                                sizeX: undefined,
                                sizeY: undefined,
                                unitBoxQuantity:
                                  +selectedProducts[0]?.sizeX *
                                  +selectedProducts[0]?.sizeY *
                                  +selectedProducts[0]?.quantity,
                              },
                              ,
                              ,
                            ]);
                          }
                          setValue("selectedProducts", []);
                        }
                      }}
                    >
                      {offerType === "Product Centric" ? "Create Group" : "Add"}
                    </Fab>
                  </Box>
                </CustomTabPanel>
                <CustomTabPanel value={values} index={1}>
                  {offerType === "Product Centric" && (
                    <div className="flex flex-col gap-5">
                      {conditions.map(({ productOffers }, idx) => {
                        return (
                          <>
                            <div className="flex w-full gap-3 text-2xl text-left items-center">
                              <div className="text-center align-middle">
                                Group {idx + 1}
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const filteredConditions = conditions.filter(
                                    (el, index) => idx !== index
                                  );
                                  setValue("conditions", filteredConditions);
                                  toast.success("Group removed");
                                }}
                              >
                                <DeleteRoundedIcon
                                  color="error"
                                  sx={{ height: "30px", width: "30px" }}
                                />
                              </button>
                            </div>
                            <hr />
                            <div className="flex flex-col md:flex-row gap-5">
                              {productOffers.map((product, index) => (
                                <PreviewCard
                                  boxBase={offerType === "Box Base"}
                                  product={{
                                    ...products.find(
                                      (el) => el.id === product.productId
                                    ),
                                    ...product,
                                  }}
                                />
                              ))}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  )}
                  {offerType === "Box Base" && (
                    <div className="flex flex-col gap-5">
                      {boxBaseOfferProducts.map((boxOffer, idx) => {
                        return (
                          <>
                            <div className="flex w-full justify-start text-xl text-center gap-3">
                              <div className="text-center align-middle">
                                Group {idx + 1}
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const filteredProducts =
                                    boxBaseOfferProducts.filter(
                                      (el, index) => idx !== index
                                    );
                                  setValue(
                                    "boxBaseOfferProducts",
                                    filteredProducts
                                  );
                                  toast.success("Group removed");
                                }}
                              >
                                <DeleteRoundedIcon
                                  color="error"
                                  sx={{ height: "30px", width: "30px" }}
                                />
                              </button>
                            </div>
                            <hr />
                            <div className="flex flex-col md:flex-row gap-5">
                              <PreviewCard
                                boxBase={true}
                                product={{
                                  ...products.find(
                                    (el) => el.id === boxOffer.productId
                                  ),
                                  ...boxOffer,
                                }}
                              />
                            </div>
                          </>
                        );
                      })}
                    </div>
                  )}
                </CustomTabPanel>
                <div className="w-full flex justify-center mt-12">
                  <button
                    className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
                    type="submit"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </FormProvider>
        );
      case 3:
        return (
          <FormProvider
            register={register}
            handleSubmit={handleSubmit}
            watch={watch}
            control={control}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          >
            <div className="flex justify-start">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <h1 className="text-2xl font-semibold mb-4">Create Benefits</h1>
                <div className="flex flex-col">
                  <label className="text-black text-lg">Benefit Type</label>
                  <FormGroup
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                      marginBottom: "15px",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Radio checked={benefitType === BenefitType.DISCOUNT} />
                      }
                      {...register("benefitType", {
                        required: "Discount type is required",
                      })}
                      label="Discount Offer"
                      value={"Discount Offer"}
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={benefitType === BenefitType.FREE_GOODS}
                        />
                      }
                      {...register("benefitType", {
                        required: "Discount type is required",
                      })}
                      label="Free Goods Offer"
                      value={"Free Goods Offer"}
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          checked={benefitType === BenefitType.FREE_PRODUCTS}
                        />
                      }
                      {...register("benefitType", {
                        required: "Discount type is required",
                      })}
                      label="Free Products Offer"
                      value={"Free Products Offer"}
                    />
                  </FormGroup>
                  {errors?.benefitType && (
                    <span className="text-[red]">
                      {errors?.benefitType?.message}
                    </span>
                  )}
                </div>

                {benefitType === BenefitType.DISCOUNT && (
                  <div className="flex gap-4 mt-2">
                    <CustomInput
                      label={"Discount Percentage"}
                      placeholder={"Enter percentage"}
                      inputProps={{
                        ...register("discountPercentage", {
                          required: "Discount percentage is required",
                          max: {
                            value: 100,
                            message:
                              "Discount percentage should be less than 100",
                          },
                          valueAsNumber: true,
                        }),
                        type: "number",
                      }}
                      error={errors?.discountPercentage}
                    />
                    <CustomInput
                      label={"Maximum Discount"}
                      placeholder={"Enter percentage"}
                      inputProps={{
                        ...register("maximumDiscount", {
                          required: "Maximum discount is required",
                          valueAsNumber: true,
                        }),
                        type: "number",
                      }}
                      error={errors?.maximumDiscount}
                    />
                  </div>
                )}
                {(benefitType === BenefitType.FREE_GOODS ||
                  benefitType === BenefitType.FREE_PRODUCTS) && (
                  <>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={values}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab
                          label={
                            benefitType === BenefitType.FREE_GOODS
                              ? "Goods Group"
                              : "Products Group"
                          }
                          {...a11yProps(0)}
                          style={{ maxWidth: "unset", flex: 1 }}
                        />
                        <Tab
                          label="Preview"
                          {...a11yProps(1)}
                          style={{ maxWidth: "unset", flex: 1 }}
                        />
                      </Tabs>
                    </Box>
                    <CustomTabPanel value={values} index={0}>
                      <div className="flex gap-5 flex-wrap">
                        {benefitType === BenefitType.FREE_GOODS
                          ? articles.map((article) => (
                              <ArticleCard article={article} />
                            ))
                          : products.map((product) => (
                              <ProductCard product={product} />
                            ))}
                      </div>

                      <Box sx={{ "& > :not(style)": { m: 1 } }}>
                        <Fab
                          variant="extended"
                          style={{
                            margin: 0,
                            top: "auto",
                            right: 40,
                            bottom: 30,
                            left: "auto",
                            position: "fixed",
                          }}
                          disabled={
                            benefitType === BenefitType.FREE_GOODS
                              ? !selectedArticles ||
                                !removeUndefinedEntries(selectedArticles).length
                              : !selectedProducts ||
                                !removeUndefinedEntries(selectedProducts).length
                          }
                          onClick={async () => {
                            await trigger();
                            if (Object.keys(errors).length === 0) {
                              toast.success("Group created");
                              if (benefitType === BenefitType.FREE_GOODS) {
                                setValue("goodsBenefitConditions", [
                                  ...goodsBenefitConditions,
                                  {
                                    articleWithQuantities:
                                      removeUndefinedEntries(selectedArticles),
                                  },
                                ]);
                                setValue("selectedArticles", []);
                              } else {
                                setValue("productsBenefitConditions", [
                                  ...productsBenefitConditions,
                                  {
                                    productWithQuantities:
                                      removeUndefinedEntries(selectedProducts),
                                  },
                                ]);
                                setValue("selectedProducts", []);
                              }
                            }
                          }}
                        >
                          Create Group
                        </Fab>
                      </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={values} index={1}>
                      <div className="flex flex-col gap-5">
                        {benefitType === BenefitType.FREE_GOODS
                          ? goodsBenefitConditions.map(
                              ({ articleWithQuantities }, idx) => {
                                return (
                                  <>
                                    <div className="flex w-full justify-start text-xl text-center gap-3">
                                      <div className="text-center align-middle">
                                        Group {idx + 1}
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const filteredConditions =
                                            goodsBenefitConditions.filter(
                                              (el, index) => idx !== index
                                            );
                                          setValue(
                                            "goodsBenefitConditions",
                                            filteredConditions
                                          );
                                          toast.success("Group removed");
                                        }}
                                      >
                                        <DeleteRoundedIcon
                                          color="error"
                                          sx={{ height: "30px", width: "30px" }}
                                        />
                                      </button>
                                    </div>
                                    <div className="flex flex-col md:flex-row flex-wrap gap-5">
                                      {articleWithQuantities.map(
                                        (article, index) => (
                                          <ArticlePreviewCard
                                            article={{
                                              ...articles.find(
                                                (el) =>
                                                  el.id === article.articleId
                                              ),
                                              ...article,
                                            }}
                                          />
                                        )
                                      )}
                                    </div>
                                  </>
                                );
                              }
                            )
                          : productsBenefitConditions.map(
                              ({ productWithQuantities }, idx) => {
                                return (
                                  <>
                                    <div className="flex w-full justify-start text-xl text-center gap-3">
                                      <div className="text-center align-middle">
                                        Group {idx + 1}
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const filteredConditions =
                                            productsBenefitConditions.filter(
                                              (el, index) => idx !== index
                                            );
                                          setValue(
                                            "productsBenefitConditions",
                                            filteredConditions
                                          );
                                          toast.success("Group removed");
                                        }}
                                      >
                                        <DeleteRoundedIcon
                                          color="error"
                                          sx={{ height: "30px", width: "30px" }}
                                        />
                                      </button>
                                    </div>
                                    <div className="flex flex-wrap gap-5">
                                      {productWithQuantities.map(
                                        (product, index) => (
                                          <PreviewCard
                                            product={{
                                              ...products.find(
                                                (el) =>
                                                  el.id === product.productId
                                              ),
                                              ...product,
                                            }}
                                          />
                                        )
                                      )}
                                    </div>
                                  </>
                                );
                              }
                            )}
                      </div>
                    </CustomTabPanel>
                  </>
                )}
                <div className="w-full flex justify-center mt-12">
                  <button
                    className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
                    type="submit"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </FormProvider>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-cyan-900 text-white h-screen overflow-y-auto">
      <div className="pt-10 flex justify-center w-full">
        <Toaster position="top-center" />
        <Stepper activeStep={currentStep - 1} alternativeLabel>
          <Step key={1}>
            <StepLabel />
          </Step>
          <Step key={2}>
            <StepLabel />
          </Step>
          <Step key={3}>
            <StepLabel />
          </Step>
        </Stepper>
      </div>
      <div className="mt-6 ml-[56px] px-10 mb-6">{renderStep()}</div>
    </div>
  );
}

export default AddOffer;
