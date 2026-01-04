import styles from './LogoutButton.module.css'

export const LogoutButton = ({ onClick }) => {
    return (
        <>
            <button
                className={styles['logout-button']}
                onClick={onClick}
            >Logout</button>
        </>
    );
}