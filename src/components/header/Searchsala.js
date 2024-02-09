import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import UserCard from '../UserCard';
import LoadIcon from '../../images/loading.gif';
import { getDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { useSelector, useDispatch } from 'react-redux';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Searchsala = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?content=${search}`);
      setPosts(res.data.posts);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch('');
    setPosts([]);
  };

  return (
    <div>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
      />
      {load && <img className="loading" src={LoadIcon} alt="loading" />}
      <div className="users">
        {posts.map((post) => (
          <UserCard
            key={post._id}
            post={post}
            border="border"
            handleClose={handleClose}
          />
        ))}
      </div>
    </div>
  );
};

export default Searchsala;
