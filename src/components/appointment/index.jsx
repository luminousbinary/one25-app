//
import axios from "axios";
import { useState } from "react";
const API_BASE = "http://localhost:4000"; //'https://busy-handkerchief-fawn.cyclic.app/' //"http://localhost:4000";

export default function Appointment() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const [confirmationSnackbarMessage, setConfirmationSnackbarMessage] =
  //   useState("");

  // const [stepIndex, SetStepIndex] = useState(0);
  // // //   const [currentSchedule, SetCurrentSchedule] = useState([]);

  // const [processed, SetProcessed] = useState(false);
  // const [confirmationTextVisible, SetConfirmationTextVisible] = useState(false);
  // const [confirmationSnackbarOpen, SetConfirmationSnackbarOpen] =
  //   useState(false);
  // const [appointmentDate, SetAppointmentDate] = useState(null);
  // const [appointmentSlot, SetAppointmentSlot] = useState(null);
  // const [appointmentMeridiem, SetAppointmentMeridiem] = useState(0);
  // const [schedule, SetSchedule] = useState([]);
  // const [appointmentDateSelected, SetAppointmentDateSelected] = useState(false);
  // const [validEmail, SetValidEmail] = useState(true);
  // const [validPhone, SetValidPhone] = useState(true);
  // const [confirmationModalOpen, SetConfirmationModalOpen] = useState(false);
  // const [finished, SetFinished] = useState(false);
  // const [isLoading, SetIsLoading] = useState(false);

  /// / const [validEmail, SetValidEmail] = useState(0);

  async function fetchDataFromApi() {
    // console.log(
    const datas = await axios({
      url: "/appointments",
      method: "get", // default
      baseURL: API_BASE, //"http://bit.ly/2mTM3nY",
    });
    console.log("this ", datas.data);

    // .then(function (response) {
    //   response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
    // })
    // );

    // const response = await axios.get(API_BASE + `api/retrieveSlots`);

    // if (response !== null) {
    //   console.log("response via db: ", response.data);
    //   handleDBReponse(response.data);
    // }
  }

  async function sendDataToApi() {
    // console.log(
    const datas = await axios({
      url: "/appointmentCreate",
      method: "post", // default
      baseURL: API_BASE, //"http://bit.ly/2mTM3nY",
      data: {
        slot_time: "2",
        slot_date: "2024-3-13",

        name: "Slim Shady",
        email: "slim@email.com",
        phone: "12345678901",
      },
    });
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
  // function handleNext() {
  //   SetStepIndex(stepIndex + 1);
  //   SetFinished(stepIndex >= 2);
  // }
  // function handlePrev() {
  //   if (stepIndex > 0) {
  //     SetStepIndex(stepIndex - 1);
  //   }
  // }

  // function validateEmail(email) {
  //   const regex =
  //     /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$    /i;
  //   return regex.test(email)
  //     ? SetValidEmail({ email: email, validEmail: true })
  //     : SetValidEmail(false);
  // }
  // function validatePhone(phoneNumber) {
  //   const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  //   return regex.test(phoneNumber)
  //     ? SetValidPhone({ phone: phoneNumber, validPhone: true })
  //     : SetValidPhone(false);
  // }

  // function handleSetAppointmentDate(date) {
  //   //  // double check thus
  //   if (date !== null) SetAppointmentDate(date);
  //   SetConfirmationTextVisible(true);
  // }
  // function handleSetAppointmentSlot(slot) {
  //   SetAppointmentSlot(slot);
  // }
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

  // function renderAppointmentTimes() {
  //   if (!isLoading) {
  //     const slots = [...Array(8).keys()];
  //     return slots.map((slot) => {
  //       const appointmentDateString =
  //         moment(appointmentDate).format("YYYY-DD-MM");
  //       const time1 = moment().hour(9).minute(0).add(slot, "hours");
  //       const time2 = moment()
  //         .hour(9)
  //         .minute(0)
  //         .add(slot + 1, "hours");
  //       const scheduleDisabled = schedule[appointmentDateString]
  //         ? schedule[moment(appointmentDate).format("YYYY-DD-MM")][slot]
  //         : false;
  //       const meridiemDisabled = appointmentMeridiem
  //         ? time1.format("a") === "am"
  //         : time1.format("a") === "pm";
  //       return (
  //         <RadioButton
  //           label={time1.format("h:mm a") + " - " + time2.format("h:mm a")}
  //           key={slot}
  //           value={slot}
  //           style={{
  //             marginBottom: 15,
  //             display: meridiemDisabled ? "none" : "inherit",
  //           }}
  //           disabled={scheduleDisabled || meridiemDisabled}
  //         />
  //       );
  //     });
  //   } else {
  //     return null;
  //   }
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

  // function handleSubmit() {
  //   SetConfirmationModalOpen(false);
  //   const newAppointment = {
  //     name: firstName + " " + lastName,
  //     email: email,
  //     phone: phone,
  //     slot_date: moment(appointmentDate).format("YYYY-DD-MM"),
  //     slot_time: appointmentSlot,
  //   };
  //   axios
  //     .post(API_BASE + "api/appointmentCreate", newAppointment)
  //     .then((response) => {
  //       setConfirmationSnackbarMessage("Appointment succesfully added!");
  //       SetConfirmationSnackbarOpen(true);
  //       SetProcessed(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);

  //       setConfirmationSnackbarMessage("Appointment failed to save!");
  //       SetConfirmationSnackbarOpen(true);

  //       return SetProcessed(true);
  //     });
  // }

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
  // const contactFormFilled =
  //   firstName && lastName && phone && email && validPhone && validEmail;
  // const DatePickerExampleSimple = () => (
  //   <div>
  //     <input
  //       type="date"
  //       hintText="Select Date"
  //       mode={smallScreen ? "portrait" : "landscape"}
  //       onChange={(n, date) => handleSetAppointmentDate(date)}
  //       shouldDisableDate={(day) => checkDisableDate(day)}
  //     />
  //   </div>
  // );
  // const modalActions = [
  //   <Button
  //     label="Cancel"
  //     primary={false}
  //     onClick={() => SetConfirmationModalOpen(false)}
  //   >
  //     Cancle
  //   </Button>,
  //   <Button
  //     label="Confirm"
  //     style={{ backgroundColor: "#00C853 !important" }}
  //     primary={true}
  //     onClick={() => handleSubmit()}
  //   >
  //     Confirm{" "}
  //   </Button>,
  // ];
  console.log("");
  fetchDataFromApi();
  getDataOnSlots();
  sendDataToApi();
  return (
    <div></div>
    // <div className="appointment-container">
    //   <h1 className="title-scheduler      ">Vet-In Appointment Scheduler</h1>
    //   <hr />

    //   <div style={{ margin: "12px 0" }}>
    //     <Button
    //       disableTouchRipple={true}
    //       disableFocusRipple={true}
    //       primary={true}
    //       onClick={handleNext}
    //       backgroundColor="#00C853 !important"
    //       style={{ marginRight: 12, backgroundColor: "#00C853" }}
    //     >
    //       {" "}
    //       {stepIndex === 2 ? "Finish" : "Next"}
    //     </Button>
    //     {stepIndex > 0 && (
    //       <Button
    //         disabled={stepIndex === 0}
    //         disableTouchRipple={true}
    //         disableFocusRipple={true}
    //         onClick={handlePrev}
    //       >
    //         {" "}
    //         Back
    //       </Button>
    //     )}
    //   </div>

    //   {/* <form action="" method="post">
    //     <input type="date" name="slot-date" id="slot-date" />
    //     <input type="time" name="slot-time" id="slot-time" />
    //     <input type="text" name="personal-info" id="personal-info" placeholder="info"/>
    //     <input type="text" name="names" id="names" placeholder="name"/>
    //     <input type="email" name="emails" id="emails" placeholder="email"/>
    //     <input type="number" name="phone-numbers" id="phone-numbers" placeholder="number"/>
    //   </form> */}

    //   <div>
    //     {/* <AppBar
    //         title="Appointment Scheduler"
    //         iconClassNameRight="muidocs-icon-navigation-expand-more"
    //       /> */}
    //     <section
    //       style={{
    //         maxWidth: !smallScreen ? "80%" : "100%",
    //         margin: "auto",
    //         marginTop: !smallScreen ? 20 : 0,
    //       }}
    //     >
    //       <div
    //         className="card"
    //         style={{
    //           padding: "12px 12px 25px 12px",
    //           height: smallScreen ? "100vh" : null,
    //         }}
    //       >
    //         <Stepper
    //           activeStep={stepIndex}
    //           orientation="vertical"
    //           linear={false}
    //         >
    //           <Step>
    //             <StepLabel>
    //               Choose an available day for your appointment
    //             </StepLabel>
    //             <StepContent>
    //               {DatePickerExampleSimple()}
    //               {/* {renderStepActions(0)} */}
    //             </StepContent>
    //           </Step>
    //           <Step disabled={!appointmentDate}>
    //             <StepLabel>
    //               Choose an available time for your appointment
    //             </StepLabel>
    //             <StepContent>
    //               <select
    //                 floatingLabelText="AM/PM"
    //                 value={appointmentMeridiem}
    //                 onChange={(evt, key, payload) =>
    //                   handleSetAppointmentMeridiem(payload)
    //                 }
    //                 selectionRenderer={(value) => (value ? "PM" : "AM")}
    //               >
    //                 <option value={0} primaryText="AM">
    //                   AM
    //                 </option>
    //                 <option value={1} primaryText="PM">
    //                   PM
    //                 </option>
    //               </select>
    //               <RadioButtonGroup
    //                 style={{
    //                   marginTop: 15,
    //                   marginLeft: 15,
    //                 }}
    //                 name="appointmentTimes"
    //                 defaultSelected={appointmentSlot}
    //                 onChange={(evt, val) => handleSetAppointmentSlot(val)}
    //               >
    //                 {renderAppointmentTimes()}
    //               </RadioButtonGroup>
    //               {/* {renderStepActions(1)} */}
    //             </StepContent>
    //           </Step>
    //           <Step>
    //             <StepLabel>
    //               Share your contact information with us and we'll send you a
    //               reminder
    //             </StepLabel>
    //             <StepContent>
    //               <p>
    //                 <section>
    //                   <input
    //                     style={{ display: "block" }}
    //                     name="first_name"
    //                     hintText="First Name"
    //                     floatingLabelText="First Name"
    //                     onChange={(e) => {
    //                       setFirstName(e.target.value);
    //                     }}
    //                   />
    //                   <input
    //                     style={{ display: "block" }}
    //                     name="last_name"
    //                     hintText="Last Name"
    //                     floatingLabelText="Last Name"
    //                     onChange={(e) => {
    //                       setLastName(e.target.value);
    //                     }}
    //                   />
    //                   <input
    //                     style={{ display: "block" }}
    //                     name="email"
    //                     hintText="youraddress@mail.com"
    //                     floatingLabelText="Email"
    //                     errorText={
    //                       validEmail ? null : "Enter a valid email address"
    //                     }
    //                     onChange={(e) => {
    //                       setEmail(e.target.value);
    //                       validateEmail(e.target.value);
    //                     }}
    //                   />
    //                   <input
    //                     style={{ display: "block" }}
    //                     name="phone"
    //                     hintText="+2348995989"
    //                     floatingLabelText="Phone"
    //                     errorText={
    //                       validPhone ? null : "Enter a valid phone number"
    //                     }
    //                     onChange={(evt, newValue) => validatePhone(newValue)}
    //                   />
    //                   <button
    //                     style={{
    //                       display: "block",
    //                       backgroundColor: "#00C853",
    //                     }}
    //                     label={
    //                       contactFormFilled
    //                         ? "Schedule"
    //                         : "Fill out your information to schedule"
    //                     }
    //                     labelPosition="before"
    //                     primary={true}
    //                     fullWidth={true}
    //                     onClick={() =>
    //                       SetConfirmationModalOpen(!confirmationModalOpen)
    //                     }
    //                     disabled={!contactFormFilled || processed}
    //                     //   style={{ marginTop: 20, maxWidth: 100 }}
    //                   >
    //                     {" "}
    //                     {contactFormFilled
    //                       ? "Schedule"
    //                       : "Fill out your information to schedule"}
    //                   </button>
    //                 </section>
    //               </p>
    //               {/* {renderStepActions(2)} */}
    //             </StepContent>
    //           </Step>
    //         </Stepper>
    //       </div>
    //       <div
    //         modal={true}
    //         open={confirmationModalOpen}
    //         actions={modalActions}
    //         title="Confirm your appointment"
    //       >
    //         {/* {renderAppointmentConfirmation()} */}
    //       </div>
    //       <div
    //         open={confirmationSnackbarOpen || isLoading}
    //         message={
    //           isLoading ? "Loading... " : confirmationSnackbarMessage || ""
    //         }
    //         autoHideDuration={10000}
    //         onRequestClose={() => SetConfirmationSnackbarOpen(false)}
    //       >
    //         {isLoading ? "Loading... " : confirmationSnackbarMessage || ""}{" "}
    //       </div>
    //     </section>
    //   </div>
    // </div>
  );
}
