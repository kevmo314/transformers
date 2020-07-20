import React from "react";
import {
  IoIosCloseCircle,
  IoIosCheckmarkCircle,
  IoIosHelpCircle,
  IoIosDisc,
} from "react-icons/io";

export function Unknown() {
  return <IoIosDisc size={24} style={{ color: "grey" }} />;
}

export function Pending() {
  return <IoIosHelpCircle size={24} style={{ color: "darkblue" }} />;
}

export function Success() {
  return <IoIosCheckmarkCircle size={24} style={{ color: "green" }} />;
}

export function Fail() {
  return <IoIosCloseCircle size={24} style={{ color: "red" }} />;
}
