import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../api/axios";
import Swal from "sweetalert2";
import email from "../../Assets/email.png";
import lock from "../../Assets/lock.png";
import facebook from "../../Assets/Facebook_icon.png";
import google from "../../Assets/google.png";
import apple from "../../Assets/apple.png";
import openEye from "../../Assets/openEye.png";
import closeEye from "../../Assets/closeEye.png";
import arrow from "../../Assets/arrow.png";
import trash from "../../Assets/trash.png";
import phone from "../../Assets/phone.png";
import user from "../../Assets/user.png";
import { LuPen } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import CloseIcon from "@mui/icons-material/Close";
import PlaceIcon from "@mui/icons-material/Place";
import { Dropdown } from "primereact/dropdown";
import { useProgress, AuthContext } from "../../context";
import { ProgressAndServiceList } from "./ProgressAndServiceList";
import clock from "../../Assets/clock.png";
import cash from "../../Assets/cash.png";
import { LOGIN_URL, SIGNUP_URL } from "../../Constants";
import {
  useListCountriesAndCities,
  useGetAddressByLatAndLon,
} from "../../Queries";

const Step3 = () => {
  const navigate = useNavigate();
  const [addLocation, setAddLocation] = useState(false);
  const [addLocationMenu, setAddLocationMenu] = useState(false);
  const [eye, setEye] = useState(false);
  const API_KEY = "AIzaSyCfVmmRxuCJlRx3-Pkxu1mnPgFPM95jSog";
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [isSignUp, setIsSignup] = useState(false);
  const { data: listCountriesAndCities = [] } = useListCountriesAndCities();
  const { data: formattedAddress } = useGetAddressByLatAndLon(lat, long);

  const {
    progress,
    updateProgress,
    resetAttributes,
    formAttributes,
    setFormAttributes,
  } = useProgress();
  const { setAuth } = useContext(AuthContext);
  const { countries = [] } = useMemo(
    () => ({ countries: listCountriesAndCities.map((res) => res.name) }),
    [listCountriesAndCities]
  );

  const isSignedIn = localStorage.getItem("jwt");

  const { cities = [] } = useMemo(
    () => ({
      cities: listCountriesAndCities
        .find((res) => res.name === formAttributes.location.country)
        ?.cities.map((cit) => cit.name),
    }),
    [formAttributes.location.country, listCountriesAndCities]
  );

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getCoordinates,
        handleLocationError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getCoordinates = (position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  };

  useEffect(() => {
    if (lat && long && !!formattedAddress) {
      setFormAttributes({
        ...formAttributes,
        location: {
          ...formAttributes.location,
          details: formattedAddress,
        },
      });
    }
  }, [formAttributes, formattedAddress, lat, long, setFormAttributes]);

  const handleLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default: {
        alert("An unknown error occurred.");
      }
    }
  };

  const [errorText, setErrorText] = useState("");

  const handleNext = () => {
    if (!formAttributes.jobDetails.startImmediatly) {
      if (!formAttributes.jobDetails.startDate) {
        setErrorText("*Start Date is not Selected");
        return;
      }

      if (!formAttributes.jobDetails.endDate) {
        setErrorText("*End Date is not Selected");
        return;
      }

      if (formAttributes.jobDetails.startDate.isBefore(dayjs(), "day")) {
        setErrorText("*Start date is not earlier than today");
        return;
      }
      if (
        formAttributes.jobDetails.endDate.isBefore(
          formAttributes.jobDetails.startDate,
          "day"
        )
      ) {
        setErrorText("*End date must be grater then starrt date");
        return;
      }
    }

    if (
      !formAttributes.location?.addressType ||
      !formAttributes.location?.details
    ) {
      setErrorText("*Select Location");
      return;
    }
    updateProgress(progress + 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (addLocation) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [addLocation]);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const signUpValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name must not exceed 25 characters"),
    email: yup
      .string()
      .email("Invalid email address")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address")
      .required("Email is required"),
    number: yup
      .string()
      .matches(/^\+?[0-9]+$/, "Invalid number")
      .min(7, "Number must be at least 7 digits")
      .max(15, "Number must be at most 15 digits")
      .required("Number is required"),
    password: yup
      .string()
      .min(7, "Password must be at least 7 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{7,}$/,
        "Choose a strong password"
      )
      .required("Password is required"),
    //agree: yup.boolean().oneOf([true], "You must agree to the Terms & Conditions"),
  });

  const signUpFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      password: "",
      //agree: false,
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      try {
        const userData = {
          FullName: values.name,
          Password: values.password,
          Email: values.email,
          MobileNumber: values.number,
          IsHandyman: true,
        };
        const response = await axios.post(SIGNUP_URL, userData);
        setIsSignup(false);
        Swal.fire({
          title: "Signed Up Successfully!",
          icon: "success",
          confirmButtonText: "Login Now",
        }).then((result) => {
          if (result.isConfirmed) {
            setIsSignup(true);
          }
        });
      } catch (error) {}
    },
  });

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const userData = {
          FullName: "",
          Password: values.password,
          Email: values.email,
          MobileNumber: "",
          IsHandyman: true,
        };
        const response = await axios.post(LOGIN_URL, userData);
        setAuth(response.data);
      } catch (err) {
        if (!err.response) {
          Swal.fire({
            title: "Something went wrong!",
            text: "Please check your internet connection and try again.",
            icon: "error",
            confirmButtonText: "Retry",
          }).then((result) => {
            if (result.isConfirmed) {
              setAuth({});
            }
          });
        } else if (err.response.status === 401) {
          Swal.fire({
            title: "Invalid email or password!",
            icon: "error",
            confirmButtonText: "Retry",
          }).then((result) => {
            if (result.isConfirmed) {
              setAuth({});
            }
          });
        }
      }
    },
  });
  return (
    <>
      {addLocation && !isSignedIn && isSignUp && (
        <>
          <section className="w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-10">
            <div
              className="w-screen h-screen bg-black bg-opacity-20 absolute top-0 left-0 z-20"
              onClick={() => {
                setAddLocation(false);
                setIsSignup(false);
              }}
            ></div>
            <section className="w-full sm_desktop:w-[50%] bg-white h-screen overflow-y-scroll sm_desktop:h-fit sm_desktop:max-h-[90vh] p-5 sm_tablet:p-10 flex flex-col gap-10 font-Onest rounded-[30px] relative z-30 popup">
              <div className="flex justify-center gap-2 flex-col">
                <span className="flex items-center justify-between">
                  <h2 className="text-[#292C38] text-4xl font-bold">Sign Up</h2>
                  <CloseIcon
                    className="cursor-pointer"
                    onClick={() => {
                      setAddLocation(false);
                      setIsSignup(false);
                    }}
                  />
                </span>
                <h4 className="font-medium text-sm text-[#868580]">
                  Sign up to continue
                </h4>
              </div>
              <section className="flex items-center justify-center">
                <div className="flex-1 text-[#00CF91] text-center bg-green-50 py-3 font-medium text-sm border border-[#00CF91]">
                  Sign Up
                </div>
                <img
                  src={arrow}
                  alt="arrow"
                  className="pointer-events-none h-5"
                />
                <div className="flex-1 text-[#0d0d0d] text-center bg-white py-3 font-medium text-sm border border-[#E1DFD7]">
                  Add Location
                </div>
              </section>
              <form onSubmit={signUpFormik.handleSubmit} noValidate>
                <section className="flex flex-col gap-5">
                  <div className="flex items-center justify-center gap-5 flex-col sm_desktop:flex-row">
                    <span className="relative w-full flex flex-col gap-2">
                      <input
                        type="text"
                        name="name"
                        value={signUpFormik.values.name}
                        onBlur={signUpFormik.handleBlur}
                        onChange={signUpFormik.handleChange}
                        placeholder="Full Name"
                        className="flex-1 w-full border border-[#E0E5ED] px-12 py-4 rounded-xl placeholder:text-[#96A0B5]"
                      />
                      <img
                        src={user}
                        alt="user"
                        className="absolute top-1/2 left-7 transform -translate-x-1/2 -translate-y-1/2"
                      />
                      {signUpFormik.touched.name &&
                        signUpFormik.errors.name && (
                          <p className="absolute -bottom-5 left-0 text-sm text-red-500">
                            {signUpFormik.errors.name}
                          </p>
                        )}
                    </span>
                    <span className="relative w-full">
                      <input
                        type="email"
                        name="email"
                        value={signUpFormik.values.email}
                        onBlur={signUpFormik.handleBlur}
                        onChange={signUpFormik.handleChange}
                        placeholder="Email"
                        className="flex-1 w-full border border-[#E0E5ED] px-12 py-4 rounded-xl placeholder:text-[#96A0B5]"
                      />
                      <img
                        src={email}
                        alt="email"
                        className="absolute top-1/2 left-7 transform -translate-x-1/2 -translate-y-1/2"
                      />
                      {signUpFormik.touched.email &&
                        signUpFormik.errors.email && (
                          <p className="absolute -bottom-5 left-0 text-sm text-red-500">
                            {signUpFormik.errors.email}
                          </p>
                        )}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-5 flex-col sm_desktop:flex-row">
                    <span className="relative w-full">
                      <input
                        type="tel"
                        name="number"
                        value={signUpFormik.values.number}
                        onBlur={signUpFormik.handleBlur}
                        onChange={signUpFormik.handleChange}
                        placeholder="Phone Number"
                        className="flex-1 w-full border border-[#E0E5ED] px-12 py-4 rounded-xl placeholder:text-[#96A0B5]"
                      />
                      <img
                        src={phone}
                        alt="phone"
                        className="absolute top-1/2 left-7 transform -translate-x-1/2 -translate-y-1/2"
                      />
                      {signUpFormik.touched.number &&
                        signUpFormik.errors.number && (
                          <p className="absolute -bottom-5 left-0 text-sm text-red-500">
                            {signUpFormik.errors.number}
                          </p>
                        )}
                    </span>
                    <span className="relative w-full">
                      <input
                        type={eye ? "text" : "password"}
                        name="password"
                        value={signUpFormik.values.password}
                        onBlur={signUpFormik.handleBlur}
                        onChange={signUpFormik.handleChange}
                        placeholder="Password"
                        className="flex-1 w-full border border-[#E0E5ED] px-12 py-4 rounded-xl placeholder:text-[#96A0B5]"
                      />
                      <img
                        src={lock}
                        alt="lock"
                        className="absolute top-1/2 left-7 transform -translate-x-1/2 -translate-y-1/2"
                      />
                      <img
                        src={eye ? closeEye : openEye}
                        alt="eye"
                        className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setEye(!eye)}
                      />
                      {signUpFormik.touched.password &&
                        signUpFormik.errors.password && (
                          <p className="absolute -bottom-5 left-0 text-sm text-red-500">
                            {signUpFormik.errors.password}
                          </p>
                        )}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-[#00CF91] text-white font-semibold text-base py-3 rounded-md"
                  >
                    Sign Up
                  </button>
                  <div className="flex items-center gap-5">
                    <hr className="h-0 border-t border-[#ECEFF4] w-full" />
                    <h3 className="font-medium text-sm text-[#73778B] w-fit whitespace-nowrap">
                      Or Sign Up With
                    </h3>
                    <hr className="h-0 border-t border-[#ECEFF4] w-full" />
                  </div>
                  <div className="w-full flex items-center justify-between gap-5">
                    <button className="w-full flex items-center justify-center gap-2 font-normal text-sm text-[#0D0B01] border border-[#E1DFD7] py-3">
                      <img src={facebook} alt="facebook" />{" "}
                      <h3 className="hidden sm_tablet:block">Facebook</h3>{" "}
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 font-normal text-sm text-[#0D0B01] border border-[#E1DFD7] py-3">
                      <img src={google} alt="google" />{" "}
                      <h3 className="hidden sm_tablet:block">Google</h3>{" "}
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 font-normal text-sm text-[#0D0B01] border border-[#E1DFD7] py-3">
                      <img src={apple} alt="apple" />{" "}
                      <h3 className="hidden sm_tablet:block">Apple</h3>{" "}
                    </button>
                  </div>
                  <span className="w-full flex items-center justify-center gap-2 font-medium text-base">
                    <h3 className="text-[#0D0B01]">
                      Do you already have an account?
                    </h3>
                    <h3
                      className="text-[#00CF91] cursor-pointer"
                      onClick={() => {
                        setIsSignup(false);
                      }}
                    >
                      Login
                    </h3>
                  </span>
                </section>
              </form>
            </section>
          </section>
        </>
      )}
      {addLocation && !isSignedIn && !isSignUp && (
        <section className="w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-10">
          <div
            className="w-screen h-screen bg-black bg-opacity-20 absolute top-0 left-0 z-20"
            onClick={() => setAddLocation(false)}
          ></div>
          <section className="w-full sm_desktop:w-[50%] bg-white h-screen overflow-y-scroll sm_desktop:h-fit sm_desktop:max-h-[90vh] p-5 sm_tablet:p-10 flex flex-col gap-10 font-Onest rounded-[30px] relative z-30 popup">
            <div className="flex justify-center gap-2 flex-col">
              <span className="flex items-center justify-between">
                <h2 className="text-[#292C38] text-4xl font-bold">Login</h2>
                <CloseIcon
                  className="cursor-pointer"
                  onClick={() => setAddLocation(false)}
                />
              </span>
              <h4 className="font-medium text-sm text-[#868580]">
                Welcome back! Log in to continue
              </h4>
            </div>
            <section className="flex items-center justify-center">
              <div className="flex-1 text-[#00CF91] text-center bg-green-50 py-3 font-medium text-sm border border-[#00CF91]">
                Login
              </div>
              <img
                src={arrow}
                alt="arrow"
                className="pointer-events-none h-5"
              />
              <div className="flex-1 text-[#0d0d0d] text-center bg-white py-3 font-medium text-sm border border-[#E1DFD7]">
                Add Location
              </div>
            </section>
            <form onSubmit={loginFormik.handleSubmit} noValidate>
              <section className="flex flex-col gap-5">
                <div className="flex items-center justify-center flex-col gap-5">
                  <span className="relative w-full">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={loginFormik.values.email}
                      onBlur={loginFormik.handleBlur}
                      onChange={loginFormik.handleChange}
                      className="flex-1 w-full border border-[#E0E5ED] px-12 py-4 rounded-xl placeholder:text-[#96A0B5]"
                    />
                    <img
                      src={email}
                      alt="email"
                      className="absolute top-1/2 left-7 transform -translate-x-1/2 -translate-y-1/2"
                    />
                    {loginFormik.touched.email && loginFormik.errors.email && (
                      <p className="absolute -bottom-5 left-0 text-sm text-red-500">
                        {loginFormik.errors.email}
                      </p>
                    )}
                  </span>
                  <span className="relative w-full">
                    <input
                      type={eye ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={loginFormik.values.password}
                      onBlur={loginFormik.handleBlur}
                      onChange={loginFormik.handleChange}
                      className="flex-1 w-full border border-[#E0E5ED] px-12 py-4 rounded-xl placeholder:text-[#96A0B5]"
                    />
                    <img
                      src={lock}
                      alt="lock"
                      className="absolute top-1/2 left-7 transform -translate-x-1/2 -translate-y-1/2"
                    />
                    <img
                      src={eye ? closeEye : openEye}
                      alt="eye"
                      className="absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setEye(!eye)}
                    />
                    {loginFormik.touched.password &&
                      loginFormik.errors.password && (
                        <p className="absolute -bottom-5 left-0 text-sm text-red-500">
                          {loginFormik.errors.password}
                        </p>
                      )}
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center bg-[#00CF91] text-white font-semibold text-base py-3 rounded-md button_global_style"
                >
                  Login
                </button>
                <div className="flex items-center gap-5">
                  <hr className="h-0 border-t border-[#ECEFF4] w-full" />
                  <h3 className="font-medium text-sm text-[#73778B] w-fit whitespace-nowrap">
                    Or Login With
                  </h3>
                  <hr className="h-0 border-t border-[#ECEFF4] w-full" />
                </div>
                <div className="w-full flex items-center justify-between gap-5">
                  <button className="w-full flex items-center justify-center gap-2 font-normal text-sm text-[#0D0B01] border border-[#E1DFD7] py-3 button_global_style">
                    <img src={facebook} alt="facebook" /> Facebook
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 font-normal text-sm text-[#0D0B01] border border-[#E1DFD7] py-3 button_global_style">
                    <img src={google} alt="google" /> Google
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 font-normal text-sm text-[#0D0B01] border border-[#E1DFD7] py-3 button_global_style">
                    <img src={apple} alt="apple" /> Apple
                  </button>
                </div>
                <span className="w-full flex items-center justify-center gap-2 font-medium text-base">
                  <h3 className="text-[#0D0B01]">Don't have an account?</h3>
                  <h3
                    className="text-[#00CF91] cursor-pointer"
                    onClick={() => setIsSignup(true)}
                  >
                    Create
                  </h3>
                </span>
              </section>
            </form>
          </section>
        </section>
      )}
      {addLocation && isSignedIn && (
        <section className="w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-10">
          <div
            className="w-screen h-screen bg-black bg-opacity-20 absolute top-0 left-0 z-20"
            onClick={() => setAddLocation(false)}
          ></div>
          <section className="w-full sm_desktop:w-[50%] bg-white h-screen overflow-y-scroll sm_desktop:h-fit sm_desktop:max-h-[90vh] p-5 sm_tablet:p-10 flex flex-col gap-10 font-Onest rounded-[30px] relative z-30 popup">
            <div className="flex justify-center gap-2 flex-col">
              <span className="flex items-center justify-between">
                <h2 className="text-[#292C38] text-4xl font-bold">
                  Location is not found
                </h2>
                <CloseIcon
                  className="cursor-pointer"
                  onClick={() => setAddLocation(false)}
                />
              </span>
              <h4 className="font-medium text-sm text-[#868580]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui,
                ea!
              </h4>
            </div>
            <section className="flex items-center justify-center">
              <div className="flex-1  text-[#0d0d0d] text-center bg-white py-3 font-medium text-sm border border-[#E1DFD7] ">
                {" "}
                Login{" "}
              </div>
              <img
                src={arrow}
                alt="arrow"
                className="pointer-events-none h-5"
              />
              <div className="flex-1 text-[#00CF91] text-center bg-green-50 py-3 font-medium text-sm border border-[#00CF91] ">
                {" "}
                Add Location{" "}
              </div>
            </section>
            <section>
              <label
                htmlFor="location_dropdown"
                className="font-medium text-base text-[#0D0B01]"
              >
                Select Country
              </label>
              <Dropdown
                value={formAttributes.location.country}
                onChange={(e) => {
                  setFormAttributes({
                    ...formAttributes,
                    location: {
                      ...formAttributes.location,
                      country: e.value,
                    },
                  });
                }}
                options={countries}
                placeholder="Select Country"
                className="w-full md:w-14rem border border-[#E0E5ED] rounded-xl p-1 pr-5 text-[#0D0B01] "
              />
            </section>
            <section>
              <label
                htmlFor="location_dropdown"
                className="font-medium text-base text-[#0D0B01]"
              >
                Select City
              </label>
              <Dropdown
                value={formAttributes.location.city}
                onChange={(e) => {
                  setFormAttributes({
                    ...formAttributes,
                    location: {
                      ...formAttributes.location,
                      city: e.value,
                    },
                  });
                }}
                options={cities}
                placeholder="Select City"
                className="w-full md:w-14rem border border-[#E0E5ED] rounded-xl p-1 pr-5 text-[#0D0B01] "
              />
            </section>

            {addLocationMenu && (
              <section className="w-full rounded-3xl bg-[#F2F2F2] p-[5%] flex flex-col gap-5">
                <span className="flex items-center justify-between">
                  <span className="flex gap-2 items-center">
                    <HorizontalRuleIcon />
                    <h2 className="font-bold text-2xl">New Location</h2>
                  </span>
                  <img
                    src={trash}
                    alt="bin"
                    className="object-center cursor-pointer p-2 rounded-full hover:bg-red-50 transition ease-in duration-150"
                  />
                </span>
                <div className="flex flex-col gap-7">
                  <div className="flex flex-col gap-2 font-medium text-base">
                    <h3 className="font-medium text-base text-[#0D0B01]">
                      Location type
                    </h3>
                    <span className="flex items-center gap-2 font-medium text-base">
                      <button
                        className={`flex-1 text-center border py-3 rounded-lg ${
                          formAttributes.location.addressType === "Apartment"
                            ? "bg-[#00CF91] text-white"
                            : "bg-white text-[#0D0B01]"
                        } transition ease-in duration-150 `}
                        onClick={() => {
                          setFormAttributes({
                            ...formAttributes,
                            location: {
                              ...formAttributes.location,
                              addressType: "Apartment",
                            },
                          });
                        }}
                      >
                        Apartment
                      </button>
                      <button
                        className={`flex-1 text-center border py-3 rounded-lg ${
                          formAttributes.location.addressType === "Villa"
                            ? "bg-[#00CF91] text-white"
                            : "bg-white text-[#0D0B01]"
                        } transition ease-in duration-150 `}
                        onClick={() => {
                          setFormAttributes({
                            ...formAttributes,
                            location: {
                              ...formAttributes.location,
                              addressType: "Villa",
                            },
                          });
                        }}
                      >
                        Villa
                      </button>
                      <button
                        className={`flex-1 text-center border py-3 rounded-lg ${
                          formAttributes.location.addressType === "Office"
                            ? "bg-[#00CF91] text-white"
                            : "bg-white text-[#0D0B01]"
                        } transition ease-in duration-150 `}
                        onClick={() => {
                          setFormAttributes({
                            ...formAttributes,
                            location: {
                              ...formAttributes.location,
                              addressType: "Office",
                            },
                          });
                        }}
                      >
                        Office
                      </button>
                    </span>
                  </div>
                  <section className="flex flex-col gap-2">
                    <h3 className="font-medium text-base text-[#0D0B01]">
                      Number and Building name
                    </h3>
                    <input
                      type="text"
                      name="buildingDetails"
                      value={formAttributes.location.numberAndBuildingName}
                      onChange={(e) =>
                        setFormAttributes({
                          ...formAttributes,
                          location: {
                            ...formAttributes.location,
                            numberAndBuildingName: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-white rounded-lg p-3"
                      placeholder="Write details here.."
                    />
                  </section>
                  <section className="flex flex-col gap-2">
                    <h3 className="font-medium text-base text-[#0D0B01]">
                      Area
                    </h3>
                    <input
                      value={formAttributes.location.area}
                      onChange={(e) =>
                        setFormAttributes({
                          ...formAttributes,
                          location: {
                            ...formAttributes.location,
                            area: e.target.value,
                          },
                        })
                      }
                      type="text"
                      name="buildingDetails"
                      className="w-full bg-white rounded-lg p-3"
                      placeholder="Enter area"
                    />
                  </section>
                  <section className="flex flex-col gap-2">
                    <h3 className="font-medium text-base text-[#0D0B01]">
                      Area
                    </h3>
                    <span className="relative">
                      <input
                        type="text"
                        name="buildingDetails"
                        className="w-full bg-white rounded-lg p-3"
                        placeholder="Click on map icon to get your location"
                        value={formAttributes.location.details}
                        disabled
                      />
                      <PlaceIcon
                        onClick={getLocation}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer "
                      />
                    </span>
                  </section>
                  {lat && long ? (
                    <section className="flex flex-col gap-2">
                      <h3 className="font-medium text-base text-[#0D0B01]">
                        Area on map
                      </h3>
                      <span className="relative">
                        <img
                          src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x400&sensor=false&key=${API_KEY}&markers=color:red%7C${lat},${long}`}
                          alt="lora"
                        />
                      </span>
                    </section>
                  ) : (
                    ""
                  )}
                </div>
              </section>
            )}
            <span
              className="flex gap-3 items-center text-[#00CF91] cursor-pointer"
              onClick={() => setAddLocationMenu(true)}
            >
              <ControlPointRoundedIcon style={{ fill: "#00CF91" }} />
              <h4 className="font-semibold text-base">Add Location</h4>
            </span>
            <button
              onClick={() => setAddLocation(false)}
              className="w-full bg-[#00CF91] text-white font-bold text-base rounded-lg py-3"
            >
              Continue Adding Job Details
            </button>
          </section>
        </section>
      )}
      <div className="flex flex-col gap-10 px-5 py-10 sm_desktop:py-0">
        <section className="w-full h-full flex flex-col sm_desktop:gap-[10%] gap-10 sm_desktop:flex-row">
          <ProgressAndServiceList />
          <section className="w-full sm_desktop:w-[45%] h-full flex flex-col gap-7">
            <span
              className="flex gap-3 w-fit cursor-pointer"
              onClick={() => {
                updateProgress(progress - 1);
              }} //progress --
            >
              <FaArrowLeft color="#00CF91" fontSize="1.5rem" />
              <h3 className="font-Onest font-semibold text-lg text-[#00CF91]">
                Go Back
              </h3>
            </span>
            <header className="flex flex-col gap-5">
              <h2 className="font-bold text-2xl text-[#0D0B01]">
                Add Job Details
              </h2>
              <p className="text-[#868580] font-medium text-[20px]">
                This will help a job post stand out
              </p>
            </header>
            <section className="flex flex-wrap gap-5 lg:flex-nowrap">
              <div className="flex-1">
                <h3 className="font-medium text-lg text-[#0D0B01]">
                  Start Date
                </h3>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      disabled={!!formAttributes.jobDetails.startImmediatly}
                      value={formAttributes.jobDetails.startDate}
                      onChange={(newValue) => {
                        setFormAttributes({
                          ...formAttributes,
                          jobDetails: {
                            ...formAttributes.jobDetails,
                            startDate: newValue,
                          },
                        });
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg text-[#0D0B01]">End Date</h3>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      disabled={!!formAttributes.jobDetails.startImmediatly}
                      value={formAttributes.jobDetails.endDate}
                      onChange={(newValue) => {
                        setFormAttributes({
                          ...formAttributes,
                          jobDetails: {
                            ...formAttributes.jobDetails,
                            endDate: newValue,
                          },
                        });
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </section>
            <span className="flex gap-3 items-center w-fit">
              <input
                checked={!!formAttributes.jobDetails.startImmediatly}
                type="checkbox"
                name="start_immediately"
                id="start_immediately"
                className="focus:outline-none w-4 h-4 checked:accent-[#459b81]"
                onChange={(e) => {
                  if (e.target.checked) {
                    setErrorText("");
                  }
                  setFormAttributes({
                    ...formAttributes,
                    jobDetails: {
                      ...formAttributes.jobDetails,
                      startImmediatly: e.target.checked,
                    },
                  });
                }}
              />
              <label htmlFor="start_immediately" className="cursor-pointer">
                I want to start immediately
              </label>
            </span>
            <section className="flex gap-5">
              <div
                className={`flex-1 flex flex-col justify-center object-cover gap-2 py-7 px-4 rounded-3xl border ${
                  !!formAttributes.jobDetails.isHourlyRate
                    ? "bg-green-50 border-[#00CF91]"
                    : "border-[#E1DFD7] bg-white"
                } cursor-pointer hover:shadow-md transition-all ease-in-out duration-200 `}
                onClick={() => {
                  setFormAttributes({
                    ...formAttributes,
                    jobDetails: {
                      ...formAttributes.jobDetails,
                      isHourlyRate: true,
                      isfixRate: false,
                    },
                  });
                }}
              >
                <img src={clock} alt="" className="w-10 h-10" />
                <h4 className="font-bold text-lg">Hourly rate</h4>
              </div>
              <div
                className={`flex-1 flex flex-col justify-center object-cover gap-2 py-7 px-4 rounded-3xl border ${
                  !formAttributes.jobDetails.isHourlyRate
                    ? "bg-green-50 border-[#00CF91]"
                    : "border-[#E1DFD7] bg-white"
                } cursor-pointer hover:shadow-md transition-all ease-in-out duration-200`}
                onClick={() => {
                  setFormAttributes({
                    ...formAttributes,
                    jobDetails: {
                      ...formAttributes.jobDetails,
                      isHourlyRate: false,
                      isfixRate: true,
                      startRate: null,
                      endRate: null,
                    },
                  });
                }}
              >
                <img src={cash} alt="" className="w-10 h-10" />
                <h4 className="font-bold text-lg">Fixed Price</h4>
              </div>
            </section>
            {!!formAttributes.jobDetails.isfixRate && (
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="fixed_price">Enter Price</label>
                <div className="w-fit relative flex gap-2 items-center">
                  <input
                    value={formAttributes.jobDetails.fixedPriceAmount}
                    onChange={(e) => {
                      setFormAttributes({
                        ...formAttributes,
                        jobDetails: {
                          ...formAttributes.jobDetails,
                          fixedPriceAmount: e.target.value,
                        },
                      });
                    }}
                    type="number"
                    id="fixed_price"
                    placeholder="Your desired price"
                    className="w-full px-7 py-3 border rounded-xl"
                  />
                  <p className="absolute left-3 top-1/2 -translate-y-1/2">$</p>
                </div>
              </div>
            )}
            {!!formAttributes.jobDetails.isHourlyRate && (
              <div className="w-full flex gap-2">
                <div className="flex-1 flex flex-col gap-2 font-medium text-lg text-[#0D0B01]">
                  <h4>From</h4>
                  <div className="w-fit relative flex gap-2 items-center">
                    <input
                      value={formAttributes.jobDetails.startRate}
                      onChange={(e) => {
                        setFormAttributes({
                          ...formAttributes,
                          jobDetails: {
                            ...formAttributes.jobDetails,
                            startRate: e.target.value,
                          },
                        });
                      }}
                      type="number"
                      className="w-full px-7 py-3 border rounded-xl"
                    />
                    <p className="absolute left-3 top-1/2 -translate-y-1/2">
                      $
                    </p>
                    <h3>/hr</h3>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-2 font-medium text-lg text-[#0D0B01]">
                  <h4>To</h4>
                  <div className="w-fit relative flex gap-2 items-center">
                    <input
                      value={formAttributes.jobDetails.endRate}
                      onChange={(e) => {
                        setFormAttributes({
                          ...formAttributes,
                          jobDetails: {
                            ...formAttributes.jobDetails,
                            endRate: e.target.value,
                          },
                        });
                      }}
                      type="number"
                      className="w-full px-7 py-3 border rounded-xl"
                    />
                    <p className="absolute left-3 top-1/2 -translate-y-1/2">
                      $
                    </p>
                    <h3>/hr</h3>
                  </div>
                </div>
              </div>
            )}
            <div>
              <h3 className="font-light text-base text-[#0D0B01]">Notes</h3>
              <ul className="list-disc ml-5 font-light text-base text-[#636363] flex flex-col">
                <li>
                  Notes Professionals tend to charge $15 - $30 /hour (USD) for
                  full stack development projects like yours. Experts may charge
                  higher rates.
                </li>
              </ul>
            </div>
            <span
              className="flex gap-3 font-semibold text-base text-[#00CF91] cursor-pointer"
              onClick={() => setAddLocation(true)}
            >
              <ControlPointRoundedIcon style={{ fill: "#00CF91" }} />
              <h4>Add Location</h4>
            </span>
            <section className="w-full rounded-[30px] border-2 border-[#00CF91] p-5">
              <span className="flex items-center justify-between">
                <h2 className="font-bold text-2xl text-[#0D0B01]">
                  New Location
                </h2>
                <span className="flex items-center gap-2">
                  <LuPen
                    size={20}
                    color="#96A0B5"
                    className="cursor-pointer"
                    onClick={() => setAddLocation(true)}
                  />
                  <BsTrash
                    size={20}
                    color="#96A0B5"
                    className="cursor-pointer"
                    onClick={() => {
                      setFormAttributes({ ...formAttributes, location: {} });
                      setLat(null);
                      setLong(null);
                    }}
                  />
                </span>
              </span>
              <h4 className="font-medium text-base text-[#0D0B01]">
                {formAttributes.location.addressType}
              </h4>
              <h4 className="font-medium text-base text-[#0D0B01]">
                {formAttributes.location.numberAndBuildingName}
              </h4>
              <h4 className="font-medium text-base text-[#0D0B01]">
                {formAttributes.location.area}
              </h4>
            </section>
            {!!errorText && (
              <span
                style={{ color: "#dc2626" }}
                className="font-semibold text-base"
              >
                {errorText}
              </span>
            )}
          </section>
        </section>

        <span className="w-full flex items-center justify-end gap-5">
          <button
            onClick={() => {
              updateProgress(1);
              resetAttributes();
              navigate("/");
            }}
            className="font-semibold text-lg text-black p-4 rounded-md border borer-[#E1DFD7] hover:bg-red-600 outline-none focus:border-red-500 transition-colors ease-out duration-200"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              handleNext();
            }}
            className="font-semibold text-lg text-white bg-[#00CF91] rounded-md p-4 border borer-[#E1DFD7] hover:bg-[#1DA87E] outline-none focus:border-[#1DA87E] transition-colors ease-in duration-100"
          >
            Continue
          </button>
        </span>
      </div>
    </>
  );
};

export default Step3;
