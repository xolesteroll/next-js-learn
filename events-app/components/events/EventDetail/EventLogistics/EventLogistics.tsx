import classes from './EventLogistics.module.css';
import {FC} from "react";
import LogisticsItem from "../LogisticsItem/LogisticsItem";
import DateIcon from "../../../icons/DateIcon";
import AddressIcon from "../../../icons/AddressIcon";

type LogisticsProps = {
  date: string,
  address: string,
  image: string,
  imageAlt: string
}

const EventLogistics:FC<LogisticsProps> = (props) => {
  const { date, address, image, imageAlt } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = address.replace(', ', '\n');

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <img src={`/${image}`} alt={imageAlt} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
