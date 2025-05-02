import { FC } from "react";
import styles from "./arrow-button.module.scss";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

type ArrowButtonProps = Readonly<{
  className?: string;
  disabled?: boolean;
  onClick?: VoidFunction;
}>;

const ArrowButton: FC<ArrowButtonProps> = ({
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <CaretRight weight="bold" data-testid="caret-right-icon" />
    </button>
  );
};

export default ArrowButton;
