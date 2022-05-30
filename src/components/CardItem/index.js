import { useHistory } from 'react-router-dom';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { cardStyles } from './_cardStyles';

import { formatNumberToIDR } from '../../Helpers';

function CardItem({ item }) {
  const classes = cardStyles();
  const router = useHistory();

  const handlePushToDetail = (id) => {
    router.push(`/product/${id}`);
  };
  return (
    <Card onClick={() => handlePushToDetail(item.id)} className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={item.name}
          image={item.photo}
          title={item.name}
          height={312}
        />
        <CardContent>
          <Tooltip title={item.name} followCursor={true}>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.title}
            >
              {item.name}
            </Typography>
          </Tooltip>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.subTitle}
          >
            Rp.{formatNumberToIDR(item.price)} <br />
            Stock : {item.stock}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardItem;
