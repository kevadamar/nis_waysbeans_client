import { Box, Container } from '@material-ui/core';

import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { API } from '../../config';

const Admin = () => {
  const fetchData = async () => {
    const response = await API.get('transactions');

    if (response.status !== 200) {
      throw new Error('An error has occured');
    }
    return response.data.data;
  };

  const { isLoading, data, isError, isSuccess } = useQuery(
    ['transactions'],
    () => fetchData(),
    // { staleTime: 30000 },
  );

  return (
    <Container maxWidth='md' style={{ height: '87vh' }}>
      <Box py={5}>
        <h4>Incoming Transaction</h4>
        {isSuccess && data?.length > 0 && (
          <table style={{ textAlign: 'center' }}>
            <thead style={{ backgroundColor: 'white' }}>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>Post Code</th>
                <th>Products Order</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr
                    style={{
                      backgroundColor: 'white',
                      height: '65px',
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.postCode}</td>
                    <td>---</td>
                    <td>
                      <span style={{ color: '#F7941E' }}>{item.status}</span>
                    </td>
                    <td>
                      <i
                        className="fa fa-search"
                        style={{ color: '#5A57AB', cursor: 'pointer' }}
                        //   onClick={() => handleClick(item.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Box>
    </Container>
  );
};

export default Admin;
