
import classes from './EventResultsTitle.module.css';
import Button from "../../ui/Button/Button";
import {FC} from "react";

const  ResultsTitle:FC<{date: Date}> = (props) => {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button url='/events'>Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
