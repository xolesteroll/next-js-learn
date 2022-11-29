import classes from './ErrorAlert.module.css';
import {FC, PropsWithChildren} from "react";

const ErrorAlert:FC<PropsWithChildren> = (props) => {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
