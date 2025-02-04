import React, {useState, useEffect, useCallback} from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import Book from "../Book/Book";
import Bookmob from "../Book/Bookmob";
import AppPagination from "../Pagination";
import './Search.css';
import './Searchmob.css';
import {ReactComponent as FilterIcon} from "../../assets/filtericon.svg";
import {Link} from "react-router-dom";
import Logo from "../../assets/Logo.png";
import {REACT_APP_BACKEND_URL} from '../../constants/constants';
import { useMediaQuery } from "react-responsive";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
// import Page from "react-page-loading-v2";

const Search = () => {

  const [books, setBooks] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [stores, setStores] = useState([]);
  const [price, setPrice] = useState(75000);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(75000);
  const [priceSort, setPriceSort] = useState('');

  // console.log(process.env.REACT_APP_BACKEND_URL, 'REACT_APP_BACKEND_URL');

  const fetchHandler = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/`, 
    { params: {
      page: pageNumber - 1,
      title: searchValue.trim(), 
      store: `${stores[0]};${stores[1]};${stores[2]}`,
      price: price }})
    .then((res) => res.data).then((res) => {
      const newBooks = res.books
      setBooks(newBooks)
      setNumberOfPages(res.totalPages);
    });
  };

  const handleSearch = e => {
    console.log("enter pressed")
    if (e.key === "Enter") {
      e.target.blur();
    }
    e.preventDefault();
    fetchHandler();
  }

  const handleClear = () => {
    setSearchValue('');
  }

  const handleCheckbox = (e) => {
    // console.log( e.target.value);
    const currentStoreChecked = e.target.value;
    const allStoresChecked = [...stores];
    const indexFound = allStoresChecked.indexOf(currentStoreChecked);
  
    let updatedStores;
    if(indexFound === -1) {
      updatedStores = [...stores, currentStoreChecked];
      setStores(updatedStores);
    } else {
      updatedStores = [...stores];
      updatedStores.splice(indexFound, 1);
      setStores(updatedStores);
    }
  } 

  const handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
    setPrice(e.target.value)
  } 

  const handlePriceSort= (e) => {
    setPriceSort(e.target.value);
    console.log(priceSort);
  }

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };
  
  const handleShowAll = () => {
    setSearchValue("");
    setPageNumber(1);
    // setStores([]);
    setPrice(75000);
    setMaxPrice(75000);
    setPriceSort('');
    fetchHandler();
  }

  useEffect(() => {
    // console.log("stores param: ",`${stores[0]};${stores[1]};${stores[2]}`)
    fetchHandler()
  }, [stores]);
 
  useEffect(() => {
    if (searchValue) {
      fetchHandler()
    }
  }, [searchValue]);

  useEffect(() => {
    fetchHandler()
  }, [pageNumber]);

  useEffect(() => {
    fetchHandler()
  }, [price]);

  const isDesktop = useMediaQuery({
    query: "(min-width: 992px)"
  });

  return (
    <>
    {isDesktop ?  
    <div className='app'>
      {/* <Page loader={"bar"} color={"#A9A9A9"} size={4}> */}
      <div className='cont'>
        <div className='logo'>
          <Link to="/home">
            <img
              style={{width:'4%', height:'auto'}}
              src={Logo}
              alt="logo"
            /> 
        </Link>
          {/* {<img LinkComponent={NavLink} to="/home" style={{width:'4%', height:'auto'}} src={Logo}/>} */}
        </div>

      {/* ------------------------Search items----------------------------  */}
      <div className="search">
        
        <form >
          <TextField
            sx={{
              "& .MuiInputLabel-root": {color: '#b0643e'},//styles the label
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "#b0643e" },
              },
            }}
            id="search-bar"
            className="inputRounded"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            label="Введи название книги"
            variant="outlined"
            placeholder="Искать..."
            size="small"
            InputProps={{
              // className: classes.input,
              endAdornment: 
              <IconButton sx={{visibility: searchValue? "visible": "hidden"}} aria-label="search" onClick={handleClear} type="Submit">
                <ClearIcon style={{ fill: "#7f472c" }} />
              </IconButton>}}
          />
          
          <IconButton aria-label="search" onClick={handleSearch} type="Submit">
            <SearchIcon style={{ fill: "#7f472c" }} />
          </IconButton>
        </form>
      </div>
  
    {/*  ------------------------------Filters------------------------------- */}
    <div className="wrapper">
      <div className="left-cont" >
        <div className="filter">Фильтры </div>
        <div class="divider div-transparent"></div>
        <div className="double-4">Выбери магазин</div>

        <FormControlLabel 
          sx={{marginBottom:"-0.5rem"}}
          control={<Checkbox 
            sx={{
              '&.Mui-checked': {
              color: '#b0643e',
              },
            }}
            onChange={handleCheckbox}
            value="Flip"/>} 
          label="Flip"/>
          
        <FormControlLabel 
          sx={{
            marginBottom:"-0.5rem",
          }}
          control={<Checkbox 
            sx={{
              '&.Mui-checked': {
              color: '#b0643e',
              },
            }}
            onChange={handleCheckbox}
            value="Meloman"/>} 
          label="Meloman"
        />

        <FormControlLabel 
          sx={{marginBottom:"-0.5rem",}}
          control={
          <Checkbox 
            sx={{
              '&.Mui-checked': {
              color: '#b0643e',
              },
              
            }}
            onChange={handleCheckbox}
            value="Wildberries"/>} 
          label="Wildberries"
        />
          
        <div style={{marginTop:'2rem'}}></div>
        <div style={{marginBottom:'1rem'}} className="double-4">Выбери ценовую категорию</div>
        <div className="price-btns">
          от <TextField
            id="min"
            disabled="true"
            // className="inputRounded"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            // label={minPrice}
            variant="outlined"
            placeholder={minPrice}
            size="small"
            sx={{width:'34%', height:'5%' }}
          /> до 
          <TextField
            id="max"
            // className="inputRounded"
            value={maxPrice}
            onChange={handleMaxPrice}
            // label={minPrice}
            variant="outlined"
            placeholder={maxPrice}
            size="small"
            sx={{width:'34%', height:'5%'}}
          /> тг
        </div>
        <Slider 
          sx={{color:'#7f472c',marginLeft:'0.5rem', marginTop:'0.7rem',marginBottom:'1.5rem'}}
          defaultValue={30000}  
          aria-label="Default" 
          valueLabelDisplay="auto" 
          onChange={(e) => {setPrice(e.target.value)}}
          max={maxPrice}
          min={minPrice}
        />

        <FormControl fullWidth
        sx={{
          "& .MuiInputLabel-root": {color: '#b0643e'},//styles the label
          "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: "#b0643e" },
          },
        }}>
          <InputLabel
           id="demo-simple-select-label">Сортировать по цене</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priceSort}
              label="Сортировать по цене"
              onChange={handlePriceSort}
            >
              <MenuItem value={'increase'}>По возрастанию</MenuItem>
              <MenuItem value={'decrease'}>По убыванию</MenuItem>
            </Select>
          </FormControl>

          <Button 
              sx={{
                borderColor: '#b0643e',
                color:'#b0643e',
                borderRadius: '50px',
                maxWidth: '100%', minWidth: '100%',
                marginTop: '1rem'
              }}
              variant="outlined"
              target="_blank" 
              onClick={handleShowAll}
              >Показать все книги
            </Button>
      </div>
      
      
      {/* -------------------------Listing items-------------------------- */}
      <div className="right-cont">
        {(priceSort === '') ? 
         <ul className="ul-1">
          {books &&
            books
            .map((book, i) => (
              <ul className="ul-2" key={i}>
                <Book book={book} />
              </ul>
            ))}
          </ul> 
          :
          (priceSort === 'increase') ?
          <ul className="ul-1">
          {books &&   
            books
            .sort((a, b) => a.price > b.price ? 1 : -1)
            .map((book, i) => (
              <ul className="ul-2" key={i}>
                <Book book={book} />
              </ul>
            ))}
          </ul> 
          :
          <ul className="ul-1">
          {books &&   
            books
            .sort((a, b) => a.price < b.price ? 1 : -1)
            .map((book, i) => (
              <ul className="ul-2" key={i}>
                <Book book={book} />
              </ul>
            ))}
          </ul>
        }  
      </div>
      </div>

      {/* -----------------------------Pagination--------------------------- */}
      <div className="pagination">
          {numberOfPages>0 &&(
          <div className='btns'>
            <AppPagination  setPageNumber={setPageNumber} numberOfPages={numberOfPages} page={pageNumber}/>
          </div>)}
      </div>
      </div>
      {/* </Page> */}
    </div>
    :



    //-----------------------------MOBILE ADAPTATION--------------------------------

    <div className='app'>
      <div className='cont-m'>
        <div className='logo-m'>
          <Link to="/home">
            <img
              style={{width:'10%', height:'auto'}}
              src={Logo}
              alt="logo"
            />
        </Link>
          {/* {<img LinkComponent={NavLink} to="/home" style={{width:'4%', height:'auto'}} src={Logo}/>} */}
        </div>

      {/* -----------------------------Search items---------------------------------- */}
      <div className="search">
        <form >
          <TextField
            sx={{
              "& .MuiInputLabel-root": {color: '#b0643e'},//styles the label
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "#b0643e" },
              },
            }}
            id="search-bar"
            className="inputRounded"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            label="Введи название книги"
            variant="outlined"
            placeholder="Искать..."
            size="small"
            InputProps={{endAdornment: 
            <IconButton sx={{visibility: searchValue? "visible": "hidden"}} aria-label="search" onClick={handleClear} type="Submit">
              <ClearIcon style={{ fill: "#7f472c" }} />
            </IconButton>}}
            onKeyDown={onEnter}
          />
          
          <IconButton aria-label="search" onClick={handleSearch} onKeyUp={onEnter}>
            <SearchIcon style={{ fill: "#7f472c" }} />
          </IconButton>
        </form>
      </div>
  
    {/* -------------------------------Filters---------------------------- */}
    <div className="wrapper-m">
      <div className="left-cont-m" >
        <div className="filter">Фильтры </div>
        <div class="divider div-transparent"></div>
        <div className="double-4">Выбери магазин</div>

        <FormControlLabel 
          sx={{marginBottom:"-0.5rem"}}
          control={<Checkbox 
            sx={{
              '&.Mui-checked': {
              color: '#b0643e',
              },
            }}
            onChange={handleCheckbox}
            value="Flip"/>} 
          label="Flip"/>
          
        <FormControlLabel 
          sx={{
            marginBottom:"-0.5rem",
          }}
          control={<Checkbox 
            sx={{
              '&.Mui-checked': {
              color: '#b0643e',
              },
            }}
            onChange={handleCheckbox}
            value="Meloman"/>} 
          label="Meloman"
        />

        <FormControlLabel 
          sx={{marginBottom:"-0.5rem"}}
          control={<Checkbox 
            sx={{
              '&.Mui-checked': {
              color: '#b0643e',
              },
            }}
            onChange={handleCheckbox}
            value="Wildberries"/>} 
          label="Wildberries"
        />
          
        <div style={{marginTop:'2rem'}}></div>
        <div style={{marginBottom:'1rem'}} className="double-4">Выбери ценовую категорию</div>
        <div className="price-btns">
          от <TextField
            id="min"
            disabled="true"
            // className="inputRounded"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            // label={minPrice}
            variant="outlined"
            placeholder={minPrice}
            size="small"
            sx={{width:'34%', height:'5%' }}
          /> до <TextField
            id="max"
            // className="inputRounded"
            value={maxPrice}
            onChange={handleMaxPrice}
            // label={minPrice}
            variant="outlined"
            placeholder={maxPrice}
            size="small"
            sx={{width:'34%', height:'5%'}}
          /> тг
        </div>
        <Slider 
          sx={{color:'#7f472c',marginLeft:'0.5rem', marginTop:'0.7rem'}}
          defaultValue={30000}  
          aria-label="Default" 
          valueLabelDisplay="auto" 
          onChange={(e) => {setPrice(e.target.value)}}
          max={maxPrice}
          min={minPrice}
        />

        <FormControl fullWidth
        sx={{
          "& .MuiInputLabel-root": {color: '#b0643e'},//styles the label
          "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: "#b0643e" },
          },
        }}>
          <InputLabel
           id="demo-simple-select-label">Сортировать по цене</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priceSort}
              label="Сортировать по цене"
              onChange={handlePriceSort}
            >
              <MenuItem value={'increase'}>По возрастанию</MenuItem>
              <MenuItem value={'decrease'}>По убыванию</MenuItem>
            </Select>
          </FormControl>

          <Button 
              sx={{
                borderColor: '#b0643e',
                color:'#b0643e',
                borderRadius: '50px',
                maxWidth: '100%', minWidth: '100%',
                marginTop: '1rem'
              }}
              variant="outlined"
              target="_blank" 
              onClick={handleShowAll}
              >Показать все книги
            </Button>
            
      </div>

      <div className="right-cont-m">
        
        {/* ----------------------------Listing items------------------------- */}
        {(priceSort === '') ? 
         <ul className="ul-1-m">
          {books &&
            books
            .map((book, i) => (
              <ul className="ul-2-m" key={i}>
                <Bookmob book={book} />
              </ul>
            ))}
          </ul> 
          :
          (priceSort === 'increase') ?
          <ul className="ul-1-m">
          {books &&   
            books
            .sort((a, b) => a.price > b.price ? 1 : -1)
            .map((book, i) => (
              <ul className="ul-2-m" key={i}>
                <Bookmob book={book} />
              </ul>
            ))}
          </ul> 
          :
          <ul className="ul-1-m">
          {books &&   
            books
            .sort((a, b) => a.price < b.price ? 1 : -1)
            .map((book, i) => (
              <ul className="ul-2-m" key={i}>
                <Bookmob book={book} />
              </ul>
            ))}
          </ul>
        }  
        
      </div>
      </div>

      <div className="pagination">
          {/* Pagination */}
          {numberOfPages>0 &&(
          <div className='btns'>
            <AppPagination  setPageNumber={setPageNumber} numberOfPages={numberOfPages} page={pageNumber}/>
          </div>)}
      </div>
      </div>
    </div>
    }</>
  );
}

export default Search