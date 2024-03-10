//
import axios from "axios";
import moment from "moment/moment";
import { useState } from "react";
const API_BASE = "http://localhost:4000"; //'https://busy-handkerchief-fawn.cyclic.app/' //"http://localhost:4000";

export default function Appointment() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const smallScreen = 1000;
  const [confirmationSnackbarMessage, setConfirmationSnackbarMessage] =
    useState("");

  // //   const [currentSchedule, SetCurrentSchedule] = useState([]);

  const [processed, SetProcessed] = useState(false);
  const [confirmationTextVisible, SetConfirmationTextVisible] = useState(false);
  const [confirmationSnackbarOpen, SetConfirmationSnackbarOpen] =
    useState(false);
  const [appointmentDate, SetAppointmentDate] = useState(null);
  const [appointmentSlot, SetAppointmentSlot] = useState(null);
  const [appointmentMeridiem, SetAppointmentMeridiem] = useState(0);
  const [schedule, SetSchedule] = useState([]);
  const [appointmentDateSelected, SetAppointmentDateSelected] = useState(false);
  const [validEmail, SetValidEmail] = useState(false);
  const [validPhone, SetValidPhone] = useState(false);
  const [confirmationModalOpen, SetConfirmationModalOpen] = useState(false);
  const [finished, SetFinished] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);

  //  const [validEmail, SetValidEmail] = useState(0);

  async function fetchDataFromApi() {
    // console.log(
    const datas = await axios({
      url: "/appointments",
      method: "get", // default
      baseURL: API_BASE, //"http://bit.ly/2mTM3nY",
    });
    console.log("this ", datas.data);
  }
  async function sendDataToApi(data) {
    // console.log(
      try {
        
    await axios({
      url: "/appointmentCreate",
      method: "post", // default
      baseURL: API_BASE, //"http://bit.ly/2mTM3nY",
      data: data,
    });
      } catch (erro) {
       console.log(erro); 
      }
    // console.log("this ", datas.data);
  }
  async function getDataOnSlots() {
    // console.log(
    const slots = await axios({
      url: "/retrieveSlots",
      method: "get", // default
      baseURL: API_BASE, //"http://bit.ly/2mTM3nY",
    });
    console.log("this ", slots.data);
  }

  function validateEmail(dEmail) {
    const regex =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/;

    console.log(dEmail, email, validEmail, regex.test(dEmail)); // test if the code works
    // this is to check if the value inputed is valid for an email
    if (regex.test(dEmail)) {
      setEmail(dEmail);
      SetValidEmail(true);
    } else {
      SetValidEmail(false);
    }
  }
  function validatePhone(phoneNumber) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/;

    console.log(phoneNumber, validPhone, regex.test(phoneNumber)); // test if the code works
    if (regex.test(phoneNumber)) {
      setPhone(phoneNumber);
      SetValidPhone(true);
    } else {
      SetValidPhone(false);
    }
    // console.log(contactFormFilled);
  }

  function handleSetAppointmentDate(date) {
    //  // double check thus
    console.log(appointmentDate);
    if (date !== null) SetAppointmentDate(date);
    SetConfirmationTextVisible(true);
  }
  function handleSetAppointmentSlot(slot) {
    SetAppointmentSlot(slot);
  }
  // function handleSetAppointmentMeridiem(meridiem) {
  //   SetAppointmentMeridiem(meridiem);
  // }

  // function checkDisableDate(day) {
  //   const dateString = moment(day).format("YYYY-DD-MM");
  //   return (
  //     schedule[dateString] === true ||
  //     moment(day).startOf("day").diff(moment().startOf("day")) < 0
  //   );
  // }

  // function handleDBReponse(response) {
  //   const appointments = response;
  //   const today = moment().startOf("day"); //start of today 12 am
  //   const initialSchedule = {};
  //   initialSchedule[today.format("YYYY-DD-MM")] = true;
  //   const schedule = !appointments.length
  //     ? initialSchedule
  //     : appointments.reduce((currentSchedule, appointment) => {
  //         const { slot_date, slot_time } = appointment;
  //         const dateString = moment(slot_date, "YYYY-DD-MM").format(
  //           "YYYY-DD-MM"
  //         );

  //         if (currentSchedule[slot_date]) {
  //           currentSchedule[dateString] = Array(8).fill(false);
  //         } else {
  //           return null;
  //         }
  //         if (Array.isArray(currentSchedule[dateString])) {
  //           currentSchedule[dateString][slot_time] = true;
  //         } else {
  //           return null;
  //         }
  //         return currentSchedule;
  //       }, initialSchedule);
  //   for (let day in schedule) {
  //     let slots = schedule[day];
  //     if (slots.length) {
  //       if (slots.every((slot) => slot === true)) {
  //         schedule[day] = true;
  //       } else {
  //         return null;
  //       }
  //     } else {
  //       return null;
  //     }
  //   }
  //   SetSchedule(schedule);
  // }

  // function renderAppointmentConfirmation() {
  //   const spanStyle = { color: "#00C853" };
  //   return (
  //     <section>
  //       <p>
  //         Name:{" "}
  //         <span style={spanStyle}>
  //           {firstName} {lastName}
  //         </span>
  //       </p>
  //       <p>
  //         Number: <span style={spanStyle}>{phone}</span>
  //       </p>
  //       <p>
  //         Email: <span style={spanStyle}>{email}</span>
  //       </p>
  //       <p>
  //         Appointment:{" "}
  //         <span style={spanStyle}>
  //           {moment(appointmentDate).format("dddd[,] MMMM Do[,] YYYY")}
  //         </span>{" "}
  //         at{" "}
  //         <span style={spanStyle}>
  //           {moment()
  //             .hour(9)
  //             .minute(0)
  //             .add(appointmentSlot, "hours")
  //             .format("h:mm a")}
  //         </span>
  //       </p>
  //     </section>
  //   );
  // }

  function handleSubmit() {
    SetConfirmationModalOpen(false);
    const newAppointment = {
      name: firstName + " " + lastName,
      email: email,
      phone: phone,
      slot_date: moment(appointmentDate).format("YYYY-DD-MM"),
      slot_time: appointmentSlot,
    };

    // console.log(newAppointment);
    try {
      sendDataToApi(newAppointment).then((res) => {
        setConfirmationSnackbarMessage("Appointment succesfully added!");
        SetConfirmationSnackbarOpen(true);
        SetProcessed(true);
      });
    } catch (err) {
      console.log(err);

      setConfirmationSnackbarMessage("Appointment failed to save!");
      SetConfirmationSnackbarOpen(true);

      return SetProcessed(true);
    }
  }

  // // {
  // // const {
  // //   //   finished,
  // //   isLoading,
  // //   smallScreen,
  // //   stepIndex,
  // //   confirmationModalOpen,
  // //   confirmationSnackbarOpen,
  // //   ...data
  // // } = state;
  const contactFormFilled =
    firstName && lastName && phone && email && validPhone && validEmail;

  // const DatePickerExampleSimple = () => (
  //   <div>
  //     <input
  //       type="date"
  //       hintText="Select Date"
  //       mode={smallScreen ? "portrait" : "landscape"}
  // onChange={(n, date) => handleSetAppointmentDate(date)}
  //       shouldDisableDate={(day) => checkDisableDate(day)}
  //     />
  //   </div>
  // );
  const modalActions = [
    <button
      label="Cancel"
      primary={false}
      onClick={() => SetConfirmationModalOpen(false)}
    >
      Cancle
    </button>,
    <button
      label="Confirm"
      style={{ backgroundColor: "#00C853 !important" }}
      primary={true}
      onClick={() => handleSubmit()}
    >
      Confirm{" "}
    </button>,
  ];
  let a;
  // fetchDataFromApi();
  // getDataOnSlots();
  // sendDataToApi();
  return (
    // <div></div>
    <div className="appointment-container">
      <h1 className="title-scheduler      ">Vet-In Appointment Scheduler</h1>
      <nav>
        <div className="nav-item">Menu</div>
        <div className="nav-item">About</div>
        <div className="nav-item">contact</div>
      </nav>
      <hr />

      <section className="appointment-wrapper">
        <div className="appintment-card">
          <div className="accordian-steps date">
            <input
              type="date"
              name="appointmentDate"
              id="appointmentDate"
              onChange={(e) => {
                handleSetAppointmentDate(e.target.value);
              }}
            />
          </div>
          <div className="accordian-step date">
            <input
              type="time"
              name="appointmentTime"
              id="appointmentTime"
              onChange={(e) => {
                handleSetAppointmentSlot(e.target.value);
              }}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="detail-field">
          <input
            type="text"
            name="first_name"
            id="first_name"
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@email.com"
            // errorText={validEmail ? null : "Enter a valid email address"}
            onChange={(e) => {
              validateEmail(e.target.value);
            }}
          />
          <input
            type="phone"
            name="phone"
            id="phone"
            placeholder="(234) 812 332 3380"
            // errorText={validPhone ? null : "Enter a valid phone number"}
            onChange={(e) => {
              validatePhone(e.target.value);
            }}
          />
        </div>
      </section>
      <button
        style={
          contactFormFilled
            ? {
                display: "block",
                backgroundColor: "#00C853",
                marginTop: 20,
                maxWidth: 100,
              }
            : {
                display: "block",
                backgroundColor: "red",
                marginTop: 20,
                maxWidth: 100,
              }
        }
        label={
          contactFormFilled
            ? "Schedule"
            : "Fill out your information to schedule"
        }
        primary={true}
        fullWidth={true}
        onClick={() => handleSubmit()} //SetConfirmationModalOpen(!confirmationModalOpen)}
        disabled={!contactFormFilled || processed}
      >
        {contactFormFilled
          ? "Schedule"
          : "Fill out your information to schedule"}
      </button>
    </div>
  );
}
