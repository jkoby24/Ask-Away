import React, { useState } from "react";
import { checkPasswords } from "../actions/auth.actions/checkPasswords";
import { changePassword } from "../actions/auth.actions/changePassword";
import { connect } from "react-redux";

const ChangePassword = ({
  auth: { errors, isAllowedToChangePassword },
  checkPasswords,
  changePassword,
}) => {
  let [areNotPasswordsFullfiled, setAreNotPasswordsFullfiled] = useState(false);
  let [arePasswordsWrong, setArePasswordsWrong] = useState(false);
  let [formData, setFormData] = useState({
    firstPassword: "",
    secondPassword: "",
    newPassword: "",
  });

  let { firstPassword, secondPassword, newPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const submitData = () => {
    if (firstPassword !== secondPassword) {
      setArePasswordsWrong(true);
      setAreNotPasswordsFullfiled(false);
      alert("Passwords are wrong!");
    } else if (
      firstPassword === "" ||
      firstPassword === null ||
      secondPassword === "" ||
      secondPassword === null
    ) {
      setAreNotPasswordsFullfiled(true);
      alert("You haven't fullfiled some input");
    } else {
      checkPasswords(firstPassword);
    }
  };
  const submitNewPasswordData = () =>{
    if (newPassword === "" || newPassword === null){
  
      alert("Password hasn't changed, something went wrong...");
    }
    else if(newPassword.length > 12 || newPassword.length < 6){
      alert("Password length must be between 6 and 12 characters");
    }
    else{
      changePassword(newPassword);
      
      alert("Password has changed");
    }
  }

  return (
    <div className="change-profile-page-wrapper">
      {isAllowedToChangePassword === false && (
        <form className="change-profile-section">
          <div className="change-password-input-wrapper">
            <label className="change-password-label p__size font__p font__bold">
              Type actual password
            </label>
            <input
              className="change-password-input"
              placeholder="Type Something..."
              type="text"
              value={firstPassword}
              name="firstPassword"
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="change-password-input-wrapper">
            <label className="change-password-label p__size font__p font__bold">
              Type again password
            </label>
            <input
              className="change-password-input"
              placeholder="Type Something..."
              type="text"
              value={secondPassword}
              name="secondPassword"
              onChange={(e) => onChange(e)}
            />
          </div>

          
          <div className="password-page-button" style={{
            marginTop: ".5em",
            }} onClick={(e) => submitData(e)}>
            Submit
          </div>
        </form>
      )}

      {isAllowedToChangePassword && (
        <form className="change-profile-section">
          <div className="change-password-input-wrapper">
            <label className="change-password-label p__size font__p font__bold">
              Type New Password
            </label>

            <input
              placeholder="Type New Password..."
              value={newPassword}
              name="newPassword"
              onChange={(e) => onChange(e)}
              type="text"
            />

            <div className="password-page-button"
              style={{
                marginTop: ".5em",
              }}
              onClick={(e) => submitNewPasswordData(e)}>
                Submit
            </div>
          </div>
        </form>
      )}
      {/* {isAllowedToChangePassword && errors && isSubmitted && (
        <PasswordChangeMessage message="Password hasn't changed, something went wrong..." />
      )}

      {isAllowedToChangePassword && !errors && isSubmitted && (
        <PasswordChangeMessage message="Password has changed" />
      )} */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { checkPasswords, changePassword })(
  ChangePassword
);
