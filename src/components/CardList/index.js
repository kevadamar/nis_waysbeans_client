import { Grid } from '@material-ui/core';
import CardItem from '../CardItem';

const CardList = ({ data }) => {
  return (
    <Grid container spacing={3}>
      {data.length > 0 &&
        data.map((item, index) => (
          <Grid item xl={3} sm={12} md={3} key={index}>
            <CardItem item={item} />
          </Grid>
        ))}
    </Grid>
  );
};

export default CardList;
