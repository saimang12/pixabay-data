import { useEffect, useState } from "react";
import './main.scss';
import { Link } from "react-router-dom";


const App = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('man');
    const [load, setLoad] = useState(true);

    const pixaData = `https://pixabay.com/api/?key=34354439-e2d66846314cd63eaa92b43df&q=${search}&image_type=photo&page=1&per_page=48&lang=ko`;
    const getData = async () => {
        setLoad(true);
        const r = await fetch(pixaData).then(it => it.json());
        setData(r.hits);
        setLoad(false);
    }
    useEffect(() => { getData() }, [search]);

    const onSubmit = e => {
        e.preventDefault();
        if (input.length < 1) {
            alert('검색어는 1글자 이상 입력해주세요')
            return
        }
        setSearch(input);
    }
    const onChange = e => setInput(e.target.value);

    console.log(data);

    if (load) {
        return <div className="load"><i class="xi-spinner-5 xi-spin"></i></div>
    }
    return (
        <div className="app">
            <header className="header">
                <div className="inner">
                    <h1>
                        <Link to={`https://saimang12.github.io/pixabay-data/`}>Search Img</Link>
                    </h1>
                    <form onSubmit={onSubmit}>
                        <input type="text" onChange={onChange} />
                        <button><i className="xi-search"></i></button>
                    </form>
                </div>
            </header>
            <main>
                <ul className="list">
                    {
                        data.map(it => {
                            return (
                                <li key={it.id}>
                                    <figure>
                                        <img src={it.largeImageURL} alt={it.tags} />
                                    </figure>
                                    <span>{it.tags}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </main>
            <footer className="footer">
                <div className="inner">
                    <p>&copy; Park Jinwoo pixabay beginning App</p>
                </div>
            </footer>
        </div>


    )




}

export default App;