import React, { useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "./Starts.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Stars({ score }) {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  // console.log(props);
  switch (score) {
    case 1:
      return (
        <div className={styles.strellasRebe} data-aos="fade-down-right">
          <span>
            <AiFillStar></AiFillStar>
            <AiOutlineStar></AiOutlineStar>
            <AiOutlineStar></AiOutlineStar>
            <AiOutlineStar></AiOutlineStar>
            <AiOutlineStar></AiOutlineStar>
          </span>
        </div>
      );
    case 2:
      return (
        <div className={styles.strellasRebe} data-aos="fade-down-right">
          <span>
            <AiFillStar></AiFillStar>
            <AiFillStar></AiFillStar>
            <AiOutlineStar></AiOutlineStar>
            <AiOutlineStar></AiOutlineStar>
            <AiOutlineStar></AiOutlineStar>
          </span>
        </div>
      );
    case 3:
      return (
        <div className={styles.strellasRebe} data-aos="fade-down-right">
          <span>
            <AiFillStar></AiFillStar>
            <AiFillStar></AiFillStar>
            <AiFillStar></AiFillStar>
            <AiOutlineStar></AiOutlineStar>
            <AiOutlineStar></AiOutlineStar>
          </span>
        </div>
      );
    case 4:
      return (
        <div className={styles.strellasRebe} data-aos="fade-down-right">
          <span>
            <AiFillStar></AiFillStar>
            <AiFillStar></AiFillStar>
            <AiFillStar></AiFillStar>
            <AiFillStar></AiFillStar>
            <AiOutlineStar></AiOutlineStar>
          </span>
        </div>
      );
    case 5:
      return (
        <div className={styles.strellasRebe} data-aos="fade-down-right">
          <span>
            <AiFillStar></AiFillStar>
            <AiFillStar></AiFillStar>
            <AiFillStar></AiFillStar>
            <AiFillStar></AiFillStar>
            <AiFillStar></AiFillStar>
          </span>
        </div>
      );

    default:
      return (
        <div className={styles.strellasRebe} data-aos="fade-down-right">
          <span>
            <AiOutlineStar></AiOutlineStar>
            <AiOutlineStar></AiOutlineStar>
            <AiOutlineStar></AiOutlineStar>
            <AiOutlineStar></AiOutlineStar>
            <AiOutlineStar></AiOutlineStar>
          </span>
        </div>
      );
  }
}
