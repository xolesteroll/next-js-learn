import classes from './EventContent.module.css';
import {FC, PropsWithChildren} from "react";

const EventContent:FC<PropsWithChildren> = (props) => {
  return (
    <section className={classes.content}>
      {props.children}
    </section>
  );
}

export default EventContent;
