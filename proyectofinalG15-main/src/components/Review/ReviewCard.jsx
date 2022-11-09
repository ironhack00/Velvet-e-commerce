import React, { useEffect } from "react";
import styles from "../Review/ReviewCard.module.css";
import Stars from "../Stars/Stars";
import AOS from "aos";
import "aos/dist/aos.css";
export default function ReviewCard({ username, score, description }) {
  console.log("ACA ESTA SCORE", score);
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <div className={styles.container} data-aos="fade-down-right">
      <ul>
        <li>
          <div>
            <a>{username}</a>
          </div>

          <div>{description}</div>
        </li>
        <li>
          <div className={styles.commentsIcons}>
            <Stars score={score}></Stars>
          </div>
        </li>
      </ul>
    </div>
  );
}
