import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMuffinsArray } from '../../redux/selectors';
import { likeMuffin, loadMuffins } from '../../redux/actions';

const Muffins = () => {
    const muffins = useSelector(selectMuffinsArray);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadMuffins());
    }, [])

    return (
        <ul>
            {muffins.map(muffin => {
                const handleLike = () => {
                    dispatch(likeMuffin(muffin.id))
                }
                return (
                    <li key={muffin.id}>
                        {muffin.name} <button onClick={handleLike}>Like</button> <i>{muffin.likes}</i>
                    </li>);
            })}
        </ul>
    );
};

export default Muffins;