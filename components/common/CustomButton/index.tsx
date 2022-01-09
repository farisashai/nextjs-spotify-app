import Image from "next/image";
import Link from "next/link";
import React from "react";
import s from "styles/Home.module.scss";
import { ButtonType } from "utils/constants";

interface ButtonProps {
  type: ButtonType;
  label: string;
  icon?: any;
  onClick?: any;
  href?: string;
}

const CustomButton: React.FC<ButtonProps> = (props) => {
  const { type, label, icon, onClick, href } = props;

  if (type === ButtonType.Link) {
    return (
      <Link href={href}>
        <a className={s.button}>
          {icon}
          {label}
        </a>
      </Link>
    );
  } else {
    return (
      <button className={s.button} onClick={onClick}>
        {icon && <Image src={icon} width={20} height={20} alt={label} />}

        {label}
      </button>
    );
  }
};

export default CustomButton;
