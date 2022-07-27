import { useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneGroup, deleteOneGroup } from '../../store/groups';


const GroupDetail = () => {
    const dispatch = useDispatch();
    let history = useHistory()
    const { groupId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);

    let group = useSelector(state => {
        return state.group && state.group[0]
    })

    useEffect(() => {
        dispatch(getOneGroup(groupId));
    }, [dispatch, groupId]);

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteOneGroup(groupId)).then(
            () => history.push('/groups')
        );
    };

    return (
        (group && (
            <>
                <div>
                    <h1>{group.name}</h1>
                    <p>
                        {group.about}
                    </p>
                    {sessionUser && group.organizerId === sessionUser.id && <button><NavLink exact to={`/groups/${groupId}/edit`}>Edit</NavLink></button>}
                    {sessionUser && group.organizerId === sessionUser.id && <button onClick={handleClick}>Delete</button>}
                </div>
                {sessionUser && <button>
                    <span>
                        <NavLink exact to={`/groups/${group.id}/events/new`}>Start an Event</NavLink>
                    </span>
                </button>}
            </>
        ))
    );
};

export default GroupDetail;
