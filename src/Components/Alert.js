import React from "react";

function Alert({ setIsOpen, response, message }) {
  return (
    <>
      <div
        className={
          "d-flex rounded-md max-w-max space-x-12 mx-auto px-3 py-2 font-semibold text-white  " +
          (response ? " bg-green-300 " : " bg-red-600 bg-opacity-90")
        }
      >
        <span>{message}</span>
        <button className="" onClick={() => setIsOpen(false)}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </>
  );
}

export default Alert;
