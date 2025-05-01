import { FC } from "react";
import styles from "./arrow-button.module.scss";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

type ArrowButtonProps = Readonly<{
  className?: string;
  onClick?: VoidFunction;
}>;

const ArrowButton: FC<ArrowButtonProps> = ({ className, onClick }) => {
  return (
    <button className={`${styles.button} ${className || ""}`} onClick={onClick}>
      <CaretRight weight="bold" />
    </button>
  );
};

export default ArrowButton;
