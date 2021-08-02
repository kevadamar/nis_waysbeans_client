import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { changeFormatDate, formatNumberToIDR } from '../../Helpers';
import BrandLogo from '../../assets/brand.png';
import { globalStyles } from '../../styles/globalStyles';

function CardShipping({ myCart, subTotal }) {
  const classes = globalStyles();
  const [formatedDate, setFormatedDate] = useState({
    dayName: '',
    formatDate: '',
  });

  useEffect(() => {
    setFormatedDate({ ...changeFormatDate(myCart.createdAt) });
    return () => {
      setFormatedDate({
        dayName: '',
        formatDate: '',
      });
    };
  }, []);

  return (
    <Box p={2} display="flex" justifyContent="space-between">
      <Box display="flex">
        <img alt={myCart.name} src={myCart.photo} width={80} />
        <Box display="flex" flexDirection="column">
          <Typography variant="h6">
            <Box pl={2} className={classes.identityColor} fontWeight="bold">
              {myCart.name}
            </Box>
          </Typography>
          <Typography variant="body2">
            <Box display="flex">
              <Box pl={2} fontWeight="bold" className={classes.identityColor}>
                {formatedDate.dayName}
              </Box>
              <Box className={classes.identityColor}>
                , {formatedDate.formatDate}
              </Box>
            </Box>
          </Typography>

          <Typography variant="body2">
            <Box className={classes.identityColor} pl={2} pt={1}>
              Price : Rp.{formatNumberToIDR(myCart.total_price)}
            </Box>
          </Typography>
          <Typography variant="body2">
            <Box className={classes.identityColor} pl={2}>
              Qty : {myCart.qty}
            </Box>
          </Typography>
        </Box>
      </Box>
      <Box pt={1}> 
        <img alt="waysbeans" src={BrandLogo} width={80} height={30} />
      </Box>
    </Box>
  );
}

export default CardShipping;
