import { Header } from "../components/Header";

import "./ErrorPage.css";
import errorImage from "../assets/images/error.png";
import { Link } from "react-router";

export function ErrorPage() {
  return (
    <>
      <Header />
      <div className='container'>
        <img className='error-image' src={errorImage} alt='404 error image' />
        <h1>Page not found</h1>
        <Link className="button" to='/'>Go back to home</Link>
      </div>
    </>
  );
}
