import React, { useState } from "react";
import Styles from "./TextInput.module.css";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";

const TextInput = React.forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState("password");

  return (
    <div className={Styles.inputWrapper}>
      <input {...props} ref={ref} type={props.type === "password" ? visibility : props.type} />
      <label
        onClick={() => {
          ref.current.focus();
        }}
      >
        {props.placeholder}
      </label>

      {props.type === "password" && (
        <span
          className={Styles.showPassword}
          onClick={() => {
            setVisibility((vis) => (vis === "password" ? "text" : "password"));
            // ref.current.type = ref.current.type === "password" ? "text" : "password";
          }}
        >
          {visibility !== "password" ? <VscEyeClosed size={20} /> : <VscEye size={20} />}
        </span>
      )}
    </div>
  );
});

export default TextInput;
