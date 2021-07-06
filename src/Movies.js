import {useParams} from 'react-router-dom';

// API
// http://api.tvmaze.com/search/shows?q=tets

const Movies = () => {

    let { title } = useParams();
    return <div>Now showing movies {title}</div>;

}

export default Movies;