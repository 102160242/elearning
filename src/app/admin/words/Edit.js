import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';
import { getWordInfo, updateWord, getOptions } from '../../../actions/admin/words';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

export default function Words_Edit(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const wordsData = useSelector(state => state.admin.words);
  var word_id = props.match.params.word_id;
  var token = localStorage.getItem('token');

  const [image, setImage] = useState(null);
  const [image_url, setImage_url] = useState(null);
  const [word, setWord] = useState("");
  const [ipa, setIpa] = useState("");
  const [wordClass, setWordClass] = useState("");
  const [meaning, setMeaning] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    document.title = 'Edit';
    return () => {
      dispatch(changeLoadingStatus(true));
    }
  }, []);

  // Goi khi auth co su thay doi
  useEffect(() => {
    // Neu da xac thuc user hop le
    // console.log(auth.isLoggedIn)
    if (auth.isLoggedIn == true) {
      // Lay danh sach categories
      dispatch(getWordInfo(token, word_id));
      dispatch(getOptions(token));
    }
    else if (auth.isLoggedIn == false) {
      // Xac thuc that bai, chuyen huong den trang chinh
      props.history.push(process.env.REACT_APP_ROOT_URL);
    }
  }, [auth.isLoggedIn]);

  // Goi khi categoriesData co su thay doi
  useEffect(() => {
    // Neu load thanh cong 
    var data = wordsData;
    console.log(data)
    if (data.options.categories.length != 0 && data.word.id != null) {
      setImage(data.word.image_url);
      setIpa(data.word.ipa);
      setMeaning(data.word.meaning);
      setWord(data.word.word);
      setWordClass(data.word.word_class);
      setCategories([data.word.category_id.toString()]);

      // console.log(categories)
    }
    if (wordsData.status != "") {
      dispatch(changeLoadingStatus(false));
    }
    // console.log(categoriesData.data.list[0]);
  }, [wordsData]);

  useEffect(() => {
    // console.log("Thay doi usser Data")
    // console.log(usersData)
    if(wordsData.redirect)
    {
      props.history.push("/admin/words");
    }
  }, [wordsData.redirect]);

  console.log(image)
  console.log(image_url);

  const wordHandler = (e) => {
    setWord(e.target.value);
  }
  // const imageHandler = (e)  =>
  // {
  //   //console.log("IMG CHANGED");
  //   setImage(e.target.files[0]);
  // }
  const ipaHandler = (e) => {
    setIpa(e.target.value);
  }
  const wordClassHandler = (e) => {
    setWordClass(e.target.value);
  }
  const meaningHandler = (e) => {
    setMeaning(e.target.value);
  }
  const categoriesHandler = (e) => {
    var ids = Array.from(e.target.selectedOptions, (item) => item.value);
    // console.log(Array.from(e.target.selectedOptions, (item) => item.value));
    setCategories(ids);
  }
  const onChangeImageHandler = (e) => {
    // console.log(image);
    var reader = new FileReader();
    var img = e.target.files[0];
    var imgtag = document.querySelector("#img_feild");

    setImage(img);
    setImage_url(img);

    var labelTag = document.querySelector("#img_name");
    var label = <label className="custom-file-label" id="img_name" htmlFor="customFile"> {img.name} </label>;
    ReactDOM.render(label, labelTag);

    reader.addEventListener("load", function () {
      imgtag.src = reader.result;
    }, false);

    if (img) {
      reader.readAsDataURL(img);
    }
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image_url !== null)
      formData.append('word[image]', image_url);
    formData.append('word[word]', word);
    formData.append('word[meaning]', meaning);
    formData.append('word[word_class]', wordClass);
    formData.append('word[ipa]', ipa);
    formData.append('word[category_ids][]', categories);
    dispatch(updateWord(token, formData, word_id));
  }

  var dataword = wordsData.word;

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Edit Word</h1>
          <form className="mt-4" onSubmit={formSubmitHandler}>
            <div className="form-group">
              <label htmlFor="word">Word</label>
              <input type="text" className="form-control" id="word" placeholder="Enter the word" required value={word} onChange={wordHandler} />
            </div>
            <div className="form-group">
              <label htmlFor="ipa">IPA</label>
              <input type="text" className="form-control" id="ipa" aria-describedby="ipaHelp" placeholder="Enter the ipa" required value={ipa} onChange={ipaHandler} />
              <small id="ipaHelp" className="form-text text-muted">This is how you pronounce the word! For example: <strong>ɪˈfekt</strong></small>
            </div>
            <div className="form-group">
              <label htmlFor="class">Class</label>
              <select className="custom-select" onChange={wordClassHandler} title="Word Class">
                {wordsData.options.class && wordsData.options.class.map((i) => {
                  return (
                    <>
                    {
                      dataword.category_id == i.id ? (
                        <option selected value={i.id} key={i.id}>{i.name}</option>
                      ) : (<> <option value={i.id} key={i.id}>{i.name}</option></>)
                    }
                    </>
                  )
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="meaning">Meaning</label>
              <textarea className="form-control" id="wordmeaning_name" aria-describedby="meaningHelp" placeholder="Enter the meaning" required value={meaning} onChange={meaningHandler} />
              <small id="meaningHelp" className="form-text text-muted">Let's explain the meaning of the word!</small>
            </div>
            <div className="form-group">
              <label htmlFor="categories">Categories</label>
              <select multiple className="custom-select" id="categories" aria-describedby="categoriesHelp" required onChange={categoriesHandler}>
                {wordsData.options.categories && wordsData.options.categories.map((i) => {
                  return (
                    <>
                    {
                      dataword.category_id == i.id ? (
                        <option selected value={i.id} key={i.id}>{i.name}</option>
                      ) : (<> <option value={i.id} key={i.id}>{i.name}</option></>)
                    }
                    </>
                    
                  )
                })}
              </select>
              <small id="categoriesHelp" className="form-text text-muted">Choose the categories which the word belong to</small>
            </div>
            <div className="form-group">
              <label >Image</label>
              <div>
                <img className="mx-auto d-block img-thumbnail" id="img_feild" width="500" height="365" src={image} />
              </div>
              <div className="custom-file form-control mt-3">
                <input type="file" className="custom-file-input" id="category_image" onChange={onChangeImageHandler} />
                <label className="custom-file-label" id="img_name" htmlFor="customFile">Choose file</label>
              </div>
            </div>
            <button className="btn btn-success mt-3 mb-3" type="submit" ><i className="far fa-check-circle"></i> Submit</button>
            <Link to="/admin/words" className="mr-3" title="Back"> <button className="btn btn-outline-secondary"> <i className="fas fa-long-arrow-alt-left" ></i> Back </button> </Link>
          </form>
        </div>
      </div>
    </div>
  )
}