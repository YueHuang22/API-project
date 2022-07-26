import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneGroup, deleteOneGroup } from '../../store/groups';


const GroupDetail = () => {
    const dispatch = useDispatch();
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
    };

    return (
        (group && (
            <div>
                <h1>{group.name}</h1>
                <p>
                    {group.about}
                </p>
                <button onClick={handleClick}>Delete</button>
            </div>
        ))
    );
};

export default GroupDetail;
