import React from "react";
import resumeSvg from "../../assets/resume.svg";
import styles from "./Header.module.css";

function Header(props) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p className={styles.heading}>
          A <span>Resume</span> that stands out!
        </p>
        <p className={styles.heading}>
          Make your own resume. <span>It's free</span>
        </p>
        <button className={styles.ctaButton}
        onClick={() => {props.history.push("/myresume")}}>
          Create Now
        </button>
      </div>
      <div className={styles.right}>
        <img src={resumeSvg} alt="Resume" />
      </div>
    </div>
  );
}

export default Header;
