import { Link } from "react-router-dom";

interface LinkToSignInProps {
  pClassName?: string;
  linkClassName?: string;
  to: string;
  ariaLabel: string;
  pText: string;
  linkText: string;
}

const LinkToSignIn: React.FC<LinkToSignInProps> = ({
  pClassName,
  linkClassName,
  to,
  ariaLabel,
  pText,
  linkText,
}) => {
  return (
    <p className={pClassName}>
      {pText}{" "}
      <Link className={linkClassName} to={to} aria-label={ariaLabel}>
        {linkText}
      </Link>
    </p>
  );
};

export default LinkToSignIn;
