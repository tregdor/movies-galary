import React from "react";
import s from './movieListGenre.module.scss';
import {Movie} from "../../context/Movies/moviesReducer";

interface Props {
    data: Movie
}

const MovieListGenre:React.FC<Props> = (props) => {

    return (
        <div className={s.container}>
            {props.data === undefined  && <p>Loading...</p>}
            {props.data  !== undefined &&
            <div>
              Films by <span className={s.genre}>{props.data.genres[0]} genre</span>
            </div>}

        </div> 
    )
}

export default MovieListGenre