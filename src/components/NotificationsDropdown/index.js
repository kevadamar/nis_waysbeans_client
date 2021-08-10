import Styles from './CustomDropdown.module.css';

function NotificationsDropdown({ data, onClick }) {
  return (
    <>
      <div
        className={Styles.dropdown}
        style={{ overflowY: data?.length < 5 ? 'unset' : 'auto' }}
      >
        <h3
          style={{
            padding: '10px',
            paddingBottom: '5px',
            boxShadow: '0 9px 0 0 #612D2B',
          }}
        >
          Notifications
        </h3>
        {data?.length === 0 && (
          <div className={Styles.noNotif}>
            <p className={Styles.textMenu}>0 Waiting Approve</p>
          </div>
        )}
        {data?.length > 0 &&
          data?.map((notification, idx) => (
            <div key={idx} className={Styles.dropdownMenu} onClick={onClick}>
              <p className={Styles.textMenu}>
                {notification?.name} - {notification?.product_name}
              </p>
              <span
                className={`${Styles.divider} ${
                  data?.length < 5 && Styles.wDiv
                }`}
              ></span>
            </div>
          ))}
      </div>
    </>
  );
}

export default NotificationsDropdown;
