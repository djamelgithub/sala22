import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../../redux/actions/commentAction'

const CommentMenu = ({servicio, comment, setOnEdit}) => {

    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleRemove = () => {
        if(servicio.user._id === auth.user._id || comment.user._id === auth.user._id){
            dispatch(deleteComment({servicio, auth, comment, socket}))
        }
    }

    const MenuItem = () => {
        return(
            <>
                <div className="dropdown-item" onClick={() => setOnEdit(true)}>
                    <span className="material-icons">create</span> mis a jour
                </div>
                <div className="dropdown-item" onClick={handleRemove}>
                    <span className="material-icons">delete_outline</span> Suprimer
                </div>
            </>
        )
    }


    return (
        <div className="menu">
            {
                (servicio.user._id === auth.user._id || comment.user._id === auth.user._id) &&
                <div className="nav-item dropdown">
                    <span className="material-icons" id="moreLink" data-toggle="dropdown">
                        more_vert
                    </span>

                    <div className="dropdown-menu" aria-labelledby="moreLink">
                        {
                            servicio.user._id === auth.user._id
                            ? comment.user._id === auth.user._id
                                ? MenuItem()
                                : <div className="dropdown-item" onClick={handleRemove}>
                                    <span className="material-icons">delete_outline</span> Suprimer
                                </div>
                            : comment.user._id === auth.user._id && MenuItem()
                        }
                    </div>

                </div>
            }
            
        </div>
    )
}

export default CommentMenu
