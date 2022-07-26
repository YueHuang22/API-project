import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getOneGroup } from "../../store/groups";

const EventDetail = ({ articles }) => {
    const { id } = useParams();
    const dispatch = useDispatch()
    // const groups = useSelector(state => {
    //     return state.group.map(groupId => state.group[groupId]);
    // });

    const group = useSelector(state => state.group);

    useEffect(() => {
        dispatch(getOneGroup(id));
    }, [dispatch, id]);

    if (!group) {
        return null;
    }

    return (
        <div className='singleArticle'>
            <h1>{group.name}</h1>
            {/* <img
                src={singleArticle.imageUrl}
                alt={singleArticle.title}
            />
            <p>
                {singleArticle.body}
            </p> */}
        </div>
    );
};

export default EventDetail;