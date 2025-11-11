import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

export default function Dashboard() {
    const dispatch = useDispatch();
    const { claims } = useSelector((state) => state.auth);

    return (
        <div>
            <h2>Welcome {claims?.name}</h2>
            <p>Role: {claims?.role}</p>

            {claims?.role === 'Admin' && <button>Admin Panel</button>}
            {claims?.role === 'Client' && <button>Client Dashboard</button>}

            <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
    );
}
