import { useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneGroup, deleteOneGroup } from '../../store/groups';


const GroupDetail = () => {
    const dispatch = useDispatch();
    let history = useHistory()

    const { groupId } = useParams();
    let group = useSelector(state => {
        return state.group && state.group[0]
    })

    useEffect(() => {
        dispatch(getOneGroup(groupId));
    }, [dispatch, groupId]);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(deleteOneGroup(groupId));
        return history.push('/groups');
    };

    return (
        (group && (
            <>
                <div>
                    <h1>{group.name}</h1>
                    <p>
                        {group.about}
                    </p>
                    <button><NavLink exact to={'/groups/new'}>Edit</NavLink></button>
                    <button onClick={handleClick}>Delete</button>
                </div>
                <button>
                    <span>
                        <NavLink exact to={`/groups/${group.id}/events/new`}>Start an Event</NavLink>
                    </span>
                </button>
            </>
        ))
    );
};

export default GroupDetail;
