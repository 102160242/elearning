import React from 'react';
import { useState, useEffect } from 'react';
import { createWord, getOptions, clearResponse } from '../../../actions/admin/words';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoadingStatus } from '../../../actions/app';

export default function Words_Create(props) {

  const [image, setImage] = useState(null);
  const [word, setWord] = useState("");
  const [ipa, setIpa] = useState("");
  const [wordClass, setWordClass] = useState("");
  const [meaning, setMeaning] = useState("");
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const wordsData = useSelector(state => state.admin.words);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  // Thiet lap ban dau
  useEffect(() => {
    document.title = 'Create new Word';
    dispatch(clearResponse());
    return () => {
      dispatch(changeLoadingStatus(true));
      dispatch(clearResponse());
    }
  }, []);

  // Xu ly ket qua Submit
  useEffect(() => {
    if(wordsData.status == "success" && wordsData.redirect)
    {
      props.history.push("/admin/words"); // Chuyen huong ve words sau khi Submit thanh cong
    }
    return () => {
      dispatch(clearResponse());
    }
  }, [wordsData.redirect]);

  // Doi qua trinh xac thuc
  useEffect(() => {
    if(isLoggedIn == true)
    {
      var token = localStorage.getItem("token");
      dispatch(getOptions(token)); // Lay List options
    }
  }, [isLoggedIn]);

  const wordHandler = (e)  =>
  {
    setWord(e.target.value);
  }
  const imageHandler = (e)  =>
  {
    //console.log("IMG CHANGED");
    setImage(e.target.files[0]);
  }
  const ipaHandler = (e)  =>
  {
    setIpa(e.target.value);
  }
  const wordClassHandler = (e)  =>
  {
    setWordClass(e.target.value);
  }
  const meaningHandler = (e)  =>
  {
    setMeaning(e.target.value);
  }
  const categoriesHandler = (e) =>
  {
    var ids = Array.from(e.target.selectedOptions, (item) => item.value);
    //console.log(Array.from(e.target.selectedOptions, (item) => item.value))
    setCategories(ids);
  }
  const formSubmitHandler = (e) => 
  {
    e.preventDefault();
    const formData = new FormData();
    formData.append('word[image]', image);
    formData.append('word[word]', word);
    formData.append('word[meaning]', meaning);
    formData.append('word[word_class]', wordClass);
    formData.append('word[ipa]', ipa);
    formData.append('word[category_ids][]', categories);
    var token = localStorage.getItem("token");
    dispatch(createWord(token, formData));
  }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Create new Word</h1>
          <form className="mt-4" onSubmit={formSubmitHandler}>
            <div className="form-group">
              <label htmlFor="word">Word</label>
              <input type="text" className="form-control" id="word" placeholder="Enter the word" required value={word} onChange={wordHandler}/>
            </div>
            <div className="form-group">
              <label htmlFor="ipa">IPA</label>
              <input type="text" className="form-control" id="ipa" aria-describedby="ipaHelp" placeholder="Enter the ipa" required value={ipa} onChange={ipaHandler}/>
              <small id="ipaHelp" className="form-text text-muted">This is how you pronounce the word! For example: <strong>ɪˈfekt</strong></small>
            </div>
            <div className="form-group">
              <label htmlFor="class">Class</label>
              <select className="custom-select" value={wordClass} onChange={wordClassHandler} title="Word Class">
                { wordsData.options.class && wordsData.options.class.map((i) => {
                  return(
                    <option value={i.id} key={i.id}>{i.name}</option>
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
              { wordsData.options.categories && wordsData.options.categories.map((i) => {
                  return(
                    <option value={i.id} key={i.id}>{i.name}</option>
                  )
                })}
              </select>
              <small id="categoriesHelp" className="form-text text-muted">Choose the categories which the word belong to</small>
            </div>
            <div className="form-group">
              <label htmlFor="image">Choose your image</label>
              <input type="file" className="form-control-file" id="image" onChange={imageHandler} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}