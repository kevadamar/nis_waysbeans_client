import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { changeFormatDate, formatNumberToIDR } from '../../Helpers';
import BrandLogo from '../../assets/brand.png';
import { globalStyles } from '../../styles/globalStyles';
import QRCode from 'qrcode.react';
import ButtonReuse from '../ButtonReuse';
import { cardMyTransactionStyles } from './_cardMyTransactionStyles';
import PopUpDetailTransaction from '../PopUpDetailTransaction';

const waiting = {
  backgroundColor: '#ffe2c0',
  color: '#FF9900',
  cursor: 'default',
};

const success = {
  backgroundColor: '#c4f2c9',
  color: '#209a12',
  cursor: 'default',
};

const cancel = {
  backgroundColor: '#ff857d',
  color: '#e8291c',
  cursor: 'default',
};

function CardMyTransaction({ myCart, handleCompleted }) {
  const classes = globalStyles();
  const localClasses = cardMyTransactionStyles();

  const [show, setshow] = useState(false);

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
      <Box display="flex" alignItems="center">
        <img
          alt={myCart.products[0].name}
          src={myCart.products[0].photo}
          width={80}
          height={120}
        />
        <Box display="flex" flexDirection="column">
          <Typography variant="h6">
            <Box pl={2} className={classes.identityColor} fontWeight="bold">
              {myCart.products[0].name}
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
            <Box
              className={classes.identityColor}
              pl={2}
              pt={1}
              fontWeight="bold"
            >
              Total Price : Rp.{formatNumberToIDR(myCart.totalPrice)}
            </Box>
          </Typography>
          <Typography
            variant="body2"
            onClick={() => setshow(true)}
            style={{ cursor: 'pointer' }}
          >
            <Box className={classes.identityColor} pl={2}>
              {myCart.products.length > 1 ? (
                <>+{myCart.products.length - 1} produk lainnya</>
              ) : (
                <>
                  <span style={{ textDecoration: 'underline' }}>
                    Detail Transactions
                  </span>
                </>
              )}
            </Box>
          </Typography>
        </Box>
      </Box>
      <Box textAlign="center" className={localClasses.root}>
        <img alt="waysbeans" src={BrandLogo} width={80} height={30} />
        <Box mt={1}>
          <QRCode value={`${myCart.name}`} size={80} />
        </Box>
        <Box mt={1}>
          {myCart.status.toLowerCase() === 'on the way' && (
            <ButtonReuse
              variant="contained"
              color="primary"
              style={{
                marginRight: 0,
                borderRadius: '5px',
                width: '130px',
                height: '30px',
                fontSize: '10px',
              }}
              onClick={() => handleCompleted({ order_id: myCart.id })}
            >
              completed
            </ButtonReuse>
          )}

          {myCart.status.toLowerCase() === 'waiting approve' && (
            <ButtonReuse
              variant="contained"
              color="primary"
              style={{
                marginRight: 0,
                borderRadius: '5px',
                width: '130px',
                height: '30px',
                fontSize: '10px',
                ...waiting,
              }}
            >
              {myCart.status}
            </ButtonReuse>
          )}
          {myCart.status.toLowerCase() === 'success' && (
            <ButtonReuse
              variant="contained"
              color="primary"
              style={{
                marginRight: 0,
                borderRadius: '5px',
                width: '130px',
                height: '30px',
                fontSize: '10px',
                ...success,
              }}
            >
              {myCart.status}
            </ButtonReuse>
          )}
          {myCart.status.toLowerCase() === 'cancel' && (
            <ButtonReuse
              variant="contained"
              color="primary"
              style={{
                marginRight: 0,
                borderRadius: '5px',
                width: '130px',
                height: '30px',
                fontSize: '10px',
                ...cancel,
              }}
            >
              {myCart.status}
            </ButtonReuse>
          )}
        </Box>
      </Box>
      {show && (
        <PopUpDetailTransaction
          show={show}
          handleClose={() => setshow(false)}
          order_id={myCart.id}
        />
      )}
    </Box>
  );
}

export default CardMyTransaction;
