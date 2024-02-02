// import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
// not reasinf button raise
// import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SnackBar from "material-ui/Snackbar";
import Card from "material-ui/Card";
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import axios from "axios";
import { useState } from "react";
import e from "express";
const API_BASE = "http://localhost:4000/";

export default function Appointment() {
  function constructor(props, context) {
    // super(props, context);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
    //   schedule: [],
      confirmationModalOpen: false,
    //   appointmentDateSelected: false,
    //   appointmentMeridiem: 0,
    //   validEmail: true,
    //   validPhone: true,
      finished: false,
      smallScreen: window.innerWidth < 768,
      //   stepIndex: 0,
    };
  }

  const [stepIndex, SetStepIndex] = useState(0);
  //   const [currentSchedule, SetCurrentSchedule] = useState([]);
  const [confirmationTextVisible, SetConfirmationTextVisible] = useState(false);
  const [appointmentDate, SetAppointmentDate] = useState(null);
  const [appointmentSlot, SetAppointmentSlot] = useState(null);
  const [appointmentMeridiem, SetAppointmentMeridiem] = useState(0);
    const [schedule, SetSchedule] = useState([]);
    const [appointmentDateSelected, SetAppointmentDateSelected] = useState(false);
    const [validEmail, SetValidEmail] = useState(true);
    const [validPhone, SetValidPhone] = useState(true);
    // const [validEmail, SetValidEmail] = useState(0);
    // const [validEmail, SetValidEmail] = useState(0);

  async function componentWillMount() {
    const response = await axios.get(API_BASE + `api/retrieveSlots`);

    if (response !== null) {
      console.log("response via db: ", response.data);
      handleDBReponse(response.data);
    }
  }
  function handleNext() {
    SetStepIndex(stepIndex + 1);
    // finished: stepIndex >= 2,
  }
  function handlePrev() {
    if (stepIndex > 0) {
      SetStepIndex(stepIndex - 1);
    }
  }

  function validateEmail(email) {
    const regex =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$    /i;
    return regex.test(email)
      ? SetValidEmail({ email: email, validEmail: true })
      : SetValidEmail(false );
  }
  function validatePhone(phoneNumber) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test(phoneNumber)
      ? SetValidPhone({ phone: phoneNumber, validPhone: true })
      : SetValidPhone( false );
  }

  function handleSetAppointmentDate(date) {
    //  // double check thus
    if (date !== null) SetAppointmentDate(date);
    SetConfirmationTextVisible(true);
  }
  function handleSetAppointmentSlot(slot) {
    SetAppointmentSlot(slot);
    // this.setState({ appointmentSlot: slot });
  }
  function handleSetAppointmentMeridiem(meridiem) {
    SetAppointmentMeridiem(meridiem);
  }

  function checkDisableDate(day) {
    const dateString = moment(day).format("YYYY-DD-MM");
    return (
  schedule[dateString] === true ||
      moment(day).startOf("day").diff(moment().startOf("day")) < 0
    );
  }

  function handleDBReponse(response) {
    const appointments = response;
    const today = moment().startOf("day"); //start of today 12 am
    const initialSchedule = {};
    initialSchedule[today.format("YYYY-DD-MM")] = true;
    const schedule = !appointments.length
      ? initialSchedule
      : appointments.reduce((currentSchedule, appointment) => {
          const { slot_date, slot_time } = appointment;
          const dateString = moment(slot_date, "YYYY-DD-MM").format(
            "YYYY-DD-MM"
          );

          if (currentSchedule[slot_date]) {
            currentSchedule[dateString] = Array(8).fill(false);
          } else {
            return null;
          }
          if (Array.isArray(currentSchedule[dateString])) {
            currentSchedule[dateString][slot_time] = true;
          } else {
            return null;
          }
          return currentSchedule;
        }, initialSchedule);
    for (let day in schedule) {
      let slots = schedule[day];
      if (slots.length) {
        if (slots.every((slot) => slot === true)) {
          schedule[day] = true;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
    this.setState({
      schedule: schedule,
    });
  }

  function renderAppointmentTimes() {
    if (!this.state.isLoading) {
      const slots = [...Array(8).keys()];
      return slots.map((slot) => {
        const appointmentDateString = moment(this.state.appointmentDate).format(
          "YYYY-DD-MM"
        );
        const time1 = moment().hour(9).minute(0).add(slot, "hours");
        const time2 = moment()
          .hour(9)
          .minute(0)
          .add(slot + 1, "hours");
        const scheduleDisabled = this.state.schedule[appointmentDateString]
          ? this.state.schedule[
              moment(this.state.appointmentDate).format("YYYY-DD-MM")
            ][slot]
          : false;
        const meridiemDisabled = this.state.appointmentMeridiem
          ? time1.format("a") === "am"
          : time1.format("a") === "pm";
        return (
          <RadioButton
            label={time1.format("h:mm a") + " - " + time2.format("h:mm a")}
            key={slot}
            value={slot}
            style={{
              marginBottom: 15,
              display: meridiemDisabled ? "none" : "inherit",
            }}
            disabled={scheduleDisabled || meridiemDisabled}
          />
        );
      });
    } else {
      return null;
    }
  }

  function renderAppointmentConfirmation() {
    const spanStyle = { color: "#00C853" };
    return (
      <section>
        <p>
          Name:{" "}
          <span style={spanStyle}>
            {this.state.firstName} {this.state.lastName}
          </span>
        </p>
        <p>
          Number: <span style={spanStyle}>{this.state.phone}</span>
        </p>
        <p>
          Email: <span style={spanStyle}>{this.state.email}</span>
        </p>
        <p>
          Appointment:{" "}
          <span style={spanStyle}>
            {moment(this.state.appointmentDate).format(
              "dddd[,] MMMM Do[,] YYYY"
            )}
          </span>{" "}
          at{" "}
          <span style={spanStyle}>
            {moment()
              .hour(9)
              .minute(0)
              .add(this.state.appointmentSlot, "hours")
              .format("h:mm a")}
          </span>
        </p>
      </section>
    );
  }

  function handleSubmit() {
    this.setState({ confirmationModalOpen: false });
    const newAppointment = {
      name: this.state.firstName + " " + this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      slot_date: moment(this.state.appointmentDate).format("YYYY-DD-MM"),
      slot_time: this.state.appointmentSlot,
    };
    axios
      .post(API_BASE + "api/appointmentCreate", newAppointment)
      .then((response) =>
        this.setState({
          confirmationSnackbarMessage: "Appointment succesfully added!",
          confirmationSnackbarOpen: true,
          processed: true,
        })
      )
      .catch((err) => {
        console.log(err);
        return this.setState({
          confirmationSnackbarMessage: "Appointment failed to save.",
          confirmationSnackbarOpen: true,
        });
      });
  }

  {
    const {
      finished,
      isLoading,
      smallScreen,
      stepIndex,
      confirmationModalOpen,
      confirmationSnackbarOpen,
      ...data
    } = this.state;
    const contactFormFilled =
      data.firstName &&
      data.lastName &&
      data.phone &&
      data.email &&
      data.validPhone &&
      data.validEmail;
    const DatePickerExampleSimple = () => (
      <div>
        <DatePicker
          hintText="Select Date"
          mode={smallScreen ? "portrait" : "landscape"}
          onChange={(n, date) => this.handleSetAppointmentDate(date)}
          shouldDisableDate={(day) => this.checkDisableDate(day)}
        />
      </div>
    );
    const modalActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={() => this.setState({ confirmationModalOpen: false })}
      />,
      <FlatButton
        label="Confirm"
        style={{ backgroundColor: "#00C853 !important" }}
        primary={true}
        onClick={() => this.handleSubmit()}
      />,
    ];
    return (
      <div className="appointment-container">
        <h1 className="title-scheduler      ">Vet-In Appointment Scheduler</h1>
        <hr />

        <div style={{ margin: "12px 0" }}>
          <button
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onClick={handleNext}
            backgroundColor="#00C853 !important"
            style={{ marginRight: 12, backgroundColor: "#00C853" }}
          >
            {" "}
            {stepIndex === 2 ? "Finish" : "Next"}
          </button>
          {stepIndex > 0 && (
            <button
              disabled={stepIndex === 0}
              disableTouchRipple={true}
              disableFocusRipple={true}
              onClick={handlePrev}
            >
              {" "}
              Back
            </button>
          )}
        </div>

        {/* <form action="" method="post">
        <input type="date" name="slot-date" id="slot-date" />
        <input type="time" name="slot-time" id="slot-time" />
        <input type="text" name="personal-info" id="personal-info" placeholder="info"/>
        <input type="text" name="names" id="names" placeholder="name"/>
        <input type="email" name="emails" id="emails" placeholder="email"/>
        <input type="number" name="phone-numbers" id="phone-numbers" placeholder="number"/>
      </form> */}

        <div>
          <AppBar
            title="Appointment Scheduler"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <section
            style={{
              maxWidth: !smallScreen ? "80%" : "100%",
              margin: "auto",
              marginTop: !smallScreen ? 20 : 0,
            }}
          >
            <Card
              style={{
                padding: "12px 12px 25px 12px",
                height: smallScreen ? "100vh" : null,
              }}
            >
              <Stepper
                activeStep={stepIndex}
                orientation="vertical"
                linear={false}
              >
                <Step>
                  <StepLabel>
                    Choose an available day for your appointment
                  </StepLabel>
                  <StepContent>
                    {DatePickerExampleSimple()}
                    {this.renderStepActions(0)}
                  </StepContent>
                </Step>
                <Step disabled={!data.appointmentDate}>
                  <StepLabel>
                    Choose an available time for your appointment
                  </StepLabel>
                  <StepContent>
                    <SelectField
                      floatingLabelText="AM/PM"
                      value={data.appointmentMeridiem}
                      onChange={(evt, key, payload) =>
                        this.handleSetAppointmentMeridiem(payload)
                      }
                      selectionRenderer={(value) => (value ? "PM" : "AM")}
                    >
                      <MenuItem value={0} primaryText="AM" />
                      <MenuItem value={1} primaryText="PM" />
                    </SelectField>
                    <RadioButtonGroup
                      style={{
                        marginTop: 15,
                        marginLeft: 15,
                      }}
                      name="appointmentTimes"
                      defaultSelected={data.appointmentSlot}
                      onChange={(evt, val) =>
                        this.handleSetAppointmentSlot(val)
                      }
                    >
                      {this.renderAppointmentTimes()}
                    </RadioButtonGroup>
                    {this.renderStepActions(1)}
                  </StepContent>
                </Step>
                <Step>
                  <StepLabel>
                    Share your contact information with us and we'll send you a
                    reminder
                  </StepLabel>
                  <StepContent>
                    <p>
                      <section>
                        <TextField
                          style={{ display: "block" }}
                          name="first_name"
                          hintText="First Name"
                          floatingLabelText="First Name"
                          onChange={(evt, newValue) =>
                            this.setState({ firstName: newValue })
                          }
                        />
                        <TextField
                          style={{ display: "block" }}
                          name="last_name"
                          hintText="Last Name"
                          floatingLabelText="Last Name"
                          onChange={(evt, newValue) =>
                            this.setState({ lastName: newValue })
                          }
                        />
                        <TextField
                          style={{ display: "block" }}
                          name="email"
                          hintText="youraddress@mail.com"
                          floatingLabelText="Email"
                          errorText={
                            data.validEmail
                              ? null
                              : "Enter a valid email address"
                          }
                          onChange={(evt, newValue) =>
                            this.validateEmail(newValue)
                          }
                        />
                        <TextField
                          style={{ display: "block" }}
                          name="phone"
                          hintText="+2348995989"
                          floatingLabelText="Phone"
                          errorText={
                            data.validPhone
                              ? null
                              : "Enter a valid phone number"
                          }
                          onChange={(evt, newValue) =>
                            this.validatePhone(newValue)
                          }
                        />
                        <button
                          style={{
                            display: "block",
                            backgroundColor: "#00C853",
                          }}
                          label={
                            contactFormFilled
                              ? "Schedule"
                              : "Fill out your information to schedule"
                          }
                          labelPosition="before"
                          primary={true}
                          fullWidth={true}
                          onClick={() =>
                            this.setState({
                              confirmationModalOpen:
                                !this.state.confirmationModalOpen,
                            })
                          }
                          disabled={!contactFormFilled || data.processed}
                          //   style={{ marginTop: 20, maxWidth: 100 }}
                        >
                          {" "}
                          {contactFormFilled
                            ? "Schedule"
                            : "Fill out your information to schedule"}
                        </button>
                      </section>
                    </p>
                    {this.renderStepActions(2)}
                  </StepContent>
                </Step>
              </Stepper>
            </Card>
            <Dialog
              modal={true}
              open={confirmationModalOpen}
              actions={modalActions}
              title="Confirm your appointment"
            >
              {this.renderAppointmentConfirmation()}
            </Dialog>
            <SnackBar
              open={confirmationSnackbarOpen || isLoading}
              message={
                isLoading
                  ? "Loading... "
                  : data.confirmationSnackbarMessage || ""
              }
              autoHideDuration={10000}
              onRequestClose={() =>
                this.setState({ confirmationSnackbarOpen: false })
              }
            />
          </section>
        </div>
      </div>
    );
  }
}
