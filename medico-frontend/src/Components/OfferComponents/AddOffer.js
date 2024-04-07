import React, { useEffect } from "react";
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

const BenefitType = {
  DISCOUNT: "Discount Offer",
  FREE_GOODS: "Free Goods Offer",
  FREE_PRODUCTS: "Free Products Offer",
};

const DEMO_PRODUCTS = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    type: 0,
    division: "Oral",
    brandName: "Tylenol",
    drugName: "Acetaminophen",
    manufacturingName: "ABC Pharmaceuticals",
    manufacturerName: "ABC Manufacturing Inc.",
    prescription: 1,
    letterPadDocument: "ABC123",
    licenseNo: "ABC-456",
    photoUrl: "https://5.imimg.com/data5/SELLER/Default/2022/9/YZ/RK/ZM/126733516/tylenol-extra-strength-caplets-with-500-mg-acetaminophen-pain-reliever-fever-reducer-100-count-500x500.jpg",
    mrp: 50,
    retailPrice: 40,
    sellingPrice: 35,
    packSize: {
      id: "1",
      x: 50,
      y: 20,
    },
    returnPolicy: {
      id: "1",
      returnDays: 30,
      allowReturn: true,
      allowExchange: true,
    },
    productBatches: [
      {
        id: "1",
        manufacturingDate: "2023-01-01",
        expiryDate: "2024-12-31",
        quantity: 100,
        price: 30,
        isSold: false,
        isVisible: true,
      },
      {
        id: "2",
        manufacturingDate: "2023-03-15",
        expiryDate: "2024-12-31",
        quantity: 200,
        price: 25,
        isSold: false,
        isVisible: true,
      },
    ],
    contents: "Acetaminophen 500mg tablets",
    effectivePriceCalculationType: 0,
    value: 0,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66asdfa6",
    type: 1,
    division: "Injectable",
    brandName: "Advil",
    drugName: "Ibuprofen",
    manufacturingName: "XYZ Pharmaceuticals",
    manufacturerName: "XYZ Manufacturing Inc.",
    prescription: 1,
    letterPadDocument: "XYZ789",
    licenseNo: "XYZ-123",
    photoUrl: "https://5.imimg.com/data5/SELLER/Default/2022/9/YZ/RK/ZM/126733516/tylenol-extra-strength-caplets-with-500-mg-acetaminophen-pain-reliever-fever-reducer-100-count-500x500.jpg",
    mrp: 60,
    retailPrice: 50,
    sellingPrice: 45,
    packSize: {
      id: "2",
      x: 50,
      y: 10,
    },
    returnPolicy: {
      id: "2",
      returnDays: 30,
      allowReturn: true,
      allowExchange: true,
    },
    productBatches: [
      {
        id: "3",
        manufacturingDate: "2023-02-01",
        expiryDate: "2024-12-31",
        quantity: 50,
        price: 40,
        isSold: false,
        isVisible: true,
      },
    ],
    contents: "Ibuprofen 200mg injection",
    effectivePriceCalculationType: 0,
    value: 0,
  },
  {
    id: "3",
    type: 0,
    division: "Oral",
    brandName: "Allegra",
    drugName: "Fexofenadine",
    manufacturingName: "DEF Pharmaceuticals",
    manufacturerName: "DEF Manufacturing Inc.",
    prescription: 1,
    letterPadDocument: "DEF456",
    licenseNo: "DEF-789",
    photoUrl: "https://5.imimg.com/data5/SELLER/Default/2022/9/YZ/RK/ZM/126733516/tylenol-extra-strength-caplets-with-500-mg-acetaminophen-pain-reliever-fever-reducer-100-count-500x500.jpg",
    mrp: 70,
    retailPrice: 60,
    sellingPrice: 55,
    packSize: {
      id: "3",
      x: 15,
      y: 30,
    },
    returnPolicy: {
      id: "3",
      returnDays: 30,
      allowReturn: true,
      allowExchange: true,
    },
    productBatches: [
      {
        id: "4",
        manufacturingDate: "2023-03-01",
        expiryDate: "2024-12-31",
        quantity: 80,
        price: 50,
        isSold: false,
        isVisible: true,
      },
    ],
    contents: "Fexofenadine 120mg tablets",
    effectivePriceCalculationType: 0,
    value: 0,
  },
  {
    id: "4",
    type: 1,
    division: "Injectable",
    brandName: "Benadryl",
    drugName: "Diphenhydramine",
    manufacturingName: "GHI Pharmaceuticals",
    manufacturerName: "GHI Manufacturing Inc.",
    prescription: 1,
    letterPadDocument: "GHI123",
    licenseNo: "GHI-456",
    photoUrl: "https://5.imimg.com/data5/SELLER/Default/2022/9/YZ/RK/ZM/126733516/tylenol-extra-strength-caplets-with-500-mg-acetaminophen-pain-reliever-fever-reducer-100-count-500x500.jpg",
    mrp: 80,
    retailPrice: 70,
    sellingPrice: 65,
    packSize: {
      id: "4",
      x: 10,
      y: 20,
    },
    returnPolicy: {
      id: "4",
      returnDays: 30,
      allowReturn: true,
      allowExchange: true,
    },
    productBatches: [
      {
        id: "5",
        manufacturingDate: "2023-04-01",
        expiryDate: "2024-12-31",
        quantity: 70,
        price: 60,
        isSold: false,
        isVisible: true,
      },
    ],
    contents: "Diphenhydramine 25mg injection",
    effectivePriceCalculationType: 0,
    value: 0,
  },
  {
    id: "5",
    type: 0,
    division: "Oral",
    brandName: "Zyrtec",
    drugName: "Cetirizine",
    manufacturingName: "JKL Pharmaceuticals",
    manufacturerName: "JKL Manufacturing Inc.",
    prescription: 1,
    letterPadDocument: "JKL789",
    licenseNo: "JKL-123",
    photoUrl: "https://5.imimg.com/data5/SELLER/Default/2022/9/YZ/RK/ZM/126733516/tylenol-extra-strength-caplets-with-500-mg-acetaminophen-pain-reliever-fever-reducer-100-count-500x500.jpg",
    mrp: 90,
    retailPrice: 80,
    sellingPrice: 75,
    packSize: {
      id: "5",
      x: 20,
      y: 40,
    },
    returnPolicy: {
      id: "5",
      returnDays: 30,
      allowReturn: true,
      allowExchange: true,
    },
    productBatches: [
      {
        id: "6",
        manufacturingDate: "2023-05-01",
        expiryDate: "2024-12-31",
        quantity: 60,
        price: 70,
        isSold: false,
        isVisible: true,
      },
    ],
    contents: "Cetirizine 10mg tablets",
    effectivePriceCalculationType: 0,
    value: 0,
  },
  {
    id: "6",
    type: 1,
    division: "Injectable",
    brandName: "Claritin",
    drugName: "Loratadine",
    manufacturingName: "MNO Pharmaceuticals",
    manufacturerName: "MNO Manufacturing Inc.",
    prescription: 1,
    letterPadDocument: "MNO456",
    licenseNo: "MNO-789",
    photoUrl: "https://5.imimg.com/data5/SELLER/Default/2022/9/YZ/RK/ZM/126733516/tylenol-extra-strength-caplets-with-500-mg-acetaminophen-pain-reliever-fever-reducer-100-count-500x500.jpg",
    mrp: 100,
    retailPrice: 90,
    sellingPrice: 85,
    packSize: {
      id: "6",
      x: 25,
      y: 50,
    },
    returnPolicy: {
      id: "6",
      returnDays: 30,
      allowReturn: true,
      allowExchange: true,
    },
    productBatches: [
      {
        id: "7",
        manufacturingDate: "2023-06-01",
        expiryDate: "2024-12-31",
        quantity: 40,
        price: 80,
        isSold: false,
        isVisible: true,
      },
    ],
    contents: "Loratadine 5mg injection",
    effectivePriceCalculationType: 0,
    value: 0,
  },
];

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
  const [currentStep, setCurrentStep] = React.useState(1);
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

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    if (currentStep < 3) {
      if (offerType === "Price Centric" && currentStep === 1) setCurrentStep(1);
      else setCurrentStep(currentStep + 1);
    } else {
      console.log("Final Submission", data);
    }
  };

  const offerName = watch("offerName");
  const offerCode = watch("offerCode");
  const offerPhoto = watch("offerPhoto");
  const offerDescription = watch("offerDescription");
  const offerType = watch("offerType");
  const expiryDate = watch("expiryDate");
  const allowedUser = watch("allowedUser");
  const offerDiscount = watch("offerDiscount");
  const selectedProducts = watch("selectedProducts");
  const selectedArticles = watch("selectedArticles");
  const benefitType = watch("benefitType");
  const conditions = watch("conditions", []);
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
                    ...register("offerPhoto", {
                      required: "Offer photo is required",
                    }),
                    type: "file",
                    accept: "image/*",
                    className: "py-2 text-xs",
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

              <div className="mt-5 grid grid-cols-4">
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
                {offerType === "Price Centric" && (
                  <div className="flex">
                    <CustomInput
                      label={"Offer discount"}
                      placeholder={"Enter discount"}
                      inputProps={register("offerDiscount", {
                        required: "Offer discount is required",
                      })}
                      error={errors?.offerDiscount}
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <label className="text-black text-lg">Expiry Date</label>
                  <Controller
                    name="expiryDate"
                    control={control}
                    rules={{ required: "Expiry date is required" }}
                    render={({ field }) => (
                      <ReactDatePicker
                        className="h-10 bg-gray-400 py-2 px-2 text-sm rounded-md outline-none border border-solid border-gray-900 text-black placeholder-gray-900 pl-2"
                        {...field}
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
                <div className="flex flex-col mt-5">
                  <label className="text-black text-lg">Allowed User</label>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            allowedUser && allowedUser.includes("Doctor")
                          }
                        />
                      }
                      {...register("allowedUser", {
                        required: "At least one user should be allowed",
                      })}
                      value={"Doctor"}
                      label="Doctor"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            allowedUser && allowedUser.includes("Engineer")
                          }
                        />
                      }
                      {...register("allowedUser")}
                      value={"Engineer"}
                      label="Engineer"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            allowedUser && allowedUser.includes("Farmer")
                          }
                        />
                      }
                      {...register("allowedUser")}
                      value={"Farmer"}
                      label="Farmer"
                    />
                  </FormGroup>

                  {errors?.allowedUser && (
                    <span className="text-[red] mt-1">
                      {errors?.allowedUser?.message}
                    </span>
                  )}
                </div>
              </div>
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
                    <div className="grid grid-cols-3 gap-4">
                      {DEMO_PRODUCTS.map((product) => (
                        <ProductCard product={product} />
                      ))}
                    </div>
                  )}
                  {offerType === "Box Base" && (
                    <div className="grid grid-cols-4">
                      {DEMO_PRODUCTS.map((product) => (
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
                          toast.success("Group created");
                          setValue("conditions", [
                            ...conditions,
                            {
                              id: Math.random(),
                              productOffers:
                                removeUndefinedEntries(selectedProducts),
                            },
                          ]);
                        }
                      }}
                    >
                      Create Group
                    </Fab>
                  </Box>
                </CustomTabPanel>
                <CustomTabPanel value={values} index={1}>
                  {/* {offerType === "Product Centric" && ( */}
                  <div className="flex flex-col gap-5">
                    {conditions.map(({ productOffers }, idx) => {
                      return (
                        <>
                          <div className="w-full justify-center text-xl text-center">
                            Group {idx + 1}
                          </div>
                          <div className="flex flex-wrap gap-5">
                            {productOffers.map((product, index) => (
                              <PreviewCard
                                boxBase={offerType === "Box Base"}
                                product={{
                                  ...DEMO_PRODUCTS.find(
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
                          ? DEMO_ARTICLES.map((article) => (
                              <ArticleCard article={article} />
                            ))
                          : DEMO_PRODUCTS.map((product) => (
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
                                    id: Math.random(),
                                    articleWithQuantities:
                                      removeUndefinedEntries(selectedArticles),
                                  },
                                ]);
                              } else {
                                setValue("productsBenefitConditions", [
                                  ...productsBenefitConditions,
                                  {
                                    id: Math.random(),
                                    productWithQuantities:
                                      removeUndefinedEntries(selectedProducts),
                                  },
                                ]);
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
                                    <div className="w-full justify-center text-xl text-center">
                                      Group {idx + 1}
                                    </div>
                                    <div className="flex flex-wrap gap-5">
                                      {articleWithQuantities.map(
                                        (article, index) => (
                                          <ArticlePreviewCard
                                            article={{
                                              ...DEMO_ARTICLES.find(
                                                (el) =>
                                                  el.id === article.productId
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
                                    <div className="w-full justify-center text-xl text-center">
                                      Group {idx + 1}
                                    </div>
                                    <div className="flex flex-wrap gap-5">
                                      {productWithQuantities.map(
                                        (product, index) => (
                                          <PreviewCard
                                            product={{
                                              ...DEMO_PRODUCTS.find(
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
